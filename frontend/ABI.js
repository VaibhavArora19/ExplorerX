export const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "check",
				"type": "uint256"
			}
		],
		"name": "getter",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getter",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_val",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_val",
				"type": "string"
			}
		],
		"name": "setter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

//components for read functions ===> ABI.map((func) => {
// return (func.stateMutability === "view" || func.stateMutability === "pure") && <Read />
// })

//components for write functions ===> ABI.map((func) => {
// return (func.stateMutability !== "view" && func.stateMutability !== "pure") && <Write />
// })