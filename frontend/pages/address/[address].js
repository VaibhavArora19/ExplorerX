import AddressComp from '@/components/Address/Address'
import Detail from '@/components/Address/DetailItem'
import Details from '@/components/Address/Details'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Highlight from 'react-highlight'
//ir black
// stackoverflow dark
// srcery
// railscasts
import styles from '../../node_modules/highlight.js/styles/railscasts.css'

const CONTRACT_DATA = [
  {
    title: 'Name',
    value: 'Pool Contract'
  },
  {
    title: 'Description',
    value: 'A random description for pool for testing to check if every component is working fine or not! Hello hey hola comoestas '
  },{
    title: 'Owner',
    value: '0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d'
  },{
    title: 'Current Chain',
    value: 'Gnosis'
  },{
    title: 'Balance',
    value: '$102.34'
  },
]

const OTHER_CHAINS = [
  {
    title: 'Polygon',
    value: '0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d'
  },
  {
    title: 'Optimism',
    value: '0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d'
  },
  {
    title: 'Mantle',
    value: '0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d'
  },
]

const Address = () => {

    const router = useRouter()
    const { address } = router.query

    const [showCode, setShowCode] = useState(true)
    const [showWrite, setShowWrite] = useState(false)
    const [showRead, setShowRead] = useState(false)

    const showReadHandler = () => {
      setShowCode(false)
      setShowWrite(false)
      setShowRead(true)
    }

    const showWriteHandler = () => {
      setShowCode(false)
      setShowRead(false)
      setShowWrite(true)
    }

    const showCodeHandler = () => {
      setShowRead(false)
      setShowWrite(false)
      setShowCode(true)
    }

  return (
    <section className='bg-[#111111] h-screen py-4'>
        <AddressComp address={address}  />

      <div className='flex mx-8 gap-3 mt-4'>
        <Details data={CONTRACT_DATA} heading='Contract details' />
        <Details data={OTHER_CHAINS} heading='Other chains' />
      </div>

      <div className= 'bg-[#171717] py-4 px-3 mx-8 mt-4 rounded-md'>

        {/* Buttons */}
        <div className='flex gap-4'>
          <p onClick={showReadHandler} className={`w-[100px] text-center py-2 rounded-md ${showRead ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'}   text-white cursor-pointer`}>Read</p>
          <p onClick={showWriteHandler} className={`w-[100px] text-center py-2 rounded-md ${showWrite ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'} text-white cursor-pointer`}>Write</p>
          <p onClick={showCodeHandler} className={`w-[100px] text-center py-2 rounded-md ${showCode ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'} text-white cursor-pointer`}>Code</p>
        </div>


        {showCode && (
          <div className='mt-5 rounded-md overflow-hidden' >
            <Highlight className={`${styles}`} innerHTML={false} >
             {`const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)
      const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)
      const unfold = (f, seed) => {
      const go = (f, seed, acc) => {
        const res = f(seed)
        return res ? go(f, res[1], acc.concat([res[0]])) : acc
      }
      return go(f, seed, [])}`}
            </Highlight>
          </div>
        )}


        {showRead && <p>Read</p>}

        
        {showWrite && <p>Write</p>}


        {/* React Syntax Highlighter */}
      </div>
    </section>
  )
}

export default Address