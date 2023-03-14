const getPolygonTransactions = async (contractAddress) => {
  const data = await fetch(
    `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}`
  );
  const response = await data.json();

  return response;
};

//returns the source code of the smart contract if the smart contract is verified
const getPolygonSourceCode = async (contractAddress) => {
    const data = await fetch(`
    https://api-testnet.polygonscan.com/api
    ?module=contract
    &action=getsourcecode
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}
    `)

    const response = await data.json();
  
    return response;
}


//returns the ABI of the smart contract
const getPolygonABI = async (contractAddress) => {
    const data = await fetch(`
    https://api-testnet.polygonscan.com/api
    ?module=contract
    &action=getabi
    &address=${contractAddress}
    &apikey=${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_API_KEY}
    `)

    const response = await data.json();
  
    return response;
}


const getGnosisTransactions = async (contractAddress) => {
    const data = await fetch(`
        https://blockscout.com/gnosis/chiado/api?module=contract&action=txlist&address=${contractAddress}
    `)

    const response = await data.json();
  
    return response;
}

//contract should be verified
const getGnosisSourceCode = async(contractAddress) => {
    const data = await fetch(`
        https://blockscout.com/gnosis/chiado/api?module=contract&action=getsourcecode&address=${contractAddress}
    `);

    const response = await data.json();
  
    return response;
}

//contract should be verified
const getGnosisABI = async (contractAddress) => {
    const data = await fetch(`
        http://blockscout.com/gnosis/chiado/api?module=contract&action=getabi&address=${contractAddress}
    `);

    const response = await data.json();
  
    return response;
}