import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { useGeneralTypes } from "../hooks/useGeneralTypes";
import { deleteGeneralType } from "../services/GeneralType.api";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import GeneralTypeEdit from "./GeneralTypeCardUpdate";

const GeneralTypeList = () => {
  const {
    data: generalTypesList,
    isLoading,
    isError,
    error,
    refetch,
  } = useGeneralTypes();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGeneralType(id);
      await refetch(); // Esto ya maneja la actualización.
    } catch (error) {
      console.error("Error al eliminar el tipo general:", error);
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
      {generalTypesList?.length ? (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
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
              {generalTypesList.map((generalType) => (
                <tr key={generalType.idGeneralType}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {generalType.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {generalType.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {generalType.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {generalType.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {generalType.active ? "Activo" : "Inactivo"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-md"
                      onClick={() =>
                        handleEdit(generalType.idGeneralType as string)
                      }
                    >
                      Editar
                    </button>
                    <DeleteAlertDialog
                      title="Confirmar Eliminación"
                      description="¿Estás seguro de que quieres eliminar este tipo?"
                      onConfirm={() =>
                        handleDelete(generalType.idGeneralType as string)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          No hay tipos generales
        </div>
      )}
      {selectedId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <GeneralTypeEdit
              idGeneralType={selectedId}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralTypeList;
