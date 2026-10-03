'use client';

import React, { useState } from 'react';
import { VaspAttributionResult } from '../types/orion';
import {
  Building2, ShieldCheck, TrendingUp, Mail,
  Lock, FileCheck, Copy, Check, ExternalLink,
} from 'lucide-react';

interface VaspAttributionProps {
  attribution: VaspAttributionResult;
  onOpenNoticeModal: () => void;
}

export const VaspAttribution: React.FC<VaspAttributionProps> = ({ attribution, onOpenNoticeModal }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const confBadge =
    attribution.confidence >= 90 ? 'badge-emerald'
    : attribution.confidence >= 70 ? 'badge-amber'
    : 'badge-hazard';

  return (
    <div className="surface" style={{ marginBottom: '16px', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{
        padding: '10px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '10px', background: '#151310',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
            VASP Attribution &amp; Identification
          </span>
          <span className="badge badge-emerald">FIU-IND Verified</span>
        </div>
        <button onClick={onOpenNoticeModal} className="btn btn-hazard" style={{ fontSize: '12px' }}>
          <Lock size={13} /> Issue §107 BNSS Freeze
        </button>
      </div>

      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '12px', marginBottom: '12px' }}>

          {/* ── Exchange Details Card ─────────────────────────────── */}
          <div style={{
            padding: '16px 18px', borderRadius: '8px',
            background: '#161412',
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>Identified VASP / Exchange</div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fbf8f4', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {attribution.exchangeName}
                </h2>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Jurisdiction: {attribution.jurisdiction}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#16a34a', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {attribution.confidence}%
                </div>
                <span className={`badge ${confBadge}`} style={{ marginTop: '4px' }}>
                  {attribution.confidenceTier} Confidence
                </span>
              </div>
            </div>

            {/* FIU Status */}
            <div style={{
              padding: '8px 12px', borderRadius: '6px',
              background: '#0e0d0b', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#16a34a" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#fbf8f4' }}>{attribution.complianceStatus}</div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    FIU Reg: {attribution.fiuRegistrationNumber}
                  </div>
                </div>
              </div>
              <span className="badge badge-emerald">Registered</span>
            </div>

            {/* Contacts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Mail size={13} color="var(--amber)" />
                <span style={{ color: 'var(--text-muted)' }}>Nodal Officer:</span>
                <strong style={{ color: '#fbf8f4' }}>{attribution.nodalOfficerContact}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <ExternalLink size={13} color="var(--amber)" />
                <span style={{ color: 'var(--text-muted)' }}>Portal:</span>
                <a
                  href={attribution.lersPortalUrl} target="_blank" rel="noreferrer"
                  style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 500 }}
                >
                  Law Enforcement Request Portal ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── Attribution Ladder ────────────────────────────────── */}
          <div style={{
            padding: '16px 18px', borderRadius: '8px',
            background: '#161412', border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
              <TrendingUp size={15} color="var(--amber)" />
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
                3-Stage Evidence Attribution Ladder
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  stage: 'Stage 1',
                  title: 'Rule-Based Heuristic Matching',
                  desc: 'Known exchange deposit pattern and high-velocity forward hop matched.',
                  result: 'Passed (78%)',
                  accent: '#d97706',
                },
                {
                  stage: 'Stage 2',
                  title: 'Clustering & Sweep Consolidation',
                  desc: `Meiklejohn co-spending heuristic confirmed with ${attribution.supportingSignals.clusterWalletCount.toLocaleString()} addresses.`,
                  result: 'Matched (90%)',
                  accent: '#d97706',
                },
                {
                  stage: 'Stage 3',
                  title: 'Graph XGBoost + FIU Registry',
                  desc: 'Centrality cross-validated with historical FIU-IND entity registry.',
                  result: `Final: ${attribution.confidence}%`,
                  accent: '#16a34a',
                },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: '6px',
                  background: '#0e0d0b',
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid ${s.accent}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: s.accent, fontWeight: 700 }}>{s.stage}</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#fbf8f4' }}>{s.title}</span>
                    </div>
                    <span className="badge badge-amber" style={{ fontSize: '9.5px' }}>{s.result}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Forensic Evidence Hashes ──────────────────────────── */}
        <div style={{
          padding: '12px 16px', borderRadius: '8px',
          background: '#161412', border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
            <FileCheck size={14} color="var(--amber)" />
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#f59e0b' }}>
              Forensic Evidence Record — BSA 2023 §63 Compliance
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
            {[
              { label: 'Attributed Deposit Address', value: attribution.depositAddress },
              { label: 'Consolidation Sweep Tx Hash', value: attribution.supportingSignals.depositConsolidationSweepTx },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 12px', borderRadius: '6px', background: '#0e0d0b', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>{item.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '11.5px', color: '#d6d0c7', wordBreak: 'break-all', flex: 1 }}>
                    {item.value.length > 34 ? `${item.value.slice(0, 20)}…${item.value.slice(-8)}` : item.value}
                  </span>
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="btn btn-ghost"
                    style={{ flexShrink: 0, padding: '2px 6px', fontSize: '11px' }}
                  >
                    {copiedText === item.value ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
