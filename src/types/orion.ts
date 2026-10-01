export type BlockchainNetwork = 'TRON' | 'ETHEREUM' | 'BITCOIN' | 'POLYGON' | 'ARBITRUM' | 'SOLANA';

export type NodeType = 
  | 'VICTIM' 
  | 'COLLECTOR' 
  | 'INTERMEDIARY' 
  | 'PEEL_NODE' 
  | 'MIXER_BRIDGE' 
  | 'EXCHANGE_DEPOSIT' 
  | 'EXCHANGE_CLUSTER';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface WalletNode {
  id: string;
  address: string;
  network: BlockchainNetwork;
  type: NodeType;
  label: string;
  balance: number;
  totalReceived: number;
  currency: string;
  txCount: number;
  hop: number;
  firstSeen: string;
  lastSeen: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  typologies: string[];
  oddBallScore: number; // Anomaly score 0 - 1
  burstScore: number; // Temporal velocity score
  clusterId?: string;
  attributedEntity?: string;
  isMinCutTarget?: boolean;
  x?: number;
  y?: number;
}

export interface TransactionEdge {
  id: string;
  from: string;
  to: string;
  txHash: string;
  amount: number;
  currency: string;
  usdValue: number;
  timestamp: string;
  hop: number;
  gasFee?: number;
  network: BlockchainNetwork;
  isBottleneckEdge?: boolean;
  method?: string; // e.g., 'Transfer', 'BridgeDeposit', 'MixerDeposit'
}

export interface LaunderingTypologyMatch {
  ruleId: string;
  name: string;
  detected: boolean;
  confidence: number;
  description: string;
  affectedNodes: string[];
  indicators: string[];
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
}

export interface VaspAttributionResult {
  exchangeName: string;
  depositAddress: string;
  hotWalletAddress: string;
  confidence: number; // percentage, e.g. 96.8
  confidenceTier: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  fiuRegistrationNumber: string;
  jurisdiction: string;
  complianceStatus: 'FIU-IND Registered & Compliant' | 'Offshore / Non-Compliant' | 'Partially Responsive';
  nodalOfficerContact: string;
  lersPortalUrl: string;
  ladderStage: 'Stage 3: Graph-Aware XGBoost + Label DB' | 'Stage 2: Clustering Heuristic' | 'Stage 1: Direct Rule';
  supportingSignals: {
    coSpendMatch: boolean;
    depositConsolidationSweepTx: string;
    labelProvenance: string;
    clusterWalletCount: number;
  };
}

export interface MinCutSolution {
  targetWallets: WalletNode[];
  targetEdges: TransactionEdge[];
  blockedAmountUsd: number;
  percentFundsPreserved: number;
  requiredFreezesCount: number;
  bottleneckExplanation: string;
}

export interface ComplaintData {
  complaintId: string;
  portalSource: 'NCRP (1930)' | 'SAHYOG (I4C)' | 'STATE_CYBER_CELL' | 'DIRECT_LEAD';
  reportedWallet: string;
  network: BlockchainNetwork;
  reportedAmount: number;
  currency: string;
  inrEquivalent: number;
  category: 'Task-Based Fraud' | 'Investment Scam / Pig Butchering' | 'Digital Arrest / Extortion' | 'Sextortion' | 'Phishing / Malware' | 'Ransomware';
  incidentDate: string;
  victimName: string;
  policeStationJurisdiction: string;
  state: string;
  assignedOfficer: string;
  officerBadge: string;
  goldenHourDeadline: string; // ISO string
}

export interface CaseData {
  complaint: ComplaintData;
  nodes: WalletNode[];
  edges: TransactionEdge[];
  typologies: LaunderingTypologyMatch[];
  attribution: VaspAttributionResult;
  minCut: MinCutSolution;
  xgboostFeatures: {
    featureName: string;
    impact: number; // SHAP value
    description: string;
  }[];
}
