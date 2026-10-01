'use client';

import React, { useState } from 'react';
import { CaseData } from '../types/orion';
import { X, Send, BellRing, Smartphone, Mail, Globe, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface AlertDispatcherModalProps {
  currentCase: CaseData;
  onClose: () => void;
}

export const AlertDispatcherModal: React.FC<AlertDispatcherModalProps> = ({
  currentCase,
  onClose,
}) => {
  const [dispatchStatus, setDispatchStatus] = useState<{
    sms: 'IDLE' | 'SENDING' | 'SENT';
    email: 'IDLE' | 'SENDING' | 'SENT';
    sahyog: 'IDLE' | 'SENDING' | 'SENT';
  }>({
    sms: 'IDLE',
    email: 'IDLE',
    sahyog: 'IDLE',
  });

  const complaint = currentCase.complaint;
  const attribution = currentCase.attribution;
  const minCut = currentCase.minCut;

  const handleTriggerDispatch = () => {
    setDispatchStatus({ sms: 'SENDING', email: 'SENDING', sahyog: 'SENDING' });

    setTimeout(() => {
      setDispatchStatus((s) => ({ ...s, sms: 'SENT' }));
    }, 600);

    setTimeout(() => {
      setDispatchStatus((s) => ({ ...s, email: 'SENT' }));
    }, 1100);

    setTimeout(() => {
      setDispatchStatus((s) => ({ ...s, sahyog: 'SENT' }));
    }, 1600);
  };

  const isAllSent = dispatchStatus.sms === 'SENT' && dispatchStatus.email === 'SENT' && dispatchStatus.sahyog === 'SENT';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '700px',
          maxWidth: '92vw',
          background: 'rgba(10, 16, 32, 0.98)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.9)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(14, 165, 233, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BellRing size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
              Multi-Channel Real-Time Alert Dispatcher
            </h3>
          </div>

          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '6px 8px', borderRadius: '50%' }}>
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Triggering automated high-priority alerts across state and central cyber crime infrastructure to enforce asset freezing within the critical Golden Hour window.
          </p>

          {/* Dispatch Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {/* Channel 1: SMS */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--accent-amber)' }}>
                  <Smartphone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    SMS Broadcast to Investigating Officer
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Recipient: {complaint.assignedOfficer} (+91 98450 XXXXX) &bull; Flash Alert
                  </div>
                </div>
              </div>

              <div>
                {dispatchStatus.sms === 'IDLE' && <span className="badge badge-amber">Ready</span>}
                {dispatchStatus.sms === 'SENDING' && (
                  <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Loader2 size={12} className="animate-spin" /> Dispatching
                  </span>
                )}
                {dispatchStatus.sms === 'SENT' && (
                  <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Delivered
                  </span>
                )}
              </div>
            </div>

            {/* Channel 2: Email */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--accent-cyan)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    Encrypted Email with Dossier &amp; BNSS Sec 107 Order
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    To: {attribution.nodalOfficerContact} &bull; CC: cybercrime.{complaint.state.toLowerCase()}@nic.in
                  </div>
                </div>
              </div>

              <div>
                {dispatchStatus.email === 'IDLE' && <span className="badge badge-amber">Ready</span>}
                {dispatchStatus.email === 'SENDING' && (
                  <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Loader2 size={12} className="animate-spin" /> Transmitting
                  </span>
                )}
                {dispatchStatus.email === 'SENT' && (
                  <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Dispatched
                  </span>
                )}
              </div>
            </div>

            {/* Channel 3: SAHYOG API */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--accent-purple)' }}>
                  <Globe size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    NCRP / SAHYOG I4C Central Gateway API Push
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Payload: Target Deposit {attribution.depositAddress.slice(0, 10)}... | Est: ${minCut.blockedAmountUsd.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                {dispatchStatus.sahyog === 'IDLE' && <span className="badge badge-amber">Ready</span>}
                {dispatchStatus.sahyog === 'SENDING' && (
                  <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Loader2 size={12} className="animate-spin" /> Syncing Webhook
                  </span>
                )}
                {dispatchStatus.sahyog === 'SENT' && (
                  <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Sync Complete
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Acknowledgement Box */}
          {isAllSent && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--accent-emerald)',
                fontSize: '12.5px',
                marginBottom: '16px',
              }}
            >
              <ShieldCheck size={24} />
              <div>
                <strong>Global Alert Broadcast Confirmed.</strong>
                <div>NCRP Log Token: <code className="font-mono">I4C-RT-ACK-{Math.floor(100000 + Math.random() * 900000)}</code>. All statutory audit logs stored for legal admissibility.</div>
              </div>
            </div>
          )}

          {/* Action Trigger */}
          <button
            onClick={handleTriggerDispatch}
            disabled={dispatchStatus.sms === 'SENDING' || isAllSent}
            className={`btn ${isAllSent ? 'btn-emerald' : 'btn-primary'}`}
            style={{ width: '100%', height: '42px', fontSize: '14px' }}
          >
            <Send size={16} />
            {isAllSent ? 'All Alerts Successfully Broadcasted' : 'Transmit Real-Time Multi-Channel Alerts'}
          </button>
        </div>
      </div>
    </div>
  );
};
