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

    <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center bg-gradient-to-r from-ceruleanBlue-800 to-ceruleanBlue-600 shadow-lg rounded-lg overflow-hidden border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      {/* Contenido del título */}
      <div className="text-center lg:text-left">
        <h2 className="text-white text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>

        {/* Descripción visible solo en pantallas grandes */}
        <p className="text-white text-sm sm:text-base mt-2 hidden lg:block">
          {description}
        </p>
      </div>

      {/* Botón */}
      {buttonName ? (
        <Link
          to={link}
          className="mt-4 lg:mt-0 flex justify-center lg:justify-end w-full lg:w-auto"
        >
          <Button
            onClick={openModal}
            className="bg-yellowOrange-300 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-4 sm:px-6 py-2 text-white font-semibold"
          >
            {buttonName}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default Title;
