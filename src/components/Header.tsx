'use client';

import React from 'react';
import { ShieldAlert, Lock, FileText, BellRing, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenNoticeModal: () => void;
  onOpenAlertModal: () => void;
  onOpenReportModal: () => void;
  onBackToLaunch?: () => void;
  goldenHourRemaining: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNoticeModal,
  onOpenAlertModal,
  onOpenReportModal,
  onBackToLaunch,
  goldenHourRemaining,
}) => {
  return (
    <header className="no-print" style={{ paddingTop: '16px', marginBottom: '16px' }}>
      <div
        className="surface"
        style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        {/* Left: Navigation & Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBackToLaunch && (
            <button
              onClick={onBackToLaunch}
              className="btn btn-ghost"
              style={{ padding: '6px 12px', fontSize: '12.5px' }}
            >
              ← All Incidents
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Orion_SIH26183.png?v=2"
              alt="Orion SIH26183"
              style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbf8f4' }}>
                  Cybercrime Asset Recovery &amp; Attribution Desk
                </span>
                <span className="badge badge-amber" style={{ fontSize: '10px' }}>I4C / MHA</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                National Cyber Crime Reporting Portal (1930) · Real-Time Fast-Freeze
              </div>
            </div>
          </div>
        </div>

        {/* Right: Golden Hour Status & Operational Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '5px 10px', borderRadius: '5px',
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            fontSize: '12px',
          }}>
            <Clock size={13} color="#f87171" />
            <span style={{ color: 'var(--text-muted)' }}>Golden Hour:</span>
            <span className="font-mono" style={{ color: '#fca5a5', fontWeight: 600 }}>
              {goldenHourRemaining}
            </span>
          </div>

          <button onClick={onOpenReportModal} className="btn btn-ghost" style={{ fontSize: '12.5px' }}>
            <FileText size={14} />
            Forensic Report
          </button>

          <button onClick={onOpenAlertModal} className="btn btn-ghost" style={{ fontSize: '12.5px' }}>
            <BellRing size={14} />
            Dispatch Alerts
          </button>

          <button onClick={onOpenNoticeModal} className="btn btn-hazard" style={{ fontSize: '12.5px' }}>
            <Lock size={14} />
            Issue §107 BNSS Freeze
          </button>
        </div>
      </div>
    </header>
  );
};
