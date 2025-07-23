// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract VaultBase {
    mapping(address => uint256) internal balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }
} 