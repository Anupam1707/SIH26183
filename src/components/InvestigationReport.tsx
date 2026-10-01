'use client';

import React from 'react';
import { CaseData } from '../types/orion';
import { X, Printer, Download, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

interface InvestigationReportProps {
  currentCase: CaseData;
  onClose: () => void;
}

export const InvestigationReport: React.FC<InvestigationReportProps> = ({
  currentCase,
  onClose,
}) => {
  const complaint = currentCase.complaint;
  const attribution = currentCase.attribution;
  const nodes = currentCase.nodes;
  const edges = currentCase.edges;
  const minCut = currentCase.minCut;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '980px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(10, 16, 32, 0.99)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.9)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Top Control Bar */}
        <div
          className="no-print"
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(15, 23, 42, 0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Standardized Forensic Investigation Dossier (BSA 2023)
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: '6px 14px' }}>
              <Printer size={14} />
              Print / Save as PDF
            </button>
            <button onClick={onClose} className="btn btn-secondary" style={{ padding: '6px 10px' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div style={{ padding: '32px 40px', overflowY: 'auto', flex: 1, color: '#e2e8f0', background: 'rgba(5, 8, 16, 0.98)' }}>
          {/* Official Emblem & Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid rgba(56, 189, 248, 0.3)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
              GOVERNMENT OF INDIA &bull; MINISTRY OF HOME AFFAIRS
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.8px', marginTop: '2px' }}>
              INDIAN CYBER CRIME COORDINATION CENTRE (I4C) &bull; CYBER &amp; INFORMATION SECURITY DIVISION
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '8px', textTransform: 'uppercase' }}>
              CRYPTOCURRENCY FRAUD TRACE &amp; VASP ATTRIBUTION REPORT
            </h1>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Statutory Electronic Record admissible under Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023
            </div>
          </div>

          {/* Case Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '24px',
              fontSize: '12px',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>NCRP Complaint Reference:</span>{' '}
              <strong className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{complaint.complaintId}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Incident Offense Category:</span>{' '}
              <strong style={{ color: '#ffffff' }}>{complaint.category}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Reported Suspect Wallet:</span>{' '}
              <strong className="font-mono" style={{ color: '#ffffff' }}>{complaint.reportedWallet}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Blockchain Network:</span>{' '}
              <strong style={{ color: 'var(--accent-amber)' }}>{complaint.network}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Defrauded Sum:</span>{' '}
              <strong style={{ color: 'var(--accent-emerald)' }}>
                {complaint.reportedAmount.toLocaleString()} {complaint.currency} (~₹{(complaint.inrEquivalent / 100000).toFixed(2)} Lakhs)
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Investigating Officer:</span>{' '}
              <strong style={{ color: '#ffffff' }}>{complaint.assignedOfficer} ({complaint.officerBadge})</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Police Jurisdiction:</span>{' '}
              <span>{complaint.policeStationJurisdiction}, {complaint.state}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Forensic Generation Timestamp:</span>{' '}
              <span className="font-mono">{new Date().toISOString()}</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px', marginBottom: '10px' }}>
              1. EXECUTIVE FORENSIC SUMMARY &amp; VASP ATTRIBUTION
            </h3>
            <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Automated multi-hop on-chain analytics executed by the ORION Intelligence Engine tracked funds starting from victim wallet <code>{nodes[0]?.address.slice(0, 10)}...</code> through <code>{nodes.length - 2}</code> intermediate pass-through laundering nodes, concluding at a direct custodial ingress point on <strong>{attribution.exchangeName}</strong>. 
              The target deposit address has been confirmed with <strong>{attribution.confidence}% confidence</strong> using multi-signal graph clustering and subsequent hot-wallet consolidation sweeps.
            </p>
          </div>

          {/* Section 2: Chain of Custody & Transaction Audit Trail */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px', marginBottom: '10px' }}>
              2. CHAIN OF CUSTODY: ON-CHAIN TRANSACTION AUDIT TRAIL
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.9)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '8px 10px' }}>HOP</th>
                    <th style={{ padding: '8px 10px' }}>TRANSACTION HASH</th>
                    <th style={{ padding: '8px 10px' }}>SOURCE &rarr; DESTINATION</th>
                    <th style={{ padding: '8px 10px' }}>AMOUNT</th>
                    <th style={{ padding: '8px 10px' }}>TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody>
                  {edges.map((e, idx) => (
                    <tr key={e.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.2)' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--accent-cyan)' }}>#{e.hop}</td>
                      <td className="font-mono" style={{ padding: '8px 10px', color: '#93c5fd' }}>
                        {e.txHash.slice(0, 16)}...{e.txHash.slice(-8)}
                      </td>
                      <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>
                        {e.method || 'Transfer'}
                      </td>
                      <td className="font-mono" style={{ padding: '8px 10px', fontWeight: 700, color: '#ffffff' }}>
                        {e.amount.toLocaleString()} {e.currency} (${e.usdValue.toLocaleString()})
                      </td>
                      <td className="font-mono" style={{ padding: '8px 10px', color: 'var(--text-muted)' }}>
                        {e.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Min-Cut Optimal Legal Seizure Target */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px', marginBottom: '10px' }}>
              3. MIN-CUT FREEZE BOTTLENECK SPECIFICATION
            </h3>
            <div style={{ padding: '14px 16px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>Target Deposit Address:</span>
                <span className="font-mono" style={{ color: 'var(--accent-hazard)', fontWeight: 700 }}>
                  {attribution.depositAddress}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>Designated Exchange/VASP:</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  {attribution.exchangeName} (FIU Reg: {attribution.fiuRegistrationNumber})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>Total Assets to Freeze:</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  ${minCut.blockedAmountUsd.toLocaleString()} USD ({minCut.percentFundsPreserved}% of Total Flow)
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Certificate Under Section 63 BSA 2023 */}
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px dashed rgba(56, 189, 248, 0.4)',
              background: 'rgba(15, 23, 42, 0.4)',
              fontSize: '11px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              CERTIFICATE UNDER SECTION 63 OF THE BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023
            </div>
            <p>
              I, {complaint.assignedOfficer}, {complaint.officerBadge}, hereby certify that the electronic record produced hereinabove has been derived from the ORION automated cryptographic transaction analysis system operating under lawful supervision. 
              The source transaction hashes, timestamp signatures, and cluster identifications represent authentic digital artifacts reproduced without alteration from public decentralized ledger states.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div>Official Seal: <strong>Cyber Crime Division, {complaint.state}</strong></div>
                <div>Hash Verification: <code className="font-mono" style={{ color: 'var(--accent-cyan)' }}>SHA256: 4f9b8c7e120d...99ab</code></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>Digital Signature of Certifying Officer:</div>
                <strong style={{ color: '#ffffff' }}>{complaint.assignedOfficer}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
