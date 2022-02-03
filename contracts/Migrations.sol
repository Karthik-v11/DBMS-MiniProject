pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }
}
