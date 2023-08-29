"use client";
import { TextTitle } from "@/components/ui/text/Text";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import CV_ICON from "../../../public/assets/images/cv_icon.png";
import DocumentImage from "../../../public/assets/images/document_img.svg";
import OthersBtn from "@/components/ui/buttons/OthersBtn";

const SelectType = () => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  // selected option cv or resume
  const handleRadioClick = (index) => setSelectedOption(index);

  // method to update active template type
  const chooseTemplate = (e) => setValue(e.target.value);

  // navigate user accordion to their template
  const navigateMethod = () => (value ? router.push("/" + value) : null);

  return (
    <>
      <section className="w-full template-section">
        <div className="w-10/12 mx-auto py-12">
          <TextTitle textTitle="How Do You Want To Start?" />
          <p className="text-slate-600 text-center my-6">
            Decide Between a CV and a Resume Considering Your Expectations
          </p>

          <div className="w-8/12 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center py-2 mx-auto">
            <input
              type="radio"
              value="cv"
              name="cv-or-resume"
              id="cv_id"
              className="hidden"
              onChange={chooseTemplate}
            />
            <label
              for="cv_id"
              className={`box-container flex justify-center items-center flex-col
                ${
                  selectedOption === 0 ? "border-green-500 bg-green-100" : ""
                } `}
              onClick={() => handleRadioClick(0)}
            >
              <Image
                src={CV_ICON}
                className="w-16 h-14 -mt-6"
                alt="cv-icon-image"
              />
              <h3 className="text-xl font-semibold mt-2">CV</h3>
              <p className="text-sm text-center mt-8">
                A CV, or curriculum vitae, is a detailed document that typically
                spans multiple pages.
              </p>
            </label>

            <input
              type="radio"
              id="resume_id"
              name="cv-or-resume"
              className="hidden"
              value="resume"
              onChange={chooseTemplate}
            />
            <label
              for="resume_id"
              className={`box-container flex justify-center items-center flex-col
                ${
                  selectedOption === 1 ? "border-green-500 bg-green-100" : ""
                } `}
              onClick={() => handleRadioClick(1)}
            >
              <Image
                src={DocumentImage}
                className="w-16 h-14 -mt-4"
                alt="cv-icon-image"
              />
              <h3 className="text-xl font-semibold mt-2">Resume</h3>
              <p className="text-sm text-center mt-8 ">
                A resume is a concise and focused document that summarizes your
                career within a single page.
              </p>
            </label>
          </div>
        </div>
        {
          value && (
            <div className="text-center pb-10 sm:mb-0">
             <OthersBtn text="Continue" cb={navigateMethod} />
            </div>
          )
        }
      </section>
    </>
  );
};

export default SelectType;
