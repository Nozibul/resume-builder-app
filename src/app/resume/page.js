"use client"
import TemplatesList from "@/components/lists/TemplatesList";
import { TextTitle } from "@/components/ui/text/Text";
import { useRouter } from "next/navigation";

const Resume = () => {
  // define router
  const router = useRouter();

  const selectResumeTemplate = ({ id }) => {
     return router.push(`/resume/resume_template_preview?_id=${id}`)
  };

  return (
    <section className="w-full template-section">
      <div className="w-11/12 mx-auto py-12">
        <TextTitle textTitle="Select a Resume Template" />
        <p className="text-slate-600 text-center my-6">
          Browse through our collection of templates and select the one you
          prefer
        </p>
        <div className="py-4 render-cv-list-widget">
          <TemplatesList activeComponent={2} callBack={selectResumeTemplate} />
        </div>
      </div>
    </section>
  );
};

export default Resume;
