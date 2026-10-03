'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Database, Lock, Server, CheckCircle2 } from 'lucide-react';

interface WelcomePageProps {
  onEnterApp: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterApp }) => {
  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '680px',
        width: '100%',
        background: '#161411',
        border: '1px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '36px 32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}>
        {/* Official Emblem & Logo Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ marginBottom: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Orion_SIH26183.png?v=2"
              alt="Orion SIH26183 Logo"
              style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#f59e0b', textTransform: 'uppercase' }}>
            Ministry of Home Affairs · Government of India
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Indian Cyber Crime Coordination Centre (I4C)
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fbf8f4', marginTop: '6px' }}>
            Cryptocurrency Fraud Attribution &amp; Fast-Freeze System
          </h1>
        </div>

        {/* Short Operational Summary */}
        <div style={{
          padding: '14px 16px',
          borderRadius: '8px',
          background: '#100f0d',
          border: '1px solid var(--border)',
          marginBottom: '24px',
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
        }}>
          Automated multi-hop blockchain tracing platform for National Cyber Crime Reporting Portal (1930) complaints. De-anonymizes suspect mule chains across TRON, Ethereum, and Bitcoin to issue court-admissible <strong>Section 107 BNSS emergency asset freeze orders</strong> within the Golden Hour.
        </div>

        {/* System Readiness Checklist */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
            Platform Operational Status:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              { label: 'NCRP 1930 Gateway', status: 'Connected · Live Sync', icon: <CheckCircle2 size={14} color="#16a34a" /> },
              { label: 'Neo4j GDS Graph Store', status: 'TRON · ETH · BTC Nodes', icon: <Database size={14} color="#f59e0b" /> },
              { label: 'FIU-IND VASP Registry', status: '34 Reg. Entities Synced', icon: <ShieldCheck size={14} color="#16a34a" /> },
              { label: 'Evidence Engine', status: 'BSA 2023 §63 Compliant', icon: <Lock size={14} color="#f59e0b" /> },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '9px 12px',
                  borderRadius: '6px',
                  background: '#0d0c0a',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {item.icon}
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#fbf8f4' }}>{item.label}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            onClick={onEnterApp}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <span>Open Investigation Portal</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Active Session Info */}
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          fontSize: '11.5px',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span>Authorized Investigator Session:</span>
          <strong style={{ color: 'var(--text-secondary)' }}>Insp. Rajesh Sharma (Cyber Crime Wing, I4C)</strong>
        </div>
      </div>
    </div>
  );
};
