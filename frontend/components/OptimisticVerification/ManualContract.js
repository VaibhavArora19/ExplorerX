import ContractInput from "./ContractInput";
import { useContract, useSigner, useNetwork, useSwitchNetwork } from "wagmi";
import { optimisticVerificationContract, optimisticVerificationABI} from "@/constants";
import { useState } from "react";

const ManualContract = () => {
    const [addresses, setAddresses] = useState([{
        contractAddress: null,
        chain: null
    }]); 
    const { data: signer } = useSigner();
    const { chain } = useNetwork();

    const contract = useContract({
        address: optimisticVerificationContract,
        abi: optimisticVerificationABI,
        signerOrProvider: signer
    });


    
    const addAddressHandler = (id, updatedAddress, updatedChain) => {
        let updatedAddresses = addresses;


        updatedAddresses[id] = {
            contractAddress: updatedAddress,
            chain: updatedChain
        };
        setAddresses(updatedAddresses);
    }

    const newAddressHandler = () => {
        setAddresses((prevState) => {
            return [...prevState, {contractAddress: null, chain: null}]
        });
    }

    const submitHandler = async () => {

        let data = '[';

        for(let address of addresses) {
            data = data + `{address: ${address.contractAddress}, chain: ${address.chain}},`
        }

        data = data + ']';

        let ancillaryData = `Is the source code of all the contract addresses same: ${data}`;

        if(chain?.id !== 5) {
            console.log('here');
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }], // chainId must be in hexadecimal numbers
              });
            await contract?.requestData(ancillaryData);
        }else {
            await contract?.requestData(ancillaryData);
        }
    }

    return (
        <div>
            <h1>Select Chains</h1>
            <div>
                {addresses.map((_, index) => {
                    return <ContractInput id={index} addAddress={addAddressHandler}/>
                })
                }
            </div>
            <div>
                <button onClick={newAddressHandler}>Add new address</button>
            </div>
            <div>
                <button onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
};

export default ManualContract;