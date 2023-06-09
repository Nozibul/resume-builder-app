"use client"
import { useState } from "react";
import { TextTitle, TextHeader } from "../ui/text/Text";
import CvList from "../lists/CvList";
import { useRouter } from "next/navigation";

const Templates =()=> {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState(1);
  
    const activeButtonMethod = (value) => {
      setActiveButton(value);
    };
  
    const MethodToSelectCvResume = ({id, type}) => {
      // Implement the method to select a CV or Resume
        if(type == 'resume'){
          return router.push({
            pathname: '/resume/template-preview',
            query: { _id: id}
          })
        }
        return router.push({
          pathname: "/cv/template-preview",
          query: { _id: id },
        });
    };

  let workHeader = `Aliquam erat volutpat. Integer malesuada\n turpis fringilla suscipit. `

    return (
      <section className="w-full template-section">
        <div className="w-11/12 mx-auto mt-12">
          <div className="text-center py-8 pt-5">
            <TextTitle textTitle="CV/Resume Templates"/>
            <TextHeader textHeader={workHeader} textSize="text-xl" />
          </div>
  
          <div className="w-11/12 mx-auto text-center py-3 ">
            <button
              onClick={() => {
                activeButtonMethod(1);
              }}
              className={` button-styles ${activeButton == 1 ? "active-btn" : null} `}
            >
              CV
            </button>
            <button
              onClick={() => {
                activeButtonMethod(2);
              }}
              className={`button-styles ${activeButton == 2 ? "active-btn" : null} `}
            >
              Resume
            </button>
          </div>
          
          <div className="py-4 render-cv-list-widget">
            <CvList activeComponent={activeButton} callBack={MethodToSelectCvResume} />
          </div>
        </div>
      </section>
    );
  }
  
  export default Templates;
  