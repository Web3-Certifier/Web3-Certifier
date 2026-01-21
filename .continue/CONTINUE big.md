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

---

## 2. Getting Started

### Prerequisites
- **Node.js** >= v18.17 (v23+ for AI agent)
- **Yarn** v3.2.3 (package manager)
- **pnpm** (for AI agent package)
- **Git**
- **Foundry** (for smart contract development)
- **Python** 2.7+ (for some build tools)
- **WSL 2** (required for Windows users)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd web3-certifier

# Install dependencies (from root)
yarn install

# Set up environment files
cp packages/nextjs/.env.example packages/nextjs/.env
cp packages/foundry/.env.example packages/foundry/.env
cp packages/agent/.env.example packages/agent/.env
```

### Running the Application

#### Frontend (Next.js)
```bash
# From root directory
yarn start
# Or
yarn workspace @se-2/nextjs dev
```

#### Smart Contract Development
```bash
# Compile contracts
yarn compile

# Run tests
yarn test
# Or with fork
cd packages/foundry && make fork-celo

# Deploy to Sepolia
cd packages/foundry && make deploy-sepolia

# Deploy to Celo
cd packages/foundry && make deploy-celo
```

#### AI Agent
```bash
cd packages/agent
pnpm install
pnpm build
pnpm start
```

---

## 3. Project Structure

### Root Directory
```
/
├── package.json          # Monorepo configuration with Yarn workspaces
├── .yarnrc.yml           # Yarn configuration
├── README.md             # Project documentation
└── packages/             # All packages
    ├── nextjs/           # Frontend application
    ├── foundry/          # Smart contracts
    ├── the-graph/        # Subgraph for indexing
    └── agent/            # AI Discord bot
```

### packages/nextjs/ (Frontend)
```
nextjs/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   ├── docs/             # Documentation pages
│   ├── exam_page/        # Exam taking interface
│   ├── organize_exams/   # Exam creation for certifiers
│   ├── search_exams/     # Exam discovery
│   ├── rewards/          # Reward claiming
│   ├── xp_prizes/        # XP-based prizes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
│   ├── scaffold-eth/     # Scaffold-ETH components
│   └── ui/               # UI primitives
├── contracts/            # Generated contract ABIs
├── hooks/                # Custom React hooks
│   ├── scaffold-eth/     # Scaffold-ETH hooks
│   └── wagmi/            # Wagmi hooks
├── services/             # External services
│   ├── ipfs.tsx          # IPFS integration
│   ├── mongodb.ts        # MongoDB connection
│   ├── store/            # Zustand stores
│   └── web3/             # Web3 utilities
├── scaffold.config.ts    # Network configuration
├── tailwind.config.js    # Tailwind configuration
└── theme/                # Chakra UI theme
```

### packages/foundry/ (Smart Contracts)
```
foundry/
├── contracts/            # Solidity contracts
│   ├── Certifier.sol     # Main certification contract (UUPS upgradeable)
│   ├── Reward.sol        # Reward distribution contract
│   ├── RewardFactory.sol # Factory for creating rewards
│   ├── XpPrizes.sol      # XP-based prize system
│   ├── interfaces/       # Contract interfaces
│   └── lib/              # Helper libraries (PriceConverter)
├── script/               # Deployment scripts
│   ├── Deploy.s.sol      # Main deployment
│   ├── Certifier/        # Certifier-specific scripts
│   ├── Reward/           # Reward deployment scripts
│   ├── RewardFactory/    # Factory scripts
│   └── XpPrizes/         # XP prizes deployment
├── test/                 # Contract tests
├── deployments/          # Deployment artifacts (by chain ID)
├── broadcast/            # Transaction broadcasts
├── Makefile              # Build and deploy commands
└── foundry.toml          # Foundry configuration
```

### packages/the-graph/ (Subgraph)
```
the-graph/
└── certifier-celo/       # Celo subgraph
    ├── subgraph.yaml     # Subgraph manifest
    ├── schema.graphql    # GraphQL schema (if exists)
    ├── src/              # Mapping handlers
    └── abis/             # Contract ABIs
```

### packages/agent/ (AI Bot)
```
agent/
├── src/                  # Agent source code
├── characters/           # Character configurations
│   └── eliza.character.json
├── web3certifier/        # Custom Web3 Certifier integrations
├── docker-compose.yaml   # Docker configuration
└── Dockerfile            # Container build
```

---

## 4. Development Workflow

### Coding Standards

#### TypeScript/React
- Use functional components with hooks
- Prefer named exports
- Use TypeScript strict mode
- Follow Prettier configuration (`.prettierrc.json`)
- ESLint rules defined in `.eslintrc.json`

#### Solidity
- Solidity version: `^0.8.24`
- Use OpenZeppelin contracts for standard implementations
- Follow NatSpec documentation format
- Use custom errors instead of require strings
- Prefix storage variables with `s_`, immutables with `i_`
- Use UUPS proxy pattern for upgradeable contracts

### Testing

#### Smart Contract Tests
```bash
# Run all tests
yarn test

# Run specific test file
forge test --match-contract CertifierTest

# Run with fork
make fork-sepolia
make fork-celo

# Test XP Prizes specifically
make test-xp-prizes
```

#### Frontend
```bash
yarn next:lint        # Lint check
yarn next:check-types # TypeScript check
```

### Build & Deployment

#### Smart Contracts
```bash
# Build
yarn compile
# Or
cd packages/foundry && make build

# Deploy Certifier/RewardFactory
make deploy-sepolia
make deploy-celo

# Deploy Reward contract
make deploy-reward-sepolia
make deploy-reward-celo

# Deploy XP Prizes
make deploy-xp-prizes-sepolia
make deploy-xp-prizes-celo
```

#### Frontend
```bash
yarn next:build       # Production build
yarn vercel           # Deploy to Vercel
```

#### Subgraph
```bash
cd packages/the-graph/certifier-celo
graph codegen
graph build
graph deploy certifier-celo-implementation
```

### Git Workflow
- Husky pre-commit hooks enabled
- lint-staged for automatic formatting
- Run `yarn precommit` before committing

---

## 5. Key Concepts

### Domain Terminology
- **Certifier**: An organization/individual who creates exams
- **Exam**: A set of questions with a passing score requirement
- **Certificate**: NFT (ERC721) awarded upon passing an exam
- **Reward**: Token distribution for exam completion
- **XP (Experience Points)**: Points earned for completing exams

### Core Smart Contract Abstractions

#### Certifier.sol (Main Contract)
- **UUPS Upgradeable** proxy pattern
- **ERC721** for NFT certificates
- **Exam Lifecycle**:
  1. `Open` - Users can submit answers
  2. `UnderCorrection` - Certifier grades exams
  3. `Corrected` - Users can claim certificates
  4. `Cancelled` - Refunds available (if not corrected in time)

#### Reward.sol
- **Distribution Types**:
  - `CONSTANT` - Fixed amount per user
  - `UNIFORM` - Total divided by participants
  - `DRAW` - Lottery-style single winner
  - `CUSTOM` - External contract logic

- **Eligibility Types**:
  - `NONE` - Anyone who passed
  - `HOLDS_TOKEN` - Must hold specific ERC20
  - `HOLDS_NFT` - Must hold specific ERC721
  - `CUSTOM` - External contract logic

#### XpPrizes.sol
- Tiered rewards based on accumulated XP
- Time-limited claiming period
- Milestone-based prizes (10, 25, 50, 75, 100 XP)

### Design Patterns Used
- **Factory Pattern**: `RewardFactory` creates `Reward` contracts
- **Proxy Pattern**: UUPS for upgradeable Certifier
- **Commit-Reveal**: Hashed answers prevent frontrunning
- **Pull Payment**: Users claim rewards (not pushed)

---

## 6. Common Tasks

### Creating a New Exam (Frontend)
1. Navigate to `/organize_exams`
2. Fill in exam details (name, description, questions)
3. Set pricing and passing score
4. Pay creation fee and submit transaction

### Taking an Exam (User Flow)
1. Browse exams at `/search_exams`
2. Select exam and pay submission fee
3. Submit hashed answers (commit phase)
4. Wait for correction period
5. Claim NFT certificate at `/exam_page`

### Adding a New Smart Contract
1. Create contract in `packages/foundry/contracts/`
2. Add deployment script in `packages/foundry/script/`
3. Add Makefile target for deployment
4. Run `make build` to compile
5. Deploy and verify on target network
6. Run `yarn compile` to generate TypeScript ABIs

### Updating the Subgraph
1. Update schema in `packages/the-graph/certifier-celo/`
2. Update mapping handlers
3. Run `graph codegen && graph build`
4. Deploy with `graph deploy`

### Adding a New Frontend Page
1. Create directory in `packages/nextjs/app/`
2. Add `page.tsx` for the route
3. Use existing components from `components/`
4. Add API route in `app/api/` if needed

---

## 7. Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules packages/*/node_modules
yarn install
```

#### Foundry compilation errors
```bash
# Update dependencies
forge install
# Clean and rebuild
forge clean && make build
```

#### Contract verification failing
- Ensure correct compiler version (0.8.24)
- Use `--via-ir` flag
- Check API key is set in `.env`

#### Subgraph sync issues
- Verify contract address matches proxy (not implementation)
- Check startBlock is correct
- Review mapping handler errors in Graph Studio

#### AI Agent not starting
- Ensure Node.js v23+
- Check all required env variables are set
- Verify Discord bot token is valid

### Debugging Tips
- Use `forge test -vvvv` for verbose contract output
- Check browser console for frontend errors
- Use The Graph Studio for subgraph debugging
- Enable debug logging in agent with `DEBUG=*`

---

## 8. References

### External Documentation
- [Foundry Book](https://book.getfoundry.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh/)
- [The Graph Documentation](https://thegraph.com/docs/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Celo Documentation](https://docs.celo.org/)

### Deployed Contracts
- **Celo Mainnet** (Chain ID: 42220): See `packages/foundry/deployments/42220.json`
- **Sepolia Testnet** (Chain ID: 11155111): See `packages/foundry/deployments/11155111.json`
- **Arbitrum** (Chain ID: 42161): See `packages/foundry/deployments/42161.json`

### Important Links
- [GoodDollar](https://www.gooddollar.org/) - Partner integration
- [Karma GAP](https://gap.karmahq.xyz/) - Partner integration
- [Ubeswap](https://ubeswap.org/) - Partner integration

### Network Configuration
Networks are configured in `packages/nextjs/scaffold.config.ts`:
- Celo (primary production)
- Sepolia (testing)
- Arbitrum (supported)

---

## Notes for Contributors

> **NEEDS VERIFICATION**: Some sections may need updates as the project evolves. Please verify:
> - Current deployment addresses
> - API endpoint configurations
> - Environment variable requirements

When making changes:
1. Follow existing code patterns
2. Add tests for new functionality
3. Update this documentation if needed
4. Run linting before committing
