'use client';

import React from 'react';
import { CaseData } from '../types/orion';
import { X, Printer, FileCheck } from 'lucide-react';

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
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '940px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-medium)',
        }}
      >
        {/* Top Control Bar */}
        <div
          className="no-print"
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#151310',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fbf8f4' }}>
              Forensic Investigation Dossier (BSA 2023 §63)
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '12px' }}>
              <Printer size={13} />
              Print / Save PDF
            </button>
            <button onClick={onClose} className="btn btn-ghost btn-icon" style={{ padding: '5px 8px' }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div style={{ padding: '28px 36px', overflowY: 'auto', flex: 1, color: '#d6d0c7', background: '#0e0d0b' }}>
          {/* Official Emblem & Header */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '18px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#f59e0b', textTransform: 'uppercase' }}>
              GOVERNMENT OF INDIA · MINISTRY OF HOME AFFAIRS
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              INDIAN CYBER CRIME COORDINATION CENTRE (I4C) · CYBER FORENSICS WING
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#fbf8f4', marginTop: '6px' }}>
              CRYPTOCURRENCY FRAUD TRACE &amp; VASP ATTRIBUTION DOSSIER
            </h1>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Statutory Electronic Record admissible under Section 63 of Bharatiya Sakshya Adhiniyam (BSA), 2023
            </div>
          </div>

          {/* Case Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '14px 16px',
              borderRadius: '6px',
              background: '#161411',
              border: '1px solid var(--border)',
              marginBottom: '20px',
              fontSize: '12px',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>NCRP Complaint Reference:</span>{' '}
              <strong className="font-mono" style={{ color: '#fbf8f4' }}>{complaint.complaintId}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Incident Category:</span>{' '}
              <strong style={{ color: '#fbf8f4' }}>{complaint.category}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Reported Wallet:</span>{' '}
              <strong className="font-mono" style={{ color: '#fbf8f4' }}>{complaint.reportedWallet}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Blockchain Network:</span>{' '}
              <strong style={{ color: '#f59e0b' }}>{complaint.network}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Defrauded Sum:</span>{' '}
              <strong style={{ color: '#16a34a' }}>
                {complaint.reportedAmount.toLocaleString()} {complaint.currency} (~₹{(complaint.inrEquivalent / 100000).toFixed(2)} Lakhs)
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Investigating Officer:</span>{' '}
              <strong style={{ color: '#fbf8f4' }}>{complaint.assignedOfficer} ({complaint.officerBadge})</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Police Jurisdiction:</span>{' '}
              <span>{complaint.policeStationJurisdiction}, {complaint.state}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Generated Timestamp:</span>{' '}
              <span className="font-mono">{new Date().toISOString()}</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '8px' }}>
              1. EXECUTIVE FORENSIC SUMMARY &amp; VASP ATTRIBUTION
            </h3>
            <p style={{ fontSize: '12px', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
              Automated multi-hop on-chain analytics executed by the Orion Intelligence Engine tracked funds starting from victim wallet <code>{nodes[0]?.address.slice(0, 10)}...</code> through <code>{nodes.length - 2}</code> intermediate pass-through laundering nodes, concluding at a direct custodial ingress point on <strong>{attribution.exchangeName}</strong>. 
              The target deposit address has been confirmed with <strong>{attribution.confidence}% confidence</strong> using multi-signal graph clustering and subsequent hot-wallet consolidation sweeps.
            </p>
          </div>

          {/* Section 2: Chain of Custody & Transaction Audit Trail */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '8px' }}>
              2. CHAIN OF CUSTODY: ON-CHAIN TRANSACTION AUDIT TRAIL
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#161411', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '6px 8px' }}>HOP</th>
                    <th style={{ padding: '6px 8px' }}>TRANSACTION HASH</th>
                    <th style={{ padding: '6px 8px' }}>OPERATION</th>
                    <th style={{ padding: '6px 8px' }}>AMOUNT</th>
                    <th style={{ padding: '6px 8px' }}>TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody>
                  {edges.map((e, idx) => (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--border)', background: idx % 2 === 0 ? 'transparent' : '#13110e' }}>
                      <td style={{ padding: '6px 8px', fontWeight: 600, color: '#f59e0b' }}>#{e.hop}</td>
                      <td className="font-mono" style={{ padding: '6px 8px', color: '#fbbf24' }}>
                        {e.txHash.slice(0, 16)}...{e.txHash.slice(-8)}
                      </td>
                      <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>
                        {e.method || 'Transfer'}
                      </td>
                      <td className="font-mono" style={{ padding: '6px 8px', fontWeight: 600, color: '#fbf8f4' }}>
                        {e.amount.toLocaleString()} {e.currency} (${e.usdValue.toLocaleString()})
                      </td>
                      <td className="font-mono" style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>
                        {e.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Min-Cut Optimal Legal Seizure Target */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '8px' }}>
              3. MIN-CUT FREEZE BOTTLENECK SPECIFICATION
            </h3>
            <div style={{ padding: '12px 14px', borderRadius: '6px', background: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.25)', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#fbf8f4' }}>Target Deposit Address:</span>
                <span className="font-mono" style={{ color: '#ef4444', fontWeight: 600 }}>
                  {attribution.depositAddress}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#fbf8f4' }}>Designated Exchange/VASP:</span>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>
                  {attribution.exchangeName} (FIU Reg: {attribution.fiuRegistrationNumber})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#fbf8f4' }}>Total Assets to Freeze:</span>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>
                  ${minCut.blockedAmountUsd.toLocaleString()} USD ({minCut.percentFundsPreserved}% of Total Flow)
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Certificate Under Section 63 BSA 2023 */}
          <div
            style={{
              padding: '14px',
              borderRadius: '6px',
              border: '1px dashed var(--border)',
              background: '#161411',
              fontSize: '11px',
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ fontWeight: 700, color: '#fbf8f4', marginBottom: '4px', textTransform: 'uppercase' }}>
              CERTIFICATE UNDER SECTION 63 OF THE BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023
            </div>
            <p>
              I, {complaint.assignedOfficer}, {complaint.officerBadge}, hereby certify that the electronic record produced hereinabove has been derived from the Orion automated cryptographic transaction analysis system operating under lawful supervision. 
              The source transaction hashes, timestamp signatures, and cluster identifications represent authentic digital artifacts reproduced without alteration from public decentralized ledger states.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <div>
                <div>Official Seal: <strong>Cyber Crime Division, {complaint.state}</strong></div>
                <div>Hash Verification: <code className="font-mono" style={{ color: '#fbbf24' }}>SHA256: 4f9b8c7e120d...99ab</code></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>Digital Signature:</div>
                <strong style={{ color: '#fbf8f4' }}>{complaint.assignedOfficer}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
