import { useRouter } from 'next/router'
import React from 'react'

const Detail = ({title, value, isAddress}) => {

  const router = useRouter()

  return (
    <div className='flex py-4 hover:bg-[#1e1e1e] px-2 rounded-md text-[#efefef] '>
    <p className='flex-[0.3] text-sm text-gray-300'>
      {title}
    </p>
    {isAddress ?  <p onClick={() => {
        router.push(`/address/${value}`)
      }} is className='flex-[0.7] cursor-pointer'>{value}</p> :   <p is className='flex-[0.7] '>{value}</p> }
  </div>
  )
}

export default Detail