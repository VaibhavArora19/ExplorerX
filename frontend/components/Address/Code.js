import React from 'react'
import Highlight from 'react-highlight'
import styles from '../../node_modules/highlight.js/styles/railscasts.css'

const Code = ({code}) => {
  return (
    <div className='mt-5 rounded-md overflow-hidden' >
    <Highlight className={`${styles}`} innerHTML={false} >
     {code}
    </Highlight>
  </div>
  )
}

export default Code