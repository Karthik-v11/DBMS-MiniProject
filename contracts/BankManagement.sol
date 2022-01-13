pragma solidity ^0.5.0;

contract BankManagement {
  uint public userCount = 0;

  struct User {
    uint id;
    string accountNo;
    string Name;
  }
  

  mapping(uint => User) public users;

  event userCreated(
    uint id,
    string accountNo,
    string Name
  );


  function createUser(string memory _accountNo,string memory _Name) public {
    userCount ++;
    users[userCount] = User(userCount, _accountNo, _Name);
    emit userCreated(userCount, _accountNo, _Name);
  }

}
