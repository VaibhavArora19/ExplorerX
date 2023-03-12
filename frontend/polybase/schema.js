// import { Polybase } from "@polybase/client";
const { Polybase } = require("@polybase/client");

const createSchema = async () => {

const db = new Polybase({
    defaultNamespace: 'contracts'
});

const createResponse = await db.applySchema(`
    @public
    collection Contracts {
        id: string;
        chains?:
            {
                name: string;
                address: string;
            };
        transactions?:
            {
            method: string;
            txHash: string;
            block: number;    
        };

    @index(id);

    constructor(id: string) {
        this.id = id;
    }
    }
`);

console.log('response ', createResponse);
};



const addRecord = async () => {
    const db = new Polybase({
        defaultNamespace: 'contracts'
    });
    
    const response = await db.collection('Contracts').create(['12'])
    console.log(response);
}

const readRecord = async () => {
    const db = new Polybase({
        defaultNamespace: 'contracts'
    });
    const data = await db.collection("Contracts").record("12").get();
    console.log(data);
};

// addRecord();
// createSchema();
readRecord();