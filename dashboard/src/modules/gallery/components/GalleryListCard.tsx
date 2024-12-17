import {CardContent} from "@/shared/components/ui/card.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel.tsx";
import {useGallery} from "@/modules/gallery/hooks/useGallery.ts";
import {PacmanLoader} from "react-spinners";
import {useState} from "react";
import {deleteGallery} from "@/modules/gallery/services/Gallery.api";
import {DeleteAlertDialog} from "@/shared/common/DeleteAlertDialog";
import GalleryCardUpdate from "@/modules/gallery/components/GalleryCardUpdate.tsx";
import Autoplay from "embla-carousel-autoplay";
import { Pencil, Trash2 } from "lucide-react";

const GalleryListCard = () => {
  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);

  const openModal = (idGallery: number) => setEditingGalleryId(idGallery);
  const closeModal = () => setEditingGalleryId(null);

  const {data: galleryList, isLoading, isError, error, refetch} = useGallery();
  const apiUrl = import.meta.env.VITE_URL;

  const handleDelete = async (idGallery: number) => {
    try {
      await deleteGallery(idGallery);
      await refetch();
    } catch (error) {
      console.error("Error al eliminar la galería:", error);
    }
  };

  const createAutoplayPlugin = () =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: true
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#FFA938"/>
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

  if (!galleryList?.length) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No hay galería
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-2 gap-x-2">
        {galleryList.map((gallery) => (
          <div key={gallery.idGallery} className="max-w-80 bg-gray-200 rounded-md items-center justify-center shadow-md">
            <div className="relative">
              <Carousel
                className="w-full"
                plugins={[createAutoplayPlugin()]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {gallery.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <img
                          src={`${apiUrl}${image}`}
                          alt={`Gallery Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "path/to/placeholder-image.jpg";
                          }}
                        />
                      </CardContent>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() => openModal(gallery.idGallery)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Pencil className="w-4 h-4 text-blue-500" />
                </button>
                <DeleteAlertDialog
                  title="Confirmar Eliminación"
                  description="¿Estás seguro de que quieres eliminar este tipo?"
                  onConfirm={() => handleDelete(gallery.idGallery)}
                  trigger={
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  }
                />
              </div>
            </div>

            <div className="mt-2 m-2 bg-white p-2 rounded-lg max-h-36">
              <div className="mb-2">
                <p className="text-sm font-semibold text-mediumPurple-900">Descripción:</p>
                <p className="text-gray-800 text-sm">
                  {gallery.description ? (gallery.description.length > 80 ? `${gallery.description.slice(0, 80)}...` : gallery.description) : "No hay descripcion disponible"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingGalleryId !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <GalleryCardUpdate idGallery={editingGalleryId} onClose={closeModal}/>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryListCard;
