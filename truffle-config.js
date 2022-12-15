// require('dotenv').config();
// const HDWalletProvider = require("truffle-hdwallet-provider");

//Account credentials from which our contract will be deployed
const mnemonic = process.env.MNEMONIC;

//API key of your Datahub account for Avalanche Fuji test network
const APIKEY = process.env.APIKEY;

module.exports = {
  networks: {
    develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777", 
    }
    // fuji: {
    //   provider: function() {
    //         return new HDWalletProvider(mnemonic, `https://avalanche--fuji--rpc.datahub.figment.io/apikey/${APIKEY}/ext/bc/C/rpc`)
    //   },
    //   network_id: "*",
    //   gas: 3000000,
    //   gasPrice: 470000000000
    // }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
