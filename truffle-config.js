require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const utils = require('web3-utils')
const MNEMONIC = process.env["MNEMONIC"]
const ADDRESS = process.env["ADDRESS"]
const ROPSTEN_PROJECT_ID = process.env["ROPSTEN_PROJECT_ID"];
const startIndex = 0
const numberOfAccounts = 1
let hdWalletProvider

const setupWallet = (
    url
) => {
    if (!hdWalletProvider) {
        hdWalletProvider = new HDWalletProvider(
            MNEMONIC,
            url,
            startIndex,
            numberOfAccounts,
	    true,
	)
        hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider())
    }
    return hdWalletProvider
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    aurora_testnet: {
      provider: () => setupWallet('https://testnet.aurora.dev'),
      network_id: 0x4e454153
      // gas: 10000000,
      // from: ADDRESS
    },
    aurora_mainnet: {
      provider: () => setupWallet('https://mainnet.aurora.dev'),
      network_id: 0x4e454152,
      gasPrice: 0
      // gas: 10000000
      // from: ADDRESS
    },
    ropsten: {
      provider: () => setupWallet(`https://ropsten.infura.io/v3/` + ROPSTEN_PROJECT_ID),
      network_id: 0x3
      // from: ADDRESS,
      // gas: 3 * 1000000,
      // gasPrice: utils.toWei('8', 'gwei')
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "istanbul"
      }
    },
  },
};
