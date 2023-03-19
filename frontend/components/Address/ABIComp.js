import React from 'react'
import { MdFileCopy } from 'react-icons/md'

const ABIComp = ({AbiToString}) => {
  return (
    <div className='mt-4 px-3 py-6 relative rounded-md bg-[#1c1c1c] text-[#666667] leading-8'>
    <p>{AbiToString}</p>
    <MdFileCopy size={25} className='absolute right-4 top-4 cursor-pointer hover:text-gray-200'/>
  </div>
  )
}

export default ABIComp