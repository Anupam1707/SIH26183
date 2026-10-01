import { BlockchainNetwork, CaseData, WalletNode, TransactionEdge, MinCutSolution, VaspAttributionResult, LaunderingTypologyMatch } from '../types/orion';

export function validateWalletAddress(address: string, network: BlockchainNetwork): { valid: boolean; message: string } {
  const trimmed = address.trim();
  if (!trimmed) {
    return { valid: false, message: 'Wallet address cannot be empty.' };
  }

  switch (network) {
    case 'TRON':
      if (/^T[1-9A-HJ-NP-za-km-z]{33}$/.test(trimmed)) {
        return { valid: true, message: 'Valid TRON base58 address format.' };
      }
      return { valid: false, message: 'Invalid TRON address. Must start with "T" and be 34 characters (base58).' };

    case 'ETHEREUM':
    case 'POLYGON':
    case 'ARBITRUM':
      if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
        return { valid: true, message: `Valid ${network} EVM address format.` };
      }
      return { valid: false, message: `Invalid ${network} address. Must be a 42-character hex string starting with 0x.` };

    case 'BITCOIN':
      if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(trimmed)) {
        return { valid: true, message: 'Valid Bitcoin address format (Legacy, P2SH, or Bech32).' };
      }
      return { valid: false, message: 'Invalid Bitcoin address. Must start with 1, 3, or bc1.' };

    case 'SOLANA':
      if (/^[1-9A-HJ-NP-za-km-z]{32,44}$/.test(trimmed)) {
        return { valid: true, message: 'Valid Solana base58 address.' };
      }
      return { valid: false, message: 'Invalid Solana base58 public key.' };

    default:
      return { valid: true, message: 'Address accepted.' };
  }
}

/**
 * Calculates OddBall Egonet Anomaly Score (Akoglu et al., 2010)
 * Uses power law relationship: W ~ N^theta
 */
export function calculateOddBallScore(degree: number, totalWeight: number): number {
  if (degree <= 1) return 0.15;
  const expectedLogW = 1.15 * Math.log10(degree) + 0.5;
  const actualLogW = Math.log10(Math.max(totalWeight, 1));
  const deviation = Math.abs(actualLogW - expectedLogW);
  // Normalize into 0 - 1 score
  return Math.min(1, Math.max(0.05, deviation / 2.5));
}

/**
 * Procedurally generates a full investigation graph for custom user wallet addresses
 */
export function generateProceduralInvestigation(
  walletAddress: string,
  network: BlockchainNetwork,
  complaintId: string,
  reportedAmount: number,
  currency: string,
  category: any
): CaseData {
  const shortAddr = walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4);
  const now = new Date();
  const txTime1 = new Date(now.getTime() - 48 * 60000).toISOString().replace('T', ' ').slice(0, 19);
  const txTime2 = new Date(now.getTime() - 32 * 60000).toISOString().replace('T', ' ').slice(0, 19);
  const txTime3 = new Date(now.getTime() - 15 * 60000).toISOString().replace('T', ' ').slice(0, 19);
  const txTime4 = new Date(now.getTime() - 8 * 60000).toISOString().replace('T', ' ').slice(0, 19);

  // Generate plausible intermediary addresses based on chain
  const isTron = network === 'TRON';
  const isBtc = network === 'BITCOIN';

  const victimAddr = isTron ? 'TW11kLz88vN99qQ2210LkM33vPp44Zz' : isBtc ? 'bc1qvictim7749204018485720491823' : '0x99A1901B8c9082348576101928475819';
  const mule1Addr = isTron ? 'TL44bVx99pZ11mQ44kL88vN91pQ00Xy' : isBtc ? 'bc1qmule889201948572019485720194' : '0x33B10984C01982736458192083746591';
  const peelAddr = isTron ? 'TC77pZ11mQ44kL88vN91pQ00Xy77vN11' : isBtc ? 'bc1qpeel110294857201948572019485' : '0x77F18293049182736451928374659102';
  const mule2Addr = isTron ? 'TY88vN91pQ00Xy77vN11TL44bVx99pZ1' : isBtc ? 'bc1qaggregator992019485720194857' : '0xAA881928374659102938475610293847';
  const depAddr = isTron ? 'TFsV25LkPz88vN99qQ2210LkM33vPp44Zz' : isBtc ? '1KuCoinDep8872NzkQopXmm29kPqZa110vB' : '0x88910123456789abcdef0123456789abcdef0123';
  const hotAddr = isTron ? 'TAUN6FwrnwwmaEqYcckffC7wYmbaGhPMrG' : isBtc ? '3KuCoinHotWalletOmnibusVault9988112' : '0x1000000000000000000000000000000000000001';

  const exchangeName = isTron ? 'Binance' : isBtc ? 'KuCoin' : 'CoinDCX';
  const fiuReg = isTron ? 'FIU-IND-VASP-2024-0019' : isBtc ? 'FIU-IND-VASP-2024-0071' : 'FIU-IND-VASP-2023-0004';
  const inrEq = reportedAmount * (currency === 'USDT' ? 84 : currency === 'ETH' ? 280000 : currency === 'BTC' ? 5700000 : 100);

  const peelAmount = +(reportedAmount * 0.06).toFixed(4);
  const remainingAmount = +(reportedAmount - peelAmount).toFixed(4);

  const nodes: WalletNode[] = [
    {
      id: 'node-victim',
      address: victimAddr,
      network,
      type: 'VICTIM',
      label: 'Victim Reported Origin',
      balance: +(reportedAmount * 0.02).toFixed(2),
      totalReceived: reportedAmount,
      currency,
      txCount: 2,
      hop: 0,
      firstSeen: txTime1,
      lastSeen: txTime1,
      riskScore: 10,
      riskLevel: 'LOW',
      typologies: ['Victim Origin'],
      oddBallScore: 0.08,
      burstScore: 0.12,
      x: 80,
      y: 250,
    },
    {
      id: 'node-collector',
      address: walletAddress,
      network,
      type: 'COLLECTOR',
      label: `Suspect Collector (${shortAddr})`,
      balance: +(reportedAmount * 0.05).toFixed(2),
      totalReceived: reportedAmount,
      currency,
      txCount: 9,
      hop: 1,
      firstSeen: txTime1,
      lastSeen: txTime2,
      riskScore: 95,
      riskLevel: 'CRITICAL',
      typologies: ['Suspect Collector Ingress', 'Rapid Outflow'],
      oddBallScore: 0.89,
      burstScore: 0.94,
      clusterId: `CLUSTER-${walletAddress.slice(2, 6).toUpperCase()}`,
      x: 290,
      y: 250,
    },
    {
      id: 'node-mule-1',
      address: mule1Addr,
      network,
      type: 'INTERMEDIARY',
      label: 'Layering Hop #1 (Mule)',
      balance: +(reportedAmount * 0.01).toFixed(2),
      totalReceived: reportedAmount,
      currency,
      txCount: 4,
      hop: 2,
      firstSeen: txTime2,
      lastSeen: txTime3,
      riskScore: 88,
      riskLevel: 'HIGH',
      typologies: ['Pass-Through Layering'],
      oddBallScore: 0.74,
      burstScore: 0.91,
      x: 520,
      y: 200,
    },
    {
      id: 'node-peel',
      address: peelAddr,
      network,
      type: 'PEEL_NODE',
      label: `Peel Cut (${peelAmount} ${currency})`,
      balance: peelAmount,
      totalReceived: peelAmount,
      currency,
      txCount: 1,
      hop: 3,
      firstSeen: txTime3,
      lastSeen: txTime3,
      riskScore: 78,
      riskLevel: 'HIGH',
      typologies: ['Peel Chain Commmission'],
      oddBallScore: 0.65,
      burstScore: 0.44,
      x: 720,
      y: 110,
    },
    {
      id: 'node-mule-2',
      address: mule2Addr,
      network,
      type: 'INTERMEDIARY',
      label: 'Intermediary Aggregator',
      balance: +(remainingAmount * 0.01).toFixed(2),
      totalReceived: remainingAmount,
      currency,
      txCount: 5,
      hop: 3,
      firstSeen: txTime3,
      lastSeen: txTime4,
      riskScore: 92,
      riskLevel: 'CRITICAL',
      typologies: ['High Velocity Funnel'],
      oddBallScore: 0.85,
      burstScore: 0.89,
      x: 720,
      y: 320,
    },
    {
      id: 'node-deposit',
      address: depAddr,
      network,
      type: 'EXCHANGE_DEPOSIT',
      label: `${exchangeName} Deposit Address`,
      balance: remainingAmount,
      totalReceived: remainingAmount,
      currency,
      txCount: 2,
      hop: 4,
      firstSeen: txTime4,
      lastSeen: txTime4,
      riskScore: 98,
      riskLevel: 'CRITICAL',
      typologies: ['Attributed VASP Deposit Point', 'Critical Freeze Bottleneck'],
      oddBallScore: 0.96,
      burstScore: 0.98,
      clusterId: `${exchangeName.toUpperCase()}-DEPOSIT-CLUSTER`,
      attributedEntity: `${exchangeName} (FIU-IND Registered)`,
      isMinCutTarget: true,
      x: 940,
      y: 320,
    },
    {
      id: 'node-hot',
      address: hotAddr,
      network,
      type: 'EXCHANGE_CLUSTER',
      label: `${exchangeName} Hot Reserves Vault`,
      balance: 15400000,
      totalReceived: 890000000,
      currency,
      txCount: 920000,
      hop: 5,
      firstSeen: '2022-01-01 00:00',
      lastSeen: '2026-10-01 15:20',
      riskScore: 22,
      riskLevel: 'LOW',
      typologies: ['Known VASP Hot Vault'],
      oddBallScore: 0.04,
      burstScore: 0.99,
      clusterId: `${exchangeName.toUpperCase()}-HOT-VAULT`,
      attributedEntity: `${exchangeName} Reserves`,
      x: 1140,
      y: 320,
    },
  ];

  const edges: TransactionEdge[] = [
    {
      id: 'e-p1',
      from: 'node-victim',
      to: 'node-collector',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: reportedAmount,
      currency,
      usdValue: reportedAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: txTime1,
      hop: 1,
      network,
      method: 'Direct Fraud Transfer',
    },
    {
      id: 'e-p2',
      from: 'node-collector',
      to: 'node-mule-1',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: reportedAmount,
      currency,
      usdValue: reportedAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: txTime2,
      hop: 2,
      network,
      method: 'Pass-through Layering',
    },
    {
      id: 'e-p3',
      from: 'node-mule-1',
      to: 'node-peel',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: peelAmount,
      currency,
      usdValue: peelAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: txTime3,
      hop: 3,
      network,
      method: 'Peel Cut',
    },
    {
      id: 'e-p4',
      from: 'node-mule-1',
      to: 'node-mule-2',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: remainingAmount,
      currency,
      usdValue: remainingAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: txTime3,
      hop: 3,
      network,
      method: 'Remainder Forward',
    },
    {
      id: 'e-p5',
      from: 'node-mule-2',
      to: 'node-deposit',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: remainingAmount,
      currency,
      usdValue: remainingAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: txTime4,
      hop: 4,
      network,
      isBottleneckEdge: true,
      method: 'Exchange Ingress Transfer',
    },
    {
      id: 'e-p6',
      from: 'node-deposit',
      to: 'node-hot',
      txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      amount: remainingAmount,
      currency,
      usdValue: remainingAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      hop: 5,
      network,
      method: 'Internal Omnibus Sweep',
    },
  ];

  const typologies: LaunderingTypologyMatch[] = [
    {
      ruleId: 'TYP-01',
      name: 'Rapid Multi-Hop Layering',
      detected: true,
      confidence: 95,
      description: `Funds moved through 4 intermediary hops in under 45 minutes with >94% preservation ratio.`,
      affectedNodes: ['node-collector', 'node-mule-1', 'node-mule-2'],
      indicators: ['Dwell time delta < 15 mins per hop', 'Low wallet holding duration'],
      severity: 'CRITICAL',
    },
    {
      ruleId: 'TYP-04',
      name: 'Peel Chain Commission Slicing',
      detected: true,
      confidence: 91,
      description: `Peeling detected: ${peelAmount} ${currency} peeled to commission wallet while ${remainingAmount} ${currency} flowed to exchange.`,
      affectedNodes: ['node-mule-1', 'node-peel', 'node-mule-2'],
      indicators: ['Asymmetric split (6% vs 94%)', 'Peel node remains dormant'],
      severity: 'HIGH',
    },
    {
      ruleId: 'TYP-06',
      name: 'Temporary Burner Wallets',
      detected: true,
      confidence: 89,
      description: 'Intermediate addresses exhibit zero prior transaction history prior to this fraud incident.',
      affectedNodes: ['node-mule-1', 'node-peel'],
      indicators: ['Wallet age < 48 hours', 'All funds swept forward'],
      severity: 'HIGH',
    },
  ];

  const attribution: VaspAttributionResult = {
    exchangeName,
    depositAddress: depAddr,
    hotWalletAddress: hotAddr,
    confidence: 96.2,
    confidenceTier: 'VERY HIGH',
    fiuRegistrationNumber: fiuReg,
    jurisdiction: 'Registered Entity with FIU-IND (PMLA Section 12 Compliant)',
    complianceStatus: 'FIU-IND Registered & Compliant',
    nodalOfficerContact: `nodal-india@${exchangeName.toLowerCase()}.com / lawenforcement@${exchangeName.toLowerCase()}.com`,
    lersPortalUrl: `https://${exchangeName.toLowerCase()}.com/law-enforcement-request`,
    ladderStage: 'Stage 3: Graph-Aware XGBoost + Label DB',
    supportingSignals: {
      coSpendMatch: true,
      depositConsolidationSweepTx: edges[edges.length - 1].txHash,
      labelProvenance: `On-chain sweep heuristic matched to verified ${exchangeName} omnibus cold/hot address`,
      clusterWalletCount: 32000,
    },
  };

  const minCut: MinCutSolution = {
    targetWallets: [nodes.find(n => n.id === 'node-deposit')!],
    targetEdges: [edges.find(e => e.id === 'e-p5')!],
    blockedAmountUsd: +(remainingAmount * (currency === 'USDT' ? 1 : currency === 'ETH' ? 2800 : 67000)).toFixed(2),
    percentFundsPreserved: +((remainingAmount / reportedAmount) * 100).toFixed(1),
    requiredFreezesCount: 1,
    bottleneckExplanation: `Issuing 1 Section 107 BNSS freeze notice to ${exchangeName} for deposit address ${depAddr.slice(0, 10)}... captures ${remainingAmount} ${currency} before off-ramping.`,
  };

  return {
    complaint: {
      complaintId,
      portalSource: 'DIRECT_LEAD',
      reportedWallet: walletAddress,
      network,
      reportedAmount,
      currency,
      inrEquivalent: inrEq,
      category,
      incidentDate: now.toISOString(),
      victimName: 'Victim Citizen (Confidential)',
      policeStationJurisdiction: 'Central Cyber Crime Investigation Cell',
      state: 'New Delhi (I4C Lead)',
      assignedOfficer: 'Investigating Officer (I4C Desk)',
      officerBadge: 'I4C-CYB-LEAD',
      goldenHourDeadline: new Date(now.getTime() + 180 * 60000).toISOString(),
    },
    nodes,
    edges,
    typologies,
    attribution,
    minCut,
    xgboostFeatures: [
      { featureName: 'Sink Proximity (Hops to Exchange)', impact: +0.42, description: 'Direct hop to verified exchange deposit cluster' },
      { featureName: 'OddBall Egonet Weight vs Degree', impact: +0.27, description: 'Akoglu et al. power-law deviation on collector node' },
      { featureName: 'Temporal Dwell Velocity', impact: +0.18, description: 'Rapid pass-through in under 15 minutes' },
      { featureName: 'Peel Chain Remainder Asymmetry', impact: +0.13, description: 'UTXO / token split matches money mule commission model' },
    ],
  };
}
