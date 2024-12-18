import Title from "@/shared/common/Title.tsx";
import PublicationListCard from "@/modules/publication/components/PublicationListCard";
import { useState } from "react";

import PublicationCardCreate from "@/modules/publication/components/PublicationCardCreate.tsx";

const PublicationMain = () => {
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const openModal = () => setShowModal(true);

  // Función para cerrar el modal
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Encabezado con botón para abrir el modal */}
      <div className="p-4 sm:p-6 md:p-8">
        <Title
          title="Publicacion"
          description="Aquí puedes gestionar las publicaciones"
          buttonName="Crear Publicación"
          openModal={openModal} // Función que abre el modal
        />
      </div>

      {/* Listado de publicaciones */}
      <div className="p-4 sm:p-6 md:p-8">
        <PublicationListCard />
      </div>

      {/* Modal para crear una nueva publicación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full 
                       max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl relative"
          >
            {/* Botón para cerrar el modal */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-all duration-300"
            >
              &times;
            </button>

            {/* Componente de creación de publicación */}
            <PublicationCardCreate onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default PublicationMain;
