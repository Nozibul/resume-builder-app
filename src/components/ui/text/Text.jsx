import { BiLocationPlus } from 'react-icons/bi';

export const TextHeader = ({textHeader}) => {
  
  return (
    <>
      <article className="text-center mt-24">
         <span className="text-2xl font-bold font-serif text-orange-500">{textHeader}</span>
      </article>
    </>
  )
}

export const TextTitle = ({textTitle}) => {
  return (
    <>
      <article className="text-center mt-3 mb-10" >
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

