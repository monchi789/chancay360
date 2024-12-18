  import Title from "@/shared/common/Title.tsx";
  import GalleryListCard from "@/modules/gallery/components/GalleryListCard.tsx";
  import {useState} from "react";
  import GalleryCardCreate from "@/modules/gallery/components/GalleryCardCreate.tsx";
  
  const GalleryMain = () => {
    const [showModal, setShowModal] = useState(false);
  
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  
    return (
      <>
        <Title
          title="Galeria"
          description="Aqui puedes gestionar las galerias"
          buttonName="Crear Galeria"
          openModal={openModal}
        />
        <GalleryListCard/>
        <div>
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <GalleryCardCreate onClose={closeModal}/>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default GalleryMain;
