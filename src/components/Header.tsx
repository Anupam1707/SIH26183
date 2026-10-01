'use client';

import React from 'react';
import { ShieldAlert, Activity, Database, Lock, Radio, FileText, BellRing, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenNoticeModal: () => void;
  onOpenAlertModal: () => void;
  onOpenReportModal: () => void;
  goldenHourRemaining: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNoticeModal,
  onOpenAlertModal,
  onOpenReportModal,
  goldenHourRemaining,
}) => {
  return (
    <header className="no-print" style={{ paddingTop: '20px', marginBottom: '24px' }}>
      {/* Top Banner with Ministry Branding */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderColor: 'rgba(56, 189, 248, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(99, 102, 241, 0.3) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f2fe',
              boxShadow: '0 0 16px rgba(0, 242, 254, 0.3)',
            }}
          >
            <ShieldAlert size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                ORION <span style={{ color: 'var(--accent-cyan)' }}>SIH26183</span>
              </h1>
              <span className="badge badge-cyan">v2.4 Production Prototype</span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulse-dot pulse-dot-emerald" />
                Live Indexers Active
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
              Real-Time Crypto Fraud Attribution &amp; Fast-Freeze Platform &bull; <strong style={{ color: 'var(--text-primary)' }}>Indian Cyber Crime Coordination Centre (I4C)</strong>, MHA
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={onOpenNoticeModal} className="btn btn-hazard">
            <Lock size={15} />
            BNSS Sec 107 Freeze Order
          </button>

          <button onClick={onOpenAlertModal} className="btn btn-primary">
            <BellRing size={15} />
            Dispatch Real-Time Alert
          </button>

          <button onClick={onOpenReportModal} className="btn btn-secondary">
            <FileText size={15} />
            BSA 2023 Report
          </button>
        </div>
      </div>

      {/* Live Status & Golden Hour Ticker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginTop: '12px',
        }}
      >
        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: 'var(--accent-cyan)' }}>
            <Database size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Multi-Chain Graph Store
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Neo4j GDS &bull; Tron/ETH/BTC/Arb
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: 'var(--accent-purple)' }}>
            <Activity size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              AI/ML Typology Detectors
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              OddBall + Burst + XGBoost Ladder
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: 'var(--accent-amber)' }}>
            <Radio size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              NCRP / SAHYOG Sync
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              1930 Cyber Helpline Gateway
            </div>
          </div>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{ color: 'var(--accent-hazard)' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
              Golden Hour Window
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fee2e2' }}>
              {goldenHourRemaining} remaining
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
