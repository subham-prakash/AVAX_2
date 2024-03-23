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
          background: linear-gradient(to bottom, #33ccff, #ff99cc);
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
