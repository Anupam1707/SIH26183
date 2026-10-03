'use client';

import React, { useState } from 'react';
import { CaseData, WalletNode } from '../types/orion';
import { X, Copy, Check, Printer, Send, Lock, CheckCircle2 } from 'lucide-react';

interface LegalNoticeModalProps {
  currentCase: CaseData;
  targetNode?: WalletNode | null;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ currentCase, targetNode, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const { complaint, attribution, minCut } = currentCase;
  const targetAddress = targetNode ? targetNode.address : attribution.depositAddress;
  const targetEntity  = targetNode?.attributedEntity || attribution.exchangeName;

  const noticeDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  const legalNoticeText = `FORMAL EMERGENCY PRESERVATION & FREEZE NOTICE
UNDER SECTION 107 OF BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023
READ WITH SECTION 91 OF CrPC, 1973 & SECTION 12 OF PMLA, 2002
================================================================================
MEMORANDUM REF NO: I4C/Orion/BNSS-107/${complaint.complaintId}
DATE: ${noticeDate}
URGENCY: CRITICAL (GOLDEN-HOUR ASSET PRESERVATION)

TO:
The Compliance Officer / Nodal Officer for Law Enforcement,
${targetEntity} (FIU-IND Registration No: ${attribution.fiuRegistrationNumber}),
Global & India Law Enforcement Response Division.
Email: ${attribution.nodalOfficerContact}

SUBJECT: MANDATORY EMERGENCY FREEZE AND PRESERVATION OF CRYPTOCURRENCY ASSETS
         AND KYC/IP LOGS IN RELATION TO CYBERCRIME CASE REF: ${complaint.complaintId}

1. CASE PREMISES & STATUTORY AUTHORITY:
This communication constitutes an official requisition issued under Section 107 of the
Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, read with Section 91 of the Code of
Criminal Procedure (CrPC), 1973, and Virtual Digital Asset (VDA) reporting obligations
mandated by the Financial Intelligence Unit - India (FIU-IND) under the Prevention of
Money Laundering Act (PMLA), 2002.

A formal cybercrime complaint has been registered on the National Cyber Crime Reporting
Portal (NCRP) / SAHYOG Gateway (Ref: ${complaint.complaintId}) regarding an illicit
financial fraud offense categorized as "${complaint.category}".

2. SPECIFIC TARGET REQUISITIONS & ASSETS TO BE FROZEN:
Forensic multi-chain automated graph analytics executed by the Orion Intelligence Engine
have unequivocally traced victim funds to the following deposit gateway under your custody:

  * TARGET DEPOSIT WALLET ADDRESS: ${targetAddress}
  * NETWORK / CHAIN: ${complaint.network}
  * FROZEN VALUE IDENTIFIED: ${minCut.blockedAmountUsd.toLocaleString()} USD (~₹${(complaint.inrEquivalent / 100000).toFixed(2)} Lakhs)
  * SUPPORTING ON-CHAIN TRANSACTION HASH:
    ${attribution.supportingSignals.depositConsolidationSweepTx}
  * ATTRIBUTION CONFIDENCE LEVEL: ${attribution.confidence}% (Model Ladder: ${attribution.ladderStage})

3. IMMEDIATE MANDATORY ACTIONS DIRECTED:
You are hereby strictly directed to execute the following within TWO (2) HOURS of receipt:
  (a) Immediately restrict and freeze all withdrawal capabilities, spot trading, P2P off-ramping,
      and transfer facilities associated with the user account mapped to the deposit address above.
  (b) Preserve and furnish complete subscriber identity records (Full Legal Name, Government ID /
      PAN / Aadhaar / Passport, Linked Bank Accounts, IP Logins with Timestamps, Device Fingerprints,
      and registered Phone / Email).
  (c) Provide full internal omnibus consolidation transaction records and external destination
      addresses if any funds have already been partially transferred.

4. ADMISSIBILITY OF ELECTRONIC EVIDENCE:
All transaction hashes, timestamps, and multi-chain cluster associations cited herein have been
cryptographically verified and preserved in compliance with Section 63 of the Bharatiya Sakshya
Adhiniyam (BSA), 2023.

5. STATUTORY PENALTY CLAUSE:
Failure to comply with this notice forthwith may attract penal consequences under Section 223
and Section 238 of the Bharatiya Nyaya Sanhita (BNS), 2023, for disobedience of lawful orders
and omission to furnish information, alongside regulatory sanctions under the PMLA, 2002.

ISSUED UNDER SEAL & SIGNATURE:
Investigating Officer: ${complaint.assignedOfficer}
Rank / Badge No: ${complaint.officerBadge}
Police Jurisdiction: ${complaint.policeStationJurisdiction}
State: ${complaint.state}
Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs, New Delhi.
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(legalNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '880px', maxWidth: '95vw', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          border: '1px solid var(--border-medium)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#151310',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: '#ef4444', display: 'flex' }}>
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
                BNSS 2023 §107 Emergency Freeze Notice
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                Recipient VASP: <strong style={{ color: '#ffffff' }}>{targetEntity}</strong> · Case Ref: <span className="font-mono">{complaint.complaintId}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon">
            <X size={15} />
          </button>
        </div>

        {/* Dispatch success banner */}
        {dispatched && (
          <div style={{
            padding: '8px 20px', flexShrink: 0,
            background: 'rgba(16, 185, 129, 0.1)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#34d399', fontSize: '12px', fontWeight: 500,
          }}>
            <CheckCircle2 size={15} />
            Notice dispatched via SAHYOG Gateway API · Receipt Acknowledged: ACK-BNSS-88219
          </div>
        )}

        {/* Document body */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          <pre className="font-mono" style={{
            padding: '14px 16px', borderRadius: '6px',
            background: '#0e0d0b',
            border: '1px solid var(--border)',
            fontSize: '11.5px', lineHeight: 1.55,
            color: '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
          }}>
            {legalNoticeText}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', flexShrink: 0,
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '10px',
          background: '#151310',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Section 63 BSA 2023 Compliant Electronic Record
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleCopy} className="btn btn-ghost">
              {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button onClick={() => window.print()} className="btn btn-ghost">
              <Printer size={13} /> Print Notice
            </button>
            <button
              onClick={() => setDispatched(true)}
              disabled={dispatched}
              className={`btn ${dispatched ? 'btn-ghost' : 'btn-hazard'}`}
            >
              <Send size={13} />
              {dispatched ? 'Dispatched' : 'Dispatch via SAHYOG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
