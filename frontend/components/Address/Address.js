import Image from 'next/image'
import React from 'react'
import { MdFileCopy } from 'react-icons/md'

const AddressComp = ({address}) => {
  return (
    <div className='bg-[#171717] py-5 mx-8 flex items-center gap-3 px-4 rounded-xl'>
          <Image src='/assets/deploy/fvm.png' height={30} width={30} className='rounded-md' alt='random-img' />
          <h2 className='text-xl font-semibold text-[#A3A7B3]'>Address</h2>
          <p className='text-[#78787a]'>{address}</p>
          <MdFileCopy size={20} className='text-[#78787a] cursor-pointer' />
    </div>
  )
}

export default AddressComp