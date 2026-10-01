'use client';

import React, { useState } from 'react';
import { BlockchainNetwork, CaseData } from '../types/orion';
import { SAMPLE_CASES } from '../data/mockCases';
import { validateWalletAddress, generateProceduralInvestigation } from '../utils/graphEngine';
import { Search, FolderOpen, AlertCircle, CheckCircle2, Link2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

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

  // Handle Preset Case Change
  const handlePresetChange = (caseId: string) => {
    setSelectedPreset(caseId);
    setIsCustomMode(false);
    if (SAMPLE_CASES[caseId]) {
      onTraceStart();
      setTimeout(() => {
        onSelectCase(SAMPLE_CASES[caseId]);
      }, 400);
    }
  };

  // Validate custom address
  const handleAddressChange = (addr: string) => {
    setCustomWallet(addr);
    if (addr.trim().length > 5) {
      setValidationResult(validateWalletAddress(addr, customNetwork));
    } else {
      setValidationResult(null);
    }
  };

  // Run Custom Procedural Trace
  const handleCustomTrace = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validateWalletAddress(customWallet, customNetwork);
    if (!val.valid) {
      setValidationResult(val);
      return;
    }

    onTraceStart();
    setTimeout(() => {
      const generatedCase = generateProceduralInvestigation(
        customWallet.trim(),
        customNetwork,
        `NCRP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        customAmount,
        customCurrency,
        customCategory
      );
      onSelectCase(generatedCase);
    }, 600);
  };

  const complaint = currentCase.complaint;

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FolderOpen size={16} />
            MODULE 1: COMPLAINT INGESTION &amp; CASE DISCOVERY
          </div>
          <span className="badge badge-cyan">Automated Deduplication Active</span>
        </div>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => setIsCustomMode(false)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: !isCustomMode ? 'var(--accent-blue)' : 'transparent',
              color: !isCustomMode ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            Sample Verified Cases
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: isCustomMode ? 'var(--accent-blue)' : 'transparent',
              color: isCustomMode ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            Custom Wallet Investigator
          </button>
        </div>
      </div>

      {!isCustomMode ? (
        /* Preset Case Selectors */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '12px' }}>
          {Object.entries(SAMPLE_CASES).map(([id, item]) => {
            const isSelected = selectedPreset === id;
            return (
              <div
                key={id}
                onClick={() => handlePresetChange(id)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(14, 165, 233, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? '0 0 16px rgba(0, 242, 254, 0.2)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {id}
                  </span>
                  <span className="badge badge-amber">{item.complaint.network}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {item.complaint.category}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    Victim: {item.complaint.reportedAmount} {item.complaint.currency}
                  </span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    ₹{(item.complaint.inrEquivalent / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Destination: <strong style={{ color: 'var(--text-primary)' }}>{item.attribution.exchangeName}</strong> ({item.attribution.confidence}% Confidence)
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Custom Input Form */
        <form onSubmit={handleCustomTrace} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Blockchain Network
            </label>
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
              <option value="ETHEREUM">Ethereum (ERC-20 / ETH)</option>
              <option value="BITCOIN">Bitcoin (BTC UTXO)</option>
              <option value="ARBITRUM">Arbitrum L2 (ETH / Stablecoins)</option>
              <option value="POLYGON">Polygon PoS (POL / USDC)</option>
              <option value="SOLANA">Solana (SPL Tokens / SOL)</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Suspect Collector Wallet Address
            </label>
            <input
              type="text"
              placeholder={`Enter suspect ${customNetwork} address to trace...`}
              value={customWallet}
              onChange={(e) => handleAddressChange(e.target.value)}
              className="input-control font-mono"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Defrauded Amount ({customCurrency})
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="input-control font-mono"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '38px' }}>
              <Search size={16} />
              Run Deep On-Chain Trace
            </button>
          </div>
        </form>
      )}

      {/* Validation Message */}
      {validationResult && (
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: validationResult.valid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: validationResult.valid ? 'var(--accent-emerald)' : 'var(--accent-hazard)',
            border: `1px solid ${validationResult.valid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}
        >
          {validationResult.valid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{validationResult.message}</span>
        </div>
      )}

      {/* Active Ingested Case Metadata Strip */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: '10px',
          background: 'rgba(13, 21, 39, 0.6)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-cyan">{complaint.portalSource}</span>
          <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
            Case: {complaint.complaintId}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Victim: <strong>{complaint.victimName}</strong> ({complaint.state})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Link2 size={14} color="var(--accent-cyan)" />
            <span>Target Wallet:</span>
            <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {complaint.reportedWallet.slice(0, 8)}...{complaint.reportedWallet.slice(-6)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={14} color="var(--accent-emerald)" />
            <span>Investigating Officer:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {complaint.assignedOfficer} ({complaint.officerBadge})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
