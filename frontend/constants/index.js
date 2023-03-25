export const contractAddress = "0xEDbFce814BB0e816e2A18545262D8A32E32EDA43";
export const gnosisAddress = "";
export const connextDomains = {
  "Optimism Goerli": 1735356532,
  "Polygon Mumbai": 9991,
};
export const rpcUrls = {
  "Optimism Goerli": "https://goerli.optimism.io",
  "Polygon Mumbai": "https://rpc-mumbai.maticvigil.com",
  "Gnosis Chiado": "https://rpc.chiadochain.net",
  "Scroll Testnet": "https://alpha-rpc.scroll.io/l2",
  "FVM Hyperspace": "https://api.hyperspace.node.glif.io/rpc/v1",
  "ZKSync Testnet": "https://zksync2-testnet.zksync.dev",
  "Mantle Testnet": "https://rpc.testnet.mantle.xyz",
};
export const Mantle = {
  id: 5001,
  name: "Mantle Testnet",
  network: "mantle",
  nativeCurrency: {
    decimals: 18,
    name: "Mantle",
    symbol: "BIT",
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.mantle.xyz"] },
    default: { http: ["https://rpc.testnet.mantle.xyz"] },
  },
  blockExplorers: {
    default: { name: "Mantle", url: "https://explorer.testnet.mantle.xyz/" },
  },
};
export const optimisticVerificationContract =
  "0x474891484CdA794b66AFcD6eD391336df4958DA7"; //goerli
export const optimisticVerificationABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_claim",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contractId",
				"type": "string"
			}
		],
		"name": "assertTruth",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractId",
				"type": "string"
			}
		],
		"name": "settleAndGetAssertionResultByContractId",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "assertionIdByContractId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultIdentifier",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractId",
				"type": "string"
			}
		],
		"name": "getAssertionByContractId",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "bool",
								"name": "arbitrateViaEscalationManager",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "discardOracle",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "validateDisputers",
								"type": "bool"
							},
							{
								"internalType": "address",
								"name": "assertingCaller",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "escalationManager",
								"type": "address"
							}
						],
						"internalType": "struct OptimisticOracleV3Interface.EscalationManagerSettings",
						"name": "escalationManagerSettings",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "asserter",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "assertionTime",
						"type": "uint64"
					},
					{
						"internalType": "bool",
						"name": "settled",
						"type": "bool"
					},
					{
						"internalType": "contract IERC20",
						"name": "currency",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "expirationTime",
						"type": "uint64"
					},
					{
						"internalType": "bool",
						"name": "settlementResolution",
						"type": "bool"
					},
					{
						"internalType": "bytes32",
						"name": "domainId",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "identifier",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "bond",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "callbackRecipient",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "disputer",
						"type": "address"
					}
				],
				"internalType": "struct OptimisticOracleV3Interface.Assertion",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractId",
				"type": "string"
			}
		],
		"name": "getAssertionId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractId",
				"type": "string"
			}
		],
		"name": "getAssertionResultByContractId",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const deployerAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
    ],
    name: "computeAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnext",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "initializable",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "initializeData",
        type: "bytes",
      },
    ],
    name: "deployContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_connext",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint32[]",
        name: "destinationDomain",
        type: "uint32[]",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "uint256[]",
        name: "relayerFee",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "initializable",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "initializeData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
    ],
    name: "xDeployer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
    ],
    name: "xReceive",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
