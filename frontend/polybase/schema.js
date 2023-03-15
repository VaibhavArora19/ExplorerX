const { Polybase } = require("@polybase/client");

const createSchema = async () => {

const db = new Polybase({
    defaultNamespace: 'polybaseTest'
});

const createResponse = await db.applySchema(`
    @public
    collection Chain {
        id: string;
        contractId: string;
        name: string;
        address: string;
        
        @index(id);

    constructor(id: string, contractId: string, name: string, address: string) {
        this.id = id;
        this.contractId = contractId;
        this.name = name;
        this.address = address;
        
        }
    }

    @public
    collection Contracts {
        id: string;
        chains?: Chain[];

        @index(id);

    constructor(id: string, chains: Chain[]) {
        this.id = id;
        this.chains = chains;
        
        }
    }
`);

console.log('response ', createResponse);
};

createSchema();