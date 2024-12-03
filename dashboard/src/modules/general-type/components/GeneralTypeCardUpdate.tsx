import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { GeneralType, Type } from "@/interfaces/GeneralType";
import {
  getGeneralTypeById,
  updateGeneralType,
} from "../services/GeneralType.api";
import { useQueryClient } from "@tanstack/react-query";

interface GeneralTypeEditProps {
  idGeneralType: string;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const GeneralTypeEdit: React.FC<GeneralTypeEditProps> = ({
  idGeneralType,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<GeneralType>({
    idGeneralType: "",
    code: "",
    name: "",
    description: "",
    type: Type.PUBLICATION,
    active: true,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeneralType = async () => {
      setStatus("loading");
      try {
        const generalType = await getGeneralTypeById(idGeneralType);
        setFormData(generalType);
        setStatus("idle");
      } catch (error) {
        console.error("Error al cargar el tipo general:", error);
        setErrorMessage("Error al cargar el tipo general.");
        setStatus("error");
      }
    };
    fetchGeneralType();
  }, [idGeneralType]);

  const validateField = (name: string, value: string): string => {
    if (!value || value.length < 3) {
      return `${name} debe tener al menos 3 caracteres`;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
    const error = validateField("type", value);
    setValidationErrors((prev) => ({
      ...prev,
      type: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (formData.code) {
      const codeError = validateField("code", formData.code);
      if (codeError) {
        newErrors.code = codeError;
        isValid = false;
      }
    }

    if (formData.name) {
      const nameError = validateField("name", formData.name);
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }
    }

    if (formData.description) {
      const descError = validateField("description", formData.description);
      if (descError) {
        newErrors.description = descError;
        isValid = false;
      }
    }

    if (formData.type) {
      const typeError = validateField("type", formData.type);
      if (typeError) {
        newErrors.type = typeError;
        isValid = false;
      }
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("loading");

    if (!validateForm()) {
      setStatus("error");
      setErrorMessage("Por favor, corrige los errores en el formulario.");
      return;
    }

    // Crear un objeto con solo los campos modificados
    const updateData: Partial<GeneralType> = {};
    if (formData.code) updateData.code = formData.code;
    if (formData.name) updateData.name = formData.name;
    if (formData.description) updateData.description = formData.description;
    if (formData.type) updateData.type = formData.type;
    if (formData.active !== undefined) updateData.active = formData.active;

    try {
      await updateGeneralType(idGeneralType, updateData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["general-type"] });
      setTimeout(onClose, 100);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Editar Tipo General
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Tipo general actualizado con éxito.
        </p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            ID
          </label>
          <input
            type="text"
            value={formData.idGeneralType}
            className="block w-full mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Código
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.code
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.code && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.code}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Tipo
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.type
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            {Object.values(Type).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {validationErrors.type && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.type}</p>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, active: e.target.checked }))
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
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4 inline-block mr-1" /> Guardar
        </button>
      </div>
    </form>
  );
};

export default GeneralTypeEdit;
