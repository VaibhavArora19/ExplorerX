import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { ethers } from "ethers";
import { useContract, useSigner } from "wagmi";
import { deployerAbi, contractAddress, connextDomains } from "@/constants";

const DeployContract = ({ setPage, page, formData, setFormData }) => {
  const [initializable, setInitializable] = useState(false);
  const { data: signer } = useSigner();
  const [salt, setSalt] = useState("");
  const [bytecode, setBytecode] = useState("");
  const [abi, setAbi] = useState("");
  const [computedAddress, setComputedAddress] = useState("");
  const contract = useContract({
    address: contractAddress,
    abi: deployerAbi,
    signerOrProvider: signer,
  });

  console.log(formData, "formData");

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

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

  const compileHandler = async () => {
    try {
      const sourceCode = formData.contractPasted;
      const response = await fetch("./api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCode }),
      });
      const data = await response.json();
      console.log(data, "data");
      setAbi(data.output.abi);
      if (initializable) {
        const bytecode = initializeBytecode();
        setBytecode(data.output.bytecode + bytecode);
      } else {
        setBytecode(data.output.bytecode);
      }
    } catch (err) {
      console.log(err, "Compile");
    }
  };

  const deployContractHandler = async () => {
    try {
      if (salt === "") {
        alert("Please enter salt");
        return;
      }
      const abiCoder = new ethers.utils.AbiCoder();
      const saltbytes = abiCoder.encode(["uint256"], [salt]);
      let domains = [];
      let fees = [];
      if (formData.currentDeployChain.chainName in connextDomains) {
        const keys = Object.keys(connextDomains);

        for (let i = 0; i < keys.length; i++) {
          if (formData.currentDeployChain.chainName !== keys[i]) {
            domains.push(connextDomains[keys[i]]);
            if (keys[i] === "Polygon Mumbai") {
              fees.push(ethers.parseEther("15"));
            } else {
              fees.push(ethers.parseEther("0.1"));
            }
          }
        }
      }
      console.log(domains, "domains");
      console.log(fees, "fees");

      // const tx = await contract.deploy(saltbytes, bytecode);
      // const receipt = await tx.wait();
      // console.log(receipt, "receipt");
    } catch (err) {
      console.log(err, "DeployContract");
    }
  };

  const initializeBytecode = () => {
    const argTypes = document.getElementById("argTypes").value;
    const argValues = document.getElementById("argValues").value;
    let ABI = ["function initialize(" + argTypes + ")"];
    let iface = new ethers.Interface(ABI);
    const bytecode = iface.encodeFunctionData(
      "initialize",
      argValues.split(",").map((arg) => arg.trim())
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
      <div
        onClick={initializableHandler}
        className={`py-3 w-[150px] text-center rounded-md mb-1 cursor-pointer ${
          initializable ? "bg-[#22335F] text-blue-300" : "bg-[#363636]"
        } `}
      >
        Initialize
      </div>
      {initializable && (
        <div className="flex flex-col ">
          <p>Arguement types</p>
          <input id="argTypes" className="text-black"></input>
          <p>Arguement values</p>
          <input id="argValues" className="text-black"></input>
        </div>
      )}
      {bytecode != "" && (
        <div className="flex flex-col mt-5">
          {computedAddress !== "" && <p>{computedAddress}</p>}
          <p className="text-sm text-gray-300">salt</p>
          <input
            className="text-black"
            type="number"
            id="salt"
            onChange={(e) => setSalt(e.target.value)}
          ></input>
          <button
            className=" bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800"
            onClick={() => computeAddress()}
          >
            Generate Address
          </button>
        </div>
      )}

      {bytecode == "" ? (
        <button
          onClick={compileHandler}
          className="py-3 bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800"
        >
          Compile
        </button>
      ) : (
        <button
          onClick={deployContractHandler}
          className="py-3 bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800"
        >
          Deploy
        </button>
      )}
    </div>
  );
};

export default DeployContract;
