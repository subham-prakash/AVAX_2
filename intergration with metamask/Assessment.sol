// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BFTBought(address indexed buyer, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() external view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) external payable {
        require(msg.sender == owner, "You are not the owner of this account");

        uint _previousBalance = balance;
        balance += _amount;

        assert(balance == _previousBalance + _amount);

        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) external {
        require(msg.sender == owner, "You are not the owner of this account");

        uint _previousBalance = balance;

        if (balance < _withdrawAmount) {
            revert InsufficientBalance(balance, _withdrawAmount);
        }

        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));

        emit Withdraw(_withdrawAmount);
    }

    function buyBFT(uint256 _bftAmount) external payable {
        require(msg.value == _bftAmount, "Insufficient or excess ether provided");

        uint _previousBalance = balance;
        balance += _bftAmount;

        assert(balance == _previousBalance + _bftAmount);

        emit BFTBought(msg.sender, _bftAmount);
    }
}

