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
    console.log("✅ VulnerablePiggyBank deployed to:", await vulnerablePiggyBank.getAddress());

    // Deploy SecurePiggyBankNoOpenZeppelin
    console.log("\n🔒 Deploying SecurePiggyBankNoOpenZeppelin...");
    const SecurePiggyBankNoOpenZeppelin = await ethers.getContractFactory("SecurePiggyBankNoOpenZeppelin");
    const securePiggyBank = await SecurePiggyBankNoOpenZeppelin.deploy();
    await securePiggyBank.waitForDeployment();
    console.log("✅ SecurePiggyBankNoOpenZeppelin deployed to:", await securePiggyBank.getAddress());

    // Deploy PiggyBankAttacker
    console.log("\n⚔️ Deploying PiggyBankAttacker...");
    const PiggyBankAttacker = await ethers.getContractFactory("PiggyBankAttacker");
    const piggyBankAttacker = await PiggyBankAttacker.deploy(await vulnerablePiggyBank.getAddress());
    await piggyBankAttacker.waitForDeployment();
    console.log("✅ PiggyBankAttacker deployed to:", await piggyBankAttacker.getAddress());

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
    console.log("VulnerablePiggyBank:", await vulnerablePiggyBank.getAddress());
    console.log("SecurePiggyBankNoOpenZeppelin:", await securePiggyBank.getAddress());
    console.log("PiggyBankAttacker:", await piggyBankAttacker.getAddress());

    console.log("\n📊 Contract Balances:");
    console.log("VulnerablePiggyBank balance:", ethers.formatEther(await ethers.provider.getBalance(await vulnerablePiggyBank.getAddress())), "ETH");
    console.log("SecurePiggyBankNoOpenZeppelin balance:", ethers.formatEther(await ethers.provider.getBalance(await securePiggyBank.getAddress())), "ETH");

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