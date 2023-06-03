'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CV_DATA, RESUME_DATA } from "../../../local-json/CvResumeList";

const CvList = ({activeComponent = 1, callBack = null }) => {

 const [data, setData] =useState([]);   
 const [moreItem, setMoreItem] = useState(4);
 const [loading, setLoading] = useState(true);
 console.log(data);

    useEffect(()=>{
     if(activeComponent === 1){
        setData(CV_DATA)
     } else setData(RESUME_DATA)
     if(moreItem > 4) setMoreItem(4);
     setLoading(false)

    },[activeComponent]);

   // method to load more item
   const loadMoreItem = () =>{
     if(data?.length > moreItem) setMoreItem((prev)=> prev + 4);
   }

  return (
    <>
      <div>
        {!loading ? (
            data?.length ? (
            <div className="grid grid-cols-4 gap-1">
                {data?.slice(0, moreItem)?.map((item) => {
                 return (
                    <div className="text-center py-2" key={item.id}>
                    <div
                        className="img-block"
                        onClick={() =>
                        callBack({
                            id: item.id,
                            type: activeComponent === 1 ? "cv" : "resume",
                        })
                        }
                    >
                        <Image
                        src={item.imageItem}
                        alt="cv-image"
                        height={440}
                        width={310}
                        priority={true}
                        />
                    </div>
                    </div>
                 );
                })}
            </div>
            ) : (
            <h4 className="text-center">Result is not found!</h4>
            )
        ) : (
            <div className="flex justify-center py-5">
            <span className="visually-hidden">Loading...</span>
            </div>
        )}
        {!loading && (
            <div className="text-center py-5">
            <button
                onClick={moreItem !== data?.length ? loadMoreItem : null}
                className={`show-more-btn ${
                moreItem === data?.length ? "disable-show-more-btn" : ""
                }`}
            >
                Show more templates
            </button>
            </div>
        )}
      </div>
    </>
  )
}

export default CvList