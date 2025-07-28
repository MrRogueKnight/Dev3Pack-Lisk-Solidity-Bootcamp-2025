// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecurePiggyBank
 * @dev A secure piggy bank contract with proper access control and reentrancy protection
 */
contract SecurePiggyBank is ReentrancyGuard, Ownable {
    // Events for transparency
    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);

    // Mapping to track individual deposits
    mapping(address => uint256) public deposits;
    uint256 public totalDeposits;

    /**
     * @dev Constructor sets the owner
     */
    constructor() Ownable(msg.sender) {}

    /**
     * @dev Allows users to deposit ETH
     * @param amount The amount to deposit (must be > 0)
     */
    function deposit(uint256 amount) external payable nonReentrant {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        require(msg.value == amount, "Sent value must match specified amount");

        deposits[msg.sender] += msg.value;
        totalDeposits += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Allows users to withdraw their own deposits
     * @param amount The amount to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        deposits[msg.sender] -= amount;
        totalDeposits -= amount;

        // Use call instead of transfer for better gas handling
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawal(msg.sender, amount);
    }

    /**
     * @dev Allows users to withdraw their entire balance
     */
    function withdrawAll() external nonReentrant {
        uint256 balance = deposits[msg.sender];
        require(balance > 0, "No balance to withdraw");
        require(
            address(this).balance >= balance,
            "Insufficient contract balance"
        );

        deposits[msg.sender] = 0;
        totalDeposits -= balance;

        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");

        emit Withdrawal(msg.sender, balance);
    }

    /**
     * @dev Emergency withdrawal function for owner (only in emergencies)
     * @param recipient The address to send funds to
     * @param amount The amount to withdraw
     */
    function emergencyWithdraw(
        address payable recipient,
        uint256 amount
    ) external onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");

        emit EmergencyWithdrawal(recipient, amount);
    }

    /**
     * @dev Get user's deposit balance
     * @param user The address to check
     * @return The user's deposit balance
     */
    function getBalance(address user) external view returns (uint256) {
        return deposits[user];
    }

    /**
     * @dev Get contract's total ETH balance
     * @return The contract's total ETH balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        // Allow direct ETH transfers but don't track them as deposits
        // This maintains compatibility with the original contract
    }
}
