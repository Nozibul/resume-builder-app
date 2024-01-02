import Image from "next/image";
import React from "react";
import Skeleton from "@/components/skeleton/Skeleton";

const LoadingTemplate = () => {
  const data = [1, 2, 3, 4];
  return (
    <>
      <div className="grid grid-cols-4 gap-4 place-items-center">
        {data?.map((item) => {
          return (
            <div className="text-center py-2" key={item}>
              <Skeleton width={260} height={320} />
            </div>
          );
        })}
      </div>

      {/* {!loading && (
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
        )} */}
    </>
  );
};

export default LoadingTemplate;
