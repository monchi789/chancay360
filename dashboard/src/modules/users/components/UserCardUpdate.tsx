import React, { useState, useEffect } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
import { User, Rol } from "@/interfaces/User";
import { getUserById, updateUser } from "../services/User.api";
import { useQueryClient } from "@tanstack/react-query";

interface UserEditProps {
  idUser: string;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const UserEdit: React.FC<UserEditProps> = ({ idUser, onClose }) => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<User>({
    idUser: "",
    user: "",
    name: "",
    lastName: "",
    email: "",
    rol: Rol.USUARIO,
    googleId: null,
    avatar: null,
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setStatus("loading");
      try {
        const user = await getUserById(idUser);
        setFormData({
          ...user,
          password: "", // Initialize password as an empty string
        });
        setStatus("idle");
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        setErrorMessage("Error al cargar el usuario.");
        setStatus("error");
      }
    };
    fetchUser();
  }, [idUser]);

  const validateField = (name: string, value: string): string => {
    if (value === null || value === undefined) return "";
    if (!value.trim() && name !== "password") {
      return `${name} es requerido`;
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Email inválido";
    }
    if (name === "password" && value.length > 0 && value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return "";
  };

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

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    const requiredFields = ["user", "name", "lastName", "email", "rol"];
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

    // Validate password only if it's being updated
    if (formData.password) {
      const passwordError = validateField("password", formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
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

    // Create update object with only modified fields
    const updateData: Partial<User> = {};
    if (formData.user) updateData.user = formData.user;
    if (formData.name) updateData.name = formData.name;
    if (formData.lastName) updateData.lastName = formData.lastName;
    if (formData.email) updateData.email = formData.email;
    if (formData.rol) updateData.rol = formData.rol;
    if (formData.password) updateData.password = formData.password;
    if (formData.avatar !== null) updateData.avatar = formData.avatar;

    try {
      await updateUser(idUser, updateData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setErrorMessage("Error al actualizar el usuario.");
      setStatus("error");
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
      {/* Form content remains the same */}
      {/* ... */}
    </form>
  );
};

export default UserEdit;
