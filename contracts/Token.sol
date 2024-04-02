//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

// this is the main building block for smartcontracts
contract Token {
    // some string type variable to identify the token
    string public name = "Proxy Token";
    string public symbol = "Proxy";

    // the fixed amount of tokens, strored in an unsigned integer type accounts.
    uint256 public totalSupply = 1800000;

    // an address type varibale is used to store ethereum accounts.
    address public owner;

    // a mapping is a key/value map. here we store each account's balance
    mapping(address => uint256) balances;

    // the transfer event helps off-chain applications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
    * contract initialization
    */
    constructor() {
        balances = [msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
    * a function to transfer token
    * the 'external' modifier makes a function only callable from outside the contracts
    */
    function transfer(address to, uint256 amount) external {
        // check if the transaction sender has enough tokens.
        // if require first argument evaluate to false then the transaction will revert
        require(balances[msg.sender] >= amount, "Not Enough token");

        // transfer the amount
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }
    
    /**
    * read only function to retrieve the token balance of a given account
    * the view modifier indicates that it doesn't modify the contracts
    * state, which allow us to call it without execution a transaction
    */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];        
    }
}
