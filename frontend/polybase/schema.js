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
        name: string;
        description?: string;
        owner: string;
        contractCode: string;
        abi: string;
        chains?: Chain[];

        @index(id);

    constructor(id: string, name: string, description: string, owner: string, contractCode: string, abi: string, chains: Chain[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.contractCode = contractCode;
        this.abi = abi;
        this.chains = chains;
        
        }
    }
`);

console.log('response ', createResponse);
};

createSchema();