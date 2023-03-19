// const { Polybase } = require("@polybase/client");
import { Polybase } from "@polybase/client";

//There is still a problem with polybase when user will deploy to multiple chains he will get multiple addresses
//then he will send all of the id of the chains record to createContractReecord function and then 
//we need to call the record function and then we will pass all of those records, to the Contracts collection
export const createDB = () => {
    const db = new Polybase({
        defaultNamespace: 'polybaseTest'
    });
    
    return db;
}

export const createContractRecord = async (id, chainIds) => {

    const db = createDB();

    let chainContracts = [];

    for(let chain of chainIds) {

        chainContracts.push(db.collection('Chain').record(chain));
    }
    const response = await db.collection('Contracts').create([id, chainContracts])
    
    return response;
}

export const readContractRecord = async (id) => {
    const db = createDB();

    const data = await db.collection("Contracts").record(id).get();

    return data;
};

 const createChainRecord = async (id, contractId, name, contractAddress) => {

    const db = createDB();

    const response = await db.collection('Chain').create([id, contractId, name, contractAddress]);

    return response;
}

export const readChainRecord = async (id) => {

    const db = createDB();

    const response = await db.collection('Chain').record(id).get();

    return response;
}

// let chainId = ["0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7", "0x3E14dC1b13c488a8d5D310918780c983bD5982E7", "0x4E583d9390082B65Bef884b629DFA426114CED6d", "0x567c4B141ED61923967cA25Ef4906C8781069a10"]
// createContractRecord('1234', chainId).then(data => console.log(data));
// readContractRecord('0x123').then(data => console.log(data.data.chains));
// createChainRecord('0x567c4B141ED61923967cA25Ef4906C8781069a10','1234', 'Optimism', '0x567c4B141ED61923967cA25Ef4906C8781069a10').then(data => console.log(data));
