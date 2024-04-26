import AccordionItem from './accordingSection/AccordionItem'
import Banner from './bannerSection/Banner'
import ChooseSection from './chooseSection/ChooseSection'
import Templates from './templates/Templates'
import Works from './worksSection/Works'

const  HomePage = () => {
  return (
    <main>
        <Banner />
        <Works />
        <Templates  />
        <ChooseSection />
        <AccordionItem />
    </main>
  )
}

export default HomePage