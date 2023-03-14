const { Polybase } = require("@polybase/client");

const createSchema = async () => {

const db = new Polybase({
    defaultNamespace: 'checking'
});

const createResponse = await db.applySchema(`
    @public
    collection Chain {
        id: string;
        name: string;
        address: string;
        
        @index(id);

    constructor(id: string, name: string, address: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        
        }
    }


    collection Contracts {
        id: string;
        chains?: Chain[];

        @index(id);

    constructor(id: string, chains: Chains[]) {
        this.id = id;
        this.chains = chains;
        
        }
    }
`);

console.log('response ', createResponse);
};

createSchema();