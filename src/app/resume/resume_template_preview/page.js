
import CarouselTemplate from "@/components/carouselTemplate/CarouselTemplate";
import { RESUME_DATA  } from "../../../../local-json/CvResumeList";


const ResumeTemplatePreview = () => {
  return (
    <CarouselTemplate title="Resume Template Preview" data={RESUME_DATA} />
  );
};

export default ResumeTemplatePreview;



