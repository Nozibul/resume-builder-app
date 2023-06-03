import Image from "next/image";
import React, { useState } from "react";
import { RESUME_DATA as data } from "../../../local-json/CvResumeList";

const ResumeList = ({ callBack }) => {
  const [moreItem, setMoreItem] = useState(4);

  // method to load more item
  const LoadMoreItem = () => {
    if (data?.length > moreItem) setMoreItem((prv) => prv + 4);
  };

  return (
    <div className="flex flex-wrap">
      {data?.slice(0, moreItem)?.map((item) => {
        return (
          <div
            className="w-full sm:w-1/2 lg:w-1/4 text-center"
            key={item.id}
          >
            <Image
              priority={true}
              src={item.imageItem}
              alt="cv-image"
              height={440}
              width={310}
              onClick={() => callBack({ id: item.id, type: "resume" })}
            />
          </div>
        );
      })}
      <div className="w-full text-center py-5">
        <button
          onClick={moreItem !== data?.length ? LoadMoreItem : null}
          className={`button-styles show-more-btn ${
            moreItem === data?.length ? "disable-show-more-btn" : ""
          }`}
        >
          Show more templates
        </button>
      </div>
    </div>
  );
};

export default ResumeList;
