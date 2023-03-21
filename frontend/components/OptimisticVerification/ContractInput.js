import { useState } from "react";

const ContractInput = ({id, addAddress}) => {
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateChain, setUpdateChain] = useState('');

    const updateInformation = (address, chain) => {
       addAddress(id, address, chain);
    }

    const updateAddressHandler = (event) => {
        setUpdateAddress(event.target.value);
        updateInformation(event.target.value, updateChain);
    }

    const updateChainHandler = (event) => {
        setUpdateChain(event.target.value);
        updateInformation(updateAddress, event.target.value);
    }

  return (
    <div className="flex">
      <div>
        <input placeholder="Add Address" onChange={updateAddressHandler} value={updateAddress}></input>
      </div>
      <div>
        <select name="chain" onChange={updateChainHandler} value={updateChain}>
          <option value="Polygon Mumbai">Polygon</option>
          <option value="Gnosis">Gnosis</option>
          <option value="Scroll">Scroll</option>
          <option value="Optimism">Optimism</option>
          <option value="zksync">zkSync</option>
        </select>
      </div>
    </div>
  );
};

export default ContractInput;
