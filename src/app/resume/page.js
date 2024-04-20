import SelectTemplate from "@/components/lists/SelectTemplate";
import { TextTitle, TextHeader } from "@/components/ui/text/Text";

const ResumePage = () => {
  return (
    <section className="w-full template-section">
      <div className="w-11/12 mx-auto py-12">
        <TextTitle textTitle="Select a Resume Template" />
        <TextHeader textHeader="Choose Your Desired Resume Template" tSize="text-lg" />
        <div className="py-4 render-cv-list-widget">
          <SelectTemplate active={2} />
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
