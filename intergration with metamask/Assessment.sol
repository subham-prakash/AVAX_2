// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    function deposit(uint256 _amount) public payable onlyOwner {
        uint256 _previousBalance = balance;
        
        balance += _amount;

        assert(balance == _previousBalance + _amount);

        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint256 _previousBalance = balance;
        
        require(balance >= _withdrawAmount, "Insufficient balance");

        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));

        emit Withdraw(msg.sender, _withdrawAmount);
    }
}
