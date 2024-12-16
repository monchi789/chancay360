import Title from "@/shared/common/Title.tsx";
import PublicationListCard from "@/modules/publication/components/PublicationListCard";
import { useState } from "react";

import PublicationCardCreate from "@/modules/publication/components/PublicationCardCreate.tsx";

const GalleryMain = () => {
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const openModal = () => setShowModal(true);

  // Función para cerrar el modal
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Encabezado con botón para abrir el modal */}
      <Title
        title="Galería"
        description="Aquí puedes gestionar las galerías"
        buttonName="Crear Galería"
        openModal={openModal} // Función que abre el modal
      />

      {/* Listado de galerías */}
      <PublicationListCard />

      {/* Modal para crear una nueva galería */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Componente de creación de galería */}
            <PublicationCardCreate onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryMain;
