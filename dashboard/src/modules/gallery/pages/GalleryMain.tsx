import Title from "@/shared/common/Title.tsx";
import GalleryListCard from "@/modules/gallery/components/GalleryListCard.tsx";

const GalleryMain = () => {
  return (
    <>
    <Title title="Galeria" description="Aqui puedes gestionar las galerias" buttonName="Crear Galeria"/>
      <GalleryListCard/>
    </>
  )
};

export  default  GalleryMain;
