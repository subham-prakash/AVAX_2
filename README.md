# Simple Contract Integration with Front-end Dapp

For this project, create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application and connect with your metamask wallet. 

## Description

The Front-End of a Simple Contract A smart contract that has been deployed on the blockchain can be interacted with using application, a simple web application. To facilitate smooth communication with the contract, the programme establishes a connection with the well-known Ethereum wallet MetaMask.

The application's primary features are as follows:

Connect Wallet: By Clicking you can connect your wallet with front-end application.

Withdraw currency: By clicking a button, users can take 1 to the cryptocurrency value that is kept in the smart contract.

Value of Cryptocurrency: Users can access the most recent price of the cryptocurrency that is stored in the contract and have it displayed on a website.

Deposit Currency: By clicking a button, users can add 1 to the cryptocurrency value that is kept in the smart contract.

## Getting Started

### Installing
1.Clone the repository:
git clone https://github.com/your-username/your-repo.git

2.Install the dependencies:
npm install

#if Using Hardhat Then:-

Run npm i

npx hardhat


### Executing program
Implement your smart contract:

To deploy the smart contract to a blockchain network use Remix.
Record the address on the contract.

*Refresh the contract's address:

Open a text editor and the app.js file.
Put the actual contract address you got from the deployment in place of the placeholder "CONTRACT_ADDRESS."
File saving.

*Launch the programme:

To host the JavaScriptstart a web server or use a development server like Live Server.
Use the correct URL to visit the programme, such as http://127.0.0.1:5500/index.html.

*Link MetaMask:

Check to see if MetaMask is active in your browser and logged into the preferred network.
Give the programme access to connect to your MetaMask account if asked to do so.
```
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      const tx = await atm.deposit({ value: ethers.utils.parseEther("1") });
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      const tx = await atm.withdraw(ethers.utils.parseEther("1"));
      await tx.wait();
      getBalance();
    }
  };

  const downloadNFT = async (nftId, url) => {
    console.log(`Downloading NFT with ID ${nftId} from URL: ${url}`);
    window.open(url, "_blank");
  };

  const buyDonation = async () => {
    if (atm) {
      const tx = await atm.deposit({ value: ethers.utils.parseEther("1") });
      await tx.wait();
      getBalance();
    }
  };

  const renderNFTs = () => {
    return (
      <div>
        <div>
          <img src="https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay" alt="NFT 1" />
          <button onClick={() => downloadNFT(1, "https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay")} style={{ fontSize: "1.2rem" }}>Download NFT 1</button>
        </div>
        <div>
          <img src="https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay" alt="NFT 2" />
          <button onClick={() => downloadNFT(2, "https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay")} style={{ fontSize: "1.2rem" }}>Download NFT 2</button>
        </div>
        <div>
          <img src="https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay" alt="NFT 3" />
          <button onClick={() => downloadNFT(3, "https://www.bing.com/images/create/create-nft-of-holy-amarnath-cave/1-65e1cd8e6e514e53b1502fc7fdf22586?id=uipNhrI5fFEoVBCKCGFyzw%3d%3d&view=detailv2&idpp=genimg&thId=OIG2.ktEKN8Yq4_4AEJoeI4QB&FORM=GCRIDP&mode=overlay")} style={{ fontSize: "1.2rem" }}>Download NFT 3</button>
        </div>
      </div>
    );
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p style={{ fontSize: "1.2rem" }}>Please install Metamask in order to use this ATM.</p>;
    }
    if (!account) {
      return (
        <button onClick={connectAccount} style={{ fontSize: "1.2rem" }}>Please connect your Metamask wallet</button>
      );
    }
    if (balance == undefined) {
      getBalance();
    }
    return (
      <div>
        <p style={{ fontSize: "1.2rem" }}>Your Account: {account}</p>
        <p style={{ fontSize: "1.2rem" }}>Your Balance: {balance}</p>
        <button onClick={deposit} style={{ fontSize: "1.2rem" }}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={{ fontSize: "1.2rem" }}>Withdraw 1 ETH</button>
        <button onClick={buyDonation} style={{ fontSize: "1.2rem" }}>Buy Premium NFTs</button>
        <hr />
        {renderNFTs()}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li><a href="#" style={{ fontSize: "1.2rem" }}>Home</a></li>
          <li><a href="#" style={{ fontSize: "1.2rem" }}>About</a></li>
          <li><a href="#" style={{ fontSize: "1.2rem" }}>Contact</a></li>
        </ul>
      </nav>
      <main className="content">
        <header>
          <h1 style={{ fontSize: "2rem" }}>Welcome to the Wallet</h1>
        </header>
        {initUser()}
      </main>
      <footer style={{ fontSize: "1rem", background: "#333", color: "white", padding: "20px 0", position: "absolute", bottom: "0", width: "100%" }}>
        <p>&copy; 2024 Your Company</p>
      </footer>
      <style jsx>{`
        .container {
          text-align: center;
          background: linear-gradient(to bottom, #6a3093, #a044ff);
          min-height: 100vh;
          color: white;
          position: relative;
        }

        .navbar {
          background-color: #333;
          overflow: hidden;
          padding: 20px 0;
        }

        .navbar ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .navbar li {
          float: left;
          margin-right: 20px;
        }

        .navbar li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-weight: bold;
        }

        .navbar li a:hover {
          background-color: #ddd;
          color: black;
        }

        .content {
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

## Help

```
npm i (please must install node js for running this command)
your Files Should be update
Address must be same as deplyed contracts
```
## Author
Subham Prakash
