'use client';

import React, { useState } from 'react';
import { WalletNode, TransactionEdge, NodeType } from '../types/orion';
import {
  ZoomIn, ZoomOut, RotateCcw,
  Copy, Check, ShieldAlert, Target, Zap,
  X,
} from 'lucide-react';

interface MoneyFlowGraphProps {
  nodes: WalletNode[];
  edges: TransactionEdge[];
  onSelectNode: (node: WalletNode) => void;
  selectedNode: WalletNode | null;
  onTriggerFreeze: (node: WalletNode) => void;
}

const NODE_COLORS: Record<NodeType, { fill: string; stroke: string; label: string }> = {
  VICTIM:           { fill: '#78350f', stroke: '#f59e0b', label: 'Victim' },
  COLLECTOR:        { fill: '#7f1d1d', stroke: '#ef4444', label: 'Collector' },
  INTERMEDIARY:     { fill: '#451a03', stroke: '#ea580c', label: 'Mule' },
  PEEL_NODE:        { fill: '#713f12', stroke: '#eab308', label: 'Peel' },
  MIXER_BRIDGE:     { fill: '#292524', stroke: '#a8a29e', label: 'Bridge' },
  EXCHANGE_DEPOSIT: { fill: '#14532d', stroke: '#16a34a', label: 'Ingress' },
  EXCHANGE_CLUSTER: { fill: '#92400e', stroke: '#fbbf24', label: 'Vault' },
};

const HOP_LANES = [
  { x: 100,  label: 'Hop 0 · Victim' },
  { x: 310,  label: 'Hop 1 · Collector' },
  { x: 600,  label: 'Hops 2-3 · Layering Mules' },
  { x: 930,  label: 'Hop 4 · Bridge / Peel' },
  { x: 1180, label: 'Hop 5 · Target Exchange' },
];

export const MoneyFlowGraph: React.FC<MoneyFlowGraphProps> = ({
  nodes, edges, onSelectNode, selectedNode, onTriggerFreeze,
}) => {
  const [zoom, setZoom] = useState(1);
  const [maxHop, setMaxHop] = useState(5);
  const [showMinCut, setShowMinCut] = useState(true);
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);

  const visibleNodes = nodes.filter(n => n.hop <= maxHop);
  const visibleIds   = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = edges.filter(e => visibleIds.has(e.from) && visibleIds.has(e.to));

  const handleCopy = (t: string) => {
    navigator.clipboard.writeText(t);
    setCopiedAddr(t);
    setTimeout(() => setCopiedAddr(null), 2000);
  };

  return (
    <div className="surface" style={{ marginBottom: '16px', overflow: 'hidden' }}>

      {/* ── Toolbar & Legend ────────────────────────────────────────── */}
      <div style={{
        padding: '10px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        background: '#151310',
      }}>
        {/* Inline Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#fbf8f4' }}>
            Ledger Flow Graph
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {Object.entries(NODE_COLORS).map(([type, c]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.stroke }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Depth:</span>
            <input
              type="range" min={1} max={5} value={maxHop}
              onChange={e => setMaxHop(Number(e.target.value))}
              style={{ width: '64px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <span className="font-mono" style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
              {maxHop} Hops
            </span>
          </div>

          <button
            onClick={() => setShowMinCut(s => !s)}
            className={`btn ${showMinCut ? 'btn-hazard' : 'btn-ghost'}`}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <Target size={13} />
            {showMinCut ? 'Min-Cut: Visible' : 'Min-Cut: Off'}
          </button>

          <div style={{ display: 'flex', gap: '2px', background: '#201c18', padding: '2px', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <button onClick={() => setZoom(z => Math.min(1.4, z + 0.1))} className="btn btn-ghost btn-icon" title="Zoom in">
              <ZoomIn size={13} />
            </button>
            <button onClick={() => setZoom(z => Math.max(0.6, z - 0.1))} className="btn btn-ghost btn-icon" title="Zoom out">
              <ZoomOut size={13} />
            </button>
            <button onClick={() => setZoom(1)} className="btn btn-ghost btn-icon" title="Reset zoom">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Hop Lane Labels Bar (Clean HTML, Non-Floating) ─────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        padding: '8px 16px',
        borderBottom: '1px solid var(--border)',
        background: '#12110e',
        fontSize: '11px',
        color: 'var(--text-muted)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        <div>Hop 0 · Victim</div>
        <div>Hop 1 · Suspect Collector</div>
        <div>Hops 2–3 · Intermediary Mules</div>
        <div>Hop 4 · Bridge / Layering</div>
        <div>Hop 5 · Target Exchange Ingress</div>
      </div>

      {/* ── Graph Canvas ────────────────────────────────────────────── */}
      <div style={{
        width: '100%', height: '460px', overflow: 'auto',
        backgroundColor: '#0c0b0a',
        position: 'relative',
      }}>
        <svg
          width={1320 * zoom} height={460 * zoom}
          viewBox="0 0 1320 460"
          style={{ minWidth: '100%', minHeight: '100%', display: 'block' }}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#5c5246" />
            </marker>
            <marker id="arrow-cut" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Lane Column Dividers */}
          {HOP_LANES.map((lane, i) => (
            <line key={i} x1={lane.x} y1="10" x2={lane.x} y2="440" stroke="#1d1915" strokeDasharray="3 3" />
          ))}

          {/* Clean Transaction Edges (No floating text badges) */}
          {visibleEdges.map(edge => {
            const src = visibleNodes.find(n => n.id === edge.from);
            const tgt = visibleNodes.find(n => n.id === edge.to);
            if (!src || !tgt) return null;
            const x1 = src.x ?? 100, y1 = src.y ?? 230;
            const x2 = tgt.x ?? 300, y2 = tgt.y ?? 230;
            const isCut = edge.isBottleneckEdge && showMinCut;

            return (
              <line
                key={edge.id}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isCut ? '#ef4444' : '#3d342a'}
                strokeWidth={isCut ? 2.5 : 1.5}
                strokeDasharray={isCut ? '6 4' : 'none'}
                markerEnd={isCut ? 'url(#arrow-cut)' : 'url(#arrow)'}
              />
            );
          })}

          {/* Clean Wallet Nodes (No floating pills) */}
          {visibleNodes.map(node => {
            const x = node.x ?? 150, y = node.y ?? 230;
            const c = NODE_COLORS[node.type];
            const isSel = selectedNode?.id === node.id;
            const isCutTarget = node.isMinCutTarget && showMinCut;
            const r = isSel ? 22 : 18;

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectNode(node)}
                style={{ cursor: 'pointer' }}
              >
                {/* Min-Cut Ring */}
                {isCutTarget && (
                  <circle r="28" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                )}

                {/* Selected Ring */}
                {isSel && (
                  <circle r="26" fill="none" stroke="#f59e0b" strokeWidth="2" />
                )}

                {/* Main Node Circle */}
                <circle
                  r={r}
                  fill={c.fill}
                  stroke={isSel ? '#f59e0b' : isCutTarget ? '#ef4444' : c.stroke}
                  strokeWidth={2}
                />

                {/* Natural Node Label Underneath */}
                <text
                  x="0" y="32" textAnchor="middle"
                  fill="#fbf8f4" fontSize="11" fontWeight="600" fontFamily="var(--font-ui)"
                >
                  {node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Node Inspector / Details Table ───────────────────────────── */}
      {selectedNode ? (
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          background: '#151310',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={`badge ${selectedNode.riskScore > 75 ? 'badge-hazard' : selectedNode.riskScore > 40 ? 'badge-amber' : 'badge-emerald'}`}>
                Risk Score: {selectedNode.riskScore}/100
              </span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fbf8f4' }}>
                {selectedNode.label}
              </h3>
              <span className="badge badge-amber">{selectedNode.network}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => onTriggerFreeze(selectedNode)}
                className="btn btn-hazard"
                style={{ padding: '5px 12px', fontSize: '12px' }}
              >
                <ShieldAlert size={13} />
                Draft Freeze Order
              </button>
              <button
                onClick={() => onSelectNode(null as any)}
                className="btn btn-ghost btn-icon"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div style={{
            padding: '8px 12px', borderRadius: '6px', marginBottom: '12px',
            background: '#0d0c0a', border: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Wallet:</span>
              <span className="font-mono" style={{ fontSize: '12.5px', color: '#fbbf24' }}>
                {selectedNode.address}
              </span>
            </div>
            <button
              onClick={() => handleCopy(selectedNode.address)}
              className="btn btn-ghost"
              style={{ padding: '3px 8px', fontSize: '11px' }}
            >
              {copiedAddr === selectedNode.address ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
              {copiedAddr === selectedNode.address ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {[
              { label: 'On-Chain Balance', value: `${selectedNode.balance.toLocaleString()} ${selectedNode.currency}` },
              { label: 'Total Volume',     value: `${selectedNode.totalReceived.toLocaleString()} ${selectedNode.currency}` },
              { label: 'OddBall Anomaly',  value: `${selectedNode.oddBallScore}` },
              { label: 'Burst Velocity',   value: `${selectedNode.burstScore}` },
              { label: 'Transactions',     value: `${selectedNode.txCount} txs` },
              { label: 'Hop Depth',        value: `Hop ${selectedNode.hop}` },
            ].map(m => (
              <div key={m.label} style={{ padding: '8px 10px', borderRadius: '5px', background: '#0e0d0b', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.label}</div>
                <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#fbf8f4', marginTop: '2px' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '10px 18px',
          borderTop: '1px solid var(--border)',
          background: '#12110e',
          fontSize: '12px', color: 'var(--text-muted)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Click any node in the graph to view on-chain balance, velocity metrics, and draft a freeze notice.</span>
          <span>{visibleNodes.length} nodes · {visibleEdges.length} ledger edges displayed</span>
        </div>
      )}
    </div>
  );
};
