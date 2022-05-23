// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Tether {
    // variables
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million
    uint8 public decimals = 18;

    // mappings
    mapping(address => uint256) public balance;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balance[msg.sender] = totalSupply;
    }

    // errors
    error InsufficientFunds(uint256 _demand, uint256 _supply);
    error InsufficientAllowance(uint256 _requested, uint256 _allowed);

    // modifiers
    modifier CheckFunds(address _wallet, uint256 _value) {
        if (_value > balance[_wallet])
            revert InsufficientFunds(_value, balance[_wallet]);
        _;
    }

    modifier CheckAllowance(
        address _thirdParty,
        address _wallet,
        uint256 _value
    ) {
        if (_value > allowance[_wallet][_thirdParty])
            revert InsufficientAllowance(
                _value,
                allowance[_wallet][_thirdParty]
            );
        _;
    }

    // events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // functions
    function transfer(address _receiver, uint256 _value)
        public
        CheckFunds(msg.sender, _value)
        returns (bool success)
    {
        balance[msg.sender] -= _value;
        balance[_receiver] += _value;

        emit Transfer(msg.sender, _receiver, _value);
        return true;
    }

    function setAllowance(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _sender,
        address _receiver,
        uint256 _value
    )
        public
        CheckFunds(_sender, _value)
        CheckAllowance(msg.sender, _sender, _value)
        returns (bool success)
    {
        balance[_sender] -= _value;
        allowance[_sender][msg.sender] -= _value;
        balance[_receiver] += _value;

        emit Transfer(_sender, _receiver, _value);
        return true;
    }
}
