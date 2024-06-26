import { TextTitle } from "@/components/ui/text/Text";
import OthersBtn from "@/components/ui/buttons/OthersBtn";
import { Motion } from "@/components/motion/Motion";

const ChooseRight = () => {
  return (
    <Motion
      className="p-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.4 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 200 },
      }}
    >
      <TextTitle textTitle="Why choose us" titlePosition={true} />
      <div className="mt-12">
        <p className="text-neutral-500">
          Choose our Resume Builders for a seamless resume-building experience.
          Enjoy the freedom to export unlimited templates for free, giving you
          endless options to showcase your skills. With our autosave feature,
          your progress is securely saved, allowing you to pick up where you
          left off. Our user-friendly interface makes creating professional
          resumes a breeze, even without design skills.
        </p>
      </div>
      <div className="my-8">
        <p className="text-neutral-500 ">
          Don&apos;t miss out on your dream job – join us today and effortlessly
          create standout resumes.
        </p>
      </div>
      <OthersBtn text="create my cv/resume" />
    </Motion>
  );
};

export default ChooseRight;
