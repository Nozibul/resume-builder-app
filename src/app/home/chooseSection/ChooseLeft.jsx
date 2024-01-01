import Image from "next/image";
import { features } from "../../../../local-json/chooseInfo";
import { Motion } from "@/components/motion/Motion";

const ChooseLeft = () => {
  // Define the motion props as a constant
  const motionProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    transition:{ duration: 0.7, delay: 0.4 },
    variants: {
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: -250 },
    },
  }
  return (
    <>
      <div className="mt-6">
        {features?.length > 0 ? (
          features.map((feature) => {
            const { id, title, color, img, description } = feature;
            return (
              <Motion {...motionProps}
               className={`${color} mb-4`} key={id}>
                <div className="flex items-center py-6">
                  <div className="img-styles mx-4">
                    <Image src={img} alt="hand-image" width={35} height={35}/>
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">{title}</p>
                    <p>{description}</p>
                  </div>
                </div>
              </Motion>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ChooseLeft;
