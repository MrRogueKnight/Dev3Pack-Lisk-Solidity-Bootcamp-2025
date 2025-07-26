# Week 2 Lecture 2 - Advanced Smart Contracts Assignment

## Overview

This project demonstrates smart contract vulnerabilities and their fixes through a PiggyBank contract example. The assignment involves identifying and fixing vulnerabilities in a simple smart contract and creating attack functions to demonstrate the security flaws.

## Project Structure

`
Week 2 Lecture 2 - Advanced Smart Contracts/
├── VulnerablePiggyBank.sol          # Original vulnerable contract
├── SecurePiggyBank.sol              # Fixed secure version
├── PiggyBankAttacker.sol            # Attack demonstration contract
├── VulnerabilityAnalysis.md          # Detailed vulnerability analysis
└── README.md                        # This file
`

## Contracts

### 1. VulnerablePiggyBank.sol

The original vulnerable contract with multiple security flaws:

- **Access Control Vulnerability**: Anyone can withdraw all funds
- **Reentrancy Vulnerability**: No protection against reentrancy attacks
- **DoS Vulnerability**: Uses `transfer()` with 2300 gas limit
- **Lack of Events**: No transparency for state changes
- **No Input Validation**: No checks for zero values

### 2. SecurePiggyBank.sol

The fixed version with all vulnerabilities addressed:

- **Access Control**: Only users can withdraw their own deposits
- **Reentrancy Protection**: Uses OpenZeppelin's ReentrancyGuard
- **DoS Protection**: Uses `call()` instead of `transfer()`
- **Events**: Comprehensive event logging
- **Input Validation**: Proper checks for all inputs
- **Modular Design**: Clean, well-documented code

**Note**: This version requires OpenZeppelin dependencies. If you encounter compilation issues, use `SecurePiggyBankNoOpenZeppelin.sol` instead.

### 2a. SecurePiggyBankNoOpenZeppelin.sol

Alternative version without external dependencies:

- **Same Security Features**: All vulnerabilities fixed
- **No External Dependencies**: Compiles without OpenZeppelin
- **Custom Reentrancy Guard**: Self-implemented protection
- **Easy Compilation**: Works in any Solidity environment

### 3. PiggyBankAttacker.sol

Demonstrates various attack vectors:

- **Direct Fund Theft**: Exploits access control vulnerability
- **Reentrancy Attack**: Exploits reentrancy vulnerability
- **Front-running Attack**: Demonstrates MEV vulnerability
- **DoS Attack**: Exploits gas limit vulnerability

## Key Vulnerabilities Identified

### 1. Access Control Vulnerability (Critical)

```solidity
// VULNERABLE: Anyone can call this function
function withdraw() public { 
    payable(msg.sender).transfer(address(this).balance); 
}
```

**Fix**: Implement proper access control

```solidity
// SECURE: Only users can withdraw their own deposits
function withdraw(uint256 amount) external nonReentrant {
    require(deposits[msg.sender] >= amount, "Insufficient balance");
    deposits[msg.sender] -= amount;
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Transfer failed");
}
```

### 2. Reentrancy Vulnerability (Critical)

The original contract allows reentrancy attacks because it sends ETH before updating state.

**Fix**: Use ReentrancyGuard and update state before external calls

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecurePiggyBank is ReentrancyGuard {
    function withdraw(uint256 amount) external nonReentrant {
        // Update state BEFORE external call
        deposits[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
```

### 3. DoS Vulnerability (High)

Using `transfer()` with 2300 gas limit can cause failures.

**Fix**: Use `call()` with proper error handling

```solidity
// SECURE: Use call() instead of transfer()
(bool success, ) = payable(msg.sender).call{value: amount}("");
require(success, "Transfer failed");
```

## Attack Demonstrations

### Attack 1: Direct Fund Theft

```solidity
function attackDirectTheft() external {
    uint256 contractBalance = address(vulnerablePiggyBank).balance;
    vulnerablePiggyBank.withdraw(); // Steals ALL funds
}
```

### Attack 2: Reentrancy Attack

```solidity
function attackReentrancy() external payable {
    vulnerablePiggyBank.deposit{value: msg.value}();
    vulnerablePiggyBank.withdraw(); // Triggers reentrancy
}

receive() external payable {
    if (address(vulnerablePiggyBank).balance >= msg.value) {
        vulnerablePiggyBank.withdraw(); // Re-enters!
    }
}
```

## Security Best Practices Implemented

1. **Access Control**: Only authorized users can perform actions
2. **Reentrancy Protection**: Use ReentrancyGuard modifier
3. **Safe External Calls**: Use `call()` with proper error handling
4. **Input Validation**: Check all inputs for validity
5. **Events**: Emit events for transparency
6. **Defensive Programming**: Assume all external inputs are malicious
7. **Modular Design**: Break contracts into smaller, testable components

## Testing Instructions

### Prerequisites

- Solidity ^0.8.30
- OpenZeppelin Contracts ^5.0.0
- Hardhat or Remix IDE

### Deployment Steps

1. **Deploy VulnerablePiggyBank**

   ```bash
   # Deploy the vulnerable contract
   ```

2. **Deploy PiggyBankAttacker**

   ```bash
   # Deploy attacker with vulnerable contract address
   ```

3. **Demonstrate Attacks**

   ```bash
   # Call attackDirectTheft() to steal all funds
   # Call attackReentrancy() with some ETH to demonstrate reentrancy
   ```

4. **Deploy SecurePiggyBank**

   ```bash
   # Deploy the secure version
   ```

5. **Test Secure Contract**

   ```bash
   # Try to attack the secure contract (should fail)
   ```

## Gas Optimization

The secure contract includes several gas optimizations:

- Use `call()` instead of `transfer()`
- Efficient storage patterns
- Minimal external calls
- Proper error handling

## Conclusion

This project demonstrates the importance of security in smart contract development. The vulnerable contract can be easily exploited, while the secure version implements industry best practices to protect user funds.

**Key Takeaways:**

- Always implement proper access control
- Use reentrancy protection for external calls
- Validate all inputs
- Emit events for transparency
- Test thoroughly before deployment
- Stay updated with security best practices

## Repository Link

[GitHub Repository](https://github.com/your-username/Dev3Pack-Lisk-Solidity-Bootcamp-2025)

## Deployed Contract Explorer Links

- VulnerablePiggyBank: [0xd9145CCE52D386f254917e481eB44e9943F39138](https://explorer.lisk.com/address/0xd9145CCE52D386f254917e481eB44e9943F39138)
- SecurePiggyBank: [Contract Address]
- PiggyBankAttacker: [0xd9145CCE52D386f254917e481eB44e9943F39138](https://explorer.lisk.com/address/0xd9145CCE52D386f254917e481eB44e9943F39138)
