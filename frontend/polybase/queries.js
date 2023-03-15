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

export const createContractRecord = async (id) => {

    const db = createDB();

    const response = await db.collection('Contracts').create([id, [db.collection('Chain').record(id)]])
    
    return response;
}

const readContractRecord = async (id) => {
    const db = createDB();

    const data = await db.collection("Contracts").record(id).get();

    return data;
};

export const createChainRecord = async (id, contractId, name, contractAddress) => {

    const db = createDB();

    const response = await db.collection('Chain').create([id, contractId, name, contractAddress]);

    return response;
}

export const readChainRecord = async (id) => {

    const db = createDB();

    const response = await db.collection('Chain').record(id).get();

    return response;
}

// createContractRecord('0x123').then(data => console.log(data));
// readContractRecord('0x123').then(data => console.log(data.data.chains));
// createChainRecord('0x123', 'gnosis', '0x123').then(data => console.log(data));
