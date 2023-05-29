import { BiLocationPlus } from 'react-icons/bi';

export const TextHeader = ({textHeader, textPosition, textSize}) => {

  // decide what to render
  let headerPositions = textPosition ? "text-start" : 'text-center';
  let headerSize = textSize ? textSize : 'text-2xl';


  return (
    <>
      <article className={`${headerPositions} mt-4 mb-4`}>
         <span style ={{whiteSpace:'pre-line'}} className={` ${headerSize} font-bold font-serif text-orange-500 `}>{textHeader}</span>
      </article>
    </>
  )
}

export const TextTitle = ({textTitle, textPosition, textSize}) => {

  // decide what to render
  let titlePositions = textPosition ? "text-start" : 'text-center';
  let titleSize = textSize ? textSize : 'text-4xl';


  return (
    <>
      <article className={ `${titlePositions}  `}>
       <span style ={{whiteSpace:'pre-line'}} className={` ${titleSize} font-bold font-serif text-[rgb(17, 17, 78)] `}>{textTitle}</span>
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

