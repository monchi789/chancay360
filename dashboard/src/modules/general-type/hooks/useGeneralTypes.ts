import { GeneralType } from "@/interfaces/GeneralType"
import { useQuery } from "@tanstack/react-query"
import { getAllGeneralTypes } from "../services/GeneralType.api"

export const useGeneralTypes = () => {
  return useQuery<GeneralType[], Error>({
    queryKey: ["general-type"],
    queryFn: getAllGeneralTypes,
  })
}
