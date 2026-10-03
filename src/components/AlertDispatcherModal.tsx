'use client';

import React, { useState } from 'react';
import { CaseData } from '../types/orion';
import { X, Send, BellRing, Smartphone, Mail, Globe, CheckCircle2, Loader2 } from 'lucide-react';

interface AlertDispatcherModalProps {
  currentCase: CaseData;
  onClose: () => void;
}

type Status = 'IDLE' | 'SENDING' | 'SENT';

export const AlertDispatcherModal: React.FC<AlertDispatcherModalProps> = ({ currentCase, onClose }) => {
  const [status, setStatus] = useState<{ sms: Status; email: Status; sahyog: Status }>({
    sms: 'IDLE', email: 'IDLE', sahyog: 'IDLE',
  });

  const { complaint, attribution, minCut } = currentCase;
  const allSent = status.sms === 'SENT' && status.email === 'SENT' && status.sahyog === 'SENT';

  const handleDispatch = () => {
    setStatus({ sms: 'SENDING', email: 'SENDING', sahyog: 'SENDING' });
    setTimeout(() => setStatus(s => ({ ...s, sms:    'SENT' })), 500);
    setTimeout(() => setStatus(s => ({ ...s, email:  'SENT' })), 900);
    setTimeout(() => setStatus(s => ({ ...s, sahyog: 'SENT' })), 1400);
  };

  const channels = [
    {
      key: 'sms',
      icon: <Smartphone size={16} />,
      iconColor: '#f59e0b',
      title: 'SMS Flash Alert to Investigating Officer',
      sub: `${complaint.assignedOfficer} · +91 98450 XXXXX`,
      st: status.sms,
    },
    {
      key: 'email',
      icon: <Mail size={16} />,
      iconColor: '#c2850c',
      title: 'Encrypted Email + BNSS §107 Requisition',
      sub: `${attribution.nodalOfficerContact} · CC: nodal.${complaint.state.toLowerCase().replace(/ /g, '')}@gov.in`,
      st: status.email,
    },
    {
      key: 'sahyog',
      icon: <Globe size={16} />,
      iconColor: '#ea580c',
      title: 'I4C NCRP / SAHYOG Gateway API Dispatch',
      sub: `Direct ingestion to VASP Compliance Portal (Freeze value: $${minCut.blockedAmountUsd.toLocaleString()})`,
      st: status.sahyog,
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '620px', maxWidth: '92vw',
          border: '1px solid var(--border-medium)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#151310',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BellRing size={16} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fbf8f4' }}>
                Multi-Channel Alert Dispatcher
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                Case Reference: <span className="font-mono">{complaint.complaintId}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon"><X size={15} /></button>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px' }}>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            Transmit verified attribution signals and freeze requisitions to the assigned officer and recipient exchange nodal desk.
          </p>

          {/* Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {channels.map(ch => (
              <div key={ch.key} style={{
                padding: '12px 14px', borderRadius: '6px',
                background: ch.st === 'SENT' ? 'rgba(22, 163, 74, 0.05)' : '#12110e',
                border: `1px solid ${ch.st === 'SENT' ? 'rgba(22, 163, 74, 0.3)' : 'var(--border)'}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: ch.iconColor, flexShrink: 0 }}>{ch.icon}</div>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#fbf8f4' }}>{ch.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{ch.sub}</div>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {ch.st === 'IDLE' && <span className="badge badge-amber">Pending</span>}
                  {ch.st === 'SENDING' && (
                    <span className="badge badge-amber" style={{ gap: '5px' }}>
                      <Loader2 size={11} className="animate-spin" /> Sending
                    </span>
                  )}
                  {ch.st === 'SENT' && (
                    <span className="badge badge-emerald" style={{ gap: '5px' }}>
                      <CheckCircle2 size={11} /> Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              disabled={allSent || status.sms === 'SENDING'}
              className="btn btn-primary"
            >
              <Send size={13} />
              {allSent ? 'All Alerts Delivered' : status.sms === 'SENDING' ? 'Dispatching…' : 'Dispatch All Alerts'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
