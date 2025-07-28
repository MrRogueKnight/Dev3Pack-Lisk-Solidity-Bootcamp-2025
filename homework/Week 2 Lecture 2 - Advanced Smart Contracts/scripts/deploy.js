const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying PiggyBank Contracts...\n");

  // Get signers
  const [deployer, attacker] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log("Attacker address:", attacker.address);
  console.log("Deployer balance:", ethers.formatEther(await deployer.getBalance()), "ETH\n");

  // Deploy VulnerablePiggyBank
  console.log("📦 Deploying VulnerablePiggyBank...");
  const VulnerablePiggyBank = await ethers.getContractFactory("VulnerablePiggyBank");
  const vulnerablePiggyBank = await VulnerablePiggyBank.deploy();
  await vulnerablePiggyBank.waitForDeployment();
  console.log("VulnerablePiggyBank deployed to:", await vulnerablePiggyBank.getAddress());

  // Deploy SecurePiggyBank
  console.log("\n🔒 Deploying SecurePiggyBank...");
  const SecurePiggyBank = await ethers.getContractFactory("SecurePiggyBank");
  const securePiggyBank = await SecurePiggyBank.deploy();
  await securePiggyBank.waitForDeployment();
  console.log("SecurePiggyBank deployed to:", await securePiggyBank.getAddress());

  // Deploy PiggyBankAttacker
  console.log("\n⚔️ Deploying PiggyBankAttacker...");
  const PiggyBankAttacker = await ethers.getContractFactory("PiggyBankAttacker");
  const piggyBankAttacker = await PiggyBankAttacker.deploy(await vulnerablePiggyBank.getAddress());
  await piggyBankAttacker.waitForDeployment();
  console.log("PiggyBankAttacker deployed to:", await piggyBankAttacker.getAddress());

  // Fund the vulnerable contract
  console.log("\n💰 Funding VulnerablePiggyBank...");
  const depositAmount = ethers.parseEther("10");
  const depositTx = await vulnerablePiggyBank.deposit({ value: depositAmount });
  await depositTx.wait();
  console.log("Deposited", ethers.formatEther(depositAmount), "ETH to VulnerablePiggyBank");

  // Fund the secure contract
  console.log("\n💰 Funding SecurePiggyBank...");
  const secureDepositTx = await securePiggyBank.deposit(depositAmount, { value: depositAmount });
  await secureDepositTx.wait();
  console.log("Deposited", ethers.formatEther(depositAmount), "ETH to SecurePiggyBank");

  // Check balances
  console.log("\n📊 Contract Balances:");
  console.log("VulnerablePiggyBank balance:", ethers.formatEther(await ethers.provider.getBalance(await vulnerablePiggyBank.getAddress())), "ETH");
  console.log("SecurePiggyBank balance:", ethers.formatEther(await ethers.provider.getBalance(await securePiggyBank.getAddress())), "ETH");

  // Demonstrate vulnerability - anyone can withdraw from vulnerable contract
  console.log("\n🔓 Demonstrating Access Control Vulnerability...");
  console.log("Attacker attempting to withdraw from VulnerablePiggyBank...");
  
  const attackerContract = piggyBankAttacker.connect(attacker);
  const attackTx = await attackerContract.attackDirectTheft();
  await attackTx.wait();
  
  console.log("✅ Attack successful! All funds stolen from VulnerablePiggyBank");
  console.log("Attacker contract balance:", ethers.formatEther(await ethers.provider.getBalance(await piggyBankAttacker.getAddress())), "ETH");

  // Try to attack secure contract (should fail)
  console.log("\n🛡️ Attempting to attack SecurePiggyBank...");
  try {
    // This should fail because secure contract has proper access control
    const secureAttackTx = await securePiggyBank.connect(attacker).withdraw(ethers.parseEther("1"));
    await secureAttackTx.wait();
    console.log("❌ Unexpected: Attack on secure contract succeeded");
  } catch (error) {
    console.log("✅ Expected: Attack on secure contract failed");
    console.log("Error:", error.message);
  }

  // Demonstrate reentrancy attack
  console.log("\n🔄 Demonstrating Reentrancy Attack...");
  const reentrancyAmount = ethers.parseEther("1");
  const reentrancyTx = await attackerContract.attackReentrancy({ value: reentrancyAmount });
  await reentrancyTx.wait();
  console.log("✅ Reentrancy attack executed");

  // Get attack statistics
  const stats = await piggyBankAttacker.getAttackStats();
  console.log("\n📈 Attack Statistics:");
  console.log("Number of attacks:", stats[0].toString());
  console.log("Total stolen:", ethers.formatEther(stats[1]), "ETH");
  console.log("Attacker contract balance:", ethers.formatEther(stats[2]), "ETH");

  console.log("\n🎯 Deployment Complete!");
  console.log("\nContract Addresses:");
  console.log("VulnerablePiggyBank:", await vulnerablePiggyBank.getAddress());
  console.log("SecurePiggyBank:", await securePiggyBank.getAddress());
  console.log("PiggyBankAttacker:", await piggyBankAttacker.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 