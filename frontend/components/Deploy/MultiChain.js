import Image from "next/image";
import React, { useState } from "react";
import polygonSvg from "../../public/assets/deploy/polygon.svg";
import gnosisImg from "../../public/assets/deploy/gnosisImg.png";
import scrollImg from "../../public/assets/deploy/scrollImg.png";
import zksyncImg from "../../public/assets/deploy/ZKsyncImg.png";
import optimismImg from "../../public/assets/deploy/optimism.png";
import fvmImg from "../../public/assets/deploy/fvm.png";
import mantleImg from "../../public/assets/deploy/mantle.jpeg";

const chains = [
  {
    id: "80002",
    chainImg: polygonSvg,
    chainName: "Polygon Amoy",
  },
  {
    id: "10200",
    chainImg: gnosisImg,
    chainName: "Gnosis Chiado",
  },
  {
    id: "534351",
    chainImg: scrollImg,
    chainName: "Scroll Sepolia",
  },
  {
    id: "11155420",
    chainImg: optimismImg,
    chainName: "Optimism Sepolia",
  },
  {
    id: "300",
    chainImg: zksyncImg,
    chainName: "ZKSync Sepolia",
  },
  {
    id: "5003",
    chainImg: mantleImg,
    chainName: "Mantle Sepolia",
  },
];

const MultiChain = ({ formData, setFormData, page, setPage }) => {
  const [chainSelected, setChainSelected] = useState(formData.multichains);

  const nextPageHandler = () => {
    setFormData({ ...formData, multichains: chainSelected });
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  const setSelectedChain = (chain) => {
    let index = chainSelected.findIndex((c) => c.chainName === chain.chainName);

    if (index !== -1) {
      chainSelected.splice(index, 1);
      setChainSelected([...chainSelected]);
    } else {
      setChainSelected([...chainSelected, chain]);
    }
  };
  console.log(chainSelected, "chainSelected");

  return (
    <div className="text-white w-[800px] bg-[#1E1E1E] py-10  px-10 rounded-2xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-7">Multichain</h2>

      <form className="flex flex-col">
        <p className="text-sm text-gray-400 mb-1">Choose multiple chain</p>

        <div className="flex flex-wrap justify-between gap-5">
          {chains.map((chain, index) => {
            let isChainSelected = chainSelected.findIndex((c) => c.chainName === chain.chainName) >= 0;
            if (chain.chainName !== formData.currentDeployChain.chainName)
              return (
                <div
                  onClick={() => {
                    setSelectedChain(chain);
                  }}
                  className={`py-3 px-4 w-[300px] items-center flex gap-4 hover:bg-[#323131] bg-[#161616] cursor-pointer rounded-xl ${
                    isChainSelected && `bg-[#323131]`
                  }`}
                >
                  <Image src={chain.chainImg} alt={chain.chainName} width={40} height={40} />
                  <div>
                    <h3 className="font-semibold">{chain.chainName}</h3>
                    {/* <p className="text-[12px] tracking-wide text-gray-500">
                  {chain.chainAdd}
                </p> */}
                  </div>
                </div>
              );
          })}
        </div>
      </form>

      <div className="flex justify-between mt-6">
        <button
          onClick={previousPageHandler}
          type="button"
          className="py-3 px-7 rounded-md bg-[#161616] hover:bg-[#111111] text-gray-300 border border-gray-600"
        >
          Back
        </button>
        <button
          onClick={nextPageHandler}
          type="button"
          className="py-3 px-7 rounded-md bg-[#161616] hover:bg-[#111111] text-gray-300 border border-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiChain;
