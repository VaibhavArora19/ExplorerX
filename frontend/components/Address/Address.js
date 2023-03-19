import Image from 'next/image';
import React, { useState } from 'react';
import { MdFileCopy } from 'react-icons/md';

const AddressComp = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddressHandler = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="bg-[#171717] py-5 mx-8 flex items-center gap-3 px-4 rounded-xl">
      <Image
        src="/assets/deploy/fvm.png"
        height={30}
        width={30}
        className="rounded-md"
        alt="random-img"
      />
      <h2 className="text-xl font-semibold text-[#A3A7B3]">Address</h2>
      <p className="text-[#78787a]">{address}</p>

      <MdFileCopy
        onClick={copyAddressHandler}
        size={20}
        className="text-[#78787a] cursor-pointer hover:text-gray-200"
      />

      {isCopied && <p className="text-xs text-white mt-2">Copied!</p>}
    </div>
  );
};

export default AddressComp;
