'use client';

import React, { useState } from 'react';
import { LaunderingTypologyMatch, CaseData } from '../types/orion';
import {
  ShieldAlert, GitFork, ArrowDownRight, RefreshCw,
  Flame, Layers, Activity, Cpu, BarChart2, CheckCircle2,
} from 'lucide-react';

interface TypologyDetectorProps {
  currentCase: CaseData;
}

const TYPOLOGY_DEFS = [
  { id: 'TYP-01', name: 'Fan-In Convergence',             icon: GitFork,       severity: 'CRITICAL', desc: 'Multiple victim wallets funnelling into a single suspect aggregator within a condensed time window.' },
  { id: 'TYP-02', name: 'Fan-Out / Scatter Smurfing',      icon: ArrowDownRight, severity: 'HIGH',     desc: 'Splitting proceeds into sub-threshold fractional transfers below AML trigger amounts (Smurfing).' },
  { id: 'TYP-03', name: 'Pass-Through Rapid Layering',     icon: Layers,        severity: 'CRITICAL', desc: 'Serial hops through intermediary mules with dwell time <15 min and near 100% principal forwarding.' },
  { id: 'TYP-04', name: 'Peel Chain Commission Slicing',   icon: RefreshCw,     severity: 'HIGH',     desc: 'Small % peeled to burner wallets while the dominant remainder is propelled forward.' },
  { id: 'TYP-05', name: 'Mixer, Privacy Coin & Bridging',  icon: Activity,      severity: 'CRITICAL', desc: 'Use of Tornado Cash, Railgun, or cross-chain bridges (Stargate, Hop) to obscure provenance.' },
  { id: 'TYP-06', name: 'Temporary Burner Wallets',        icon: Flame,         severity: 'HIGH',     desc: 'Addresses generated within 48h of illicit receipt with zero history, drained to zero.' },
  { id: 'TYP-07', name: 'Circular Round-Tripping',         icon: RefreshCw,     severity: 'MEDIUM',   desc: 'Closed-loop cycles returning funds to prior addresses or syndicate hot wallets.' },
];

export const TypologyDetector: React.FC<TypologyDetectorProps> = ({ currentCase }) => {
  const [activeTab, setActiveTab] = useState<'TYPOLOGIES' | 'ODDBALL' | 'XGBOOST'>('TYPOLOGIES');
  const { typologies, xgboostFeatures, nodes } = currentCase;

  return (
    <div className="surface" style={{ marginBottom: '16px', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{
        padding: '10px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '10px',
        background: '#151310',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
            FATF Typology &amp; Anomaly Screening
          </span>
          <span className="badge badge-hazard">
            {typologies.filter(t => t.detected).length} of {TYPOLOGY_DEFS.length} Flagged
          </span>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', gap: '3px', background: '#201c18', padding: '3px', borderRadius: '6px', border: '1px solid var(--border)' }}>
          {([
            { key: 'TYPOLOGIES', label: 'FATF Rules' },
            { key: 'ODDBALL',    label: 'OddBall Anomaly' },
            { key: 'XGBOOST',   label: 'XGBoost Features' },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: '4px 12px', borderRadius: '4px', border: 'none',
                cursor: 'pointer', fontSize: '12px', fontWeight: activeTab === t.key ? 600 : 400,
                background: activeTab === t.key ? '#332b22' : 'transparent',
                color: activeTab === t.key ? '#f59e0b' : 'var(--text-muted)',
                transition: 'background 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 18px' }}>

        {/* ── Tab 1: FATF Typologies ──────────────────────────────── */}
        {activeTab === 'TYPOLOGIES' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '10px' }}>
            {TYPOLOGY_DEFS.map(rule => {
              const match = typologies.find(t => t.name.toLowerCase().includes(rule.name.toLowerCase().slice(0, 7)));
              const hit = !!match;

              return (
                <div
                  key={rule.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: hit ? 'rgba(220, 38, 38, 0.04)' : '#161412',
                    border: hit ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid var(--border)',
                    borderLeft: hit ? '3px solid #dc2626' : '1px solid var(--border)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ color: hit ? '#dc2626' : '#6e675d' }}>
                        <rule.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: hit ? '#fbf8f4' : 'var(--text-secondary)' }}>
                          {rule.name}
                        </div>
                        <div className="font-mono" style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                          {rule.id}
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${hit ? 'badge-hazard' : 'badge-emerald'}`}>
                      {hit ? `${match?.confidence}% conf.` : 'Clean'}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: hit ? '8px' : 0 }}>
                    {hit && match ? match.description : rule.desc}
                  </p>

                  {hit && match && (
                    <div style={{ padding: '8px 10px', borderRadius: '6px', background: '#0e0d0b', border: '1px solid var(--border)', marginTop: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#fca5a5', marginBottom: '4px' }}>
                        On-Chain Evidence:
                      </div>
                      <ul style={{ paddingLeft: '14px', margin: 0 }}>
                        {match.indicators.map((ind, i) => (
                          <li key={i} style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {ind}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Tab 2: OddBall Anomaly Engine ──────────────────────── */}
        {activeTab === 'ODDBALL' && (
          <div>
            <div style={{
              padding: '12px 16px', borderRadius: '8px', marginBottom: '14px',
              background: '#161412', border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Cpu size={15} color="var(--amber)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
                  OddBall Graph Egonet Anomaly Scoring
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Computes deviations from power-law egonet scaling (W ~ N^1.15). Suspect mules display excessive volume through unusually few burner addresses, indicating automated layering.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '10px' }}>
              {nodes.map(n => {
                const isAnomaly = n.oddBallScore > 0.7;
                const pct = Math.round(n.oddBallScore * 100);
                return (
                  <div key={n.id} style={{
                    padding: '12px 14px', borderRadius: '8px',
                    background: isAnomaly ? 'rgba(220, 38, 38, 0.04)' : '#161412',
                    border: isAnomaly ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid var(--border)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#fbf8f4' }}>{n.label}</div>
                      <span
                        className="font-mono"
                        style={{ fontSize: '12px', fontWeight: 700, color: isAnomaly ? '#ef4444' : n.oddBallScore > 0.4 ? '#f59e0b' : '#16a34a' }}
                      >
                        {n.oddBallScore.toFixed(2)}
                      </span>
                    </div>

                    <div className="score-bar-track" style={{ marginBottom: '8px' }}>
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: isAnomaly ? '#dc2626' : '#16a34a',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span>Txs: {n.txCount}</span>
                      <span>Vol: {n.totalReceived.toLocaleString()} {n.currency}</span>
                      {isAnomaly && <span className="badge badge-hazard" style={{ fontSize: '9.5px' }}>ANOMALY</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Tab 3: XGBoost SHAP ──────────────────────────────────── */}
        {activeTab === 'XGBOOST' && (
          <div>
            <div style={{
              padding: '12px 16px', borderRadius: '8px', marginBottom: '14px',
              background: '#161412', border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <BarChart2 size={15} color="var(--amber)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
                  XGBoost Classifier · SHAP Feature Contribution
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Ranks key graph topology features driving the fraud risk classification for court-admissible evidence.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {xgboostFeatures.map((feat, i) => {
                const barPct = Math.min(100, Math.abs(feat.impact) * 200);
                return (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: '6px',
                    background: '#161412',
                    border: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', gap: '14px', flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4', marginBottom: '2px' }}>{feat.featureName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{feat.description}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '120px', height: '5px', background: '#28231d', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${barPct}%`, height: '100%', background: '#d97706', borderRadius: '3px' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#f59e0b', width: '45px', textAlign: 'right' }}>
                        +{feat.impact.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
