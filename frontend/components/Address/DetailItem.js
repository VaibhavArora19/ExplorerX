import React from 'react'

const Detail = ({title, value}) => {
  return (
    <div className='flex py-4 hover:bg-[#1e1e1e] px-2 rounded-md text-[#efefef] '>
    <p className='flex-[0.3] text-sm text-gray-300'>
      {title}
    </p>
    <p className='flex-[0.7] '>{value}</p>
  </div>
  )
}

export default Detail