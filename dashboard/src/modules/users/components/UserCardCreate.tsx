import { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
import { Rol, User } from "@/interfaces/User";
import { createUser } from "../services/User.api";
import { useQueryClient } from "@tanstack/react-query";

interface UserCreateProps {
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const UserCreate = ({ onClose }: UserCreateProps) => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<Omit<User, "idUser">>({
    user: "",
    name: "",
    lastName: "",
    email: "",
    rol: Rol.USUARIO,
    googleId: null,
    avatar: null,
    password: null,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    if (name === "password" && value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
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
      await createUser(formData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Error al crear el usuario.");
        setStatus("error");
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    const requiredFields = [
      "user",
      "name",
      "lastName",
      "email",
      "rol",
      "password",
    ];
    requiredFields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData] as string
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
        Crear Usuario
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Usuario creado con éxito.
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
            Usuario
          </label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.user
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.user && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.user}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                validationErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.password}
            </p>
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
          <label className="block text-sm font-semibold text-gray-700">
            Rol
          </label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.rol
                ? "bordr-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">Seleccionar rol</option>
            <option value={Rol.ADMIN}>Admin</option>
            <option value={Rol.USUARIO}>Usuario</option>
            <option value={Rol.CREADOR_CONTENIDO}>Creado de contenido</option>
            <option value={Rol.GESTOR_CLIENTES}>Gestor de clientes</option>
          </select>
          {validationErrors.rol && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.rol}</p>
          )}
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

export default UserCreate;
