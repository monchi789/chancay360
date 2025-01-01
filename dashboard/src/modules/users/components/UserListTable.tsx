import { DeleteAlertDialog } from "@/shared/common/DeleteAlertDialog";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";
import { User } from "@/interfaces/User";
import { deleteUser, getAllUsers } from "../services/User.api";
import { useQuery } from "@tanstack/react-query";
import UserEdit from "./UserCardUpdate";

const UserList = () => {
  const {
    data: usersList,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      await refetch();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
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
      {usersList?.length ? (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apellido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersList.map((user) => (
                <tr key={user.idUser}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.rol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`Avatar de ${user.name}`}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-md mr-2"
                      onClick={() => handleEdit(user.idUser)}
                    >
                      Editar
                    </button>
                    <DeleteAlertDialog
                      title="Confirmar Eliminación"
                      description="¿Estás seguro de que quieres eliminar este usuario?"
                      onConfirm={() => handleDelete(user.idUser)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          No hay usuarios
        </div>
      )}
      {selectedId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <UserEdit idUser={selectedId} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
