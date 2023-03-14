const { Polybase } = require("@polybase/client");

const createDB = () => {
    const db = new Polybase({
        defaultNamespace: 'checking'
    });
    
    return db;
}

const createContractRecord = async (id, chains) => {

    const db = createDB();

    const response = await db.collection('Contracts').create([id, chains])
    
    return response;
}

const readContractRecord = async (id) => {
    const db = createDB();

    const data = await db.collection("Contracts").record(id).get();

    return data;
};

const createChainRecord = async (id, name, contractAddress) => {

    const db = createDB();

    const response = await db.collection('Chain').create([id, name, contractAddress]);

    return response;
}

const readChainRecord = async (id) => {

    const db = createDB();

    const response = await db.collection('Chain').record(id).get();

    return response;
}

// createContractRecord('0x123');
// readRecord();
// createChainRecord('0x123', 'gnosis', '0x123').then(data => console.log(data));
readChainRecord("0x123").then(res => {
    console.log(res.data);
    createContractRecord([res.data]).then(response => {
        console.log('response is', response);
    })
});
