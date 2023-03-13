require("@nomicfoundation/hardhat-toolbox");
//dotenv
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    optimism: {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      accounts: [process.env.PRIVATE_KEY],
    },
    zkSync: {
      url: "https://zksync2-testnet.zksync.dev",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_API_KEY,
      optimisticGoerli: process.env.OPTIMISM_API_KEY,
      chiado: process.env.CHIADO_API_KEY,
    },
  },
  customChains: [
    {
      network: "chiado",
      chainId: 5,
      urls: {
        apiURL: "https://api-goerli.etherscan.io/api",
        browserURL: "https://goerli.etherscan.io",
      },
    },
  ],
};
