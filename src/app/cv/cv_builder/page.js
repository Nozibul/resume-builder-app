"use client";
import { useSearchParams } from "next/navigation";

const CvBuilder = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div id="cv-builder-container" className="build-container">
      <h2>CV: {id}</h2>
    </div>
  );
};

export default CvBuilder;
