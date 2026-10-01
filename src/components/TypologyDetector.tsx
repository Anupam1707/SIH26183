'use client';

import React, { useState } from 'react';
import { LaunderingTypologyMatch, CaseData } from '../types/orion';
import {
  ShieldAlert,
  GitFork,
  ArrowDownRight,
  RefreshCw,
  Flame,
  Layers,
  Activity,
  Binary,
  Cpu,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface TypologyDetectorProps {
  currentCase: CaseData;
}

export const TypologyDetector: React.FC<TypologyDetectorProps> = ({ currentCase }) => {
  const [activeTab, setActiveTab] = useState<'TYPOLOGIES' | 'ODDBALL' | 'XGBOOST'>('TYPOLOGIES');

  const typologies = currentCase.typologies;
  const xgboostFeatures = currentCase.xgboostFeatures;

  // Complete list of 7 typologies defined in the MHA/I4C ORION specification
  const ALL_TYPOLOGY_RULES = [
    {
      id: 'TYP-01',
      name: 'Fan-In Convergence',
      icon: <GitFork size={18} />,
      desc: 'Multiple distinct victim complaints or unlinked wallet addresses funnelling funds into a solitary suspect aggregator wallet within a condensed time window.',
      defaultSeverity: 'CRITICAL',
    },
    {
      id: 'TYP-02',
      name: 'Fan-Out / Scatter Smurfing',
      icon: <ArrowDownRight size={18} />,
      desc: 'Splitting consolidated fraud proceeds into numerous fractional sub-threshold transfers below automated AML trigger amounts (Smurfing).',
      defaultSeverity: 'HIGH',
    },
    {
      id: 'TYP-03',
      name: 'Pass-Through Rapid Layering',
      icon: <Layers size={18} />,
      desc: 'Serial transfer through a linear chain of intermediary mule accounts with minimal holding dwell time (<15 mins) and near 100% principal preservation.',
      defaultSeverity: 'CRITICAL',
    },
    {
      id: 'TYP-04',
      name: 'Peel Chain Commission Slicing',
      icon: <RefreshCw size={18} />,
      desc: 'Successive transactions where a small percentage (<10%) is peeled off to burner/commission wallets while the dominant remainder is propelled forward.',
      defaultSeverity: 'HIGH',
    },
    {
      id: 'TYP-05',
      name: 'Mixer, Privacy Coin & Bridge Hopping',
      icon: <Activity size={18} />,
      desc: 'Interaction with privacy pools (Tornado Cash, Railgun) or cross-chain bridges (Stargate, Hop Protocol) to obfuscate provenance across ledger boundaries.',
      defaultSeverity: 'CRITICAL',
    },
    {
      id: 'TYP-06',
      name: 'Temporary Burner Wallets',
      icon: <Flame size={18} />,
      desc: 'Addresses generated within 48 hours of illicit funds receipt, having zero prior transaction history and completely drained to zero balance.',
      defaultSeverity: 'HIGH',
    },
    {
      id: 'TYP-07',
      name: 'Circular Round-Tripping Flow',
      icon: <RefreshCw size={18} />,
      desc: 'Closed-loop transactional cycles where funds return to previously active addresses or internal scam syndicate hot wallets.',
      defaultSeverity: 'MEDIUM',
    },
  ];

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: 'var(--accent-hazard)',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldAlert size={16} />
            MODULE 4: LAUNDERING &amp; INTERMEDIARY TYPOLOGY DETECTORS
          </div>
          <span className="badge badge-hazard">Cypher Rules + OddBall + Burst</span>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveTab('TYPOLOGIES')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: activeTab === 'TYPOLOGIES' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'TYPOLOGIES' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            FATF Typology Rules (7)
          </button>
          <button
            onClick={() => setActiveTab('ODDBALL')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: activeTab === 'ODDBALL' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'ODDBALL' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            OddBall Anomaly (Akoglu 2010)
          </button>
          <button
            onClick={() => setActiveTab('XGBOOST')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: activeTab === 'XGBOOST' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'XGBOOST' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            Graph-Aware XGBoost (SHAP)
          </button>
        </div>
      </div>

      {/* TAB 1: Typology Rules */}
      {activeTab === 'TYPOLOGIES' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
          {ALL_TYPOLOGY_RULES.map((rule) => {
            const detectedMatch = typologies.find((t) => t.name.toLowerCase().includes(rule.name.toLowerCase().slice(0, 8)));
            const isDetected = !!detectedMatch;

            return (
              <div
                key={rule.id}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: isDetected ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.45)',
                  border: isDetected ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                  boxShadow: isDetected ? '0 0 16px rgba(239, 68, 68, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: isDetected ? 'var(--accent-hazard)' : 'var(--text-muted)' }}>
                      {rule.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {rule.name}
                      </div>
                      <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {rule.id} &bull; Cypher Graph Pattern
                      </span>
                    </div>
                  </div>

                  <span className={`badge ${isDetected ? 'badge-hazard' : 'badge-emerald'}`}>
                    {isDetected ? `Triggered (${detectedMatch?.confidence}%)` : 'Normal / Passed'}
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                  {isDetected && detectedMatch ? detectedMatch.description : rule.desc}
                </p>

                {isDetected && detectedMatch && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#fca5a5', marginBottom: '4px' }}>
                      ON-CHAIN SIGNALS:
                    </div>
                    <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {detectedMatch.indicators.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: OddBall Anomaly Engine */}
      {activeTab === 'ODDBALL' && (
        <div>
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Cpu size={18} color="var(--accent-cyan)" />
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                OddBall Anomaly Spotting Engine (Akoglu, McGlohon &amp; Faloutsos, PAKDD 2010)
              </h4>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              ORION inspects the 1-hop egonet of every wallet address. In legitimate peer-to-peer networks, the egonet total transaction weight <code>W</code> scales as a power-law function of the node degree <code>N</code>: 
              <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginLeft: '6px' }}>
                W ~ N^θ (where θ ≈ 1.15)
              </span>. 
              Laundering collectors and mule aggregators exhibit catastrophic power-law deviations (excessive high volume through a few burner peers), generating high OddBall anomaly scores.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {currentCase.nodes.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {n.label}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: n.oddBallScore > 0.7 ? 'var(--accent-hazard)' : n.oddBallScore > 0.4 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                    }}
                  >
                    OddBall: {n.oddBallScore}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: `${n.oddBallScore * 100}%`,
                      height: '100%',
                      background: n.oddBallScore > 0.7 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #059669, #10b981)',
                      borderRadius: '4px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>Tx Count (Degree): {n.txCount}</span>
                  <span>Volume: {n.totalReceived.toLocaleString()} {n.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Graph-Aware XGBoost & SHAP */}
      {activeTab === 'XGBOOST' && (
        <div>
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <BarChart2 size={18} color="var(--accent-indigo)" />
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#c7d2fe' }}>
                Graph-Aware XGBoost Classifier &bull; SHAP Feature Attribution
              </h4>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              In Stage 3 of ORION’s attribution ladder, an ensemble XGBoost model synthesizes graph-topology metrics (betweenness centrality, sink proximity, OddBall deviation, and burst timing) to classify suspect risk with high precision while minimizing false positives at LEAs and VASPs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {xgboostFeatures.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {feat.featureName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{feat.description}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '140px', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.abs(feat.impact) * 200}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <span className="font-mono" style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-cyan)', width: '50px', textAlign: 'right' }}>
                    +{feat.impact.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
