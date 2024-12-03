import Title from "@/shared/common/Title";
import GeneralTypeList from "../components/GeneralTypeListTable";
import { useState } from "react";
import GeneralTypeCreate from "../components/GeneralTypeCardCreateModal";


const GeneralTypeMain = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Title
        title="Tipos Generales"
        description="Aquí puedes gestionar todos los tipos generales."
        buttonName="Crear Tipo General"
        openModal={openModal}
      />
      <GeneralTypeList />

      <div className="">
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <GeneralTypeCreate onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralTypeMain;
