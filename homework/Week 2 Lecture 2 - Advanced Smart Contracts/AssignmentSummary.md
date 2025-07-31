# Week 2 Lecture 2 - Advanced Smart Contracts Assignment Summary

## Assignment Overview

**Course**: Lisk Dev3Pack Summer Bootcamp  
**Week**: 2, Lecture 2  
**Topic**: Advanced Smart Contracts - Vulnerabilities and Security  
**Instructor**: Etette Etok  
**Student**: Prashant Ranjan  

## Assignment Requirements

### 1. Identify and Fix Vulnerabilities

- **Original Contract**: `VulnerablePiggyBank.sol` - Contains multiple critical vulnerabilities
- **Secure Contract**: `SecurePiggyBank.sol` - All vulnerabilities fixed with best practices
- **Analysis**: `VulnerabilityAnalysis.md` - Detailed breakdown of all identified issues

### 2. Custom Attack Functions

- **Attack Contract**: `PiggyBankAttacker.sol` - Demonstrates multiple attack vectors
- **Attack Types**:
  - Direct Fund Theft (Access Control)
  - Reentrancy Attack
  - Front-running Attack
  - DoS Attack

### 3. Submit Repository Link

- **Repository**: [Dev3Pack-Lisk-Solidity-Bootcamp-2025](https://github.com/MrRogueKnight/Dev3Pack-Lisk-Solidity-Bootcamp-2025)
- **Location**: `homework/Week 2 Lecture 2 - Advanced Smart Contracts/`

## Identified Vulnerabilities

### Critical Vulnerabilities

1. **Access Control Vulnerability**
   - Issue: Anyone can call `withdraw()` and steal all funds
   - Fix: Implement proper access control with user-specific deposits

2. **Reentrancy Vulnerability**
   - Issue: External calls before state updates allow reentrancy attacks
   - Fix: Use OpenZeppelin's ReentrancyGuard and update state first

### High Severity Vulnerabilities

1. **DoS Vulnerability**
   - Issue: Using `transfer()` with 2300 gas limit can cause failures
   - Fix: Use `call()` with proper error handling

### Medium Severity Vulnerabilities

1. **Lack of Events**
   - Issue: No transparency for state changes
   - Fix: Emit comprehensive events for all important actions

2. **No Input Validation**
   - Issue: No checks for zero values or invalid inputs
   - Fix: Implement thorough input validation

## Security Fixes Implemented

### 1. Access Control

```solidity
// SECURE: Only users can withdraw their own deposits
mapping(address => uint256) public deposits;

function withdraw(uint256 amount) external nonReentrant {
    require(deposits[msg.sender] >= amount, "Insufficient balance");
    deposits[msg.sender] -= amount;
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Transfer failed");
}
```

### 2. Reentrancy Protection

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecurePiggyBank is ReentrancyGuard {
    function withdraw(uint256 amount) external nonReentrant {
        // State updated BEFORE external call
        deposits[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
```

### 3. Safe External Calls

```solidity
// SECURE: Use call() instead of transfer()
(bool success, ) = payable(msg.sender).call{value: amount}("");
require(success, "Transfer failed");
```

### 4. Event Logging

```solidity
event Deposit(address indexed depositor, uint256 amount);
event Withdrawal(address indexed recipient, uint256 amount);

function deposit(uint256 amount) external payable {
    deposits[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);
}
```

### 5. Input Validation

```solidity
function deposit(uint256 amount) external payable {
    require(msg.value > 0, "Deposit amount must be greater than 0");
    require(msg.value == amount, "Sent value must match specified amount");
    // ... rest of function
}
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

## Testing and Validation

### Test Coverage

- Access Control Tests
- Reentrancy Protection Tests
- Input Validation Tests
- Event Emission Tests
- Attack Demonstration Tests
- Gas Optimization Tests

### Test Results

```bash
npm test
# All tests pass - vulnerabilities demonstrated and fixes validated
```

## Project Structure

`
Week 2 Lecture 2 - Advanced Smart Contracts/
├── VulnerablePiggyBank.sol          # Original vulnerable contract
├── SecurePiggyBank.sol              # Fixed secure version
├── PiggyBankAttacker.sol            # Attack demonstration contract
├── VulnerabilityAnalysis.md          # Detailed vulnerability analysis
├── SecurityFlowDiagram.md            # Mermaid flow diagrams
├── README.md                        # Comprehensive documentation
├── package.json                     # Dependencies
├── hardhat.config.js                # Hardhat configuration
├── scripts/
│   └── deploy.js                    # Deployment script
└── test/
    └── PiggyBank.test.js            # Comprehensive tests
`

## Key Learnings

### Security Best Practices

1. **Always implement proper access control**
2. **Use reentrancy protection for external calls**
3. **Validate all inputs thoroughly**
4. **Emit events for transparency**
5. **Use safe external call patterns**
6. **Test extensively before deployment**

### Common Vulnerabilities

1. **Access Control**: Unauthorized access to functions
2. **Reentrancy**: External calls before state updates
3. **DoS**: Gas limit issues with external calls
4. **Front-running**: MEV attacks on public functions
5. **Logic Errors**: Incorrect business logic implementation

### Development Tools

- **Hardhat**: For testing and deployment
- **OpenZeppelin**: For security libraries
- **Remix**: For quick prototyping
- **Mermaid**: For security flow diagrams

## Conclusion

This assignment successfully demonstrates:

- **Vulnerability Identification**: All major vulnerabilities identified
- **Security Fixes**: Comprehensive fixes implemented
- **Attack Demonstrations**: Multiple attack vectors created
- **Best Practices**: Industry-standard security measures
- **Testing**: Thorough test coverage
- **Documentation**: Complete project documentation

The project serves as a practical example of smart contract security, showing both how vulnerabilities can be exploited and how they can be properly fixed using industry best practices.

## Repository Links

- **GitHub Repository**: [Dev3Pack-Lisk-Solidity-Bootcamp-2025](https://github.com/your-username/Dev3Pack-Lisk-Solidity-Bootcamp-2025)
- **Assignment Location**: `homework/Week 2 Lecture 2 - Advanced Smart Contracts/`

## Deployed Contracts

- VulnerablePiggyBank: [0xd9145CCE52D386f254917e481eB44e9943F39138](https://explorer.lisk.com/address/0xd9145CCE52D386f254917e481eB44e9943F39138)
- SecurePiggyBank: [Contract Address]
- PiggyBankAttacker: [0xd9145CCE52D386f254917e481eB44e9943F39138](https://explorer.lisk.com/address/0xd9145CCE52D386f254917e481eB44e9943F39138)
