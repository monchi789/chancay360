import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/store';

import { UserCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import chancay360 from '@/assets/images/logo.svg';

import { login, reset, handleGoogleRedirect } from '../redux/authSlice';
import { PacmanLoader } from "react-spinners";
import authService from '../redux/authService';
import { GoogleRedirectParams } from "@/modules/auth/types/auth";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { email, password } = formData;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Efecto para manejar la redirección de Google
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const params: GoogleRedirectParams = {
      accessToken: urlParams.get('accessToken'),
      refreshToken: urlParams.get('refreshToken'),
      email: urlParams.get('email'),
      id: urlParams.get('id')
    };

    if (params.accessToken && params.refreshToken && params.email && params.id) {
      dispatch(handleGoogleRedirect({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
        user: {
          id: params.id,
          email: params.email
        }
      }))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error en la autenticación de Google:', error);
        });
    }
  }, [dispatch, navigate, location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null); // Limpiar cualquier error previo

    const userData = {
      email,
      password,
    };

    try {
      await dispatch(login(userData)).unwrap();
      navigate('/');
    } catch (error) {
      setLoginError('Usuario o contraseña incorrectos');
      console.error('Error de inicio de sesión:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.googleLogin();
    } catch (error) {
      console.error('Error initiating Google login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with Logo */}
        <div className="w-full flex justify-center pt-8 pb-4">
          <img src={chancay360} alt="Logo wonder" className="w-32" loading="lazy" />
        </div>

        {/* Login Form Section */}
        <div className="px-6 py-2">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
              <p className="mt-2 text-sm text-gray-600">Ingresa a tu cuenta para continuar</p>
            </div>

            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            {isError && message && (
              <Alert variant="destructive">
                <AlertDescription>
                  {Array.isArray(message)
                    ? message.join(', ')
                    : message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      required
                      className="pl-10"
                      placeholder="email"
                      value={email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="contrasena"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-wonder-blue focus:ring-wonder"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-wonder-blue hover:text-wonder">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-mediumPurple-700 hover:bg-mediumPurple-800 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <PacmanLoader color="#FFA938" size={20} />
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              {/* Separador */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              {/* Botón de Google */}
              <Button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Continuar con Google</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

