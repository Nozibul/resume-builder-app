"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CV_DATA, RESUME_DATA } from "../../../local-json/CvResumeList";
import { Motion } from "../motion/Motion";

const TemplatesList = ({ activeComponent = 1, callBack = null }) => {
  const [data, setData] = useState([]);
  const [moreItem, setMoreItem] = useState(4);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null); 


  // Define the motion props as a constant
  const motionProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: {
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0.7 },
    },
  };

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
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-1 place-items-center">
              {data?.slice(0, moreItem)?.map((item, i) => {
                const delayTime = "0." + i;
                return (
                  <Motion
                    {...motionProps}
                    transition={{ duration: 0.5, delay: delayTime }}
                    className="text-center py-2 relative"
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)} // Track hover
                    onMouseLeave={() => setHovered(null)} // Reset hover
                  >
                    <div className="img-block relative w-64 h-80 transition-opacity hover:scale-[1.05]">
                      <Image
                        src={item.imageItem}
                        alt="cv-image"
                        fill
                        priority={true}
                      />
                      {hovered ? ( // Show button when hovered
                        <button
                          onClick={() => handleButtonClick(item)}
                          className="absolute inset-0 flex items-center justify-center text-white font-bold 
                           opacity-0 hover:opacity-100 transition delay-150 duration-500 ease-in-out hover:-translate-y-1 hover:scale-[1.04] duration-400"  
                            >
                          <p className="rounded-sm py-1 px-2 bg-purple-500">
                            Use Template
                          </p>
                        </button>
                      ) : null }
                    </div>
                  </Motion>
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
