import Title from "@/shared/common/Title.tsx";
import PopUpListCard from "@/modules/PopUp/components/PopUpListaCard";
import { useState } from "react";
import PopUpCardCreate from "@/modules//PopUp/components/PopUpCreate";

const PopUpMain = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Title
        title="PopUps"
        description="Aquí puedes gestionar los PopUps"
        buttonName="Crear PopUp"
        openModal={openModal}
      />
      <PopUpListCard />
      <div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <PopUpCardCreate onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopUpMain;
