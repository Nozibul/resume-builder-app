import AccordionItem from "@/components/accordionItem/AccordionItem"
import Banner from "@/app/home/bannerSection/Banner"
import Templates from "@/components/templates/Templates"
import Works from "@/components/works/Works"
import HomePage from "./home/page"


export const metadata = {
  title: 'Home - Resume Builder',
  description: 'Resume Builder Home page.',
}

export default function Home() {
  return (
    <>
      <section className="w-full flex min-h-screen flex-col items-center">
       <Banner />
       <Works />
       <Templates />
       <HomePage />
       <AccordionItem />
      </section>
   </> 
  )
}
