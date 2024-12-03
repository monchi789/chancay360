import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GeneralType } from "@/interfaces/GeneralType";
import {
  getGeneralTypeById,
  updateGeneralType,
  deleteGeneralType, // Asegúrate de importar la función de eliminar
} from "../services/GeneralType.api";
import { useQueryClient } from "@tanstack/react-query";

enum Type {
  GENERAL = "PUBLICATION",
  SPECIFIC = "SPECIFIC",
  OTHER = "OTHER",
}

interface GeneralTypeEditProps {
  onClose: () => void;
}

const GeneralTypeEdit = ({ onClose }: GeneralTypeEditProps) => {
  const queryClient = useQueryClient(); // Obtener el cliente de consultas de React Query
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<GeneralType>({
    code: "",
    name: "",
    description: "",
    type: Type.GENERAL,
    active: true,
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeneralType = async () => {
      try {
        const generalType = await getGeneralTypeById(id as string);
        setFormData(generalType);
      } catch (error) {
        console.error("Error al obtener el tipo general:", error);
      }
    };

    fetchGeneralType();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const { code, name } = formData;

    if (!code || !name) {
      setErrorMessage("Los campos Código y Nombre son obligatorios.");
      return;
    }

    try {
      await updateGeneralType(id as string, formData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["general-type"] });
      setTimeout(() => {
        navigate("/general-types");
      }, 50);
      setTimeout(onClose, 100);
    } catch (error) {
      console.error("Error al actualizar el tipo general:", error);
      setErrorMessage(
        "Error al actualizar el tipo general. Verifica los datos e inténtalo nuevamente."
      );
      setStatus("error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGeneralType(id as string);
      queryClient.invalidateQueries({ queryKey: ["general-type"] });
      navigate("/general-types"); // Redirigir a la lista de tipos generales
    } catch (error) {
      console.error("Error al eliminar el tipo general:", error);
      setErrorMessage(
        "Error al eliminar el tipo general. Inténtalo nuevamente."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800">Editar Tipo General</h2>

      {status === "success" && (
        <p className="text-green-500">Tipo general actualizado con éxito.</p>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Código
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.values(Type).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-500 focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Activo</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Eliminar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

export default GeneralTypeEdit;
