'use client';

import React, { useState } from 'react';
import { CaseData, BlockchainNetwork } from '../types/orion';
import { SAMPLE_CASES } from '../data/mockCases';
import { validateWalletAddress, generateProceduralInvestigation } from '../utils/graphEngine';
import {
  ShieldAlert, ArrowRight, Search, AlertCircle, Plus,
} from 'lucide-react';

interface LaunchPageProps {
  onSelectCaseAndLaunch: (caseData: CaseData) => void;
  onBackToWelcome?: () => void;
}

export const LaunchPage: React.FC<LaunchPageProps> = ({ onSelectCaseAndLaunch, onBackToWelcome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [customWallet, setCustomWallet] = useState('');
  const [customNetwork, setCustomNetwork] = useState<BlockchainNetwork>('TRON');
  const [customAmount, setCustomAmount] = useState(50000);
  const [validationError, setValidationError] = useState<string | null>(null);

  const filteredCases = Object.entries(SAMPLE_CASES).filter(([id, c]) => {
    const s = searchTerm.toLowerCase();
    return (
      id.toLowerCase().includes(s) ||
      c.complaint.category.toLowerCase().includes(s) ||
      c.complaint.victimName.toLowerCase().includes(s) ||
      c.attribution.exchangeName.toLowerCase().includes(s)
    );
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWallet.trim()) return;
    const val = validateWalletAddress(customWallet.trim(), customNetwork);
    if (!val.valid) {
      setValidationError(val.message);
      return;
    }
    setValidationError(null);
    const newCase = generateProceduralInvestigation(
      customWallet.trim(),
      customNetwork,
      `NCRP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      customAmount,
      customNetwork === 'TRON' ? 'USDT' : customNetwork === 'BITCOIN' ? 'BTC' : 'ETH',
      'Task-Based Fraud',
    );
    onSelectCaseAndLaunch(newCase);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 10px 48px' }}>

      {/* ── Official Portal Header ────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {onBackToWelcome && (
            <button
              onClick={onBackToWelcome}
              className="btn btn-ghost"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              title="Return to Welcome Gateway"
            >
              ← Gateway
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Orion_SIH26183.png?v=2"
            alt="Orion SIH26183"
            style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#fbf8f4' }}>
                National Case Ingestion &amp; Attribution Queue
              </span>
              <span className="badge badge-amber">I4C / MHA</span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              National Cyber Crime Reporting Portal (1930) · Real-Time Fast-Freeze
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowManualForm(s => !s)}
            className="btn btn-ghost"
            style={{ fontSize: '12.5px' }}
          >
            <Plus size={14} />
            {showManualForm ? 'Hide Manual Ingestion' : 'Ingest New Incident'}
          </button>
        </div>
      </div>

      {/* ── Search & Filter Controls ─────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            placeholder="Search by NCRP Ref, category, complainant, or exchange..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input font-mono"
            style={{ paddingLeft: '32px', fontSize: '12.5px' }}
          />
        </div>

        <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: '#fbf8f4' }}>{filteredCases.length}</strong> incidents awaiting enforcement
        </div>
      </div>

      {/* ── Incident Queue Table ───────────────────────────────────────── */}
      <div className="surface" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#151310', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>CASE REFERENCE</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>CATEGORY</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>COMPLAINANT / STATE</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>NETWORK</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>DEFRAUDED AMOUNT</th>
              <th style={{ padding: '10px 14px', fontWeight: 600 }}>ATTRIBUTED VASP</th>
              <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(([id, c], idx) => (
              <tr
                key={id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: idx % 2 === 0 ? 'transparent' : '#141210',
                }}
              >
                <td style={{ padding: '12px 14px' }}>
                  <span className="font-mono" style={{ fontWeight: 600, color: '#f59e0b' }}>
                    {id}
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Portal: {c.complaint.portalSource}
                  </div>
                </td>

                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fbf8f4' }}>
                  {c.complaint.category}
                </td>

                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                  <div>{c.complaint.victimName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.complaint.state}</div>
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <span className="badge badge-amber">{c.complaint.network}</span>
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: '#fbf8f4' }}>
                    ₹{(c.complaint.inrEquivalent / 100000).toFixed(2)} L
                  </div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    ${c.complaint.reportedAmount.toLocaleString()} {c.complaint.currency}
                  </div>
                </td>

                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: '#4ade80' }}>
                    {c.attribution.exchangeName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {c.attribution.confidence}% confidence ({c.attribution.confidenceTier})
                  </div>
                </td>

                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <button
                    onClick={() => onSelectCaseAndLaunch(c)}
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    Open Case
                    <ArrowRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Manual Ingestion Form (Collapsible) ────────────────────────── */}
      {showManualForm && (
        <div className="surface" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fbf8f4', marginBottom: '4px' }}>
            Direct FIR / Suspect Wallet Ingestion
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Input suspect on-chain transaction coordinates to run automated graph extraction.
          </p>

          <form onSubmit={handleCustomSubmit} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 140px 160px', gap: '10px', alignItems: 'end' }}>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Network</label>
              <select
                value={customNetwork}
                onChange={e => setCustomNetwork(e.target.value as BlockchainNetwork)}
                className="input-control"
              >
                <option value="TRON">TRON (TRC-20)</option>
                <option value="ETHEREUM">Ethereum (ERC-20)</option>
                <option value="BITCOIN">Bitcoin (BTC)</option>
                <option value="ARBITRUM">Arbitrum L2</option>
                <option value="POLYGON">Polygon</option>
              </select>
            </div>

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Suspect Wallet Address</label>
              <input
                type="text"
                placeholder={`Enter suspect ${customNetwork} address...`}
                value={customWallet}
                onChange={e => { setCustomWallet(e.target.value); setValidationError(null); }}
                className="input-control font-mono"
              />
            </div>

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Defrauded (USD)</label>
              <input
                type="number"
                value={customAmount}
                onChange={e => setCustomAmount(Number(e.target.value))}
                className="input-control font-mono"
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '35px' }}>
                <Search size={14} />
                Run Trace
              </button>
            </div>
          </form>

          {validationError && (
            <div style={{
              marginTop: '10px', padding: '8px 12px', borderRadius: '6px',
              background: 'rgba(220, 38, 38, 0.08)', color: '#f87171',
              border: '1px solid rgba(220, 38, 38, 0.25)', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <AlertCircle size={14} />
              {validationError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
