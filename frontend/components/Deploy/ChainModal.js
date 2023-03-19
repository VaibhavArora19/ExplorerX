import Image from "next/image";
import React, { useState } from "react";
import polygonSvg from "../../public/assets/deploy/polygon.svg";
import gnosisImg from "../../public/assets/deploy/gnosisImg.png";
import scrollImg from "../../public/assets/deploy/scrollImg.png";
import zksyncImg from "../../public/assets/deploy/ZKsyncImg.png";
import optimismImg from "../../public/assets/deploy/optimism.png";
import fvmImg from "../../public/assets/deploy/fvm.png";
import mantleImg from "../../public/assets/deploy/mantle.png";

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-0 left-0 fixed bg-black/20 backdrop-blur-md h-screen w-screen"
    ></div>
  );
};

const chains = [
  {
    id: "c1",
    chainImg: polygonSvg,
    chainName: "Polygon",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c2",
    chainImg: gnosisImg,
    chainName: "Gnosis",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c3",
    chainImg: scrollImg,
    chainName: "Scroll",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c4",
    chainImg: optimismImg,
    chainName: "Optimism",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c5",
    chainImg: fvmImg,
    chainName: "FVM",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c6",
    chainImg: zksyncImg,
    chainName: "ZKSync",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c7",
    chainImg: mantleImg,
    chainName: "Mantle",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
  {
    id: "c8",
    chainImg: polygonSvg,
    chainName: "Sepolia",
    chainAdd: "0xq090190310zja8q9409qe2420",
  },
];

const ChainModal = ({ onClose, sendData }) => {
  // const [chain, setChain] = useState(null)

  const onClick = (chain) => {
    const data = {
      chainName: chain.chainName,
      chainImg: chain.chainImg,
      chainAdd: chain.chainAdd,
    };
    sendData(data);
    onClose();
  };

  return (
    <>
    <Backdrop onClose={onClose} />
    <div className='w-[450px] rounded-2xl absolute top-[50%] left-[46%] shadow-md -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-800'>
        <div className='bg-[#232323] pt-6 pb-10 px-4 w-full  rounded-t-2xl'>
            <h2 className='text-gray-500 font-semibold'>Select a Chain</h2>
        </div>
        <div className=" bg-[#151515] p-3 text-white flex flex-col gap-2 overflow-y-scroll max-h-[350px]">
          {chains.map((chain, i) => (
            <div
              onClick={() => onClick(chain)}
              className="py-3 px-3 flex gap-4 hover:bg-[#323131] cursor-pointer rounded-xl"
            >
              <Image
                src={chain.chainImg}
                alt={chain.chainName}
                width={40}
                height={40}
              />
              <div className="flex items-center">
                <h3 className="font-semibold">{chain.chainName}</h3>
                {/* <p className='text-[12px] tracking-wide text-gray-500'>{chain.chainAdd}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChainModal;
