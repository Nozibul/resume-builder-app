import SelectTemplate from "@/components/lists/SelectTemplate";
import { TextTitle, TextHeader } from "@/components/ui/text/Text";

const CvPage = () => {
  return (
    <section className="w-full template-section">
      <div className="w-11/12 mx-auto py-12">
        <TextTitle textTitle="Select a CV Template" />
        <TextHeader textHeader="Choose Your Desired CV Template" tSize="text-lg" />
        <div className="py-4 render-cv-list-widget">
          <SelectTemplate active={1} />
        </div>
      </div>
    </section>
  );
};
export default CvPage;
