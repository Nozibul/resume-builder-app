import Skeleton from "@/components/skeleton/Skeleton";

const LoadingTemplate = () => {
 
  return (
    <>
      <div className="grid grid-cols-4 gap-4 place-items-center">
        {[1, 2, 3, 4]?.map((item) => {
          return (
            <div className="text-center py-2" key={item}>
              <Skeleton width={260} height={320} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LoadingTemplate;
