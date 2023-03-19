import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { ethers } from "ethers";
const DeployContract = ({ setPage, page, formData, setFormData }) => {
  const [initializable, setInitializable] = useState(false);
  const [salt, setSalt] = useState(0);
  const [bytecode, setBytecode] = useState("");
  const [abi, setAbi] = useState("");

  console.log(formData, "formData");

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  const computeAddress = (bytecode, salt) => {};

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
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // need to get from user
      const randomNumber = 0;
      const abiCoder = new ethers.AbiCoder();
      const salt = abiCoder.encode(["uint256"], [randomNumber]);
      console.log(salt);
    } catch (err) {
      console.log(err, "DeployContract");
    }
  };

  const initializeBytecode = () => {
    const argTypes = document.getElementById("argTypes").value;
    const argValues = document.getElementById("argValues").value;
    let ABI = ["function initialize(" + argTypes + ")"];
    let iface = new ethers.Interface(ABI);
    console.log(iface);
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
          <p className="text-sm text-gray-300">salt</p>
          <input className="text-black" type="number" id="salt"></input>
          <button className=" bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800">
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
