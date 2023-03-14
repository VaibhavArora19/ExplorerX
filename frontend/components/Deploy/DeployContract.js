import React, { useState } from 'react'
import {AiFillInfoCircle} from 'react-icons/ai'

const DeployContract = ({setPage, page, formData, setFormData}) => {

  const [isUsingRelayer, setIsUsingRelayer] = useState(false)

  const nextPageHandler = () => {
    setPage((currPage) => currPage + 1)
  }

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1)
  }

  const deployContractHandler = () => {

    if(isUsingRelayer){
      // Contract deploy using relayer
    }
    else{
      // deploy normally
      console.log('Deploy contract  here')
      console.log('formData', formData)
    }

    
  }

  const useRelayerHandler = () => {
    setIsUsingRelayer(!isUsingRelayer)
  }
  return (
    <div className='text-white w-[850px] bg-[#1E1E1E] flex flex-col py-10 px-10 rounded-2xl border border-gray-700'>
        <h2 className='text-lg font-semibold text-white mb-5'>Deploy Smart Contract</h2>

        <textarea 
          onChange={(event) => {
            setFormData({...formData, contractPasted: event.target.value})
          }}
          value={formData.contractPasted}
          rows={20} 
          placeholder='Paste your contract here!'  
          className='bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none min-h-[450px] max-h-[550px' 
        />

        <p className='text-sm mt-6 mb-2 text-gray-300'>Select the below button to deploy using Relayer</p>
        <div  onClick={useRelayerHandler} className={`py-3 w-[150px] text-center rounded-md mb-1 cursor-pointer ${isUsingRelayer ? 'bg-[#22335F] text-blue-300' : 'bg-[#363636]'} `}>Relayer</div>
        
        <p className='text-xs text-gray-500 flex items-center gap-1 mb-4'> <span><AiFillInfoCircle/></span>Relayer will create transactions, deploy and interact with smart contracts on the behalf of a user</p>
    
        <button onClick={deployContractHandler} className='py-3 bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800'>Deploy</button>

        
    </div>
  )
}

export default DeployContract