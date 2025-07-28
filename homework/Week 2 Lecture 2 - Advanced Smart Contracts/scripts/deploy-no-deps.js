const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get signers
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", ethers.formatEther(await deployer.getBalance()), "ETH\n");

  try {
    // Deploy VulnerablePiggyBank
    console.log("📦 Deploying VulnerablePiggyBank...");
    const VulnerablePiggyBank = await ethers.getContractFactory("VulnerablePiggyBank");
    const vulnerablePiggyBank = await VulnerablePiggyBank.deploy();
    await vulnerablePiggyBank.waitForDeployment();
    const vulnerableAddress = await vulnerablePiggyBank.getAddress();
    console.log("✅ VulnerablePiggyBank deployed to:", vulnerableAddress);

    // Deploy SecurePiggyBankNoOpenZeppelin
    console.log("\n🔒 Deploying SecurePiggyBankNoOpenZeppelin...");
    const SecurePiggyBankNoOpenZeppelin = await ethers.getContractFactory("SecurePiggyBankNoOpenZeppelin");
    const securePiggyBank = await SecurePiggyBankNoOpenZeppelin.deploy();
    await securePiggyBank.waitForDeployment();
    const secureAddress = await securePiggyBank.getAddress();
    console.log("✅ SecurePiggyBankNoOpenZeppelin deployed to:", secureAddress);

    // Deploy PiggyBankAttacker
    console.log("\n⚔️ Deploying PiggyBankAttacker...");
    const PiggyBankAttacker = await ethers.getContractFactory("PiggyBankAttacker");
    const piggyBankAttacker = await PiggyBankAttacker.deploy(vulnerableAddress);
    await piggyBankAttacker.waitForDeployment();
    const attackerAddress = await piggyBankAttacker.getAddress();
    console.log("✅ PiggyBankAttacker deployed to:", attackerAddress);

    // Fund the vulnerable contract
    console.log("\n💰 Funding VulnerablePiggyBank...");
    const depositAmount = ethers.parseEther("1");
    const depositTx = await vulnerablePiggyBank.deposit({ value: depositAmount });
    await depositTx.wait();
    console.log("✅ Deposited", ethers.formatEther(depositAmount), "ETH to VulnerablePiggyBank");

    // Fund the secure contract
    console.log("\n💰 Funding SecurePiggyBankNoOpenZeppelin...");
    const secureDepositTx = await securePiggyBank.deposit(depositAmount, { value: depositAmount });
    await secureDepositTx.wait();
    console.log("✅ Deposited", ethers.formatEther(depositAmount), "ETH to SecurePiggyBankNoOpenZeppelin");

    console.log("\n🎯 Deployment Complete!");
    console.log("\nContract Addresses:");
    console.log("VulnerablePiggyBank:", vulnerableAddress);
    console.log("SecurePiggyBankNoOpenZeppelin:", secureAddress);
    console.log("PiggyBankAttacker:", attackerAddress);

    console.log("\n📊 Contract Balances:");
    console.log("VulnerablePiggyBank balance:", ethers.formatEther(await ethers.provider.getBalance(vulnerableAddress)), "ETH");
    console.log("SecurePiggyBankNoOpenZeppelin balance:", ethers.formatEther(await ethers.provider.getBalance(secureAddress)), "ETH");

    // Save addresses to a file
    const addresses = {
      VulnerablePiggyBank: vulnerableAddress,
      SecurePiggyBankNoOpenZeppelin: secureAddress,
      PiggyBankAttacker: attackerAddress,
      deploymentTime: new Date().toISOString(),
      network: "localhost"
    };

    const fs = require('fs');
    fs.writeFileSync('deployed-addresses.json', JSON.stringify(addresses, null, 2));
    console.log("\n💾 Contract addresses saved to deployed-addresses.json");

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 