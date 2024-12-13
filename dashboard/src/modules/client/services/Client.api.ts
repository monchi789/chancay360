import axiosInstance from "@/config/axios";
import {Client} from "@/interfaces/Client";

export const getAllClients = async (): Promise<Client[]> => {
  const res = await axiosInstance.get("client");
  return res.data;
};

export const getClientById = async (idClient: string): Promise<Client> => {
  try {
    const res = await axiosInstance.get(`client/${idClient}`);
    return res.data;
  } catch {
    throw new Error("Error to get the client by ID");
  }
};

export const updateClient = async (
  idClient: string,
  client: Partial<Client>
): Promise<Client> => {
  try {
    const res = await axiosInstance.patch(`client/${idClient}`, client);
    return res.data;
  } catch {
    throw new Error("Error to update the client");
  }
};

export const createClient = async (
  client: Omit<Client, "idClient">
): Promise<Client> => {
  try {
    const res = await axiosInstance.post("client", client);
    return res.data;
  } catch {
    throw new Error("Error to create a new client");
  }
};

export const deleteClient = async (idClient: string): Promise<void> => {
  try {
    await axiosInstance.delete(`client/${idClient}`);
  } catch {
    throw new Error("Error to delete de the client");
  }
};
