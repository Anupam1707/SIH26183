'use client';

import React, { useState, useRef } from 'react';
import { WalletNode, TransactionEdge, NodeType } from '../types/orion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Copy,
  Check,
  ShieldAlert,
  ExternalLink,
  Target,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';

interface MoneyFlowGraphProps {
  nodes: WalletNode[];
  edges: TransactionEdge[];
  onSelectNode: (node: WalletNode) => void;
  selectedNode: WalletNode | null;
  onTriggerFreeze: (node: WalletNode) => void;
}

export const MoneyFlowGraph: React.FC<MoneyFlowGraphProps> = ({
  nodes,
  edges,
  onSelectNode,
  selectedNode,
  onTriggerFreeze,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [maxHopFilter, setMaxHopFilter] = useState<number>(5);
  const [highlightMinCut, setHighlightMinCut] = useState<boolean>(true);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter nodes & edges by hop
  const visibleNodes = nodes.filter((n) => n.hop <= maxHopFilter);
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to)
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getNodeColor = (type: NodeType): { bg: string; border: string; glow: string; text: string } => {
    switch (type) {
      case 'VICTIM':
        return { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24' };
      case 'COLLECTOR':
        return { bg: 'rgba(239, 68, 68, 0.2)', border: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)', text: '#f87171' };
      case 'INTERMEDIARY':
        return { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', text: '#c084fc' };
      case 'PEEL_NODE':
        return { bg: 'rgba(236, 72, 153, 0.15)', border: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)', text: '#f472b6' };
      case 'MIXER_BRIDGE':
        return { bg: 'rgba(20, 184, 166, 0.18)', border: '#14b8a6', glow: 'rgba(20, 184, 166, 0.5)', text: '#2dd4bf' };
      case 'EXCHANGE_DEPOSIT':
        return { bg: 'rgba(16, 185, 129, 0.25)', border: '#10b981', glow: 'rgba(16, 185, 129, 0.6)', text: '#34d399' };
      case 'EXCHANGE_CLUSTER':
        return { bg: 'rgba(56, 189, 248, 0.2)', border: '#38bdf8', glow: 'rgba(56, 189, 248, 0.5)', text: '#38bdf8' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.2)', border: '#64748b', glow: 'rgba(100, 116, 139, 0.3)', text: '#94a3b8' };
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', position: 'relative' }}>
      {/* Header and Filter Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(168, 85, 247, 0.15)',
              color: 'var(--accent-purple)',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={16} />
            MODULE 3: INTERACTIVE MONEY-FLOW GRAPH
          </div>
          <span className="badge badge-emerald">Neo4j Multi-Hop Active</span>
        </div>

        {/* Graph Controls Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Depth filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span>Max Hops:</span>
            <input
              type="range"
              min="1"
              max="5"
              value={maxHopFilter}
              onChange={(e) => setMaxHopFilter(Number(e.target.value))}
              style={{ width: '80px', accentColor: 'var(--accent-cyan)' }}
            />
            <span className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
              {maxHopFilter}
            </span>
          </div>

          {/* Min-Cut Toggle */}
          <button
            onClick={() => setHighlightMinCut(!highlightMinCut)}
            className={`btn ${highlightMinCut ? 'btn-hazard' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            <Target size={14} />
            Min-Cut Bottleneck: {highlightMinCut ? 'ON' : 'OFF'}
          </button>

          {/* Zoom controls */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px', borderRadius: '8px' }}>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="btn btn-secondary"
              style={{ padding: '6px 10px' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
              className="btn btn-secondary"
              style={{ padding: '6px 10px' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="btn btn-secondary"
              style={{ padding: '6px 10px' }}
              title="Reset Zoom"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '520px',
          overflow: 'auto',
          background: 'radial-gradient(ellipse at center, rgba(13, 21, 39, 0.95) 0%, rgba(6, 10, 20, 0.98) 100%)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
        }}
      >
        <svg
          width={1300 * zoomLevel}
          height={500 * zoomLevel}
          viewBox="0 0 1300 500"
          style={{ minWidth: '100%', minHeight: '100%', display: 'block' }}
        >
          <defs>
            {/* Standard Edge Arrow */}
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>

            {/* Critical Min-Cut Edge Arrow */}
            <marker id="arrow-hazard" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>

            {/* Glowing filter */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hop Column Guides */}
          {[
            { label: 'Hop 0: Victim Source', x: 80 },
            { label: 'Hop 1: Suspect Collector', x: 290 },
            { label: 'Hop 2-3: Layering / Peel', x: 600 },
            { label: 'Hop 4: Exchange Deposit', x: 920 },
            { label: 'Hop 5: Hot Omnibus Vault', x: 1140 },
          ].map((col, idx) => (
            <g key={idx} opacity="0.45">
              <line x1={col.x} y1="30" x2={col.x} y2="480" stroke="rgba(56, 189, 248, 0.15)" strokeDasharray="4 4" />
              <text x={col.x} y="22" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
                {col.label}
              </text>
            </g>
          ))}

          {/* Render Transaction Edges */}
          {visibleEdges.map((edge) => {
            const sourceNode = visibleNodes.find((n) => n.id === edge.from);
            const targetNode = visibleNodes.find((n) => n.id === edge.to);
            if (!sourceNode || !targetNode) return null;

            const x1 = sourceNode.x || 100;
            const y1 = sourceNode.y || 250;
            const x2 = targetNode.x || 300;
            const y2 = targetNode.y || 250;

            const isBottleneck = edge.isBottleneckEdge && highlightMinCut;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2 - 12;

            return (
              <g key={edge.id} className="graph-edge">
                {/* Connection Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isBottleneck ? '#ef4444' : 'rgba(56, 189, 248, 0.45)'}
                  strokeWidth={isBottleneck ? 3.5 : 2}
                  strokeDasharray={isBottleneck ? '6 4' : 'none'}
                  markerEnd={isBottleneck ? 'url(#arrow-hazard)' : 'url(#arrow)'}
                />

                {/* Transfer Value Badge on Edge */}
                <g transform={`translate(${cx}, ${cy})`}>
                  <rect
                    x="-65"
                    y="-12"
                    width="130"
                    height="24"
                    rx="6"
                    fill={isBottleneck ? 'rgba(239, 68, 68, 0.9)' : 'rgba(15, 23, 42, 0.9)'}
                    stroke={isBottleneck ? '#fca5a5' : 'rgba(56, 189, 248, 0.3)'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={isBottleneck ? '#ffffff' : '#e2e8f0'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                  >
                    {edge.amount.toLocaleString()} {edge.currency} (${edge.usdValue.toLocaleString()})
                  </text>
                </g>
              </g>
            );
          })}

          {/* Render Wallet Nodes */}
          {visibleNodes.map((node) => {
            const x = node.x || 150;
            const y = node.y || 250;
            const colors = getNodeColor(node.type);
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const isMinCutTarget = node.isMinCutTarget && highlightMinCut;

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Min-Cut Pulsing Halo */}
                {isMinCutTarget && (
                  <circle
                    r="44"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="pulse-halo"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Node Outer Circle */}
                <circle
                  r={isSelected ? 34 : 28}
                  fill={colors.bg}
                  stroke={isSelected ? '#00f2fe' : colors.border}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{
                    filter: isSelected ? 'url(#glow-cyan)' : isMinCutTarget ? 'url(#glow-red)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                />

                {/* Inner Icon / Badge */}
                <circle r="14" fill={colors.border} opacity="0.3" />

                {/* Node Label Text */}
                <text
                  x="0"
                  y="42"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-sans)"
                >
                  {node.label.length > 24 ? node.label.slice(0, 22) + '...' : node.label}
                </text>

                {/* Short Address */}
                <text
                  x="0"
                  y="55"
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                >
                  {node.address.slice(0, 6)}...{node.address.slice(-4)}
                </text>

                {/* Risk Score Pill */}
                <g transform="translate(0, -32)">
                  <rect
                    x="-18"
                    y="-9"
                    width="36"
                    height="16"
                    rx="4"
                    fill={node.riskScore > 75 ? '#dc2626' : node.riskScore > 40 ? '#d97706' : '#059669'}
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="800"
                    fontFamily="var(--font-mono)"
                  >
                    {node.riskScore}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(10, 16, 32, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '12px',
            fontSize: '11px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <span>Victim</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <span>Collector (Suspect)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }} />
            <span>Intermediary / Mule</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ec4899' }} />
            <span>Peel Slicing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            <span>Exchange Deposit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8' }} />
            <span>VASP Omnibus Vault</span>
          </div>
        </div>
      </div>

      {/* Node Deep Dive Inspector Drawer */}
      {selectedNode && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--accent-cyan)',
            boxShadow: '0 8px 30px rgba(0, 242, 254, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={`badge ${selectedNode.riskScore > 75 ? 'badge-hazard' : selectedNode.riskScore > 40 ? 'badge-amber' : 'badge-emerald'}`}>
                Risk {selectedNode.riskLevel} ({selectedNode.riskScore}/100)
              </span>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedNode.label}
              </h3>
              <span className="badge badge-cyan">{selectedNode.network}</span>
            </div>

            <button
              onClick={() => onTriggerFreeze(selectedNode)}
              className="btn btn-hazard"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              <ShieldAlert size={14} />
              Draft BNSS Sec 107 Freeze Order
            </button>
          </div>

          {/* Address & Copy Bar */}
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(10, 16, 32, 0.8)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>ADDRESS:</span>
              <span className="font-mono" style={{ fontSize: '12.5px', color: 'var(--accent-cyan)', wordBreak: 'break-all' }}>
                {selectedNode.address}
              </span>
            </div>

            <button
              onClick={() => handleCopy(selectedNode.address)}
              className="btn btn-secondary"
              style={{ padding: '4px 8px', fontSize: '11px' }}
            >
              {copiedAddress === selectedNode.address ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              {copiedAddress === selectedNode.address ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Node Forensic Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px', marginBottom: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>On-Chain Balance</div>
              <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedNode.balance.toLocaleString()} {selectedNode.currency}
              </div>
            </div>

            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Received</div>
              <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {selectedNode.totalReceived.toLocaleString()} {selectedNode.currency}
              </div>
            </div>

            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>OddBall Anomaly Score</div>
              <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: selectedNode.oddBallScore > 0.7 ? '#ef4444' : '#10b981' }}>
                {selectedNode.oddBallScore} (Akoglu et al.)
              </div>
            </div>

            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Burst Velocity Score</div>
              <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: selectedNode.burstScore > 0.8 ? '#ef4444' : '#f59e0b' }}>
                {selectedNode.burstScore} (Rapid Hop)
              </div>
            </div>
          </div>

          {/* Triggered Typologies */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>TYPOLOGY TRIGGERS:</span>
            {selectedNode.typologies.map((t, idx) => (
              <span key={idx} className="badge badge-purple" style={{ fontSize: '10.5px' }}>
                <Zap size={11} />
                {t}
              </span>
            ))}
            {selectedNode.attributedEntity && (
              <span className="badge badge-emerald" style={{ fontSize: '10.5px' }}>
                VASP: {selectedNode.attributedEntity}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
