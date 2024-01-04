'use client';
import { useSearchParams } from "next/navigation"

const ResumeBuilder = () => {
 const searchParams = useSearchParams()

  return (
    <div> Resume Builder -- { searchParams }</div>
  )
}

export default ResumeBuilder;