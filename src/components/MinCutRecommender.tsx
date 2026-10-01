'use client';

import React from 'react';
import { MinCutSolution, CaseData } from '../types/orion';
import { Target, Zap, ShieldAlert, CheckCircle, ArrowRight, Lock, DollarSign, Award } from 'lucide-react';

interface MinCutRecommenderProps {
  minCut: MinCutSolution;
  currentCase: CaseData;
  onOpenNoticeModal: () => void;
}

export const MinCutRecommender: React.FC<MinCutRecommenderProps> = ({
  minCut,
  currentCase,
  onOpenNoticeModal,
}) => {
  const intermediateCount = currentCase.nodes.filter((n) => n.type === 'INTERMEDIARY' || n.type === 'PEEL_NODE').length;

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Target size={16} />
            MODULE 6: GRAPH MIN-CUT FREEZE OPTIMIZER (FORD-FULKERSON BOTTLENECK)
          </div>
          <span className="badge badge-amber">Algorithmic Resource Optimization</span>
        </div>

        <button onClick={onOpenNoticeModal} className="btn btn-hazard">
          <Lock size={14} />
          Execute Optimal Freeze Order
        </button>
      </div>

      {/* Comparison Grid: Naive Approach vs ORION Min-Cut */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Naive Tracing */}
        <div
          style={{
            padding: '18px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            CONVENTIONAL POLICE TRACING (NAIVE APPROACH)
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '12px' }}>
            Freeze Every Individual Mule Wallet
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Legal Freeze Notices Needed:</span>
              <strong style={{ color: 'var(--accent-hazard)' }}>{intermediateCount + 2} Formal Orders</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Administrative Turnaround:</span>
              <strong style={{ color: 'var(--accent-hazard)' }}>3 to 7 Days (Funds Escaped)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Recovery Rate:</span>
              <strong style={{ color: 'var(--accent-hazard)' }}>&lt; 15% (Mules already drained)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Investigator Burden:</span>
              <strong style={{ color: 'var(--accent-hazard)' }}>Extreme (Alert Fatigue)</strong>
            </div>
          </div>
        </div>

        {/* ORION Min-Cut */}
        <div
          style={{
            padding: '18px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-amber)', textTransform: 'uppercase', fontWeight: 700 }}>
              ORION GRAPH MIN-CUT BOTTLENECK
            </span>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Award size={12} />
              Recommended
            </span>
          </div>

          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '4px', marginBottom: '12px' }}>
            Target The Exact Exchange Ingress Point
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Legal Freeze Notices Needed:</span>
              <strong style={{ color: 'var(--accent-emerald)', fontSize: '14px' }}>
                ONLY {minCut.requiredFreezesCount} DIRECT NOTICE
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Turnaround Speed:</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>Golden Hour (Under 30 Mins)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Funds Blocked at Destination:</span>
              <strong style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>
                ${minCut.blockedAmountUsd.toLocaleString()} ({minCut.percentFundsPreserved}% of Total Flow)
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>VASP Compliance Mechanism:</span>
              <strong style={{ color: 'var(--accent-amber)' }}>Custodial KYC Lock via Sec 107 BNSS</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Explanation Banner */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'rgba(10, 16, 32, 0.8)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div style={{ color: 'var(--accent-amber)' }}>
          <Zap size={24} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
            ALGORITHMIC RECOMMENDATION (MAX-FLOW / MIN-CUT THEOREM):
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {minCut.bottleneckExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};
