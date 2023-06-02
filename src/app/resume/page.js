'use client'
import Works from '@/components/works/Works'


export const metadata = {
  title: 'Resume',
  description: 'Resume Builder Resume page.',
}

const page = () => {
  return (
    <section>
      <p>resume</p>
      <Works />
    </section>
  )
}

export default page