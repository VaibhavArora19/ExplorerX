import React, { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { ethers } from 'ethers';
import { useContract, useSigner } from 'wagmi';
import {
  deployerAbi,
  contractAddress,
  connextDomains,
  rpcUrls,
} from '@/constants';
import DeployModal from './DeployModal';

const DeployContract = ({ setPage, page, formData, setFormData }) => {
  const [initializable, setInitializable] = useState(false);
  const [initializableData, setInitializableData] = useState('0x');
  const { data: signer } = useSigner();
  const [salt, setSalt] = useState('');
  const [bytecode, setBytecode] = useState('');
  const [abi, setAbi] = useState('');
  const [computedAddress, setComputedAddress] = useState('');
  const [showCompileModal, setShowCompileModal] = useState(false);
  const contract = useContract({
    address: contractAddress,
    abi: deployerAbi,
    signerOrProvider: signer,
  });

  console.log(formData, 'formData');

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  const closeModalHandler = () => {
    setShowCompileModal(false);
  };

  const computeAddress = async () => {
    try {
      if (salt === '') {
        alert('Please enter salt');
        return;
      }
      const abiCoder = new ethers.utils.AbiCoder();
      const saltbytes = abiCoder.encode(['uint256'], [salt]);
      const address = await contract.computeAddress(saltbytes, bytecode);
      console.log(address, 'address');
      setComputedAddress(address);
    } catch (err) {
      console.log(err, 'compute address');
    }
  };

  const compileHandler = async () => {
    try {
      const sourceCode = formData.contractPasted;
      const response = await fetch('./api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceCode }),
      });
      const data = await response.json();
      console.log(data, 'data');
      setAbi(data.output.abi);
      if (initializable) {
        setInitializableData(initializeBytecode());
      }
      setBytecode(data.output.bytecode);

      // showing the compile modal
      showCompileModal(true);
    } catch (err) {
      console.log(err, 'Compile');
    }
  };

  const deployContractHandler = async () => {
    try {
      if (salt === '') {
        alert('Please enter salt');
        return;
      }
      const abiCoder = new ethers.utils.AbiCoder();
      const saltbytes = abiCoder.encode(['uint256'], [salt]);
      console.log(saltbytes, 'saltbytes');
      console.log(bytecode, 'bytecode');
      let domains = [];
      let fees = [];
      if (formData.currentDeployChain.chainName in connextDomains) {
        const keys = Object.keys(connextDomains);

        for (let i = 0; i < keys.length; i++) {
          if (formData.currentDeployChain.chainName !== keys[i]) {
            domains.push(connextDomains[keys[i]]);
            if (keys[i] === 'Polygon Mumbai') {
              fees.push(ethers.utils.parseEther('0.01'));
            } else {
              fees.push(ethers.utils.parseEther('1'));
            }
          }
        }

        let totalFee = ethers.utils.parseEther('0');
        for (let i = 0; i < fees.length; i++) {
          totalFee = totalFee.add(fees[i]);
        }
        console.log(totalFee, 'totalFee');
        let tx = await contract.xDeployer(
          contractAddress,
          domains,
          saltbytes,
          bytecode,
          fees,
          initializable,
          initializableData,
          totalFee,
          {
            value: totalFee,
          }
        );
        console.log(tx, 'tx');
        const selectedChains = formData.multichains;
        for (let i = 0; i < selectedChains.length; i++) {
          if (!(selectedChains[i].chainName in connextDomains)) {
            console.log(
              selectedChains[i].chainName,
              'selectedChains[i].chainName'
            );
            const provider = new ethers.providers.JsonRpcProvider(
              rpcUrls[selectedChains[i].chainName]
            );
            const wallet = new ethers.Wallet(
              process.env.NEXT_PUBLIC_PRIVATE_KEY,
              provider
            );
            const account = wallet.connect(provider);
            let tx = await contract
              .connect(account)
              .deployContract(
                saltbytes,
                bytecode,
                initializable,
                initializableData
              );
            console.log(tx, 'tx');
          }
        }
      } else {
        const selectedChains = formData.multichains;
        let tx = await contract.deployContract(
          saltbytes,
          bytecode,
          initializable,
          initializableData
        );
        console.log(tx, 'tx');
        for (let i = 0; i < selectedChains.length; i++) {
          const provider = new ethers.providers.JsonRpcProvider(
            rpcUrls[selectedChains[i].chainName]
          );
          const wallet = new ethers.Wallet(
            process.env.NEXT_PUBLIC_PRIVATE_KEY,
            provider
          );
          const account = wallet.connect(provider);
          let tx = await contract
            .connect(account)
            .deployContract(
              saltbytes,
              bytecode,
              initializable,
              initializableData
            );
          console.log(tx, 'tx');
        }
      }
    } catch (err) {
      console.log(err, 'DeployContract');
    }
  };

  const initializeBytecode = () => {
    const argTypes = document.getElementById('argTypes').value;
    const argValues = document.getElementById('argValues').value;
    let ABI = ['function initialize(' + argTypes + ')'];
    let iface = new ethers.Interface(ABI);
    const bytecode = iface.encodeFunctionData(
      'initialize',
      argValues.split(',').map((arg) => arg.trim())
    );
    return bytecode;
  };

  const initializableHandler = () => {
    setInitializable(!initializable);
  };
  return (
    <div className="text-white w-[800px] bg-[#1E1E1E] flex flex-col p-7 pt-10 rounded-2xl border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-5">
        Deploy Smart Contract
      </h2>

      <textarea
        onChange={(event) => {
          setFormData({ ...formData, contractPasted: event.target.value });
        }}
        value={formData.contractPasted}
        rows={20}
        placeholder="Paste your contract here!"
        className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none min-h-[300px] max-h-[350px]"
      />

      <p className="text-sm mt-6 mb-2 text-gray-300">
        Select the below button if you want to initialize your contract
      </p>
      <button
        disabled={!formData.contractPasted.length ? true : false}
        onClick={initializableHandler}
        className={`py-3 w-[150px] text-center rounded-md mb-1 ${
          !formData.contractPasted.length && 'cursor-not-allowed'
        } ${initializable ? 'bg-[#1a3831] text-green-300' : 'bg-[#363636]'} `}
      >
        Initialize
      </button>
      {initializable && (
        <div className="flex flex-col ">
          <p className="text-sm mt-6 mb-2 text-gray-300">Arguement types</p>
          <input
            id="argTypes"
            className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none"
          ></input>
          <p className="text-sm mt-3 mb-2 text-gray-300">Arguement values</p>
          <input
            id="argValues"
            className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none"
          ></input>
        </div>
      )}
      {bytecode != '' && (
        <div className="flex flex-col mt-5">
          {computedAddress !== '' && <p>{computedAddress}</p>}
          <p className="text-sm text-gray-300">salt</p>
          <input
            className="text-black"
            type="number"
            id="salt"
            onChange={(e) => setSalt(e.target.value)}
          ></input>
          <button
            className=" bg-[#1a3831] border-green-200 border text-green-300 rounded-xl mt-4 hover:bg-green-800"
            onClick={() => computeAddress()}
          >
            Generate Address
          </button>
        </div>
      )}

      {bytecode == '' ? (
        <button
          disabled={!formData.contractPasted.length ? true : false}
          onClick={compileHandler}
          className={`py-3 bg-[#1a3831] border-green-700 border text-green-300 rounded-xl mt-4 hover:bg-[#142c26] ${
            !formData.contractPasted.length && 'cursor-not-allowed'
          }`}
        >
          Compile
        </button>
      ) : (
        <button
          onClick={deployContractHandler}
          className="py-3 bg-[#1a3831] border-green-700 border text-green-300 rounded-xl mt-4 hover:bg-[#142c26]"
        >
          Deploy
        </button>
      )}

      {showCompileModal && <DeployModal onClose={closeModalHandler} />}
    </div>
  );
};

export default DeployContract;
