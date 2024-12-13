import {Card, CardContent} from "@/shared/components/ui/card.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel.tsx";
import {useGallery} from "@/modules/gallery/hooks/useGallery.ts";
import {PacmanLoader} from "react-spinners";

const GalleryListCard = () => {
  const {data: galleryList, isLoading, isError, error} = useGallery();
  const apiUrl = import.meta.env.VITE_URL;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#FFA938"/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error: {error instanceof Error ? error.message : "Algo salió mal"}
      </div>
    );
  }

  if (!galleryList?.length) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        No hay galería
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {galleryList.map((gallery) => (
        <Carousel key={gallery.idGallery} className="w-full max-w-sm">
          <CarouselContent>
            <CarouselItem className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {gallery.images.length > 0 ? (
                    <img
                      src={`${apiUrl}${gallery.images[0]}`}
                      alt={`Gallery Image`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "path/to/placeholder-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span>No Image Available</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      ))}
    </div>
  );
};

export default GalleryListCard;
