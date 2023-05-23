import Hero from "@/components/hero/Hero"

export const metadata = {
  title: 'Home - Resume Builder',
  description: 'Resume Builder Home page.',
}

export default function Home() {
  return (
    <>
      <section className="w-full flex min-h-screen flex-col items-center">

      <Hero />
      </section>
   </> 
  )
}
