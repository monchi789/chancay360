import { useState } from "react";
import { Save } from "lucide-react";
import { GeneralType } from "@/interfaces/GeneralType";
import { createGeneralType } from "../services/GeneralType.api";
import { useQueryClient } from "@tanstack/react-query";  // Asegúrate de importar useQueryClient

enum Type {
  GENERAL = "PUBLICATION",
  SPECIFIC = "SPECIFIC",
  OTHER = "OTHER",
}

interface GeneralTypeCreateProps {
  onClose: () => void;
}

const GeneralTypeCreate = ({ onClose }: GeneralTypeCreateProps) => {
  const queryClient = useQueryClient();  

  const [formData, setFormData] = useState<GeneralType>({
    code: "",
    name: "",
    description: "",
    type: Type.GENERAL,
    active: true,
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await createGeneralType(formData); 
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["general-type"] }); 
      setTimeout(() => {
        window.location.reload();
      }, 50);  

      setTimeout(onClose, 100);
    } catch (error) {
      console.error("Error al crear el tipo general:", error);
      setErrorMessage(
        "Error al crear el tipo general. Verifica los datos e inténtalo nuevamente."
      );
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-">
      <h2 className="text-2xl font-bold text-gray-800">Crear Tipo General</h2>

      {status === "success" && (
        <p className="text-green-500">Tipo general creado con éxito.</p>
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

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Save className="w-4 h-4 inline-block mr-1" />
          Guardar
        </button>
      </div>
    </form>
  );
};

export default GeneralTypeCreate;
