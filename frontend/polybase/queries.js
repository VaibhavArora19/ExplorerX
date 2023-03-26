// const { Polybase } = require("@polybase/client");
import { Polybase } from "@polybase/client";

const createDB = () => {
  const db = new Polybase({
    defaultNamespace: "EXPLORERX12",
  });

  return db;
};

export const createContractDifferent = async (
  id,
  name,
  description,
  owner,
  contractCode,
  abi,
  chainIds,
  isUMA,
  isSettled
) => {
  const db = createDB();

  let chainContracts = [];

  for (let chain of chainIds) {
    chainContracts.push(db.collection("Chain").record(chain));
  }
  const response = await db
    .collection("differentAddress")
    .create([
      id,
      name,
      description,
      owner,
      contractCode,
      abi,
      chainContracts,
      isUMA,
      isSettled,
    ]);

  return response;
};

export const createContractSimilar = async (
  id,
  name,
  description,
  owner,
  contractCode,
  abi,
  chains
) => {
  const db = createDB();

const response = await db
    .collection("similarAddress")
    .create([id, name, description, owner, contractCode, abi, chains]);

  return response;
};

export const createChainRecord = async (
  id,
  contractId,
  name,
  contractAddress
) => {
  const db = createDB();

  const response = await db
    .collection("Chain")
    .create([id, contractId, name, contractAddress]);

  return response;
};

export const readContractDifferent = async (id) => {
  const db = createDB();

  const data = await db.collection("differentAddress").record(id).get();

  return data;
};

export const readContractSimilar = async (id) => {
  const db = createDB();

  const data = await db.collection("similarAddress").record(id).get();

  return data;
};

export const readChainRecord = async (id) => {
  const db = createDB();

  const response = await db.collection("Chain").record(id).get();

  return response;
};

// createContractSimilar('0x1EFEcb61A2f80Aa34d3b9218B564a64D0594629', 'Test contract', 'This is a test contract', '0x123', 'IGNORE', '[{"inputs":[{"internalType":"string","name":"_val","type":"string"}],"name":"checker","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"check","type":"uint256"}],"name":"getter","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getter","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_val","type":"string"}],"name":"set","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"setter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_val","type":"string"}],"name":"setter","outputs":[],"stateMutability":"nonpayable","type":"function"}]', ['mumbai', 'gnosis', 'zksync'])