import Title from "@/shared/common/Title";
import { useState } from "react";
import UserCreate from "../components/UserCardCreate";
import UserList from "../components/UserListTable";

const UserMain = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Title
        title="Usuarios"
        description="Aquí puedes gestionar los clientes suscritos por la plataforma."
        buttonName="Crear Usuario"
        openModal={openModal}
      />

      <UserList />

      <div className="">
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <UserCreate onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMain;
