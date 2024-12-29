
import { usePublications } from "@/modules/publication/hooks/usePublicationTypes";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { deletePublication } from "@/modules/publication/services/Publication.api";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import { Pencil, Trash2 } from "lucide-react";

const PublicationListCard = () => {
  const navigate = useNavigate();

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

  const openUpdatePage = (idPublication: string) => {
    navigate(`/publicacion/editar/${idPublication}`);
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
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {publicationList.map((publication) => (
          <div
            key={publication.idPublication}
            className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
          >
            {/* Imagen */}
            <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
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
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-xs text-gray-400 mb-1">Fecha Publicación</p>
              <h3 className="text-md font-semibold text-gray-800">
                {publication.title || "Sin título"}
              </h3>
              <div
                className="text-sm text-gray-600 mt-2 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: publication.content || "No hay descripción disponible",
                }}
              ></div>

              {/* Footer */}
              <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
                <span className="font-semibold text-gray-600">Autor</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openUpdatePage(publication.idPublication!)}
                    className="hover:text-blue-500 transition"
                  >
                    <Pencil size={16} />
                  </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationListCard;
