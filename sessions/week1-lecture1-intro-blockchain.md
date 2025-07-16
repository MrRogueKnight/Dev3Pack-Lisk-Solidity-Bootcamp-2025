# 🪙 Lisk Summer Bootcamp  

## Week 1, Lecture 1 – Introduction to Blockchain

---

## 📘 Introduction

In recent years, the term **blockchain** has exploded in popularity—often heard alongside buzzwords like Bitcoin, Ethereum, NFTs, and Web3. But what exactly is a blockchain, and why is it considered revolutionary?

This guide breaks down the concept of blockchain in the simplest way possible. Whether you’re a curious learner or a future Web3 developer, this article will help you understand the fundamentals of blockchain with clear examples, diagrams, and practical insights.

---

## ✅ What is Blockchain?

> **A decentralized, tamper-proof digital ledger that records transactions across a network.**

**Key Properties:**

- **Distributed ledger:** Data is shared across many computers (nodes).
- **Public, immutable, permissionless:** Anyone can join, and records can’t be changed.
- **No single controller:** Peer-to-peer, not owned by one entity.

**Beginner Analogy:**

Think of it like a **digital notebook** shared with the world. Every time someone writes something (a "transaction"), everyone else sees it. And once it’s written, it **can’t be erased** or changed.

---

### 🔗 Visual: Blockchain as a Chain of Blocks

```mermaid
flowchart LR
    A[Block 1]
    B[Block 2]
    C[Block 3]
    D[Block 4]
    A -- Hash --> B
    B -- Hash --> C
    C -- Hash --> D
    subgraph BlockDetails[Block Structure]
        TX[Transactions]
        TS[Timestamp]
        Prev[Prev Hash]
    end
    A --- BlockDetails
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
    style D fill:#ffb,stroke:#333,stroke-width:2px
```

---

## 🌍 Centralized vs. Decentralized

| Feature             | Centralized Database | Blockchain (Decentralized)            |
| ------------------- | -------------------- | ------------------------------------- |
| Controlled by       | One organization     | Many independent participants (nodes) |
| Vulnerable to hacks | Yes                  | Much harder due to consensus          |
| Can be edited       | Yes                  | No (immutable)                        |

---

## 🔐 The Role of Cryptography

Blockchain uses **asymmetric cryptography**:

- **Public key**: Shared with others (like your email)
- **Private key**: Secret! Used to sign transactions (like your password)

📌 *You can share your public key, but never your private key.*

```mermaid
flowchart LR
    PubKey[Public Key] --> Blockchain
    PrivKey[Private Key] --> Blockchain
    PrivKey -.-> You
    PubKey -.-> Others
    Blockchain -->|Receive funds| PubKey
    Blockchain -->|Sign tx| PrivKey
    You -.->|Never share!| PrivKey
    Others -.->|Can be shared| PubKey
```

---

## 🧾 Real-Life Analogy

Imagine a **Google Doc** shared with your entire class:

- Everyone can view changes in real-time.
- Once a sentence is typed, it stays permanently.
- Everyone has a copy—if one person tries to cheat, it’s easy to detect.

That’s blockchain!

---

## 🧠 Smart Contracts

- **What?** Programs stored on the blockchain that run when conditions are met.
- **Why?** Automate agreements, enable DeFi, DAOs, NFTs, and more.
- **Security:** Must be audited before launch (especially in DeFi).
- **Risks:** Vulnerabilities like reentrancy, brute-force attacks, or poor code can be exploited.
- **Tools:** [Remix IDE](https://remix.ethereum.org/) for testing and debugging.

**Further Reading:**  

- [rekt.news – Web3 hacks](https://rekt.news/)

---

## 🗳️ DAOs (Decentralized Autonomous Organizations)

- **Definition:** Community-run organizations where token holders vote on decisions.
- **How?** Voting power = token ownership.
- **Tools:** [Snapshot](https://snapshot.box/#/explore), [Tally](https://www.tally.xyz)
- **Example:** [Lisk DAO burn vote](https://www.tally.xyz/gov/lisk/proposal/109529319231798472455931112461964493964262461314287853501160335464858704295202)

```mermaid
flowchart TD
  A[DAO Treasury] -->|Proposal| B[Community Vote]
  B -->|Majority| C[Action Executed]
```

---

## 🔐 Cryptography Basics

- **Public Key:** Shareable, used to receive funds/messages.
- **Private Key:** Secret, never share!
- **Encryption:** Blockchain uses asymmetric encryption.

**Learn More:**  

- [Symmetric vs Asymmetric](https://encryptinsights.com/symmetric-vs-asymmetric-encryption/)  
- [Ethereum Keys (GitHub)](https://github.com/ethereumbook/ethereumbook/blob/develop/04keys-addresses.asciidoc)

---

## 🌐 Layers in Blockchain

```mermaid
flowchart TD
    L1[Layer 1: Main Blockchain]
    L2[Layer 2: Scaling Solutions]
    L3[Layer 3: App Chains]
    L3 --> L2
    L2 --> L1
    style L1 fill:#bbf,stroke:#333,stroke-width:2px
    style L2 fill:#bfb,stroke:#333,stroke-width:2px
    style L3 fill:#ffb,stroke:#333,stroke-width:2px
```

---

## 🏦 Real-World Applications

- **Banking:** Tokenize accounts, on-chain assets.
- **CBDCs:** Central Bank Digital Currencies ([Consensys CBDC](https://consensys.io/solutions/payments-and-money/cbdc))

---

## ⚖️ Decentralization vs. Regulation

- **Public blockchains:** Open, anyone can join (Ethereum, Lisk).
- **Private blockchains:** Controlled, permissioned (e.g., government).
- **Regulation:** Adds compliance, but doesn’t centralize public chains.

---

## 📚 Learning & Tools

- **Main Curriculum:** [Lisk Solidity Bootcamp Notion](https://frost-foe-274.notion.site/Lisk-Summer-Bootcamp-Solidity-226b6900a29980aa9ef4f15dd4d83774?pvs=74)
- **Ethereum Blocks:** [Docs](https://ethereum.org/en/developers/docs/blocks/)
- **Slide Deck:** [Lisk Superchain Deck](https://docs.google.com/presentation/d/1lDN2TA57TveBsLBImUzUbpj7cUvuNyqMvtkr0WKf0cg/edit#slide=id.p)
- **Add Lisk Network:** [Chainlist](https://chainlist.org/?chain=1135&testnets=true&search=Lisk)
- **Google Classroom:** [Join here](https://classroom.google.com/c/Nzg4Njc3MDg1MTQw?cjc=kb7uvwr3)

---

## ⚠️ Extra Tips

- **Attendance:** Mark in “Tasks > Attendance” in Classroom.
- **Wallets:** MetaMask is beginner-friendly.

---

### 💬 Sample Community Chat Highlights

- “Blockchain is a decentralized, tamper-proof digital ledger that records transactions across a network of computers.”
- “Smart contracts are a part of the data in the blocks.”
- “Dev3Pack is like a DAO: shared ownership, collective decision-making, and learning powered by the community.”

---

## 👣 What’s Next for You?

- ✅ Join a blockchain classroom
- ✅ Try deploying your first smart contract
- ✅ Vote on a DAO proposal
- ✅ Learn Solidity
- ✅ Join a hackathon!

---

## 🛠️ Tools to Explore

| Tool                                         | Purpose                        |
| -------------------------------------------- | ------------------------------ |
| [MetaMask](https://metamask.io/)             | Web3 wallet                    |
| [Remix IDE](https://remix.ethereum.org/)     | Smart contract testing         |
| [Chainlist](https://chainlist.org)           | Add blockchain networks easily |
| [L2Beat](https://l2beat.com/scaling/summary) | Compare Layer 2 networks       |
| [Rekt](https://rekt.news/)                   | List of major DeFi hacks       |

---

**For more, visit the [Notion Resource Hub](https://frost-foe-274.notion.site/Lisk-Summer-Bootcamp-Solidity-226b6900a29980aa9ef4f15dd4d83774?pvs=74).**

---

## 🌟 Helpful Resources

- **Solidity Documentation:** [docs.soliditylang.org](https://docs.soliditylang.org/en/v0.8.30/?authuser=1)
- **Solidity Official Site:** [soliditylang.org](https://soliditylang.org/?authuser=1)
- **Solidity by Example:** [solidity-by-example.org](https://solidity-by-example.org/?authuser=1)
- **Cyfrin Solidity Course:** [Updraft Solidity Course](https://updraft.cyfrin.io/courses/solidity?authuser=1)
- **Lisk Scaffold (Starter Kit):** [github.com/LiskHQ/scaffold-lisk](https://github.com/LiskHQ/scaffold-lisk?authuser=1)
- **React Official Tutorial:** [react.dev/learn](https://react.dev/learn?authuser=1)
- **Ethers.js Documentation:** [docs.ethers.org/v5](https://docs.ethers.org/v5/?authuser=1)
- **Viem (Web3 Library):** [viem.sh](https://viem.sh/?authuser=1)
- **Next.js Learn:** [nextjs.org/learn](https://nextjs.org/learn?authuser=1)
- **Foundry (Smart Contract Tooling):** [getfoundry.sh](https://getfoundry.sh/?authuser=1)
- **Wagmi (React Web3 Hooks):** [wagmi.sh](https://wagmi.sh/?authuser=1)
