import { BiLocationPlus } from 'react-icons/bi';

export const TextHeader = ({textHeader, textPosition}) => {

  // decide what to render
  let headerPositions = textPosition ? "text-start" : 'text-center';

  return (
    <>
      <article className={ `${headerPositions} mt-4 mb-4`}>
         <span style ={{whiteSpace:'pre-line'}} className="text-2xl font-bold font-serif text-orange-500">{textHeader}</span>
      </article>
    </>
  )
}

export const TextTitle = ({textTitle, textPosition}) => {

  // decide what to render
  let titlePositions = textPosition ? "text-start" : 'text-center';


  return (
    <>
      <article className={ `${titlePositions}  `}>
       <span style ={{whiteSpace:'pre-line'}} className="text-4xl font-bold font-serif text-[rgb(17, 17, 78)]">{textTitle}</span>
      </article>
  </>
  )
}

export const Title = ({cardTitle}) => {
  return (
    <>
      <article className="mb-4 flex ">
         <div className='mt-2 text-lg'> 
          <BiLocationPlus />
         </div>
         <span className="text-2xl font-bold font-serif text-orange-500">{cardTitle}</span>
      </article>
  </>
  )
}

