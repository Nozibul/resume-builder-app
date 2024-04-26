"use client";
import { useState } from "react";
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo";
import { useSearchParams } from "next/navigation";
import { CV_RESUME_MENU_LIST } from "../../../../local-json/menuListCv";

const CvBuilder = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // define state to detect current active menu-id
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  //this method help us to detect is user submit form successfully, or cancel
  // const isCompletedTask = (status = "cancel") => {
  //   if (activeMenu < 0 || activeMenu > 6) return null;

  //   if (status === "back") setActiveMenuItem((prv) => prv - 1);
  //   else if (status === "next") setActiveMenuItem((prv) => prv + 1);
  //   if (process.env.NODE_ENV === "development") console.log(status, "status");

  //   scrollToTopMethod();
  // };

  return (
    <div>
      <p>CV Builder -- {id}</p>
      <div>
        <div className="menu-widget py-sm-2">
          <ul>
            {CV_RESUME_MENU_LIST?.map((item, index) => {
              /** check empty list of data */
              // This field is optional
              const isExperienceEmpty = item.id == 2;
              const isEducationEmpty = item.id == 3;
              const isProjectPortfolio = item.id == 4;
              const isSkillsEmpty = item.id == 5;
              const isCertificationsEmpty = item.id == 6;

              const isCurrentItem = index === activeMenuItem;
              // const c1 = index <= lastAttemptIndex ? "completed" : null;
              const c2 =
                index < activeMenuItem
                  ? "active-btn completed"
                  : isCurrentItem
                  ? "current-btn"
                  : null;

              // for required field
              const c3 =
                index < activeMenuItem
                  ? isEducationEmpty || isSkillsEmpty
                    ? isCurrentItem
                      ? "current-brn"
                      : "required-btn"
                    : null
                  : null;

              // for optional filed
              const c4 =
                index < activeMenuItem
                  ? isExperienceEmpty ||
                    isCertificationsEmpty ||
                    isProjectPortfolio
                    ? isCurrentItem
                      ? "current-brn"
                      : "optional-btn"
                    : null
                  : null;

              // if any required filed is remain
              const isRequiredFieldIsRemain =
                index < activeMenuItem && (isSkillsEmpty || isEducationEmpty);

              // if any optional filed is remain
              const isOptionalFieldIsRemain =
                index < activeMenuItem &&
                (isCertificationsEmpty ||
                  isExperienceEmpty ||
                  isProjectPortfolio);
              return (
                <li
                  key={item.id}
                  title={
                    isRequiredFieldIsRemain
                      ? "This is a required field."
                      : isOptionalFieldIsRemain
                      ? "This is a optional filed"
                      : null
                  }
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CvBuilder;
