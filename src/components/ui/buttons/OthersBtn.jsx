const OthersBtn = ({text,cb = null }) => {

  return (
    <>
      <button onClick={cb}  className="h-6 pl-4 pr-2 py-3 border outline-double outline-purple-500 outline-1 font-semibold outline-offset-2 relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group">
        <span className="w-3 h-full rounded-r-full bg-purple-600 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none -z-1"></span>
        <span className="w-full text-black text-sm font-semibold transition-colors duration-300 ease-in-out group-hover:text-white z-10">
         {text}
        </span>
      </button> 
      {/* <button className="btn btn-primary h-8 px-6 border border-purple-300 outline-double outline-purple-600 outline-1 font-semibold outline-offset-2 relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group">
        <span className="w-5 h-full rounded-r-full bg-orange-500 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none -z-1"></span>
        <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
         {text}
        </span>
      </button> */}
    </>
  )
}

export default OthersBtn ;