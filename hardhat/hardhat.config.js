require("@nomicfoundation/hardhat-toolbox");
//dotenv
require("dotenv").config();
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
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
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    zkSync: {
      url: "https://zksync2-testnet.zksync.dev",
      accounts: [process.env.PRIVATE_KEY],
      ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },
    scroll: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [process.env.PRIVATE_KEY],
    },
    hyperspace: {
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_API_KEY,
      optimisticGoerli: process.env.OPTIMISM_API_KEY,
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
