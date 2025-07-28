# Manual Deployment Guide

Since we're experiencing Hardhat compilation issues with OpenZeppelin dependencies, here's how to deploy the contracts manually using Remix IDE.

## 🚀 **Step-by-Step Deployment**

### **Step 1: Open Remix IDE**

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace or use the default

### **Step 2: Upload Contract Files**

1. In the file explorer, create a new folder called `contracts`
2. Upload these files to the `contracts` folder:
   - `VulnerablePiggyBank.sol`
   - `SecurePiggyBankNoOpenZeppelin.sol`
   - `PiggyBankAttacker.sol`

### **Step 3: Compile Contracts**

1. Go to the "Solidity Compiler" tab
2. Set compiler version to `0.8.20`
3. Click "Compile" for each contract
4. Make sure compilation is successful

### **Step 4: Deploy Contracts**

1. Go to the "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask" as environment
3. Connect your wallet (MetaMask)
4. Deploy contracts in this order:

#### **Deploy VulnerablePiggyBank**

1. Select `VulnerablePiggyBank` from the contract dropdown
2. Click "Deploy"
3. Confirm transaction in MetaMask
4. Copy the deployed contract address

#### **Deploy SecurePiggyBankNoOpenZeppelin**

1. Select `SecurePiggyBankNoOpenZeppelin` from the contract dropdown
2. Click "Deploy"
3. Confirm transaction in MetaMask
4. Copy the deployed contract address

#### **Deploy PiggyBankAttacker**

1. Select `PiggyBankAttacker` from the contract dropdown
2. In the constructor parameter, paste the VulnerablePiggyBank address
3. Click "Deploy"
4. Confirm transaction in MetaMask
5. Copy the deployed contract address

### **Step 5: Fund Contracts**

1. Use the deployed contract interfaces to fund them
2. Send some ETH to each contract for testing

## 📋 **Contract Addresses Template**

After deployment, update this template with your contract addresses:

```json
{
  "VulnerablePiggyBank": "0x...",
  "SecurePiggyBankNoOpenZeppelin": "0x...",
  "PiggyBankAttacker": "0x...",
  "deploymentTime": "2025-01-26T...",
  "network": "testnet/mainnet"
}
```

## 🔧 **Alternative: Use Foundry**

If you prefer command-line deployment:

### **Install Foundry**

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### **Create Foundry Project**

```bash
forge init piggybank-deployment
cd piggybank-deployment
```

### **Add Contracts**

Copy your contract files to the `src/` directory

### **Deploy**

```bash
forge build
forge script script/Deploy.s.sol --rpc-url <your-rpc-url> --broadcast
```

## 🎯 **Quick Deployment Commands**

### **For Local Development**

```bash
# Start local Hardhat node (if working)
npx hardhat node

# Deploy (if compilation works)
npx hardhat run scripts/deploy-manual.js --network localhost
```

### **For Testnet**

```bash
# Configure network in hardhat.config.js first
npx hardhat run scripts/deploy-manual.js --network testnet
```

## 📊 **Verification Steps**

After deployment:

1. **Check Contract Addresses**: Verify all contracts deployed successfully
2. **Test Basic Functions**: Try depositing and withdrawing
3. **Test Attack Functions**: Demonstrate vulnerabilities
4. **Update Documentation**: Save addresses in your project

## 🚨 **Common Issues & Solutions**

### **Issue: "Cannot find module"**

**Solution**: Use Remix IDE instead of Hardhat

### **Issue: "Network not found"**

**Solution**: Configure MetaMask for the correct network

### **Issue: "Insufficient funds"**

**Solution**: Use testnet faucet to get test tokens

## ✅ **Success Checklist**

- [ ] All contracts compiled successfully
- [ ] All contracts deployed to target network
- [ ] Contract addresses saved
- [ ] Basic functions tested
- [ ] Attack functions demonstrated
- [ ] Documentation updated with addresses

## 📝 **Documentation Update**

After successful deployment, update these files:

- `README.md` - Add contract addresses
- `AssignmentSummary.md` - Update deployment section
- Create `deployed-addresses.json` with all addresses

## 🎉 **Completion**

Once you have the contract addresses, your assignment will be complete with:

- Vulnerable contract deployed
- Secure contract deployed
- Attack contract deployed
- All addresses documented
- Assignment requirements met

**This manual approach will work around the Hardhat compilation issues!** 🚀
