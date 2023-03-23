import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import Loader from "../Loader/Loader";
import { useContract, useSigner } from "wagmi";
import { ethers } from "ethers";
import Confetti from "react-confetti";
import { useWindowDimensions } from "@/constants/windowSize.js";
import { createContractSimilar } from "@/polybase/queries";
import randomstring from "randomstring";
import {
  deployerAbi,
  contractAddress,
  connextDomains,
  rpcUrls,
} from "@/constants";
const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-0 left-0 fixed bg-black/20 backdrop-blur-md h-screen w-screen"
    ></div>
  );
};

const DeployModal = ({
  onClose,
  bytecode,
  formData,
  setFormData,
  initializable,
  initializableData,
  abi,
}) => {
  const [generatingAddress, setGeneratingAddress] = useState(false);
  const [startDeploying, setStartDeploying] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [salt, setSalt] = useState("");
  const [computedAddress, setComputedAddress] = useState("");
  const { data: signer } = useSigner();
  const contract = useContract({
    address: contractAddress,
    abi: deployerAbi,
    signerOrProvider: signer,
  });

  const { height, width } = useWindowDimensions();

  console.log("abi is", abi);
  const computeAddress = async () => {
    try {
      if (salt === "") {
        alert("Please enter salt");
        return;
      }
      const abiCoder = new ethers.utils.AbiCoder();
      const saltbytes = abiCoder.encode(["uint256"], [salt]);
      const address = await contract.computeAddress(saltbytes, bytecode);
      console.log(address, "address");
      setComputedAddress(address);
    } catch (err) {
      console.log(err, "compute address");
    }
  };

  const generateAddressHandler = async () => {
    if (salt === "") {
      alert("Please enter salt");
      return;
    }
    setGeneratingAddress(true);
    await computeAddress();
  };

  console.log(bytecode);

  //polybase function
  const addToPolybase = async () => {
    const contractId = computedAddress;

    let chains = [];

    for(let chain of formData?.multichains) {
      chains.push(chain.chainName);
    }

    const data = await createContractSimilar(contractId, formData?.contractName, formData?.contractDescription, "0xEDbFce814BB0e816e2A18545262D8A32E32EDA43",
    formData?.contractPasted, JSON.stringify(abi), chains);

    console.log('polybase', data);


    // const chainIds = [];
    // const chainNames = [...formData.multichains, formData.currentDeployChain];
    // for (let chain of chainNames) {
    //   //add chains here
    //   const chainId = randomstring.generate();
    //   let chainContract = await createChainRecord(
    //     chainId,
    //     contractId,
    //     chain?.chainName,
    //     computedAddress
    //   );
    // }

    // //owner address needs to be updated
    // let newContract = await createContractRecord(
    //   contractId,
    //   formData?.contractName,
    //   formData?.contractDescription,
    //   "0xEDbFce814BB0e816e2A18545262D8A32E32EDA43",
    //   formData?.contractPasted,
    //   JSON.stringify(abi),
    //   chainIds
    // );
  };

  const deployContractHandler = async () => {
    try {
      if (salt === "") {
        alert("Please enter salt");
        return;
      }
      setStartDeploying(true);
      //this function will add all the formdata to polbase
      addToPolybase();
      const abiCoder = new ethers.utils.AbiCoder();
      const saltbytes = abiCoder.encode(["uint256"], [salt]);
      console.log(saltbytes, "saltbytes");
      console.log(bytecode, "bytecode");
      let domains = [];
      let fees = [];
      let tx;
      if (
        formData.currentDeployChain.chainName in connextDomains &&
        formData.multichains.length > 0
      ) {
        const keys = Object.keys(connextDomains);

        for (let i = 0; i < keys.length; i++) {
          if (formData.currentDeployChain.chainName !== keys[i]) {
            domains.push(connextDomains[keys[i]]);
            if (keys[i] === "Polygon Mumbai") {
              fees.push(ethers.utils.parseEther("0.01"));
            } else {
              fees.push(ethers.utils.parseEther("0.01"));
            }
          }
        }

        let totalFee = ethers.utils.parseEther("0");
        for (let i = 0; i < fees.length; i++) {
          totalFee = totalFee.add(fees[i]);
        }
        console.log(totalFee, "totalFee");
        tx = await contract.xDeployer(
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
        console.log(tx, "tx");
        const selectedChains = formData.multichains;
        for (let i = 0; i < selectedChains.length; i++) {
          if (!(selectedChains[i].chainName in connextDomains)) {
            console.log(
              selectedChains[i].chainName,
              "selectedChains[i].chainName"
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
                initializableData,
                {
                  gasPrice: 1000000000,
                }
              );
            console.log(tx, "tx");
          }
        }
      } else {
        const selectedChains = formData.multichains;
        tx = await contract.deployContract(
          saltbytes,
          bytecode,
          initializable,
          initializableData,
          { gasPrice: 1000000000 }
        );
        console.log(tx, "tx");
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
              initializableData,
              { gasPrice: 1000000000 }
            );
          console.log(tx, "tx");
        }
      }
      await tx.wait();

      setDeploymentSuccess(true);
    } catch (err) {
      alert(err.message, "DeployContract");
      setStartDeploying(false);
    }
  };

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className="w-[550px] bg-[#111111] p-10 rounded-2xl absolute top-[50%] left-[50%] shadow-md -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-800">
        {startDeploying ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <AiOutlineDeploymentUnit color="white" size={80} />
            <p className="text-green-300 text-sm">
              {deploymentSuccess
                ? "Deployment Success"
                : "Deploying Contract..."}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center gap-4">
              <AiOutlineDeploymentUnit color="white" size={80} />
              <p className="text-green-300 text-sm">
                {generatingAddress
                  ? computedAddress
                    ? "Generated Address"
                    : "Generating Address..."
                  : "Successfully Compiled!"}
              </p>
            </div>

            <>
              <p className="text-xs text-gray-400 mt-6 mb-1">
                Enter the salt value
              </p>
              <input
                className="py-2 px-2  text-gray-400 border border-gray-700 rounded-md w-full focus:outline-none bg-transparent"
                type="number"
                id="salt"
                onChange={(e) => setSalt(e.target.value)}
              ></input>

              {computedAddress !== "" && (
                <div>
                  <p className="text-xs text-gray-400 mt-6 mb-1">
                    Generated Address
                  </p>
                  <p className="py-3 px-2 border text-gray-400 border-gray-700 rounded-md w-full">
                    {computedAddress}
                  </p>
                </div>
              )}
              <button
                onClick={generateAddressHandler}
                className="py-3 px-7 rounded-md bg-[#191919] hover:bg-[#111111] text-gray-300 border border-gray-600 mt-4 w-full"
              >
                Generate Address
              </button>
              <p className="text-xs mt-1 text-gray-400 text-center">
                Generate an address for your compiled contract
              </p>
            </>
            {computedAddress !== "" && (
              <div>
                <p className="text-xs text-gray-400 mt-4 mb-1">
                  if you like the address generated then you can go for
                  deployment otherwise you can alter the salt and generate new
                  address
                </p>
                <button
                  onClick={deployContractHandler}
                  className="py-3 px-7 rounded-md bg-[#1F423A] hover:bg-[#1a3831] text-green-300 border border-gray-600 mt-4 w-full"
                >
                  Deploy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {deploymentSuccess && <Confetti width={width} height={height} />}
    </div>
  );
};

export default DeployModal;
