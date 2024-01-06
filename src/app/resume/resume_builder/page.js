'use client';
import { useSearchParams } from "next/navigation"

const ResumeBuilder = ({params}) => {
 const searchParams = useSearchParams();
 console.log(params);

  return (
    <div> Resume Builder -- { searchParams }</div>
  )
}

export default ResumeBuilder;