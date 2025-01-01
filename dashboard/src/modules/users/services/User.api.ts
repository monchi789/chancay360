import axiosInstance from "@/config/axios";
import { User } from "@/interfaces/User";

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("user");
  return res.data;
};

export const getUserById = async (idUser: string): Promise<User> => {
  try {
    const rest = await axiosInstance.get(`user/${idUser}`);
    return rest.data;
  } catch {
    throw new Error("Error to get the user by ID");
  }
}

export const updateUser = async (idUser: string, user: Partial<User>): Promise<User> => {
  try {
    const res = await axiosInstance.patch(`user/${idUser}`, user);
    return res.data;
  } catch {
    throw new Error("Error to update the user");
  }
}

export const createUser = async (user: Omit<User, "idUser">): Promise<User> => {
  try {
    console.log(user);
    const res = await axiosInstance.post("user", user);
    return res.data;
  } catch {
    throw new Error("Error to create a new user");
  }
}

export const deleteUser = async (idUser: string): Promise<void> => {
  try {
    await axiosInstance.delete(`user/${idUser}`);
  } catch {
    throw new Error("Error to delete the user");
  }
}
