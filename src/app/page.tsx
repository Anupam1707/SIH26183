'use client';

import React, { useState, useEffect } from 'react';
import { SAMPLE_CASES } from '../data/mockCases';
import { CaseData, WalletNode } from '../types/orion';
import { Header } from '../components/Header';
import { ComplaintIngestion } from '../components/ComplaintIngestion';
import { MoneyFlowGraph } from '../components/MoneyFlowGraph';
import { TypologyDetector } from '../components/TypologyDetector';
import { VaspAttribution } from '../components/VaspAttribution';
import { MinCutRecommender } from '../components/MinCutRecommender';
import { LegalNoticeModal } from '../components/LegalNoticeModal';
import { InvestigationReport } from '../components/InvestigationReport';
import { AlertDispatcherModal } from '../components/AlertDispatcherModal';
import {
  Layers,
  ShieldAlert,
  Building2,
  Target,
  FileText,
  Loader2,
  Sparkles,
  Cpu,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const [currentCase, setCurrentCase] = useState<CaseData>(SAMPLE_CASES['NCRP-2026-88192']);
  const [activeTab, setActiveTab] = useState<'GRAPH' | 'TYPOLOGY' | 'ATTRIBUTION' | 'MINCUT'>('GRAPH');
  const [selectedNode, setSelectedNode] = useState<WalletNode | null>(null);
  const [isTracing, setIsTracing] = useState<boolean>(false);

  // Modals state
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [noticeTargetNode, setNoticeTargetNode] = useState<WalletNode | null>(null);

  // Golden hour countdown (simulated dynamic countdown)
  const [goldenHourRemaining, setGoldenHourRemaining] = useState<string>('38m 42s');

  useEffect(() => {
    let secondsLeft = 38 * 60 + 42;
    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft -= 1;
        const mins = Math.floor(secondsLeft / 60);
        const secs = secondsLeft % 60;
        setGoldenHourRemaining(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectCase = (newCase: CaseData) => {
    setCurrentCase(newCase);
    setSelectedNode(null);
    setIsTracing(false);
  };

  const handleTraceStart = () => {
    setIsTracing(true);
  };

  const handleOpenNoticeForNode = (node: WalletNode) => {
    setNoticeTargetNode(node);
    setIsNoticeModalOpen(true);
  };

  return (
    <main className="orion-container">
      {/* Header with I4C Branding & Status */}
      <Header
        onOpenNoticeModal={() => {
          setNoticeTargetNode(null);
          setIsNoticeModalOpen(true);
        }}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        goldenHourRemaining={goldenHourRemaining}
      />

      {/* Module 1: Ingestion & Case Switcher */}
      <ComplaintIngestion
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        onTraceStart={handleTraceStart}
      />

      {/* Tracing In-Progress Overlay or Main Analysis Area */}
      {isTracing ? (
        <div
          className="glass-panel"
          style={{
            padding: '80px 20px',
            textAlign: 'center',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Loader2 size={44} color="var(--accent-cyan)" className="animate-spin" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
            Traversing Multi-Chain Ledger &amp; Resolving Clusters...
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            Expanding forward hops, matching cross-chain bridge events, computing OddBall egonet scores, and querying the FIU-IND VASP cluster database.
          </p>
        </div>
      ) : (
        <>
          {/* Main Navigation Tabs */}
          <div className="tabs-bar no-print">
            <button
              onClick={() => setActiveTab('GRAPH')}
              className={`tab-btn ${activeTab === 'GRAPH' ? 'active' : ''}`}
            >
              <Layers size={16} />
              Money-Flow Transaction Graph
            </button>

            <button
              onClick={() => setActiveTab('TYPOLOGY')}
              className={`tab-btn ${activeTab === 'TYPOLOGY' ? 'active' : ''}`}
            >
              <ShieldAlert size={16} />
              FATF Typology &amp; OddBall Anomaly Engine
            </button>

            <button
              onClick={() => setActiveTab('ATTRIBUTION')}
              className={`tab-btn ${activeTab === 'ATTRIBUTION' ? 'active' : ''}`}
            >
              <Building2 size={16} />
              VASP Attribution Ladder (3 Stages)
            </button>

            <button
              onClick={() => setActiveTab('MINCUT')}
              className={`tab-btn ${activeTab === 'MINCUT' ? 'active' : ''}`}
            >
              <Target size={16} />
              Min-Cut Freeze Optimizer
            </button>
          </div>

          {/* Tab 1: Graph Canvas */}
          {activeTab === 'GRAPH' && (
            <MoneyFlowGraph
              nodes={currentCase.nodes}
              edges={currentCase.edges}
              onSelectNode={(n) => setSelectedNode(n)}
              selectedNode={selectedNode}
              onTriggerFreeze={handleOpenNoticeForNode}
            />
          )}

          {/* Tab 2: Typologies & Oddball */}
          {activeTab === 'TYPOLOGY' && (
            <TypologyDetector currentCase={currentCase} />
          )}

          {/* Tab 3: VASP Attribution */}
          {activeTab === 'ATTRIBUTION' && (
            <VaspAttribution
              attribution={currentCase.attribution}
              onOpenNoticeModal={() => {
                setNoticeTargetNode(null);
                setIsNoticeModalOpen(true);
              }}
            />
          )}

          {/* Tab 4: Min Cut Recommender */}
          {activeTab === 'MINCUT' && (
            <MinCutRecommender
              minCut={currentCase.minCut}
              currentCase={currentCase}
              onOpenNoticeModal={() => {
                setNoticeTargetNode(null);
                setIsNoticeModalOpen(true);
              }}
            />
          )}
        </>
      )}

      {/* Quick Summary Floating Footer / Statutory Bar */}
      <footer
        className="glass-panel no-print"
        style={{
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">BSA 2023 Compliant</span>
          <span>
            Every alert preserves source tx hashes, timestamps &amp; data provenance supporting legal admissibility.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Indian Cyber Crime Coordination Centre (I4C)</span>
          <span>&bull;</span>
          <span style={{ color: 'var(--accent-cyan)' }}>SIH26183 &bull; Team ORION</span>
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
