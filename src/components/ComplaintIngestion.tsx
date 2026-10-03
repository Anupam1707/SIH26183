'use client';

import React, { useState } from 'react';
import { BlockchainNetwork, CaseData } from '../types/orion';
import { SAMPLE_CASES } from '../data/mockCases';
import { validateWalletAddress, generateProceduralInvestigation } from '../utils/graphEngine';
import {
  Search, FolderOpen, AlertCircle, CheckCircle2,
  Link2, ShieldCheck,
} from 'lucide-react';

interface ComplaintIngestionProps {
  currentCase: CaseData;
  onSelectCase: (caseData: CaseData) => void;
  onTraceStart: () => void;
}

export const ComplaintIngestion: React.FC<ComplaintIngestionProps> = ({
  currentCase,
  onSelectCase,
  onTraceStart,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(currentCase.complaint.complaintId);
  const [customWallet, setCustomWallet] = useState<string>('');
  const [customNetwork, setCustomNetwork] = useState<BlockchainNetwork>('TRON');
  const [customAmount, setCustomAmount] = useState<number>(50000);
  const [customCurrency, setCustomCurrency] = useState<string>('USDT');
  const [customCategory, setCustomCategory] = useState<any>('Task-Based Fraud');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const handlePresetChange = (caseId: string) => {
    setSelectedPreset(caseId);
    setIsCustomMode(false);
    if (SAMPLE_CASES[caseId]) {
      onTraceStart();
      setTimeout(() => { onSelectCase(SAMPLE_CASES[caseId]); }, 350);
    }
  };

  const handleAddressChange = (addr: string) => {
    setCustomWallet(addr);
    if (addr.trim().length > 5) setValidationResult(validateWalletAddress(addr, customNetwork));
    else setValidationResult(null);
  };

  const handleCustomTrace = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validateWalletAddress(customWallet, customNetwork);
    if (!val.valid) { setValidationResult(val); return; }
    onTraceStart();
    setTimeout(() => {
      const generatedCase = generateProceduralInvestigation(
        customWallet.trim(), customNetwork,
        `NCRP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        customAmount, customCurrency, customCategory,
      );
      onSelectCase(generatedCase);
    }, 450);
  };

  const complaint = currentCase.complaint;

  const categoryColor = (cat: string) => {
    if (cat.includes('Task')) return '#f59e0b';
    if (cat.includes('Investment')) return '#ef4444';
    if (cat.includes('Digital Arrest')) return '#fb923c';
    if (cat.includes('Sextortion')) return '#f43f5e';
    return '#a8a096';
  };

  return (
    <div className="surface" style={{ padding: '0', marginBottom: '16px', overflow: 'hidden' }}>

      {/* ── Panel Header ──────────────────────────────────────────────── */}
      <div style={{
        padding: '12px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '10px',
        background: '#151310',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
            Incident Selector &amp; Direct Trace
          </span>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex', gap: '3px', background: '#201c18',
          padding: '3px', borderRadius: '6px', border: '1px solid var(--border)',
        }}>
          {['Active Cases', 'Manual Investigation'].map((label, i) => {
            const active = i === 0 ? !isCustomMode : isCustomMode;
            return (
              <button
                key={label}
                onClick={() => setIsCustomMode(i === 1)}
                style={{
                  padding: '4px 12px', borderRadius: '4px', border: 'none',
                  cursor: 'pointer', fontSize: '12px', fontWeight: active ? 600 : 400,
                  background: active ? '#332b22' : 'transparent',
                  color: active ? '#f59e0b' : 'var(--text-muted)',
                  transition: 'background 0.15s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Case Cards / Custom Form ──────────────────────────────────── */}
      <div style={{ padding: '14px 18px' }}>
        {!isCustomMode ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '10px' }}>
            {Object.entries(SAMPLE_CASES).map(([id, item]) => {
              const isSelected = selectedPreset === id;
              return (
                <button
                  key={id}
                  onClick={() => handlePresetChange(id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: isSelected ? '#231d17' : '#161412',
                    border: isSelected ? '1px solid #d97706' : '1px solid var(--border)',
                    borderLeft: isSelected ? '3px solid #d97706' : '1px solid var(--border)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: isSelected ? '#f59e0b' : 'var(--text-secondary)' }}>
                      {id}
                    </span>
                    <span className="badge badge-amber" style={{ fontSize: '10px' }}>{item.complaint.network}</span>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 600, color: categoryColor(item.complaint.category), marginBottom: '6px' }}>
                    {item.complaint.category}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {item.complaint.reportedAmount.toLocaleString()} {item.complaint.currency}
                      {' · '}
                      <span style={{ color: '#fbf8f4', fontWeight: 600 }}>
                        ₹{(item.complaint.inrEquivalent / 100000).toFixed(1)}L
                      </span>
                    </span>
                    <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 500 }}>
                      {item.attribution.confidence}% match
                    </span>
                  </div>

                  <div style={{ marginTop: '5px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    Destination: <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.attribution.exchangeName}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleCustomTrace} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px', alignItems: 'end',
          }}>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: '6px' }}>Blockchain Network</label>
              <select
                value={customNetwork}
                onChange={(e) => {
                  const net = e.target.value as BlockchainNetwork;
                  setCustomNetwork(net);
                  setCustomCurrency(net === 'TRON' ? 'USDT' : net === 'BITCOIN' ? 'BTC' : net === 'SOLANA' ? 'SOL' : 'ETH');
                  if (customWallet) setValidationResult(validateWalletAddress(customWallet, net));
                }}
                className="input-control"
              >
                <option value="TRON">TRON (TRC-20 USDT)</option>
                <option value="ETHEREUM">Ethereum (ERC-20)</option>
                <option value="BITCOIN">Bitcoin (BTC UTXO)</option>
                <option value="ARBITRUM">Arbitrum L2</option>
                <option value="POLYGON">Polygon PoS</option>
                <option value="SOLANA">Solana (SPL)</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="label-caps" style={{ display: 'block', marginBottom: '6px' }}>Suspect Collector Wallet Address</label>
              <input
                type="text"
                placeholder={`Enter suspect ${customNetwork} wallet address...`}
                value={customWallet}
                onChange={(e) => handleAddressChange(e.target.value)}
                className="input-control font-mono"
                required
              />
            </div>

            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: '6px' }}>Amount ({customCurrency})</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="input-control font-mono"
                required
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '36px' }}>
                <Search size={14} />
                Trace Wallet Flow
              </button>
            </div>
          </form>
        )}

        {/* Address Validation Notice */}
        {validationResult && (
          <div style={{
            marginTop: '10px', padding: '8px 12px', borderRadius: '6px',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px',
            background: validationResult.valid ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)',
            color: validationResult.valid ? '#4ade80' : '#f87171',
            border: `1px solid ${validationResult.valid ? 'rgba(22, 163, 74, 0.25)' : 'rgba(220, 38, 38, 0.25)'}`,
          }}>
            {validationResult.valid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {validationResult.message}
          </div>
        )}
      </div>

      {/* ── Active Case Metadata Bar ──────────────────────────────────── */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid var(--border)',
        background: '#13110e',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '10px',
        fontSize: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Selected FIR:</span>
          <span className="font-mono" style={{ fontWeight: 600, color: '#f59e0b' }}>
            {complaint.complaintId}
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Complainant: <strong style={{ color: '#fbf8f4' }}>{complaint.victimName}</strong> ({complaint.state})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)' }}>
          <div>
            Suspect Ingress Wallet: <span className="font-mono" style={{ color: '#fbbf24' }}>{complaint.reportedWallet}</span>
          </div>
          <div>
            Investigating Officer: <strong style={{ color: 'var(--text-secondary)' }}>{complaint.assignedOfficer}</strong> ({complaint.officerBadge})
          </div>
        </div>
      </div>
    </div>
  );
};
