"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CV_DATA, RESUME_DATA } from "../../../local-json/CvResumeList";

const TemplatesList = ({ activeComponent = 1, callBack = null }) => {
  const [data, setData] = useState([]);
  const [moreItem, setMoreItem] = useState(4);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null); // Added state for hover

  useEffect(() => {
    if (activeComponent === 1) {
      setData(CV_DATA);
    } else setData(RESUME_DATA);

    if (moreItem > 4) setMoreItem(4);
    setLoading(false);
  }, [activeComponent]);

  // method to load more items
  const loadMoreItem = () => {
    if (data?.length > moreItem) setMoreItem((prev) => prev + 4);
  };

  // method to handle button click
  const handleButtonClick = (item) => {
    callBack({
      id: item.id,
      type: activeComponent === 1 ? "cv" : "resume",
    });
  };

  return (
    <>
      <div>
        {!loading ? (
          data?.length ? (
            <div className="grid grid-cols-4 gap-1">
              {data?.slice(0, moreItem)?.map((item) => {
                return (
                  <div
                    className="text-center py-2 relative"
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)} // Track hover
                    onMouseLeave={() => setHovered(null)} // Reset hover
                  >
                    <div className="img-block relative">
                      <Image
                        src={item.imageItem}
                        alt="cv-image"
                        height={440}
                        width={310}
                        priority={true}
                      />
                      {hovered === item.id && ( // Show button when hovered
                        <button
                          onClick={() => handleButtonClick(item)}
                          className="absolute inset-0 flex items-center justify-center text-white font-bold 
                           py-1 px-2 rounded-sm transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 "  
                            >
                          <p className="rounded-lg p-2 bg-purple-600">
                            Use Template
                          </p>
                        </button>
                      )}
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
  );
};

export default TemplatesList;
