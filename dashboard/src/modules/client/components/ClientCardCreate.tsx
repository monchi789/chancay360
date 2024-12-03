import { useState } from "react";
import { Save } from "lucide-react";
import { Client } from "@/interfaces/Client";
import { createClient } from "../services/Client.api";
import { useQueryClient } from "@tanstack/react-query";

interface ClientCreateProps {
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const ClientCreate = ({ onClose }: ClientCreateProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Client>({
    name: "",
    lastName: "",
    enterprise: "",
    position: "",
    email: "",
    authorized: true,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return `${name} es requerido`;
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Email inválido";
    }
    return "";
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

    try {
      await createClient(formData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["client"] });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Error al crear el cliente.");
        setStatus("error");
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    const fields = ["name", "lastName", "enterprise", "email", "position"];
    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof Client] as string
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setValidationErrors(newErrors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Crear Cliente
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Cliente creado con éxito.
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
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.lastName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Empresa
          </label>
          <input
            type="text"
            name="enterprise"
            value={formData.enterprise}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.enterprise
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.enterprise && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.enterprise}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Cargo
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.position
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.position && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.position}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="authorized"
              checked={formData.authorized}
              onChange={(e) =>
                setFormData({ ...formData, authorized: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-500 focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Autorizado
            </span>
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

export default ClientCreate;
