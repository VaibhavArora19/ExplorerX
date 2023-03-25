import ContractInput from './ContractInput';
import {
  optimisticVerificationContract,
  optimisticVerificationABI,
} from '@/constants';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { createContractDifferent } from '@/polybase/queries';
import { createChainRecord } from '@/polybase/queries';
import randomstring from 'randomstring';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

const ManualContract = () => {
  const [showModal, setShowModal] = useState(false);
  const [contractName, setContractName] = useState('');
  const [contractDescription, setContractDescription] = useState('');
  const [pastedContract, setPastedContract] = useState('');
  const [ABI, setABI] = useState('');
  const [addresses, setAddresses] = useState([
    {
      contractAddress: null,
      chain: null,
    },
  ]);
  const { address } = useAccount();


  const addAddressHandler = (id, updatedAddress, updatedChain) => {
    let updatedAddresses = addresses;

    updatedAddresses[id] = {
      contractAddress: updatedAddress,
      chain: updatedChain,
    };
    setAddresses(updatedAddresses);
  };

  const newAddressHandler = () => {
    setAddresses((prevState) => {
      return [...prevState, { contractAddress: null, chain: null }];
    });
  };

  const submitHandler = async () => {
    const contractId = randomstring.generate();

    let data = '[';

    for (let address of addresses) {
      data =
        data +
        `{address: ${address.contractAddress}, chain: ${address.chain}},`;
    }

    data = data + ']';

    let ancillaryData = `Is the source code of all the contract addresses same: ${data}`;

    await ethereum.request({ method: 'eth_requestAccounts' });

    const chainId = await ethereum.request({ method: "eth_chainId" });

    if(chainId !== "0x5") {
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }], // chainId must be in hexadecimal numbers
        });
      }

    const library = new ethers.providers.Web3Provider(window.ethereum);
    const getSigner = library.getSigner();

    const contract = new ethers.Contract(optimisticVerificationContract, optimisticVerificationABI, getSigner);
    await contract.assertTruth(ancillaryData, contractId);

    const chainIds = [];
    for (let address of addresses) {
      const response = await createChainRecord(
        address.contractAddress,
        contractId,
        address.chain,
        address.contractAddress
      );
      chainIds.push(response.data.id);
    }

    const newContract = await createContractDifferent(
      contractId,
      contractName,
      contractDescription,
      address,
      pastedContract,
      ABI,
      chainIds,
      true,
      false
    );
  };

  return (
    <div className="text-white font-Poppins bg-[#1E1E1E] mt-16 relative w-[700px] py-14 px-10 rounded-2xl">
      <AiOutlineInfoCircle
        onMouseEnter={() => {
          setShowModal(true);
        }}
        onMouseLeave={() => {
          setShowModal(false);
        }}
        size={24}
        className="absolute right-10 top-7 text-yellow-400 cursor-pointer"
      />
      <h2 className="text-xl font-semibold mb-7">Add Existing contracts</h2>
      <div className="flex flex-col">
        <label className="text-sm text-gray-400">Name</label>
        <input
          onChange={(e) => {
            setContractName(e.target.value);
          }}
          value={contractName}
          type="text"
          placeholder="Price Converter"
          className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-6"
        />

        <label className="text-sm text-gray-400">Description</label>
        <textarea
          onChange={(e) => {
            setContractDescription(e.target.value);
          }}
          value={contractDescription}
          rows={2}
          maxLength={1000}
          className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 mb-4 outline-none max-h-[200px]"
          placeholder="A short description of smart contract"
        />

        <label className="text-sm text-gray-400">Contract</label>
        <textarea
          onChange={(e) => {
            setPastedContract(e.target.value);
          }}
          value={pastedContract}
          rows={5}
          // maxLength={1000}
          className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 mb-4 outline-none max-h-[200px]"
          placeholder="Paste your contract here"
        />

        <label className="text-sm text-gray-400">ABI</label>
        <textarea
          onChange={(e) => {
            setABI(e.target.value);
          }}
          value={ABI}
          rows={3}
          // maxLength={1000}
          className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 mb-4 outline-none max-h-[200px]"
          placeholder="Paste your ABI here"
        />

        <label className="text-sm text-gray-400 mb-1 mt-3">
          Add deployed addressess
        </label>
        <div className="flex items-center gap-3 relative w-fit">
          <div className="flex flex-col items-center gap-4">
            {addresses.map((_, index) => {
              return (
                <ContractInput
                  id={index}
                  addAddress={addAddressHandler}
                />
              );
            })}
          </div>
          <button
            className="bg-white/70 text-black absolute -right-20 py-3 top-0 px-7 text-xl rounded-lg uppercase font-semibold"
            onClick={newAddressHandler}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <button
          className="w-full mt-10 bg-black/40 hover:bg-black font-semibold py-4 rounded-xl"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>

      {showModal && (
        <div className="bg-gray-700/90 py-3 px-4 rounded-md absolute shadow-2xl w-[300px] z-10 top-12 right-14">
          <h3 className="text-md text-red-300 mb-3">Having trouble?</h3>
          <p className=" text-left text-sm text-green-200">
            Deploy your existing contracts on ExplorerX. to track all your
            transactions & contract details on tip of your fingers.
          </p>

          <p className="text-yellow-300 font-semibold my-2">Steps to follow:</p>

          <ol className="list-decimal ml-3 text-xs mt-2">
            <li>Add contract details</li>
            <li>Select Chain</li>
            <li>Add address</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ManualContract;
