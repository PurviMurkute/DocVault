import { VscLoading } from "react-icons/vsc";

const Loader = ({ loadingText }) => {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <VscLoading className="animate-spin w-5 h-5" />
      <p className="ml-4 text-md">{loadingText}</p>
    </div>
  );
};

export default Loader;
