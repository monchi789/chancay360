import { usePublications } from "@/modules/publication/hooks/usePublicationTypes";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";
import { deletePublication } from "@/modules/publication/services/Publication.api";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import { Pencil, Trash2 } from "lucide-react";
import PublicationCardUpdate from "@/modules/publication/components/PublicationCardUpdate";

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
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {publicationList.map((publication) => (
        <div
          key={publication.idPublication}
          className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-[300px] h-[350px]"
        >
          {/* Imagen */}
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            {publication.cover?.[0] ? (
              <img
                src={`${apiUrl}${publication.cover?.[0]}`}
                alt="Imagen Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 font-medium">Imagen Cover</span>
            )}
          </div>

          {/* Contenido */}
          <div className="flex flex-col justify-between flex-grow p-4">
          <div>
             {/* Aquí pondremos el tiempo/hora de publicacion */}
  <p className="text-xs text-gray-400 mb-1">Fecha Publicacion</p>
  <h3 className="text-md font-semibold text-gray-800 leading-tight">
    {publication.title || "Sin título"}
  </h3>
  {/* Renderizamos el contenido HTML */}
  <div
    className="text-sm text-gray-600 mt-2 line-clamp-3"
    dangerouslySetInnerHTML={{ __html: publication.content || "No hay descripción disponible" }}
  ></div>
</div>


            {/* Footer */}
            <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
              <span className="font-semibold text-gray-600">Autor</span>
              <div className="flex gap-4">
                {/* Botón Editar */}
                <button
                  onClick={() => openModal(publication.idPublication!)}
                  className="hover:text-blue-500 transition"
                >
                  <Pencil size={16} />
                </button>
                {/* Botón Eliminar */}
                <DeleteAlertDialog
                  title="Confirmar Eliminación"
                  description="¿Estás seguro de que quieres eliminar esta publicación?"
                  onConfirm={() => handleDelete(publication.idPublication!)}
                  trigger={
                    <button className="hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  }
                />
              </div>
            </div>
          </div>

          {/* Modal de Actualización */}
          {showModal && selectedPublicationId === publication.idPublication && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <PublicationCardUpdate
                  idPublication={selectedPublicationId!}
                  onClose={closeModal}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PublicationListCard;
