import { Motion } from "@/components/motion/Motion";
import OthersBtn from "@/components/ui/buttons/OthersBtn";
import { TextHeader, TextTitle } from "@/components/ui/text/Text";
import Link from "next/link";
import BannerSlide from "./BannerSlide";

const Banner = () => {

// Define the motion props as a constant
const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -250 },
  },
}

  let textHeader = `Whether you're looking to switch careers.`;
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`;

  return (
    <>
      <section className="flex w-full items-center lg:h-screen md:h-screen sm:h-[650px] justify-center bg-fixed mb-12 bg-center bg-cover custom-img relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]" />
        <div className="text-white z-[2] ">
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4">
            <div className="md:ml-16 sm::ml-8  md:mt-16 sm:mt">
              <Motion {...motionProps} transition={{ duration: 0.5, delay: 0.3 }}>
               <TextHeader textHeader={textHeader} headerPosition={true} />
              </Motion>
              <Motion className="md:mt-12 sm:mt-4"
                {...motionProps}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <TextTitle textTitle={textTitle} titlePosition={true} />
              </Motion>
              <Motion className="md:mt-12 sm:mt-4 xs:mt-2"
                  {...motionProps}
                  transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Link href="/select-type">
                 <OthersBtn text="Get Started" />
                </Link>
              </Motion>
            </div>
            <Motion
              className="grid justify-items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              variants={{
                hidden: { opacity: 0, scale: 0.7 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <BannerSlide />
            </Motion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
