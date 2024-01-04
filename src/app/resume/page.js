import SelectTemplate from "@/components/lists/SelectTemplate";
import { TextTitle } from "@/components/ui/text/Text";

const ResumePage = () => {
  return (
    <section className="w-full template-section">
      <div className="w-11/12 mx-auto py-12">
        <TextTitle textTitle="Select a Resume Template" />
        <p className="text-slate-600 text-center my-6">
          Browse through our collection of templates and select the one you
          prefer
        </p>
        <div className="py-4 render-cv-list-widget">
          <SelectTemplate active={2} />
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
