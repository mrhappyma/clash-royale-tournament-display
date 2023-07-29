import Image from "next/image";

const Crown: React.FC<{ e: boolean; type: "blue" | "red" }> = (props) => {
  return (
    <>
      {props.e ? (
        props.type == "blue" ? (
          <Image
            src="/crown-blue.png"
            width="50"
            height="50"
            alt="blue crown"
          />
        ) : (
          <Image src="/crown-red.png" width="50" height="50" alt="red crown" />
        )
      ) : (
        <div className="h-[50px] w-[50px] rounded-sm bg-gray-200 opacity-20" />
      )}
    </>
  );
};

const Crowns: React.FC<{ n: number; type: "blue" | "red" }> = (props) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Crown e={props.n >= 1} type={props.type} />
      <Crown e={props.n >= 2} type={props.type} />
      <Crown e={props.n >= 3} type={props.type} />
    </div>
  );
};
export default Crowns;
