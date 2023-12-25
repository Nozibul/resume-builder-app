import Link from "next/link";
import BannerSlide from "../bannerSlide/BannerSlide";
import OthersBtn from "../ui/buttons/OthersBtn";
import { TextHeader, TextTitle } from "../ui/text/Text";

const Banner = () => {
  let textHeader = `Whether you're looking to switch careers.`;
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`;

  return (
    <>
      <section className="flex w-full items-center lg:h-screen md:h-screen sm:h-[650px] justify-center bg-fixed mb-12 bg-center bg-cover custom-img relative">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]" />
        <div className="text-white z-[2] ">
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="md:ml-16 sm::ml-8  md:mt-16 sm:mt">
              <TextHeader textHeader={textHeader} headerPosition={true} />
              <div className="md:mt-12 sm:mt-4">
                <TextTitle textTitle={textTitle} titlePosition={true} />
              </div>
              <div className="md:mt-12 sm:mt-4 xs:mt-2">
                <Link href="/select-type">
                  <OthersBtn text="Get Started" />
                </Link>
              </div>
            </div>
            <div className="grid justify-items-center">
              <BannerSlide />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
