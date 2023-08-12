'use client'

import { useSearchParams } from "next/navigation"

const CvBuilder = () => {
 const searchParams = useSearchParams()
// console.log('params',searchParams)

  return (
    <div>Cv Builder -- { searchParams } 
     <div>
    
     </div>
    </div>
  )
}

export default CvBuilder;
