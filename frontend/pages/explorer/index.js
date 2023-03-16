import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {BsSearch} from 'react-icons/bs'

const Explorer = () => {

    const [address, setAddress] = useState('')

    const router = useRouter()

    const addressChangeHandler = (event) => {
        setAddress(event.target.value)
    }

    const searchAddressHandler = () => {
        router.push({
            pathname: `/address/${address}`,
        })
    }

  return (
    <div className='bg-[#171717] h-screen flex items-center justify-center'>

        <div className='flex gap-3 items-center'>
            <input onChange={addressChangeHandler} value={address} className='bg-gray-600 py-4 px-3 outline-none text-gray-400 w-[600px]  rounded-md' />
            <button onClick={searchAddressHandler} className='text-white bg-blue p-4 bg-blue-500 rounded-md hover:bg-blue-600'><BsSearch size={22}/></button>
        </div>
    </div>
  )
}

export default Explorer