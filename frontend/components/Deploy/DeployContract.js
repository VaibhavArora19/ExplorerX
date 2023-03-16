import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { ethers } from "ethers";
const DeployContract = ({ setPage, page, formData, setFormData }) => {
  const [initializable, setInitializable] = useState(false);
  const [salt, setSalt] = useState(0);

  console.log(formData, "formData");

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  const computeAddress = (bytecode, salt) => {};

  const deployContractHandler = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const sourceCode = formData.contractPasted;
      const response = await fetch("./api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCode }),
      });
      const data = await response.json();
      // need to get from user
      const randomNumber = 0;
      const abiCoder = new ethers.AbiCoder();
      const salt = abiCoder.encode(["uint256"], [randomNumber]);
      console.log(salt);
    } catch (err) {
      console.log(err, "DeployContract");
    }
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

      <button
        onClick={deployContractHandler}
        className="py-3 bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800"
      >
        Deploy
      </button>
    </div>
  );
};

export default DeployContract;
