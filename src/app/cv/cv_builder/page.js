"use client";
import { useSearchParams } from "next/navigation";
import { CV_RESUME_MENU_LIST } from "../../../../local-json/menuListCv";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import { CV_DATA } from "../../../../local-json/CvResumeList";
import Api from "../../../../api-config/instance";
import { openSans, scrollToTopMethod } from "../../../utils/appHelpers";
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo";
import Certifications from "@/components/modules/cv_resune_builder/certifications/Certifications";
import Educations from "@/components/modules/cv_resune_builder/educations/Educations";
import Experience from "@/components/modules/cv_resune_builder/experience/Experience";
import Projects from "@/components/modules/cv_resune_builder/projects/Projects";
import Skills from "@/components/modules/cv_resune_builder/skills/Skills";
// import ChangeTemplate from "../../../../utilities/ChangeTemplate";


const CvBuilder = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // define next userRouter Hook
    const router = useRouter();
    const { _id = null } = router.query;
   

    //define cv-slice to get access of redux-store
    const {
        lastAttemptIndex = null,
        cvData: {
            experience = [],
            education = [],
            projectPortfolio = [],
            Skills: { listOfSkills = [], technologies = [] } = {},
            certifications = [],
            references = [],
        },
    } = useSelector((state) => state.cvSlice);
    const { cvIdFromApi = null, isAdVisible = false } = useSelector((state) => state.globalSlice);

    //define state
    const [imageSrc, setImageSrc] = useState(null);
    // define state to detect current active menu-id
    const [activeMenuItem, setActiveMenuItem] = useState(0);
    const [visible, setVisible] = useState(false);

    // find index of item by query params
    useEffect(() => {
        if (_id) {
            // find index of given fv id
            const findIndexOfItem = CV_DATA?.find((item) => item.id === _id) || null;
            setImageSrc(findIndexOfItem?.imageItem || null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id]);

    useEffect(() => {
        lastAttemptIndex && setActiveMenuItem(lastAttemptIndex);
    }, [lastAttemptIndex]);


    // this method help us to detect is user submit form successfully, or cancel
    const isCompletedTask = (status = "cancel") => {
        if (activeMenuItem < 0 || activeMenuItem > 6) return null;
        if (status === "back") setActiveMenuItem((prv) => prv - 1);
        else if (status === "next") setActiveMenuItem((prv) => prv + 1);
        if (process.env.NODE_ENV === "development") console.log(status, "status");

        scrollToTopMethod();
    };

    const getButtonType = async (item) => {
        try {
            modalMethod();

            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        _id: item.id,
                    },
                },
                undefined,
                {
                    shallow: true,
                }
            );

            if (cvIdFromApi === null) return null;
            const res = await Api.post(`/api/v1/cv/${cvIdFromApi}/change-template`, { template_id: item.id });
        } catch (errors) {
            if (process.env.NODE_ENV === "development") console.log(errors, "from catch method");
        }
    };

    const modalMethod = () => setVisible((prv) => !prv);

    return (
        <div id="cv-builder-container" className="build-container">
            {/* {visible && <ChangeTemplate visible={visible} setVisible={setVisible} callBack={getButtonType} />} */}
            <div className="container py-3">
                <h2>cv:{id}</h2>
                <div className="menu-widget py-sm-2">
                    <ul>
                        {CV_RESUME_MENU_LIST?.map((item, index) => {
                            /** check empty list of data */
                            const isEducationEmpty = Boolean(education?.length === 0) && item.id == 3;

                            const isSkillsEmpty =
                                Boolean(listOfSkills?.length === 0 && technologies?.length === 0) && item.id == 5;

                            // This field is optional
                            const isCertificationsEmpty = Boolean(certifications?.length === 0) && item.id == 6;
                            // This field is optional
                            const isReferencesEmpty = Boolean(references?.length === 0) && item.id == 7;
                            // This field is optional
                            const isExperienceEmpty = Boolean(experience?.length === 0) && item.id == 2;
                            // This field is optional
                            const isProjectPortfolio = Boolean(projectPortfolio?.length === 0) && item.id == 4;
                            /** check empty list of data */

                            const isCurrentItem = index === activeMenuItem;
                            const c1 = index <= lastAttemptIndex ? "completed" : null;
                            const c2 =
                                index < activeMenuItem ? "active-btn completed" : isCurrentItem ? "current-brn" : null;

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
                                    style={{
                                        cursor:
                                            lastAttemptIndex !== null && lastAttemptIndex + 1 === index
                                                ? "pointer"
                                                : null,
                                    }}
                                    onClick={() => {
                                        if (lastAttemptIndex === null) return null;
                                        if (lastAttemptIndex + 1 >= index) setActiveMenuItem(index);
                                    }}
                                    key={item.id}
                                    className={`${c1} ${c2} ${c3} ${c4}`}
                                    title={
                                        isRequiredFieldIsRemain
                                            ? "This is a required field."
                                            : isOptionalFieldIsRemain
                                            ? "This is a optional filed"
                                            : null
                                    }
                                >
                                    <span
                                        className={
                                            isCurrentItem ? `current-circle ${openSans.className} ` : openSans.className
                                        }
                                    >
                                        {activeMenuItem > index ? <AiOutlineCheck color="#25B27E" /> : index + 1}
                                    </span>
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                <div className="row">
                    <div className="col">
                        <div className="cv-builder-widget">
                            {activeMenuItem === 0 ? <PersonalInfo callBackMethod={isCompletedTask} /> : null}
                            {activeMenuItem === 1 ? <Experience callBackMethod={isCompletedTask} /> : null}
                            {activeMenuItem === 2 ? <Educations callBackMethod={isCompletedTask} /> : null}
                            {activeMenuItem === 3 ? <Projects callBackMethod={isCompletedTask} /> : null}
                            {activeMenuItem === 4 ? <Skills callBackMethod={isCompletedTask} /> : null}
                            {activeMenuItem === 5 ? <Certifications callBackMethod={isCompletedTask} /> : null}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="resume-preview-widget">
                            <div className="image-view-widget text-center">
                                {imageSrc && (
                                    <Image
                                        width={310}
                                        height={440}
                                        src={imageSrc}
                                        className="img-fluid pt-3 pt-md-0 w-100"
                                        alt="cv-template-image"
                                    />
                                )}
                            </div>

                            <div className="text-center py-4">
                                <button onClick={modalMethod} className="btn cng-template-widget">
                                    CHANGE TEMPLATE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CvBuilder);



