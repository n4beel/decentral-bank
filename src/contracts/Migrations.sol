// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Migrations {
    address public owner;
    uint256 public lastCompletedMigration;

    constructor() {
        owner = msg.sender;
    }

    modifier Restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint256 _completed) public Restricted {
        lastCompletedMigration = _completed;
    }

    function upgrade(address _newAddress) public Restricted {
        Migrations upgraded = Migrations(_newAddress);
        upgraded.setCompleted(lastCompletedMigration);
    }
}
