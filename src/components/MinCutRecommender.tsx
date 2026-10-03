'use client';

import React from 'react';
import { MinCutSolution, CaseData } from '../types/orion';
import { Target, Zap, Lock, DollarSign, Award, TrendingUp } from 'lucide-react';

interface MinCutRecommenderProps {
  minCut: MinCutSolution;
  currentCase: CaseData;
  onOpenNoticeModal: () => void;
}

export const MinCutRecommender: React.FC<MinCutRecommenderProps> = ({ minCut, currentCase, onOpenNoticeModal }) => {
  const intermediateCount = currentCase.nodes.filter(n => n.type === 'INTERMEDIARY' || n.type === 'PEEL_NODE').length;

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
            Min-Cut Freeze Optimizer
          </span>
          <span className="badge badge-amber">Ford-Fulkerson Max-Flow</span>
        </div>
        <button onClick={onOpenNoticeModal} className="btn btn-hazard" style={{ fontSize: '12px' }}>
          <Lock size={13} /> Execute Target Freeze
        </button>
      </div>

      <div style={{ padding: '16px 18px' }}>

        {/* ── Comparison Grid ───────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px', marginBottom: '12px' }}>

          {/* Naive approach */}
          <div style={{
            padding: '16px 18px', borderRadius: '8px',
            background: '#161412', border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Conventional Manual Police Tracing</div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Freeze Every Intermediary Mule Sequentially
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Freeze Notices Needed', value: `${intermediateCount + 2} Separate Orders`, color: '#f87171' },
                { label: 'Turnaround Time',        value: '3–7 Days',           color: '#f87171' },
                { label: 'Asset Recovery Rate',    value: '< 15% (Mules already drained)', color: '#f87171' },
                { label: 'Administrative Overhead', value: 'High alert fatigue across multiple banks', color: 'var(--text-muted)' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: r.color }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orion approach */}
          <div style={{
            padding: '16px 18px', borderRadius: '8px',
            background: '#1c1813',
            border: '1px solid #d97706',
            borderLeft: '3px solid #d97706',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>Orion Graph Min-Cut Optimizer</div>
              <span className="badge badge-amber"><Award size={11} /> Recommended Strategy</span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fbf8f4', marginBottom: '14px' }}>
              Target Exchange Bottleneck Ingress Directly
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Freeze Notices Needed', value: `ONLY ${minCut.requiredFreezesCount} Direct Notice`, color: '#4ade80' },
                { label: 'Turnaround Time',        value: 'Immediate (Within Golden Hour)', color: '#4ade80' },
                { label: 'Funds Blocked',          value: `$${minCut.blockedAmountUsd.toLocaleString()} (${minCut.percentFundsPreserved}%)`, color: '#f59e0b' },
                { label: 'Enforcement Route',      value: 'Custodial KYC Lock · §107 BNSS', color: '#fbbf24' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: r.color }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats Row ─────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
          {[
            { label: 'Orders Required', value: minCut.requiredFreezesCount.toString(), color: '#16a34a', icon: <Target size={14} /> },
            { label: 'Funds Preserved', value: `${minCut.percentFundsPreserved}%`, color: '#d97706', icon: <TrendingUp size={14} /> },
            { label: 'USD Blocked', value: `$${(minCut.blockedAmountUsd / 1000).toFixed(0)}k`, color: '#f59e0b', icon: <DollarSign size={14} /> },
            { label: 'Response Target', value: '< 30 min', color: '#16a34a', icon: <Zap size={14} /> },
          ].map(s => (
            <div key={s.label} style={{
              padding: '10px 14px', borderRadius: '6px',
              background: '#161412', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: '2px',
            }}>
              <div style={{ color: s.color }}>{s.icon}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#fbf8f4', fontFamily: 'var(--font-mono)', lineHeight: 1.2 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Algorithm Explanation ─────────────────────────────────── */}
        <div style={{
          padding: '12px 16px', borderRadius: '8px',
          background: '#161412', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'flex-start', gap: '12px',
        }}>
          <div style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }}>
            <Zap size={16} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', marginBottom: '3px' }}>
              Max-Flow / Min-Cut Algorithmic Recommendation:
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {minCut.bottleneckExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
