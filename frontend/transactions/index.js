export const getPolygonTransactions = async (contractAddress) => {
  const data = await fetch(
    `	
https://api-amoy.polygonscan.com/api?module=account&action=txlist&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}`
  );
  const response = await data.json();

  return response;
};

//returns the source code of the smart contract if the smart contract is verified
export const getPolygonSourceCode = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-amoy.polygonscan.com/api
    ?module=contract
    &action=getsourcecode
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}
    `);

  const response = await data.json();

  return response;
};

//returns the ABI of the smart contract
export const getPolygonABI = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-amoy.polygonscan.com/api
    ?module=contract
    &action=getabi
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}
    `);

  const response = await data.json();

  return response;
};

export const getGnosisTransactions = async (contractAddress) => {
  const data = await fetch(`
        https://blockscout.com/gnosis/chiado/api?module=account&action=txlist&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getGnosisSourceCode = async (contractAddress) => {
  const data = await fetch(`
        https://blockscout.com/gnosis/chiado/api?module=contract&action=getsourcecode&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getGnosisABI = async (contractAddress) => {
  const data = await fetch(`
        http://blockscout.com/gnosis/chiado/api?module=contract&action=getabi&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

export const getOptimismTranasctions = async (contractAddress) => {
  const data = await fetch(`
        https://api-sepolia-optimism.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_OPTIMISM_API_KEY}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getOptimismSourceCode = async (contractAddress) => {
  const data = await fetch(`
    https://api-sepolia-optimism.etherscan.io/api
    ?module=contract
    &action=getsourcecode
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_OPTIMISM_API_KEY}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getOptimismABI = async (contractAddress) => {
  const data = await fetch(`
    https://api-sepolia-optimism.etherscan.io/api
    ?module=contract
    &action=getabi
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_OPTIMISM_API_KEY}
    `);

  const response = await data.json();

  return response;
};

export const getSepoliaTransactions = async (contractAddress) => {
  const data = await fetch(`
    https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_SEPOLIA_API_KEY}
`);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getSepoliaSourceCode = async (contractAddress) => {
  const data = await fetch(`
    https://api-sepolia.etherscan.io/api
    ?module=contract
    &action=getsourcecode
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_SEPOLIA_API_KEY}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getSepoliaABI = async (contractAddress) => {
  const data = await fetch(`
    https://api-sepolia.etherscan.io/api
    ?module=contract
    &action=getabi
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_SEPOLIA_API_KEY}
    `);

  const response = await data.json();

  return response;
};

export const getMantleTransactions = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-sepolia.mantlescan.xyz/api?
    module=account&action=txlist&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getMantleSourceCode = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-sepolia.mantlescan.xyz/api?
    module=contract&action=getsourcecode&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

export const getMantleABI = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-sepolia.mantlescan.xyz/api?
    module=contract&action=getabi&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

export const getHyperspaceTransactions = async (contractAddress) => {
  // eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE2Nzk3NjgwNDksImp0aSI6IlZhaWJoYXYgQXJvcmEsYXJvcmF2YWliaGF2ODE3QGdtYWlsLmNvbSJ9.aBzYHpeltajrBkX3J1__-RcTvvGenNBDWZroTHHImEt10i3HCLv0boWsWrr0oa0SAWKsWVxwldQYze-b7mEaIg
  const data = await fetch(`
    https://api.zondax.ch/fil/data/v1/hyperspace
    `);

  const response = await data.json();

  return response;
};

export const getScrollTransactions = async (contractAddress) => {
  const data = await fetch(`
    	
https://api-sepolia.scrollscan.com/api?module=account&action=txlist&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

//contract should be verified
export const getScrollABI = async (contractAddress) => {
  const data = await fetch(`
        	
https://api-sepolia.scrollscan.com/api?
        module=contract&action=getabi&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

export const getScrollSourceCode = async (contractAddress) => {
  const data = await fetch(`   	
https://api-sepolia.scrollscan.com/api?
        module=contract&action=getsourcecode&address=${contractAddress}
    `);

  const response = await data.json();

  return response;
};

export const getzkSyncTransactions = async (contractAddress) => {
  const data = await fetch(`
    https://sepolia-api.zksync.io/api/v0.2/accounts/${contractAdress}/transactions?from=latest&limit=10&direction=older
    `);
};

export const getzkSyncSourceCode = async (contractAddress) => {};

export const getzkSyncABI = async (contractAddress) => {};
