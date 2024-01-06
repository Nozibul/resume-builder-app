import SelectTemplate from "@/components/lists/SelectTemplate";
import { TextTitle } from "@/components/ui/text/Text";

const CvPage = () => {
  return (
    <section className="w-full template-section">
      <div className="w-11/12 mx-auto py-12">
        <TextTitle textTitle="Select a CV Template" />
        <p className="text-slate-600 text-center my-6">
         Choose Your Desired Template
        </p>
        <div className="py-4 render-cv-list-widget">
          <SelectTemplate active={1} />
        </div>
      </div>
    </section>
  );
};
export default CvPage;
