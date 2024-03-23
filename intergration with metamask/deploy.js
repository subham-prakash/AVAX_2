// Importing the Hardhat Runtime Environment
const hre = require("hardhat");

async function main() {
  // Initial balance for deployment
  const initBalance = 1;

  // Get the contract factory for Assessment
  const Assessment = await hre.ethers.getContractFactory("Assessment");

  // Deploy the contract with initial balance
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  // Log contract deployment details
  console.log(`Contract deployed with a balance of ${initBalance} ETH at address: ${assessment.address}`);
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
