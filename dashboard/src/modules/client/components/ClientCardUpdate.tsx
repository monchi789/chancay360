import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Client } from "@/interfaces/Client";
import { getClientById, updateClient } from "../services/Client.api";
import { useQueryClient } from "@tanstack/react-query";

interface ClientEditProps {
  idClient: string;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const ClientEdit: React.FC<ClientEditProps> = ({ idClient, onClose }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Client>({
    idClient: "",
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
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      setStatus("loading");
      try {
        const client = await getClientById(idClient);
        setFormData(client);
        setStatus("idle");
      } catch (error) {
        console.error("Error al cargar el cliente:", error);
        setErrorMessage("Error al cargar el cliente.");
        setStatus("error");
      }
    };
    fetchClient();
  }, [idClient]);

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

  const handleAuthorizedChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, authorized: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (formData.name) {
      const nameError = validateField("name", formData.name);
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }
    }

    if (formData.lastName) {
      const lastNameError = validateField("lastName", formData.lastName);
      if (lastNameError) {
        newErrors.lastName = lastNameError;
        isValid = false;
      }
    }

    if (formData.enterprise) {
      const enterpriseError = validateField("enterprise", formData.enterprise);
      if (enterpriseError) {
        newErrors.enterprise = enterpriseError;
        isValid = false;
      }
    }

    if (formData.position) {
      const positionError = validateField("position", formData.position);
      if (positionError) {
        newErrors.position = positionError;
        isValid = false;
      }
    }

    if (formData.email) {
      const emailError = validateField("email", formData.email);
      if (emailError) {
        newErrors.email = emailError;
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
    const updateData: Partial<Client> = {};
    if (formData.name) updateData.name = formData.name;
    if (formData.lastName) updateData.lastName = formData.lastName;
    if (formData.enterprise) updateData.enterprise = formData.enterprise;
    if (formData.position) updateData.position = formData.position;
    if (formData.email) updateData.email = formData.email;
    if (formData.authorized !== undefined)
      updateData.authorized = formData.authorized;

    try {
      await updateClient(idClient, updateData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["client"] });
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Editar Cliente
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Cliente actualizado con éxito.
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
            value={formData.idClient}
            className="block w-full mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled
          />
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
            Correo Electrónico
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

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700">
            Autorizado
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => handleAuthorizedChange(true)}
              className={`p-2 rounded-lg ${
                formData.authorized ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => handleAuthorizedChange(false)}
              className={`p-2 rounded-lg ${
                !formData.authorized ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 bg-gray-200 p-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white p-2 rounded-lg"
          >
            <Save className="mr-2" />
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClientEdit;
