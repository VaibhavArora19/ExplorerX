import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsArrowDownRight } from 'react-icons/bs';

const Multichains = ({ alternateContracts }) => {
  const [showChains, setShowChains] = useState(false);
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="py-3 px-3 rounded-md bg-[#171717] flex-[0.5] flex flex-col gap-1 max-h-[350px] overflow-y-scroll">
      <p className="text-[#78787a] font-semibold text-sm py-3 pl-2">
        Multichain Addresses
      </p>

      <p
        onClick={() => {
          setShowChains(!showChains);
        }}
        className="text-gray-300 p-4 text-sm flex items-center justify-between bg-[#222222] cursor-pointer rounded-md"
      >
        View all deployed chains!
        <span>
          <BsArrowDownRight />
        </span>
      </p>

      {showChains && (
        <div className="bg-[#333333] rounded-md h-fit pt-2 px-2 select-none overflow-y-scroll">
          {alternateContracts.map((chain) => (
            <p
              onClick={() => {
                router.push(
                  `${address}/?chain=${chain.title.toLowerCase().split(' ')[0]}`
                );
              }}
              className="py-3 px-4 cursor-pointer flex justify-between items-center bg-[#1e1e1e] mb-2 rounded-md text-white"
            >
              {chain.title} <span className="text-xs text-gray-500">View</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Multichains;
