import Image from 'next/image'
import React, { useState } from 'react'
import {GiBreakingChain} from 'react-icons/gi'
import { MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md'
import polygonSvg from '../../public/assets/deploy/polygon.svg'

const SelectChain = () => {
    const [isMultichain, setIsMultichain] = useState(false)
    const [isSinlgeChain, setIsSingleChain] = useState(false)


    const multichainHandler = () => {
        setIsSingleChain(false)
        setIsMultichain(true)
    }

    const singleChainHandler =() => {
        setIsMultichain(false)
        setIsSingleChain(true) 
    }

  return (
    <div className='text-white w-[550px] bg-[#1E1E1E] py-10 px-10 rounded-2xl border border-gray-700'>
        <h2 className='text-2xl font-semibold mb-7'>Select Chains</h2>

        <form className='flex flex-col '>
            <p className='text-sm text-gray-400 mb-1'>Current chain</p>
            <div className='py-3 px-3 border border-gray-700 rounded-md flex gap-2 mb-6 hover:bg-[#272626] cursor-pointer'>
                <Image src={polygonSvg} alt='polygon' width={40} height={40} />
                <div>
                    <h3 className='font-semibold'>Polygon</h3>
                    <p className='text-[12px] tracking-wide text-gray-500'>0xf2E01c4761EfeD1BD61F5e2933220D6eD07a2682</p>
                </div>
                <div className='ml-7 flex flex-col items-center justify-center bg-[#2E2E2E] px-2 rounded-md'>
                    <MdKeyboardArrowUp size={20}/>
                    <MdKeyboardArrowDown size={20}/>
                </div>
            </div>

            <p className='text-sm text-gray-400 mb-2'>Chain type</p>

            <div className='flex gap-4'>
                <div onClick={singleChainHandler} className={` ${isSinlgeChain ? 'bg-[#22335F]': 'bg-[#363636]'}  p-10 rounded-xl flex-[0.5] cursor-pointer`}>
                    <div className='bg-[#171717] rounded-md p-4 w-fit mb-7'>
                        <GiBreakingChain className={`${isSinlgeChain && 'text-blue-300'}`} size={20}/>
                    </div>
                    <p className={`${isSinlgeChain && 'text-blue-300 '} font-medium`}>Single Chain</p>
                </div>

                <div onClick={multichainHandler} className={` ${isMultichain ? 'bg-[#1F423A]': 'bg-[#363636]'} p-10 rounded-xl flex-[0.5] cursor-pointer`}>
                    <div className='bg-[#171717] rounded-md p-4 w-fit mb-7'>
                        <GiBreakingChain size={20} className={`${isMultichain ? 'text-green-500': ''}`}/>
                    </div>
                    <p className={`${isMultichain ? 'text-green-700': ''} font-medium`}>Multi Chain</p>
                </div>
            </div>


            <div className='flex justify-between mt-6'>
                <button type='button' className='py-3 px-7 rounded-md bg-[#292929] text-gray-300 border border-gray-600'>Back</button>
                <button type='button' className='py-3 px-7 rounded-md bg-[#292929] text-gray-300 border border-gray-600'>Next</button>
            </div>
        </form>
    </div>
  )
}

export default SelectChain