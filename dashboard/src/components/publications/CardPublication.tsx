import fotoChancay from "@/assets/images/chancay-ee.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FilePenIcon, Trash2 } from "lucide-react";

const CardPublication = () => {
  return (
    <Card className="p-0 rounded-3xl w-xs">
      <CardHeader className="p-0">
        <div className="rounded-t-3xl relative">
          <img
            src={fotoChancay}
            alt="Aqui poner alt"
            className="rounded-t-3xl"
          />
          <p className="absolute bg-[#F29305] top-2.5 right-4 text-sm py-1 px-4 rounded-xl shadow text-white font-semibold">
            Blog
          </p>
        </div>
        <CardTitle className="pl-2 text-2xl uppercase">
          Chancay Puerto de Oportunidades
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="flex justify-between">
          <p className="text-gray-500">
            Estado:{" "}
            <span className="font-semibold text-green-700">Publicado</span>
          </p>
          <p>Fecha: 13/02/24</p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-x-2 mb-3">
        <a className="bg-prussian-blue-400 hover:bg-prussian-blue-500 border-prussian-blue-600 text-white font-semibold hover:text-white rounded-full p-2">
          <FilePenIcon size="1.2rem" />
        </a>
        <a className="bg-bright-red-400 hover:bg-bright-red-500 border-bright-red-600 text-white font-semibold hover:text-white rounded-full p-2">
          <Trash2 size="1.2rem" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default CardPublication;
