export const supportedChains = [
  {
    id: 534351,
    name: "Scroll Sepolia",
    network: "scroll-sepolia",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://scroll-testnet-public.unifra.io"],
        webSocket: ["https://scroll-testnet-public.unifra.io"],
      },
      public: {
        http: ["https://scroll-testnet-public.unifra.io"],
        webSocket: ["https://scroll-testnet-public.unifra.io"],
      },
    },
    blockExplorers: {
      default: {
        name: "Blockscout",
        url: "https://blockscout.scroll.io",
      },
    },
    testnet: true,
  },
  {
    id: 5003,
    name: "Mantle Sepolia",
    network: "mantle",
    nativeCurrency: {
      decimals: 18,
      name: "Mantle",
      symbol: "MNT",
    },
    rpcUrls: {
      public: { http: ["https://rpc.sepolia.mantle.xyz"] },
      default: { http: ["https://rpc.sepolia.mantle.xyz"] },
    },
    blockExplorers: {
      default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz/" },
    },
  },
  {
    id: 11155420,
    name: "Optimism Sepolia",
    network: "Optimism Sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.sepolia.optimism.io"],
        webSocket: ["wss://rpc.sepolia.optimism.io"],
      },
      public: {
        http: ["https://rpc.sepolia.optimism.io"],
        webSocket: ["wss://rpc.sepolia.optimism.io"],
      },
    },
    blockExplorers: {
      default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz/" },
    },
  },
  {
    id: 300,
    name: "ZkSync Sepolia",
    network: "ZkSync Sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://zksync-era-sepolia.blockpi.network/v1/rpc/public"],
        webSocket: ["wss://zksync-sepolia.drpc.org"],
      },
      public: {
        http: ["https://zksync-era-sepolia.blockpi.network/v1/rpc/public"],
        webSocket: ["wss://zksync-sepolia.drpc.org"],
      },
    },
    blockExplorers: {
      default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz/" },
    },
  },
  {
    id: 80002,
    name: "Polygon Amoy",
    network: "Polygon Amoy",
    nativeCurrency: {
      decimals: 18,
      name: "POLYGON",
      symbol: "POL",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc-amoy.polygon.technology"],
        webSocket: ["wss://polygon-amoy-bor-rpc.publicnode.com"],
      },
      public: {
        http: ["https://rpc-amoy.polygon.technology"],
        webSocket: ["wss://polygon-amoy-bor-rpc.publicnode.com"],
      },
    },
    blockExplorers: {
      default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz/" },
    },
  },
];
