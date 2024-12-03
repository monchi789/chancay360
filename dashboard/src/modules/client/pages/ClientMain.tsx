import Title from "@/shared/common/Title";
import ClientList from "../components/ClientListTable";
import ClientCreate from "../components/ClientCardCreate";
import { useState } from "react";

const ClientMain = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Title
        title="Clientes"
        description="Aquí puedes gestionar los clientes suscritos por la plataforma."
        buttonName="Crear Cliente"
        openModal={openModal}
      />
      <ClientList />

      <div className="">
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <ClientCreate onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientMain;
