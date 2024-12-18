import { Publication } from "@/interfaces/Publication";
import { useQuery } from "@tanstack/react-query";
import { getAllPublications } from "../services/Publication.api";

export const usePublications = () => {
  return useQuery<Publication[], Error>({
    queryKey: ["publications"],
    queryFn: getAllPublications,
  });
};
