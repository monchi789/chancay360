import { PopUp } from "@/interfaces/PopUp"
import { useQuery } from "@tanstack/react-query"
import { getAllPopUps } from "../services/PopUp.api"

export const usePopUps = () => {
  return useQuery<PopUp[], Error>({
    queryKey: ["pop-ups"],
    queryFn: getAllPopUps,
  })
}
