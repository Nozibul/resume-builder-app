import ChooseLeft from "./ChooseLeft";
import ChooseRight from "./ChooseRight";

const ChooseSection = () => {
  return (
    <>
      <div className="mx-8 p-6 mt-12 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4 place-items-end">
        <div className="">
          <ChooseLeft />
        </div>
        <div>
          <ChooseRight />
        </div>
      </div>
    </>
  );
};

export default ChooseSection;
