import React, { useState } from 'react'

const ReadInput = ({name, type, setEnteredInput}) => {


    const inputChangeHandler = (event) => {
        setEnteredInput(event.target.value)

    }

  return (
    <>
        <p className='text-sm text-gray-300 mb-1'>{name}</p>
        <input onChange={inputChangeHandler} placeholder={type} className='w-[400px] py-2 rounded-md px-2 mb-2 bg-[#2b2b2b] outline-none text-gray-400' />
    </>
  )
}

export default ReadInput