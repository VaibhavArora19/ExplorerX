import solc from "solc";
import { ethers } from "ethers";

export const compile = async (contract) => {
  const input = {
    language: "Solidity",
    sources: {
      "newContract.sol": {
        content: contract,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  const abi = output.contracts["newContract.sol"].Test.abi;
  const bytecode = output.contracts["newContract.sol"].Test.evm.bytecode;

  deploy(abi, bytecode);
};


async function deploy(abi, bytecode) {
  const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const account = wallet.connect(provider);

  const factory = new ethers.ContractFactory(abi, bytecode, account);
  const contract = await factory.deploy();

  console.log(contract);
}
