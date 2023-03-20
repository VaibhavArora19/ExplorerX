import React, { useState } from 'react';
import { MdFileCopy } from 'react-icons/md';

const ABIComp = ({ AbiToString }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyABIHandler = () => {
    navigator.clipboard.writeText(AbiToString);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="mt-4 px-3 py-6 relative rounded-md bg-[#1c1c1c] text-[#666667] leading-8">
      <p>{AbiToString}</p>
      <>
        <MdFileCopy
          onClick={copyABIHandler}
          size={25}
          className="absolute right-4 top-4 cursor-pointer hover:text-gray-200"
        />
        {isCopied && <p className='text-xs text-white absolute right-3 top-11'>Copied</p>}
      </>
    </div>
  );
};

export default ABIComp;
