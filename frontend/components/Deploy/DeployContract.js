import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { ethers } from "ethers";
import {
  deployerAbi,
  contractAddress,
  connextDomains,
  rpcUrls,
} from "@/constants";
import DeployModal from "./DeployModal";

const DeployContract = ({ setPage, page, formData, setFormData, addData }) => {
  const [initializable, setInitializable] = useState(false);
  const [initializableData, setInitializableData] = useState("0x");
  const [bytecode, setBytecode] = useState("");
  const [abi, setAbi] = useState("");
  const [showCompileModal, setShowCompileModal] = useState(false);

  console.log(formData, "formData");

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  const closeModalHandler = () => {
    setShowCompileModal(false);
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
      if (response.status === 200) {
        setAbi(data.output.abi);
        if (initializable) {
          setInitializableData(initializeBytecode());
        }
        setBytecode(data.output.bytecode);

        // showing the compile modal
        setShowCompileModal(true);
      } else {
        alert(data.output);
      }
    } catch (err) {
      console.log(err, "Compile");
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
    <>
      <p
        onClick={previousPageHandler}
        className="text-gray-500 flex items-center gap-1 text-sm absolute top-14 left-[23%] cursor-pointer"
      >
        <span>
          <BsArrowLeftShort />
        </span>
        Back
      </p>
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
            !formData.contractPasted.length && "cursor-not-allowed"
          } ${initializable ? "bg-[#1a3831] text-green-300" : "bg-[#363636]"} `}
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

        <button
          disabled={!formData.contractPasted.length ? true : false}
          onClick={compileHandler}
          className={`py-3 bg-[#1a3831] border-green-700 border text-green-300 rounded-xl mt-4 hover:bg-[#142c26] ${
            !formData.contractPasted.length && "cursor-not-allowed"
          }`}
        >
          Compile
        </button>

        {showCompileModal && (
          <DeployModal
            onClose={closeModalHandler}
            bytecode={bytecode}
            abi={abi}
            formData={formData}
            setFormData={setFormData}
            initializableData={initializableData}
            initializable={initializable}
          />
        )}
      </div>
    </>
  );
};

export default DeployContract;
