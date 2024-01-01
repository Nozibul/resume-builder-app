import { TextTitle } from "@/components/ui/text/Text";
import { accordion_data } from "../../../../local-json/accordion";
import { Motion } from "@/components/motion/Motion";

const AccordionItem = () => {
  const titleText = `Have Questions For A Great Resume?`;
  return (
    <>
      <div className="bg-base-200 w-full py-14 mt-18 z-">
        <div className="my-4">
          <TextTitle textTitle={titleText} />
          <p className="text-slate-600 text-center my-6">
            Expert Answers to All Your Resume Inquiries.
          </p>
        </div>
        {accordion_data?.length === 0 ? (
          "Loading..."
        ) : (
          <>
            {accordion_data.map((item) => (
              <Motion
                key={item.id}
                className="collapse collapse-plus bg-white w-10/12 mx-auto my-4 p-3 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: 0.25,
                  type: "spring",
                  stiffness: 100,
                }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -150 },
                }}
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                  {item.heading}
                </div>
                <div className="collapse-content">
                  <p>{item.description}</p>
                </div>
              </Motion>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AccordionItem;
