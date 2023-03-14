import Image from 'next/image'
import React from 'react'
import checkmark from '../../public/assets/deploy/checkmark.svg'
import chains from '../../public/assets/deploy/chains.svg'
import multichain from '../../public/assets/deploy/multichain.svg'
import waste from '../../public/assets/deploy/waste.svg'
import deploy from '../../public/assets/deploy/deploy.svg'



const Helper = ({img, title, subtitle})=> {
    return (
        <div className='flex items-center gap-4 my-8'>
            <Image src={img} alt={title} width={35} height={60} />
            <div>
                <h2 className='text-white font-medium mb-1'>{title}</h2>
                <p className='text-[#737682] text-sm'>{subtitle}</p>
            </div>
        </div>
    )
}

const data = [
    {
        id: 's1',
        img: checkmark,
        title: 'Basic details',
        subtitle: 'Enter contract description',
    },
    {
        id: 's2',
        img: chains,
        title: 'Choose a chain',
        subtitle: 'Select a chain for deploying contract',
    },
    {
        id: 's3',
        img: multichain,
        title: 'Multichain deployment',
        subtitle: 'Choose multichains to deploy',
    },
    {
        id: 's4',
        img: waste,
        title: 'Deploy Contract',
        subtitle: 'Paste the contract for deployment',
    },
    {
        id: 's5',
        img: deploy,
        title: 'Success',
        subtitle: 'Wohooo! Check the deployed contract ',
    },
]

const Introduction = ({setPage, page}) => {

    const nextPageHandler = () => {
        setPage((currPage) => currPage + 1)
    }
    
  return (
    <div className='bg-[#1E1E1E]  rounded-2xl w-[500px] border-gray-700 border px-10 py-8'>
        <h2 className='text-lg font-semibold text-white'>Deploy Smartcontracts</h2>
        {data.map(item => <Helper key={item.id} img={item.img} title={item.title} subtitle={item.subtitle} />)}

        <button onClick={nextPageHandler} className='py-3 w-full bg-[#1C4ED8] border-blue-200 border text-white rounded-xl mt-4 hover:bg-blue-800'>Get Started</button>
    </div>
  )
}

export default Introduction