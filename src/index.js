const express = require("express");
const Web3 = require("web3");
const solanaWeb3 = require("@solana/web3.js");
const Validator = require("validatorjs");
const cors = require("cors");
const abi = require("./abi.json");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.get("/api/balance/:address", async (req, res) => {
  const network =
    req.query.network === "eth"
      ? process.env.ETH_NETWORK
      : req.body.network === "bsc"
      ? process.env.BSC_NETWORK
      : null;

  if (req.query.network === "solana") {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl(process.env.SOLANA_NETWORK), // eg. mainnet-beta, testnet, or devnet.
      "confirmed"
    );
    const publicKey = new solanaWeb3.PublicKey(req.params.address);

    try {
      const balance = await connection.getBalance(publicKey);

      return res.json({
        amount: balance / 1e9,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  const web3 = new Web3(new Web3.providers.HttpProvider(network));
  try {
    const userBalance = await web3.eth.getBalance(req.params.address);

    return res.json({
      amount: parseFloat(web3.utils.fromWei(userBalance, "ether")),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/owner/:contract/:address", async (req, res) => {
  const network =
    req.query.network === "eth"
      ? process.env.ETH_NETWORK
      : req.body.network === "bsc"
      ? process.env.BSC_NETWORK
      : null;

  const web3 = new Web3(new Web3.providers.HttpProvider(network));
  const instance = new web3.eth.Contract(abi, req.params.address);

  try {
    const response = await instance.methods.owner().call();

    // return res.json({
    //   amount: parseFloat(web3.utils.fromWei(userBalance, "ether")),
    // });
    if (response == req.params.contract) {
      return res.json(true);
    } else {
      return false;
    }
    // return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
