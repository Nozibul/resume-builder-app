"use client";
import { useRouter } from "next/navigation";
import TemplatesList from "./TemplatesList";

const SelectTemplate = ({active}) => {
  const router = useRouter();

  const MethodToSelectCvResume = ({ id, type }) => {
    // Implement the method to select a CV or Resume
    return router.push(
      type === "resume"
        ? `/resume/resume_template_preview?_id=${id}`
        : `/cv/cv_template_preview?_id=${id}`
    );
  };
  return (
    <>
      <TemplatesList
        activeComponent={active}
        callBack={MethodToSelectCvResume}
      />
    </>
  );
};

export default SelectTemplate;
