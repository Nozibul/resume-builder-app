import AccordionItem from './accordingSection/AccordionItem'
import Banner from './bannerSection/Banner'
import ChooseSection from './chooseSection/ChooseSection'
import Templates from './templates/Templates'
import Works from './worksSection/Works'

const  HomePage = () => {
  return (
    <div>
        <Banner />
        <Works />
        <Templates  />
        <ChooseSection />
        <AccordionItem />
    </div>
  )
}

export default HomePage