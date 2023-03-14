import React from 'react'

const ContractDetails = () => {
  return (
    <div className='text-white w-[550px] bg-[#1E1E1E] py-10 px-10 rounded-2xl border border-gray-700'>
        <h2 className='text-2xl font-semibold mb-7'>Enter Contract details</h2>

        <form className='flex flex-col '>
            <label className='text-sm text-gray-400'>Name</label>
            <input  type='text' placeholder='Price Converter' className='bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-10' />

            <label className='text-sm text-gray-400'>Description</label>
            <textarea rows={7} maxLength={1000} className='bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none max-h-[200px]' placeholder='A short description of smart contract' />

            <div className='flex justify-between mt-6'>
                <button type='button' className='py-3 px-7 rounded-md bg-[#292929] text-gray-300 border border-gray-600'>Back</button>
                <button type='button' className='py-3 px-7 rounded-md bg-[#292929] text-gray-300 border border-gray-600'>Next</button>
            </div>
        </form>
    </div>
  )
}

export default ContractDetails