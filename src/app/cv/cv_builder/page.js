'use client'

import { useSearchParams } from "next/navigation"

const CvBuilder = () => {
 const searchParams = useSearchParams()


  return (
    <div>CvBuilder { searchParams }</div>
  )
}

export default CvBuilder