import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import { useClient } from "../hooks/useClient";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";
import { deleteClient } from "../services/Client.api";
import ClientEdit from "./ClientCardUpdate";

const ClientList = () => {
  const { data: clientsList, isLoading, isError, error, refetch } = useClient();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClient(id);
      await refetch();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#FFA938" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error: {error instanceof Error ? error.message : "Algo salió mal"}
      </div>
    );
  }


  return (
    <div className="mt-6">
      {clientsList?.length ? (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apellido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientsList.map((client) => (
                <tr key={client.idClient}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.enterprise}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {client.authorized ? "Autorizado" : "No Autorizado"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-md"
                      onClick={() => handleEdit(client.idClient as string)}
                    >
                      Editar
                    </button>
                    <DeleteAlertDialog
                      title="Confirmar Eliminación"
                      description="¿Estás seguro de que quieres eliminar este cliente?"
                      onConfirm={() => handleDelete(client.idClient as string)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          No hay clientes
        </div>
      )}
      {selectedId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <ClientEdit idClient={selectedId} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
