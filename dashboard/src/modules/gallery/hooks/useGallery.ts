import {useQuery} from "@tanstack/react-query";
import {Gallery} from "@/interfaces/Gallery.ts";
import {getAllGalleries} from "@/modules/gallery/services/Gallery.api.ts";

export const useGallery = () => {
  return useQuery<Gallery[], Error>({
    queryKey: ["gallery"],
    queryFn: getAllGalleries,
  })
}
