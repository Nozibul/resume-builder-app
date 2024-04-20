"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo";
import { useSearchParams } from "next/navigation";
// import { CV_DATA } from "../../../../local-json/CvResumeList"
import { CV_RESUME_MENU_LIST } from "../../../../local-json/menuListCv";
// import { AiOutlineCheck } from "react-icons/ai";
import { scrollToTopMethod } from "../../../utils/appHelpers";


const CvBuilder = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //define state
  const [imageSrc, setImageSrc] = useState(null);
  // define state to detect current active menu-id
  const [activeMenu, setActiveMenu] = useState(0);
  const [visible, setVisible] = useState(false);

  //  useEffect(() => {
  //   lastAttemptIndex && setActiveMenuItem(lastAttemptIndex);
  // }, [lastAttemptIndex]);

  // this method help us to detect is user submit form successfully, or cancel
  const isCompletedTask = (status = "cancel") => {
    if (activeMenu < 0 || activeMenu > 6) return null;

    if (status === "back") setActiveMenu((prv) => prv - 1);
    else if (status === "next") setActiveMenu((prv) => prv + 1);
    if (process.env.NODE_ENV === "development") console.log(status, "status");

    scrollToTopMethod();
  };

  return (
    <div>
      <p>CV Builder -- {id}</p>
      <div>
        <div>
          <ul>
            {
              CV_RESUME_MENU_LIST?.map((item, index)=> {
                  /** check empty list of data */
                  // This field is optional
                  const isExperienceEmpty = item.id == 2;
                  const isEducationEmpty = item.id == 3;
                  // This field is optional
                  const isProjectPortfolio = item.id == 4;
                  const isSkillsEmpty = item.id == 5;
                  // This field is optional
                  const isCertificationsEmpty = item.id == 6;
                  // This field is optional
                  const isReferencesEmpty = item.id == 7

              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CvBuilder;
