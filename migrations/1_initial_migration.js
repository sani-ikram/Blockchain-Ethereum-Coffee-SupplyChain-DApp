var Migrations = artifacts.require("C:/Users/saniy/OneDrive/Desktop/blockchain/Blockchain Supply Chain Ethereum DApp/nd1309-Project-6b-Example-Template-master/project-6/contracts/Migrations.sol");
//var Migrations = artifacts.require("/Migrations.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
