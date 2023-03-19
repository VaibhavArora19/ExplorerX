import React from 'react'
import Highlight from 'react-highlight'
import styles from '../../node_modules/highlight.js/styles/railscasts.css'

const Code = ({code}) => {
  return (
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
  )
}

export default Code