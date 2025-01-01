import { User } from "@/interfaces/User";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/User.api";

export const useUser = () => {
  return useQuery<User[], Error>({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });
};
