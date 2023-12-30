import { TextHeader, TextTitle } from "@/components/ui/text/Text";
import Image from "next/image";
import { works } from "../../../../local-json/worksInfo.js";

const Works = () => {
  return (
    <>
      <div className="w-full mt-8 mb-12">
        <TextTitle textTitle="How it Works" />
        <TextHeader
          textHeader="Create CV/Resume Following 3 Simple Steps" tSize="text-xl"
        />
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4  justify-items-center w-full mt-12">
          {works?.length > 0 ? (
            works.map((work) => {
              const { id, title, header, img } = work;
              return (
                <div className="grid justify-items-center" key={id}>
                  <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                    <div className="child-circle flex justify-center items-center">
                      <Image
                        alt="document-image"
                        src={img}
                        width={60}
                        height={70}
                      />
                    </div>
                    <div className="mini-circle flex justify-center items-center">
                      0{id}
                    </div>
                  </div>
                  <div className="mt-4">
                    <TextTitle textTitle={title} />
                    <TextHeader textHeader={header} tSize="text-lg" />
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Works;
