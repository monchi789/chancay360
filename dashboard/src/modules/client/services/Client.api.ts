import { Client } from "@/interfaces/Client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getAllClients = async (): Promise<Client[]> => {
  const res = await axiosInstance.get("client");
  return res.data;
};

export const getClientById = async (idClient: string): Promise<Client> => {
  try {
    const res = await axiosInstance.get(`client/${idClient}`);
    return res.data;
  } catch (error) {
    console.error("Error en getClientById:", error);
    throw new Error("Error al obtener el cliente");
  }
};

export const updateClient = async (
  idClient: string,
  client: Partial<Client>
): Promise<Client> => {
  try {
    const res = await axiosInstance.patch(`client/${idClient}`, client);
    return res.data;
  } catch (error) {
    console.error("Error en updateClient:", error);
    throw new Error("Error al actualizar el cliente");
  }
};

export const createClient = async (
  client: Omit<Client, "idClient">
): Promise<Client> => {
  try {
    const res = await axiosInstance.post("client", client);
    return res.data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw new Error("Error al crear el cliente");
  }
};

export const deleteClient = async (idClient: string): Promise<void> => {
  try {
    await axiosInstance.delete(`client/${idClient}`);
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw new Error("Error al eliminar el cliente");
  }
};
