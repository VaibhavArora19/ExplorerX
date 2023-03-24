const { Polybase } = require("@polybase/client");

const createSchema = async () => {

const db = new Polybase({
    defaultNamespace: 'EXplorerX'
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
    collection differentAddress {
        id: string;
        name?: string;
        description?: string;
        owner: string;
        contractCode?: string;
        abi?: string;
        chains?: Chain[];
        isUMA: boolean;
        isSettled: boolean;


        @index(id);

        constructor(id: string, name?: string, description?: string, owner: string, contractCode?: string, abi?: string, 
        chains?: Chain[], isUMA: boolean, isSettled: boolean) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.owner = owner;
            this.contractCode = contractCode;
            this.abi = abi;
            this.chains = chains;
            this.isUMA = isUMA;
            this.isSettled = isSettled;
        }

        setSettled(isSettled: boolean) {
            this.isSettled = isSettled;
        }
    }

    @public
    collection similarAddress {
        id: string;
        name: string;
        description?: string;
        owner: string;
        contractCode: string;
        abi: string;
        chains?: string[];

        @index(id);

    constructor(id: string, name: string, description: string, owner: string, contractCode: string, abi: string, chains: string[]) {
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