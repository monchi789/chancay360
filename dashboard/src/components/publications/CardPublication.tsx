import fotoChancay from "@/assets/images/chancay-ee.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { FilePenIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog"

const enum Categorias {
  NOTICIAS = "noticia",
  PROYECTOS = "proyecto",
  TRABAJOS = "trabajo",
  REVISTAS = "revista"

};
const bgColorByCategory: Record<Categorias, string> = {
  [Categorias.NOTICIAS]: 'bg-[#1E90FF]',   // Azul
  [Categorias.PROYECTOS]: 'bg-[#F29305]',  // Naranja
  [Categorias.TRABAJOS]: 'bg-[#28A745]',   // Verde
  [Categorias.REVISTAS]: 'bg-[#6F42C1]'     // Violeta
};


const CardPublication = () => {
  return (
    <Card className="p-0 rounded-3xl ">
      <CardHeader className="p-0">

        <div className="rounded-t-3xl relative">
          <img
            src={fotoChancay}
            alt="Aqui poner alt"
            className="rounded-t-2xl"
          />
          <p className={`absolute ${bgColorByCategory[Categorias.NOTICIAS]} top-2.5 right-4 text-sm py-1 px-4 rounded-lg shadow text-white uppercase font-semibold`}>
            {Categorias.NOTICIAS}
          </p>
        </div>
        <CardTitle className="px-3 text-xl uppercase">
          Chancay Puerto de Oportunidades
        </CardTitle>
        <CardDescription className="px-3 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quis, facere error molestias rerum pariatur sapiente, possimus laudantium quibusdam, porro molestiae. Voluptates reiciendis facilis ipsa aliquam dolorem tenetur, odit deleniti!
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 ">

        <div className="flex justify-between">
          <p className="text-gray-500">
            Estado:{" "}
            <span className="font-semibold text-green-700">Publicado</span>
          </p>
          <p className="text-gray-500 ">Fecha: <span className=" textfont-medium italic">13/02/24</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-3 mb-3">
  <p className="text-gray-500 text-sm">
    Publicado por: <span className="text-red-300">Mi</span>
  </p>
  <div className="flex gap-2">
    <a className="bg-prussian-blue-400 hover:bg-prussian-blue-500 border-prussian-blue-600 text-white font-semibold hover:text-white rounded-full p-2">
      <FilePenIcon size="1.2rem" />
    </a>
    <AlertDialog>
  <AlertDialogTrigger asChild>
    <button className="bg-bright-red-400 hover:bg-bright-red-500 border-bright-red-600 text-white font-semibold hover:text-white rounded-full p-2">
      <Trash2 size="1.2rem" />
    </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Estas seguro de eliminar publicación?</AlertDialogTitle>
      <AlertDialogDescription>
      Esta acción es permanente y no se puede deshacer. Si continúas, la publicación será <strong className="text-red-500">eliminada de forma definitiva. </strong>      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={() => { /* por ahora, no hace nada */ }}>
        Eliminar Publicacion
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  </div>
</CardFooter>
    </Card>
  );
};

export default CardPublication;
