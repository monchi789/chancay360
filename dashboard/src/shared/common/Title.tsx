import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

interface TitleProps {
  title: string;
  description: string;
  buttonName?: string;
  link?: string;
  openModal?: () => void;
}

const Title = ({
  title,
  description,
  buttonName = "",
  link = "",
  openModal,
}: TitleProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-gradient-to-r from-ceruleanBlue-800 to-ceruleanBlue-600 shadow-lg rounded-lg overflow-hidden border-b border-gray-200 px-6 py-4">
      <div>
        <div className="flex items-center space-x-3">
          <h2 className="text-white text-3xl font-semibold">{title}</h2>
        </div>
        <p className="text-white text-sm mt-2">{description}</p>
      </div>

      {buttonName ? (
        <Link to={link} className="">
          <Button
            onClick={openModal}
            className="bg-yellowOrange-300  rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-4 px-6 py-2 text-white font-semibold"
          >
            {buttonName}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default Title;
