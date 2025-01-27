import { useState } from "react";
import { CardContent } from "@/shared/components/ui/card.tsx";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/components/ui/carousel.tsx";

import { PacmanLoader } from "react-spinners";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import Autoplay from "embla-carousel-autoplay";
import { Pencil, Trash2 } from "lucide-react";
import { deletePopUp } from "../services/PopUp.api";
import { usePopUps } from "../hooks/usePopUp";
import PopUpCardUpdate from "./PopUpCardUpdate";

const PopUpListCard = () => {
  const [editingPopUpId, setEditingPopUpId] = useState<number | null>(null);

  const openModal = (idPopUp: number) => setEditingPopUpId(idPopUp);
  const closeModal = () => setEditingPopUpId(null);

  const { data: popUpList, isLoading, isError, error, refetch } = usePopUps();
  const apiUrl = import.meta.env.VITE_URL;

  const handleDelete = async (idPopUp: number) => {
    try {
      await deletePopUp(idPopUp);
      await refetch();
    } catch (error) {
      console.error("Error al eliminar el pop-up:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#FFA938" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error: {error instanceof Error ? error.message : "Algo salió mal"}
      </div>
    );
  }

  if (!popUpList?.length) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No hay pop-ups disponibles
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-2 gap-x-2">
        {popUpList.map((popup) => (
          <div key={popup.idPopUp} className="max-w-80 bg-gray-200 rounded-md items-center justify-center shadow-md">
            <div className="relative">
              <Carousel
                className="w-full"
                plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
                opts={{ align: "start", loop: true }}
              >
                <CarouselContent>
                  {(popup.images || []).map((image, index) => (
                    <CarouselItem key={index}>
                      <CardContent className="flex aspect-video items-center justify-center p-2">
                        <img
                          src={`${apiUrl}${image}`}
                          alt={`Pop-up Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => (e.currentTarget.src = "path/to/placeholder-image.jpg")}
                        />
                      </CardContent>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() => openModal(popup.idPopUp)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Pencil className="w-4 h-4 text-blue-500" />
                </button>
                <DeleteAlertDialog
                  title="Confirmar Eliminación"
                  description="¿Estás seguro de que quieres eliminar este pop-up?"
                  onConfirm={() => handleDelete(popup.idPopUp)}
                  trigger={
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPopUpId !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <PopUpCardUpdate idPopUp={editingPopUpId} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpListCard;
