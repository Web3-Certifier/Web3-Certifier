---
name: Web3 Certifier Project Guide
alwaysApply: true
---

# Web3 Certifier - Project Guide

## 1. Project Overview

### Description
Web3 Certifier is a **permissionless learn-to-earn platform** that enables Web3 protocols to efficiently reward users for their knowledge and on-chain activity. It's an open-source certification platform where users can take exams, earn NFT certificates, and receive token rewards based on their performance and blockchain activity.

### Key Technologies
- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS, DaisyUI, Chakra UI
- **Smart Contracts**: Solidity 0.8.24, Foundry, OpenZeppelin (upgradeable contracts)
- **Blockchain**: Celo (primary), Sepolia (testnet), with multi-chain support
- **Web3 Integration**: wagmi, viem, RainbowKit, thirdweb
- **Indexing**: The Graph (subgraph for Celo)
- **AI Agent**: Eliza framework with Discord integration
- **Database**: MongoDB (for off-chain data)
- **State Management**: Zustand

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         Monorepo (Yarn Workspaces)              │
├─────────────────┬─────────────────┬──────────────┬──────────────┤
│  packages/      │  packages/      │  packages/   │  packages/   │
│  nextjs/        │  foundry/       │  the-graph/  │  agent/      │
│  (Frontend)     │  (Contracts)    │  (Indexer)   │  (AI Bot)    │
└─────────────────┴─────────────────┴──────────────┴──────────────┘
```
