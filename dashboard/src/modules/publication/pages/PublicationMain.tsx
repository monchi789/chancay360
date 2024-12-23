import Title from "@/shared/common/Title.tsx";
import PublicationListCard from "@/modules/publication/components/PublicationListCard";

const PublicationMain: React.FC = () => {
  return (
    <div className="space-y-6">
      <Title
        title="Publicaciones"
        description="Aquí puedes gestionar las publicaciones"
        buttonName="Crear Publicación"
        link="/publicacion/crear"
      />
      <PublicationListCard />
    </div>
  );
};

export default PublicationMain;
