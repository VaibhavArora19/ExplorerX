import Image from 'next/image';
import React from 'react';
import { AiFillCheckCircle, AiOutlineDeploymentUnit } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiCrossedChains, GiPartyPopper } from 'react-icons/gi';

const Helper = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-6 my-8">
      {/* <Image src={img} alt={title} width={35} height={60} /> */}
      <>{icon}</>
      <div>
        <h2 className="text-white font-medium mb-1">{title}</h2>
        <p className="text-[#737682] text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

const data = [
  {
    id: 's1',
    icon: (
      <AiFillCheckCircle
        // color="#1e1e1e"
        className="text-green-200 "
       size={35}
      />
    ),
    title: 'Basic details',
    subtitle: 'Enter contract description',
  },
  {
    id: 's2',
    icon: (
      <SiHiveBlockchain
        className="text-blue-200 "
       size={35}
      />
    ),
    title: 'Choose a chain',
    subtitle: 'Select a chain for deploying contract',
  },
  {
    id: 's3',
    icon: (
      <GiCrossedChains
        className="text-yellow-200 "
       size={35}
      />
    ),
    title: 'Multichain deployment',
    subtitle: 'Choose multichains to deploy',
  },
  {
    id: 's4',
    icon: (
      <AiOutlineDeploymentUnit
        // color="#1e1e1e"
       size={35}
        className="text-purple-400"
      />
    ),
    title: 'Deploy Contract',
    subtitle: 'Paste the contract for deployment',
  },
  {
    id: 's5',
    icon: (
      <GiPartyPopper
        // color="#1e1e1e"
       size={35}
        className='text-red-400'
      />
    ),
    title: 'Success',
    subtitle: 'Wohooo! Check the deployed contract ',
  },
];

const Introduction = ({ setPage, page }) => {
  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1);
  };

  return (
    <div className="bg-[#1E1E1E]  rounded-2xl w-[500px] border-gray-700 border px-10 py-8">
      <h2 className="text-lg font-semibold text-white">
        Deploy Smartcontracts
      </h2>
      {data.map((item) => (
        <Helper
          key={item.id}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}

      <button
        onClick={nextPageHandler}
        className="py-3 w-full bg-[#161616] border-gray-700 border text-white rounded-xl mt-4 hover:bg-[#111111]"
      >
        Get Started
      </button>
    </div>
  );
};

export default Introduction;
