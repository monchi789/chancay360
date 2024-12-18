import { CardContent } from "@/shared/components/ui/card.tsx";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/components/ui/carousel.tsx";
import { usePublications } from "@/modules/publication/hooks/usePublicationTypes";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";
import { deletePublication } from "@/modules/publication/services/Publication.api";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
const PublicationListCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPublicationId, setSelectedPublicationId] = useState<string | null>(null);

  const openModal = (idPublication: string) => {
    setSelectedPublicationId(idPublication);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPublicationId(null);
    setShowModal(false);
  };

  const { data: publicationList, isLoading, isError, error, refetch } = usePublications();
  const apiUrl = import.meta.env.VITE_URL;

  const handleDelete = async (idPublication: string) => {
    try {
      await deletePublication(idPublication);
      await refetch();
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
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

  if (!publicationList?.length) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No hay publicaciones
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-2 gap-x-2">
        {publicationList.map((publication) => (
          <div key={publication.idPublication} className="max-w-80 bg-gray-100 rounded-md items-center justify-center">
            {/* Carrusel de imágenes */}
            <Carousel className="w-full">
              <CarouselContent>
                {publication.cover?.map((image, index) => (
                  <CarouselItem key={index}>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <img
                        src={`${apiUrl}${image}`}
                        alt={`Publication Image ${index + 1}`}
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

            {/* Información de la publicación */}
            <div className="mt-2 m-2 bg-white p-2 rounded-lg max-h-36">
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">Título:</p>
                <p className="text-gray-800 text-sm">{publication.title}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-600">:</p>
                <p className="text-gray-800 text-sm">
                  {publication.content
                    ? publication.content.length > 40
                      ? `${publication.content.slice(0, 40)}...`
                      : publication.content
                    : "No hay descripción disponible"}
                </p>
              </div>

            </div>

            {/* Modal de actualización */}
            {showModal && selectedPublicationId === publication.idPublication && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PublicationListCard;
