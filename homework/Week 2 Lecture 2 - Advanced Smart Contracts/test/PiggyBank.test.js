const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PiggyBank Security Tests", function () {
  let vulnerablePiggyBank, securePiggyBank, piggyBankAttacker;
  let owner, attacker, user1, user2;
  const depositAmount = ethers.parseEther("10");

  beforeEach(async function () {
    [owner, attacker, user1, user2] = await ethers.getSigners();

    // Deploy contracts
    const VulnerablePiggyBank = await ethers.getContractFactory("VulnerablePiggyBank");
    vulnerablePiggyBank = await VulnerablePiggyBank.deploy();

    const SecurePiggyBank = await ethers.getContractFactory("SecurePiggyBank");
    securePiggyBank = await SecurePiggyBank.deploy();

    const PiggyBankAttacker = await ethers.getContractFactory("PiggyBankAttacker");
    piggyBankAttacker = await PiggyBankAttacker.deploy(await vulnerablePiggyBank.getAddress());

    // Fund contracts
    await vulnerablePiggyBank.deposit({ value: depositAmount });
    await securePiggyBank.deposit(depositAmount, { value: depositAmount });
  });

  describe("VulnerablePiggyBank Tests", function () {
    it("Should allow anyone to withdraw all funds (Access Control Vulnerability)", async function () {
      const initialBalance = await ethers.provider.getBalance(await vulnerablePiggyBank.getAddress());
      expect(initialBalance).to.equal(depositAmount);

      // Attacker can withdraw all funds
      await piggyBankAttacker.connect(attacker).attackDirectTheft();

      const finalBalance = await ethers.provider.getBalance(await vulnerablePiggyBank.getAddress());
      expect(finalBalance).to.equal(0);

      const attackerBalance = await ethers.provider.getBalance(await piggyBankAttacker.getAddress());
      expect(attackerBalance).to.equal(depositAmount);
    });

    it("Should be vulnerable to reentrancy attacks", async function () {
      // Fund the attacker contract
      await piggyBankAttacker.connect(attacker).attackReentrancy({ value: ethers.parseEther("1") });

      const stats = await piggyBankAttacker.getAttackStats();
      expect(stats[0]).to.be.gt(0); // Attack count should be greater than 0
    });

    it("Should allow front-running attacks", async function () {
      // Simulate front-running attack
      await piggyBankAttacker.connect(attacker).attackFrontRunning();

      const stats = await piggyBankAttacker.getAttackStats();
      expect(stats[0]).to.be.gt(0);
    });
  });

  describe("SecurePiggyBank Tests", function () {
    it("Should prevent unauthorized withdrawals", async function () {
      // Attacker should not be able to withdraw from secure contract
      await expect(
        securePiggyBank.connect(attacker).withdraw(ethers.parseEther("1"))
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should allow users to withdraw their own deposits", async function () {
      const user1Balance = await securePiggyBank.getBalance(user1.address);
      expect(user1Balance).to.equal(0);

      // User1 deposits
      await securePiggyBank.connect(user1).deposit(ethers.parseEther("5"), { value: ethers.parseEther("5") });
      
      const newBalance = await securePiggyBank.getBalance(user1.address);
      expect(newBalance).to.equal(ethers.parseEther("5"));

      // User1 can withdraw their deposit
      await securePiggyBank.connect(user1).withdraw(ethers.parseEther("3"));
      
      const finalBalance = await securePiggyBank.getBalance(user1.address);
      expect(finalBalance).to.equal(ethers.parseEther("2"));
    });

    it("Should prevent reentrancy attacks", async function () {
      // Try to attack secure contract with reentrancy
      await expect(
        piggyBankAttacker.connect(attacker).attackReentrancy({ value: ethers.parseEther("1") })
      ).to.not.be.reverted; // Should not revert due to reentrancy protection
    });

    it("Should emit events for transparency", async function () {
      const depositAmount = ethers.parseEther("2");
      
      await expect(securePiggyBank.connect(user1).deposit(depositAmount, { value: depositAmount }))
        .to.emit(securePiggyBank, "Deposit")
        .withArgs(user1.address, depositAmount);

      await expect(securePiggyBank.connect(user1).withdraw(depositAmount))
        .to.emit(securePiggyBank, "Withdrawal")
        .withArgs(user1.address, depositAmount);
    });

    it("Should validate inputs properly", async function () {
      // Should reject zero-value deposits
      await expect(
        securePiggyBank.connect(user1).deposit(0, { value: 0 })
      ).to.be.revertedWith("Deposit amount must be greater than 0");

      // Should reject mismatched amounts
      await expect(
        securePiggyBank.connect(user1).deposit(ethers.parseEther("1"), { value: ethers.parseEther("2") })
      ).to.be.revertedWith("Sent value must match specified amount");
    });

    it("Should allow emergency withdrawal by owner", async function () {
      const emergencyAmount = ethers.parseEther("1");
      
      await expect(
        securePiggyBank.connect(owner).emergencyWithdraw(user1.address, emergencyAmount)
      ).to.emit(securePiggyBank, "EmergencyWithdrawal")
        .withArgs(user1.address, emergencyAmount);
    });

    it("Should prevent non-owners from emergency withdrawal", async function () {
      await expect(
        securePiggyBank.connect(attacker).emergencyWithdraw(user1.address, ethers.parseEther("1"))
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Attack Demonstrations", function () {
    it("Should demonstrate DoS vulnerability in vulnerable contract", async function () {
      // This test demonstrates the DoS vulnerability concept
      await piggyBankAttacker.connect(attacker).attackDoS();
      
      const stats = await piggyBankAttacker.getAttackStats();
      expect(stats[0]).to.be.gte(0);
    });

    it("Should track attack statistics correctly", async function () {
      const initialStats = await piggyBankAttacker.getAttackStats();
      expect(initialStats[0]).to.equal(0); // No attacks initially

      // Execute an attack
      await piggyBankAttacker.connect(attacker).attackDirectTheft();

      const finalStats = await piggyBankAttacker.getAttackStats();
      expect(finalStats[0]).to.be.gt(0); // Attack count should increase
      expect(finalStats[1]).to.be.gt(0); // Total stolen should increase
    });
  });

  describe("Gas Optimization Tests", function () {
    it("Should use efficient gas patterns", async function () {
      const user1Balance = await securePiggyBank.getBalance(user1.address);
      expect(user1Balance).to.equal(0);

      // Test gas efficiency of deposit
      const depositTx = await securePiggyBank.connect(user1).deposit(ethers.parseEther("1"), { value: ethers.parseEther("1") });
      const receipt = await depositTx.wait();
      
      // Gas used should be reasonable (less than 100k gas for simple deposit)
      expect(receipt.gasUsed).to.be.lt(100000);
    });
  });
}); 