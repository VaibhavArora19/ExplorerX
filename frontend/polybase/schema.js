const { Polybase } = require("@polybase/client");

const createSchema = async () => {

const db = new Polybase({
    defaultNamespace: 'test'
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