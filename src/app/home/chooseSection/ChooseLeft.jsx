import Image from "next/image";
import { features } from "../../../../local-json/chooseInfo";

const ChooseLeft = () => {
  return (
    <>
      <div className="mt-6">
        {features?.length > 0 ? (
          features.map((feature) => {
            const { id, title, color, img, description } = feature;
            return (
              <div className={`${color} mb-4`} key={id}>
                <div className="flex items-center py-6">
                  <div className="img-styles mx-4">
                    <Image src={img} alt="hand-image" width={35} height={35}/>
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">{title}</p>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
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
