// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./VaultBase.sol";
import "./MathLib.sol";

contract VaultManager is VaultBase {
    using MathLib for uint256;

    function deposit() external payable {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] = balances[msg.sender].sub(amount);
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }
} 