import { useRouter } from 'next/router'
import React from 'react'

const Address = () => {

    const router = useRouter()

    const { address } = router.query

  return (
    <div>{address}</div>
  )
}

export default Address