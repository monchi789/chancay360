import { useQuery } from "@tanstack/react-query"
import { getAllClients } from "../services/Client.api"
import { Client } from "@/interfaces/Client"

export const useClient = () => {
  return useQuery<Client[], Error>({
    queryKey: ["client"],
    queryFn: getAllClients,
  })
}
