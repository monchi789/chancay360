import chancayLogo from '@/assets/images/chancay.png';
import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/components/ui/button.tsx";
import {LogOut} from "lucide-react";

const PublicMain = () => {
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    localStorage.clear()
    navigate('/login')
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Muy pronto</h1>
      <p className="text-lg text-gray-600 mb-8">Estamos trabajando en algo increíble 🚀. ¡Mantente atento!</p>
      <div className="w-full max-w-md">
        <img
          src={chancayLogo}
          alt="Estamos trabajando"
          className="w-full h-auto"
        />
      </div>
      
    <Button className="mt-14 bg-red-500 text-white">
      <LogOut className="h-5 w-5 mr-2"/>
      <span onClick={handleLogOut}>Cerrar sesión</span>
    </Button>
    </div>
  );
};

export default PublicMain;
