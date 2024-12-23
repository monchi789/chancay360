import Title from "@/shared/common/Title.tsx";
import PublicationListCard from "@/modules/publication/components/PublicationListCard";

const PublicationMain: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Encabezado con título, descripción y botón para redirigir */}
      <Title
        title="Publicaciones"
        description="Aquí puedes gestionar las publicaciones"
        buttonName="Crear Publicación"
        link="/publicacion/crear"
      />

      {/* Lista de publicaciones */}
      <PublicationListCard />
    </div>
  );
};

export default PublicationMain;
