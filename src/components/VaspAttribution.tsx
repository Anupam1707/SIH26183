'use client';

import React, { useState } from 'react';
import { VaspAttributionResult } from '../types/orion';
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Mail,
  Lock,
  Layers,
  FileCheck,
  Copy,
  Check,
} from 'lucide-react';

interface VaspAttributionProps {
  attribution: VaspAttributionResult;
  onOpenNoticeModal: () => void;
}

export const VaspAttribution: React.FC<VaspAttributionProps> = ({
  attribution,
  onOpenNoticeModal,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-emerald)',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Building2 size={16} />
            MODULE 5: EXCHANGE / VASP ATTRIBUTION LADDER
          </div>
          <span className="badge badge-emerald">FIU-IND PMLA Compliant</span>
        </div>

        <button onClick={onOpenNoticeModal} className="btn btn-hazard">
          <Lock size={14} />
          Issue Section 107 BNSS Freeze Notice
        </button>
      </div>

      {/* Main Attribution Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Left Column: Exchange Details */}
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 165, 233, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                ATTRIBUTED EXCHANGE / VASP
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {attribution.exchangeName}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {attribution.jurisdiction}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {attribution.confidence}%
              </div>
              <span className="badge badge-emerald">{attribution.confidenceTier} CONFIDENCE</span>
            </div>
          </div>

          {/* FIU status */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.3)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {attribution.complianceStatus}
                </div>
                <div className="font-mono" style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                  Reg: {attribution.fiuRegistrationNumber}
                </div>
              </div>
            </div>
            <span className="badge badge-cyan">Active</span>
          </div>

          {/* Contact Details */}
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="var(--accent-cyan)" />
              <span>Nodal Officer:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{attribution.nodalOfficerContact}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExternalLink size={14} color="var(--accent-cyan)" />
              <span>LERS Portal:</span>
              <a
                href={attribution.lersPortalUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}
              >
                Access Law Enforcement Desk
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Attribution Ladder Progression */}
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingUp size={18} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Attribution Model Ladder (Ladder Principle: Each Stage Outperforms Base)
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Stage 1 */}
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.25)', borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Stage 1: Direct Typology &amp; Heuristic Rules
                </span>
                <span className="badge badge-emerald">PASSED (78.2%)</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Identifies rapid ingress into known exchange address patterns and transfer velocity.
              </p>
            </div>

            {/* Stage 2 */}
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.25)', borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Stage 2: Clustering &amp; Deposit Sweep Consolidation
                </span>
                <span className="badge badge-emerald">MATCHED (89.5%)</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Meiklejohn et al. co-spending heuristic confirms address belongs to {attribution.exchangeName} omnibus sweep pool ({attribution.supportingSignals.clusterWalletCount.toLocaleString()} wallets clustered).
              </p>
            </div>

            {/* Stage 3 */}
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.15)', borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  Stage 3: Graph-Aware XGBoost + FIU Ground Truth
                </span>
                <span className="badge badge-cyan">FINAL CONFIDENCE: {attribution.confidence}%</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Time-based cross-validation model combines on-chain sweep hash with global threat intel feed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Electronic Evidence Hashes (BSA 2023 Admissibility) */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'rgba(10, 16, 32, 0.8)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileCheck size={16} color="var(--accent-cyan)" />
          SUPPORTING FORENSIC ELECTRONIC RECORDS (BSA 2023 ADMISSIBILITY)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Exchange Deposit Address</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>
                {attribution.depositAddress}
              </span>
              <button
                onClick={() => handleCopy(attribution.depositAddress)}
                className="btn btn-secondary"
                style={{ padding: '2px 6px', fontSize: '10px' }}
              >
                {copiedText === attribution.depositAddress ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>On-Chain Hot Wallet Consolidation Sweep Tx</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-purple)' }}>
                {attribution.supportingSignals.depositConsolidationSweepTx.slice(0, 18)}...{attribution.supportingSignals.depositConsolidationSweepTx.slice(-10)}
              </span>
              <button
                onClick={() => handleCopy(attribution.supportingSignals.depositConsolidationSweepTx)}
                className="btn btn-secondary"
                style={{ padding: '2px 6px', fontSize: '10px' }}
              >
                {copiedText === attribution.supportingSignals.depositConsolidationSweepTx ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
