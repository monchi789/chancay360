import { PacmanLoader } from "react-spinners";
import { useGeneralTypes } from "../hooks/useGeneralTypes";
import { deleteGeneralType } from "../services/GeneralType.api";
import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";

const GeneralTypeList = () => {
  const {
    data: generalTypesList,
    isLoading,
    isError,
    error,
    refetch, // Usamos refetch para volver a obtener los datos después de la eliminación
  } = useGeneralTypes();

  const handleDelete = async (id: string) => {
    try {
      await deleteGeneralType(id); // Llamada a la API para eliminar el tipo general
      // Refrescar la lista después de eliminar usando refetch
      await refetch(); // Llamamos a refetch para obtener los datos actualizados
    } catch (error) {
      console.error("Error al eliminar el tipo general", error);
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Código
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripcion
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {generalTypesList.map((generalType) => (
                <tr key={generalType.code}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {generalType.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                      className="bg-ceruleanBlue-600 hover:bg-ceruleanBlue-900 text-white py-2 px-4 rounded-md"
                      onClick={() => console.log(generalType.idGeneralType)}
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
    </div>
  );
};

export default GeneralTypeList;
