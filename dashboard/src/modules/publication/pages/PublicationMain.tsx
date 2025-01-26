import { useState, useEffect } from "react";
import Title from "@/shared/common/Title.tsx";
import PublicationListCard from "@/modules/publication/components/PublicationListCard";

const PublicationMain: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // Simulación de carga
  }, []);

  return (
    <section className="space-y-6">
      <Title
        title="Publicaciones"
        description="Aquí puedes gestionar las publicaciones"
        buttonName="Crear Publicación"
        link="/publicacion/crear"
      />
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando publicaciones...</p>
      ) : (
        <PublicationListCard />
      )}
    </section>
  );
};

export default PublicationMain;
