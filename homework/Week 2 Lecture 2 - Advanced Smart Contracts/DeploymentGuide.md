# Contract Deployment Guide in Cursor

## 🚀 **Deployment Options**

### **Option 1: Hardhat (Recommended)**

#### **Step 1: Start Local Hardhat Node**

```bash
# In Cursor terminal
cd "homework/Week 2 Lecture 2 - Advanced Smart Contracts"
npx hardhat node
```

#### **Step 2: Deploy Contracts**

```bash
# In a new terminal tab in Cursor
npx hardhat run scripts/deploy-simple.js --network localhost
```

### **Option 2: Remix IDE Integration**

#### **Step 1: Open Remix**

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Upload your contract files
3. Compile contracts
4. Deploy using Remix interface

#### **Step 2: Copy Contract Addresses**

After deployment, copy the contract addresses back to your documentation.

### **Option 3: Foundry (Alternative)**

#### **Step 1: Install Foundry**

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

#### **Step 2: Deploy with Foundry**

```bash
forge build
forge script script/Deploy.s.sol --rpc-url <your-rpc-url> --broadcast
```

### **Option 4: Manual Deployment**

#### **Step 1: Compile Contracts**

```bash
npx hardhat compile
```

#### **Step 2: Get Contract Artifacts**

```bash
# Contract artifacts will be in the artifacts/ directory
ls artifacts/contracts/
```

#### **Step 3: Deploy via Web3.js or Ethers.js**

```javascript
// Example deployment script
const { ethers } = require("ethers");
const contractArtifact = require("./artifacts/contracts/VulnerablePiggyBank.sol/VulnerablePiggyBank.json");

async function deploy() {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
  const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
  
  const factory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    wallet
  );
  
  const contract = await factory.deploy();
  await contract.deployed();
  
  console.log("Contract deployed to:", contract.address);
}
```

## 📋 **Deployment Checklist**

### **Before Deployment**

- [ ] Contracts compiled successfully
- [ ] Tests passing
- [ ] Network configured (localhost, testnet, or mainnet)
- [ ] Private keys/accounts set up
- [ ] Sufficient funds for deployment

### **During Deployment**

- [ ] Monitor deployment logs
- [ ] Save contract addresses
- [ ] Verify contract deployment
- [ ] Test basic functionality

### **After Deployment**

- [ ] Update documentation with contract addresses
- [ ] Verify contracts on blockchain explorer
- [ ] Test all functions
- [ ] Document deployment details

## 🔧 **Cursor-Specific Tips**

### **1. Use Integrated Terminal**

- Open terminal in Cursor: `Ctrl + `` (backtick)
- Navigate to project directory
- Run deployment commands

### **2. Use Multiple Terminal Tabs**

- Tab 1: Run Hardhat node
- Tab 2: Deploy contracts
- Tab 3: Monitor logs

### **3. Use Cursor's File Explorer**

- Right-click on scripts folder
- Select "Open in Terminal"
- Run deployment commands

### **4. Use Cursor's Task Runner**

Create a `.vscode/tasks.json` file:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy Contracts",
      "type": "shell",
      "command": "npx hardhat run scripts/deploy-simple.js --network localhost",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

## 🎯 **Quick Deployment Commands**

### **Local Development**

```bash
# Start local node
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy-simple.js --network localhost
```

### **Testnet Deployment**

```bash
# Deploy to testnet (configure network first)
npx hardhat run scripts/deploy-simple.js --network testnet
```

### **Mainnet Deployment**

```bash
# Deploy to mainnet (configure network first)
npx hardhat run scripts/deploy-simple.js --network mainnet
```

## 📊 **Deployment Verification**

### **1. Check Contract Addresses**

```bash
# After deployment, verify addresses
npx hardhat console --network localhost
```

### **2. Test Contract Functions**

```javascript
// In Hardhat console
const contract = await ethers.getContractAt("VulnerablePiggyBank", "CONTRACT_ADDRESS");
await contract.deposit({ value: ethers.parseEther("1") });
```

### **3. Verify on Blockchain Explorer**

- Go to blockchain explorer (Etherscan, etc.)
- Search for your contract address
- Verify contract source code

## 🚨 **Common Issues & Solutions**

### **Issue: "Cannot find module"**

**Solution**: Install dependencies

```bash
npm install
```

### **Issue: "Network not found"**

**Solution**: Configure networks in `hardhat.config.js`

```javascript
networks: {
  localhost: {
    url: "http://127.0.0.1:8545"
  },
  testnet: {
    url: "YOUR_TESTNET_RPC_URL",
    accounts: ["YOUR_PRIVATE_KEY"]
  }
}
```

### **Issue: "Insufficient funds"**

**Solution**: Fund your account or use faucet

```bash
# For local development, accounts are pre-funded
# For testnet, use faucet to get test tokens
```

## ✅ **Success Indicators**

- ✅ Contracts deployed successfully
- ✅ Contract addresses saved
- ✅ Basic functions tested
- ✅ Documentation updated
- ✅ Contracts verified on explorer

## 📝 **Documentation Update**

After successful deployment, update your documentation:

```markdown
## Deployed Contracts
- VulnerablePiggyBank: [CONTRACT_ADDRESS]
- SecurePiggyBankNoOpenZeppelin: [CONTRACT_ADDRESS]
- PiggyBankAttacker: [CONTRACT_ADDRESS]
```

**Yes, you can definitely deploy contracts directly from Cursor!** 🎉
