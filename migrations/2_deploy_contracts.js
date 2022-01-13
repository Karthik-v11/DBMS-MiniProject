var Banksystem = artifacts.require("./BankManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(Banksystem);
};
