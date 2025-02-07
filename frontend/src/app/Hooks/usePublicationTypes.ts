import { Publication } from "@/app/interfaces/Publication";
import { useQuery } from "@tanstack/react-query";
import { getAllPublications } from "@/app/lib/publications";

export const usePublications = () => {
  return useQuery<Publication[], Error>({
    queryKey: ["publications"],
    queryFn: getAllPublications,
  });
};
