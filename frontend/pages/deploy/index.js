import ChainModal from '@/components/Deploy/ChainModal'
import ContractDetails from '@/components/Deploy/ContractDetails'
import DeployContract from '@/components/Deploy/DeployContract'
import Introduction from '@/components/Deploy/Introduction'
import MultiChain from '@/components/Deploy/MultiChain'
import SelectChain from '@/components/Deploy/SelectChain'
import React, { useState } from 'react'

const index = () => {

  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({
    contractName : '',
    contractDescription: '',
    currentDeployChain: '',
    multichains: [],
    contractPasted: ''
  })


  const steps = ['Basic Details', 'Choose Chain', 'Multichain', 'Deploy']

  const PageDisplay = () => {
    if(page === 0){
      return <Introduction setPage={setPage} page={page} />
    }
    else if(page === 1){
      return <ContractDetails setPage={setPage} page={page} formData={formData} setFormData={setFormData}/>
    }
    else if(page === 2){
      return <SelectChain setPage={setPage} page={page} formData={formData} setFormData={setFormData}/>
    }
    else if(page === 3){
      return <MultiChain setPage={setPage} page={page} formData={formData} setFormData={setFormData} />
    }
    else if(page === 4){
      return <DeployContract setPage={setPage} page={page} formData={formData} setFormData={setFormData}/>
    }
  }

  return (
    <div className='bg-[#171717] min-h-screen flex items-center justify-center py-20'>
        <>{PageDisplay()}</>
    </div>
  )
}

export default index