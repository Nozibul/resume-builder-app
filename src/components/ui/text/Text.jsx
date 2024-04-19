import { BiLocationPlus } from 'react-icons/bi';

export const TextHeader = ({ textHeader, headerPosition, tSize }) => {
  const headerPositions = headerPosition ? "text-start" : "text-center";
  const headerSize = tSize
    ? (Array.isArray(tSize) ? tSize : [tSize])
    : ["md:text-2xl", "sm:text-xl", "xs:text-base"];

  return (
    <article className={`${headerPositions} mt-4 mb-4`}>
      <span
        style={{ whiteSpace: 'pre-line' }}
        className={` ${headerSize.join(" ")} font-bold font-serif text-gray-400 `}
      >
        {textHeader}
      </span>
    </article>
  );
};


export const TextTitle = ({ textTitle, titlePosition, tSize }) => {
  const titlePositions = titlePosition ? "text-start" : "text-center";
  const titleSize = tSize ? tSize : ["lg:text-3xl", "md:text-3xl", "sm:text-xl" , "xs:text-base"];

  return (
    <article className={`${titlePositions}`}>
      <span
        style={{ whiteSpace: "pre-line" }}
        className={` ${titleSize.join(" ")} tracking-[1px] font-bold font-serif text-[rgb(17, 17, 78)] `}
      >
        {textTitle}
      </span>
    </article>
  );
};


// Title component with consistent prop naming
export const Title = ({ cardTitle }) => {
  return (
    <article className="mb-4 flex">
      <div className='mt-2 text-lg'>
        <BiLocationPlus />
      </div>
      <span className="text-2xl font-bold font-serif text-orange-500">{cardTitle}</span>
    </article>
  );
}