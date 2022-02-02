pragma solidity ^0.5.0;

contract BankManagement {
  uint public userCount = 0;

  struct User {
    uint id;
    uint accountNo;
    string IFSC;
    string branchName;
    string Name;
    string addres;
    string birthdate;
    uint balance;
    uint mobileNo;
  }
  

  mapping(uint => User) public users;

  event userCreated(
    uint id,
    uint accountNo,
    string IFSC,
    string branchName,
    string Name,
    string addres,
    string birthdate,
    uint balance,
    uint mobileNo
  );

  function createUser(uint _accountNo,string memory _IFSC,string memory _branchName,string memory _Name,string memory _addres,string memory _birthdate,uint _balance,uint _mobileNo) public {
    userCount ++;
    users[userCount] = User(userCount, _accountNo,_IFSC,_branchName, _Name,_addres,_birthdate,_balance,_mobileNo);
    emit userCreated(userCount, _accountNo, _IFSC,_branchName,_Name,_addres,_birthdate,_balance,_mobileNo);
  }

}
