# ORION: Real-Time Crypto Fraud Attribution & Fast-Freeze Platform
### Smart India Hackathon 2026 | Problem Statement ID: SIH26183
**Organization**: Ministry of Home Affairs, Government of India  
**Department**: Indian Cyber Crime Coordination Centre (I4C), Cyber & Information Security (CIS) Division  
**Category**: Software | **Theme**: Blockchain & Cybersecurity  

---

## 🌟 Executive Summary

Cyber-fraud victims (investment scams, task-based fraud, sextortion, ransomware, digital arrest impersonation) report the cryptocurrency wallet addresses that fraudsters used to collect funds. State cyber crime cells and district cyber police stations need to rapidly identify **which cryptocurrency exchange or Virtual Asset Service Provider (VASP)** received the funds—because only the exchange has custody of the assets, can freeze accounts, and possess KYC records.

Today, this process is performed via manual blockchain explorer lookups taking days or weeks, while funds are laundered across multi-chain hops, bridges, and mixers into off-ramps within minutes.

**ORION** is a real-time crypto fraud attribution and fast-freeze platform built strictly according to the architecture outlined in the SIH26183 project proposal. It ingests reported suspect wallet addresses, traces multi-chain transactions, detects laundering typologies, clusters exchange wallets, attributes the nearest VASP with confidence scoring, and generates **Section 107 BNSS 2023** emergency freeze notices within the **Golden Hour**.

---

## 🚀 Key Modules Implemented

| Module | Core Functionality | Standards / Algorithms |
| :--- | :--- | :--- |
| **Module 1: Complaint Ingestion** | Ingestion of suspect wallet addresses from NCRP (1930) & SAHYOG (I4C) API or manual officer entry; multi-chain address checksum validation; repeat report deduplication; cross-case linking. | TRON (TRC-20), Ethereum (ERC-20), Bitcoin UTXO, Arbitrum L2, Polygon |
| **Module 2: Multi-Chain Indexing & Tracing** | Multi-hop forward tracing with configurable depth, threshold filtering, and cross-chain bridge event matching (Hop Protocol, Stargate). | Graph Traversal, Time-Window Bucketing |
| **Module 3: Wallet Transaction Graph** | Interactive visualization of fund movement from Victim &rarr; Collector &rarr; Layering Mules &rarr; Peel Commission &rarr; Exchange Deposit &rarr; Hot Omnibus Vault. | Cytoscape/SVG Canvas, Node Inspector Drawer |
| **Module 4: Typology & Intermediary Detection** | 7 Typology detectors (Fan-in, Scatter, Layering, Peel chain, Mixer/Bridge hop, Burner wallet, Circular flow) + Egonet Anomaly Scoring + Temporal Burst timing. | **Akoglu et al. (PAKDD 2010) OddBall Engine**, Temporal Velocity, Graph-Aware XGBoost SHAP |
| **Module 5: Exchange / VASP Attribution** | 3-stage attribution ladder: Heuristics &rarr; Co-spend Clustering &rarr; XGBoost ML + FIU-IND Registry Ground Truth. | **Meiklejohn et al. (IMC 2013)**, FIU-IND PMLA compliance |
| **Module 6: Actions, Min-Cut & Legal Notices** | Max-Flow/Min-Cut graph bottleneck optimizer; 1-click **Section 107 BNSS 2023** statutory freeze orders; **BSA 2023 Section 63** forensic investigation reports. | Ford-Fulkerson Min-Cut, BNSS 2023, BSA 2023, PMLA 2002 |

---

## ⚡ Deployment to Vercel

The project is structured as a zero-configuration Next.js App Router application ready for deployment on **Vercel**:

### Option 1: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub / GitLab / Bitbucket
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ORION SIH26183 prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/orion-sih26183.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

### Production Build Verification
```bash
npm run build
npm run start
```

---

## ⚖️ Legal & Statutory Adherence

- **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023**: Section 107 emergency freeze notices issued to registered VASPs to preserve suspect funds.
- **Bharatiya Sakshya Adhiniyam (BSA), 2023**: Section 63 Certificate of Electronic Evidence ensuring admissibility of on-chain transaction hashes, timestamps, and cluster provenance in Indian courts.
- **Prevention of Money Laundering Act (PMLA), 2002**: Section 12 compliance integration for Virtual Digital Asset (VDA) reporting entities registered with FIU-IND.
- **Digital Personal Data Protection (DPDP) Act, 2023**: Lawful data handling, role-based access, and automated hash pseudonymization.
- **No Autonomous Action**: ORION recommends the optimal freeze cut; the authorized law enforcement officer reviews and issues the order.

---

## 📚 References & Academic Citations

1. **Akoglu, L., McGlohon, M., & Faloutsos, C. (2010)**. *"OddBall: Spotting Anomalies in Weighted Graphs."* PAKDD.
2. **Meiklejohn, S. et al. (2013)**. *"A Fistful of Bitcoins: Characterizing Payments Among Men with No Names."* ACM IMC.
3. **Weber, M. et al. (2019)**. *"Anti-Money Laundering in Bitcoin: Experimenting with Graph Convolutional Networks for Financial Forensics."* KDD / Elliptic.
4. **FATF Guidance on Virtual Assets and VASPs (2021)**: Red flag indicators and laundering typologies for virtual assets.
