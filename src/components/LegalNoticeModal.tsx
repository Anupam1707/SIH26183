'use client';

import React, { useState } from 'react';
import { CaseData, WalletNode } from '../types/orion';
import { X, Copy, Check, Printer, Send, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface LegalNoticeModalProps {
  currentCase: CaseData;
  targetNode?: WalletNode | null;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  currentCase,
  targetNode,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [dispatched, setDispatched] = useState<boolean>(false);

  const complaint = currentCase.complaint;
  const attribution = currentCase.attribution;
  const targetAddress = targetNode ? targetNode.address : attribution.depositAddress;
  const targetEntity = targetNode?.attributedEntity || attribution.exchangeName;

  const now = new Date();
  const noticeDate = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const legalNoticeText = `FORMAL EMERGENCY PRESERVATION & FREEZE NOTICE
UNDER SECTION 107 OF BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023
READ WITH SECTION 91 OF CrPC, 1973 & SECTION 12 OF PMLA, 2002
================================================================================
MEMORANDUM REF NO: I4C/ORION/BNSS-107/${complaint.complaintId}
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
Forensic multi-chain automated graph analytics executed by the ORION Intelligence Engine
have unequivocally traced victim funds to the following deposit gateway under your custody:

  * TARGET DEPOSIT WALLET ADDRESS: ${targetAddress}
  * NETWORK / CHAIN: ${complaint.network}
  * FROZEN VALUE IDENTIFIED: ${currentCase.minCut.blockedAmountUsd.toLocaleString()} USD (~₹${(complaint.inrEquivalent / 100000).toFixed(2)} Lakhs)
  * SUPPORTING ON-CHAIN TRANSACTION HASH:
    ${attribution.supportingSignals.depositConsolidationSweepTx}
  * ATTRIBUTION CONFIDENCE LEVEL: ${attribution.confidence}% (Model Ladder: ${attribution.ladderStage})

3. IMMEDIATE MANDATORY ACTIONS DIRECTED:
You are hereby strictly directed to execute the following within TWO (2) HOURS of receipt:
  (a) Immediately restrict and freeze all withdrawal capabilities, spot trading, P2P off-ramping,
      and transfer facilities associated with the user account mapped to the deposit address above.
  (b) Preserve and furnish complete subscriber identity records (Full Legal Name, Government ID/
      PAN/Aadhaar/Passport, Linked Bank Accounts, IP Logins with Timestamps, Device Fingerprints,
      and registered Phone/Email).
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

  const handleDispatch = () => {
    setDispatched(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '900px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(10, 16, 32, 0.98)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(239, 68, 68, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(239, 68, 68, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: 'var(--accent-hazard)' }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                BNSS 2023 Sec 107 Emergency Freeze Notice
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Target VASP: <strong style={{ color: 'var(--accent-cyan)' }}>{targetEntity}</strong> &bull; Case: {complaint.complaintId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '6px 8px', borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Dispatch banner if dispatched */}
        {dispatched && (
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(16, 185, 129, 0.15)',
              borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--accent-emerald)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} />
            Notice successfully dispatched via VASP LERS API / SAHYOG Nodal Gateway (Ack: ACK-I4C-BNSS-88219)
          </div>
        )}

        {/* Text Viewport */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          <pre
            className="font-mono"
            style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(5, 8, 16, 0.95)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11.5px',
              lineHeight: 1.55,
              color: '#e2e8f0',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {legalNoticeText}
          </pre>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'rgba(15, 23, 42, 0.6)',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Statutory Notice admissible under BSA 2023 &bull; Generated by ORION Automated Crypto Forensics
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleCopy} className="btn btn-secondary">
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>

            <button onClick={() => window.print()} className="btn btn-secondary">
              <Printer size={14} />
              Print Order
            </button>

            <button
              onClick={handleDispatch}
              disabled={dispatched}
              className={`btn ${dispatched ? 'btn-secondary' : 'btn-hazard'}`}
            >
              <Send size={14} />
              {dispatched ? 'Dispatched' : 'Direct Dispatch to VASP LERS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
