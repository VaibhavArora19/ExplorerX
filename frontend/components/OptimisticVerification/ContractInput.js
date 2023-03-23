import Image from 'next/image';
import { useState } from 'react';


const ContractInput = ({ id, addAddress }) => {
  const [updateAddress, setUpdateAddress] = useState('');
  const [updateChain, setUpdateChain] = useState('');

  const updateInformation = (address, chain) => {
    addAddress(id, address, chain);
  };

  const updateAddressHandler = (event) => {
    setUpdateAddress(event.target.value);
    updateInformation(event.target.value, updateChain);
  };

  const updateChainHandler = (event) => {
    setUpdateChain(event.target.value);
    updateInformation(updateAddress, event.target.value);
  };

  return (
    <div className="flex rounded-lg items-center">
      <div>
        <select
          name="chain"
          onChange={updateChainHandler}
          value={updateChain}
          className="bg-[#2D2D2D] outline-none px-2 rounded-l-lg py-4"
        >
          <option value="Polygon Mumbai">Polygon</option>
          <option value="Gnosis">Gnosis</option>
          <option value="Scroll">Scroll</option>
          <option value="Optimism">Optimism</option>
          <option value="zksync">zkSync</option>
        </select>
      </div>
      <div>
        <input
          className="py-4 px-2 bg-[#232323] outline-none w-[400px] text-gray-400 rounded-r-lg  placeholder:text-sm"
          placeholder="Paste address here..."
          onChange={updateAddressHandler}
          value={updateAddress}
        ></input>
      </div>
    </div>
  );
};

export default ContractInput;
