'use client';

import React, { useState, useEffect } from 'react';
import { SAMPLE_CASES } from '../data/mockCases';
import { CaseData, WalletNode } from '../types/orion';
import { Header } from '../components/Header';
import { WelcomePage } from '../components/WelcomePage';
import { LaunchPage } from '../components/LaunchPage';
import { ComplaintIngestion } from '../components/ComplaintIngestion';
import { MoneyFlowGraph } from '../components/MoneyFlowGraph';
import { TypologyDetector } from '../components/TypologyDetector';
import { VaspAttribution } from '../components/VaspAttribution';
import { MinCutRecommender } from '../components/MinCutRecommender';
import { LegalNoticeModal } from '../components/LegalNoticeModal';
import { InvestigationReport } from '../components/InvestigationReport';
import { AlertDispatcherModal } from '../components/AlertDispatcherModal';
import { Layers, ShieldAlert, Building2, Target, Loader2 } from 'lucide-react';

type TabKey = 'GRAPH' | 'TYPOLOGY' | 'ATTRIBUTION' | 'MINCUT';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'GRAPH',       label: 'Transaction Graph',     icon: <Layers size={14} /> },
  { key: 'TYPOLOGY',    label: 'Typology Screening',    icon: <ShieldAlert size={14} /> },
  { key: 'ATTRIBUTION', label: 'VASP Attribution',      icon: <Building2 size={14} /> },
  { key: 'MINCUT',      label: 'Min-Cut Freeze Target', icon: <Target size={14} /> },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'WELCOME' | 'QUEUE' | 'WORKSPACE'>('WELCOME');
  const [currentCase, setCurrentCase] = useState<CaseData>(SAMPLE_CASES['NCRP-2026-88192']);
  const [activeTab, setActiveTab] = useState<TabKey>('GRAPH');
  const [selectedNode, setSelectedNode] = useState<WalletNode | null>(null);
  const [isTracing, setIsTracing] = useState(false);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [noticeTargetNode, setNoticeTargetNode] = useState<WalletNode | null>(null);

  const [goldenHourRemaining, setGoldenHourRemaining] = useState('38m 42s');

  useEffect(() => {
    let secondsLeft = 38 * 60 + 42;
    const iv = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft -= 1;
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        setGoldenHourRemaining(`${m}m ${s < 10 ? '0' : ''}${s}s`);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleLaunchFromPortal = (caseData: CaseData) => {
    setCurrentCase(caseData);
    setSelectedNode(null);
    setViewMode('WORKSPACE');
    setIsTracing(true);
    setTimeout(() => {
      setIsTracing(false);
    }, 450);
  };

  const handleSelectCase = (newCase: CaseData) => {
    setCurrentCase(newCase);
    setSelectedNode(null);
    setIsTracing(false);
  };

  const handleOpenNoticeForNode = (node: WalletNode) => {
    setNoticeTargetNode(node);
    setIsNoticeModalOpen(true);
  };

  if (viewMode === 'WELCOME') {
    return (
      <main className="orion-root">
        <WelcomePage onEnterApp={() => setViewMode('QUEUE')} />
      </main>
    );
  }

  if (viewMode === 'QUEUE') {
    return (
      <main className="orion-root">
        <LaunchPage
          onSelectCaseAndLaunch={handleLaunchFromPortal}
          onBackToWelcome={() => setViewMode('WELCOME')}
        />
      </main>
    );
  }

  return (
    <main className="orion-root">
      <Header
        onBackToLaunch={() => setViewMode('QUEUE')}
        onOpenNoticeModal={() => { setNoticeTargetNode(null); setIsNoticeModalOpen(true); }}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        goldenHourRemaining={goldenHourRemaining}
      />

      <ComplaintIngestion
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        onTraceStart={() => setIsTracing(true)}
      />

      {isTracing ? (
        /* Tracing loader */
        <div className="surface" style={{
          padding: '60px 20px', textAlign: 'center',
          marginBottom: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        }}>
          <Loader2 size={32} color="var(--primary)" className="animate-spin" />
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fbf8f4' }}>
            Traversing Multi-Hop Ledger &amp; Computing Clusters…
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '460px', lineHeight: 1.5 }}>
            Expanding forward hops, matching cross-chain bridge events, and evaluating egonet anomalies against the FIU-IND registry.
          </p>
        </div>
      ) : (
        <>
          {/* Navigation Tabs */}
          <div className="tabs-bar no-print">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`tab-btn ${activeTab === t.key ? 'active' : ''}`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'GRAPH' && (
            <MoneyFlowGraph
              nodes={currentCase.nodes}
              edges={currentCase.edges}
              onSelectNode={n => setSelectedNode(n)}
              selectedNode={selectedNode}
              onTriggerFreeze={handleOpenNoticeForNode}
            />
          )}
          {activeTab === 'TYPOLOGY' && <TypologyDetector currentCase={currentCase} />}
          {activeTab === 'ATTRIBUTION' && (
            <VaspAttribution
              attribution={currentCase.attribution}
              onOpenNoticeModal={() => { setNoticeTargetNode(null); setIsNoticeModalOpen(true); }}
            />
          )}
          {activeTab === 'MINCUT' && (
            <MinCutRecommender
              minCut={currentCase.minCut}
              currentCase={currentCase}
              onOpenNoticeModal={() => { setNoticeTargetNode(null); setIsNoticeModalOpen(true); }}
            />
          )}
        </>
      )}

      {/* Footer */}
      <footer
        className="no-print"
        style={{
          marginTop: '8px', padding: '12px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '10px',
          borderTop: '1px solid var(--border-dim)',
          fontSize: '11.5px', color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald" style={{ fontSize: '9.5px' }}>BSA 2023 Compliant</span>
          <span>Every alert preserves tx hashes, timestamps &amp; cluster provenance for legal admissibility.</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', color: 'var(--text-dim)' }}>
          <span>Indian Cyber Crime Coordination Centre (I4C)</span>
          <span>·</span>
          <span style={{ color: 'var(--text-muted)' }}>SIH26183 · Team Orion</span>
        </div>
      </footer>

      {/* Modals */}
      {isNoticeModalOpen && (
        <LegalNoticeModal
          currentCase={currentCase}
          targetNode={noticeTargetNode}
          onClose={() => setIsNoticeModalOpen(false)}
        />
      )}
      {isReportModalOpen && (
        <InvestigationReport
          currentCase={currentCase}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
      {isAlertModalOpen && (
        <AlertDispatcherModal
          currentCase={currentCase}
          onClose={() => setIsAlertModalOpen(false)}
        />
      )}
    </main>
  );
}
