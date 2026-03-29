import { Search, GraduationCap, BookOpen, Sparkles, Building2, ArrowLeft, LogOut, User as UserIcon, Settings } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "sonner";
import { useState } from "react";

interface TopBarProps {
  onBadgeNotifClick?: () => void;
}

export default function TopBar({ onBadgeNotifClick }: TopBarProps) {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isSearching, setIsSearching] = useState(false);



  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Sesión cerrada correctamente");
  };
  
  const handleSearchClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.info("Función de búsqueda global en desarrollo.");
    }, 800);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
        
        {/* Left Side: Back Nav & Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
               if (window.history.length > 2) navigate(-1); 
               else navigate('/dashboard');
            }}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Volver</span>
          </button>
          
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Logo */}
          <button onClick={() => navigate(currentUser ? '/dashboard' : '/')} className="flex items-center gap-2.5 outline-none group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 hidden sm:block">
              Talent<span className="text-blue-600">Link</span>
            </span>
          </button>
        </div>

        {/* Central area spacing */}
        <div className="flex-1 hidden md:block"></div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSearchClick}
            disabled={isSearching}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 outline-none disabled:opacity-50 flex items-center justify-center size-9"
          >
            {isSearching ? <div className="size-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"/> : <Search className="size-5" />}
          </button>
          
          <NotificationCenter onBadgeClick={onBadgeNotifClick} />

          {currentUser ? (
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors outline-none cursor-pointer">
                  <span className="text-sm font-bold text-slate-700 hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                  <div className="h-7 w-7 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-blue-700">{currentUser.name.charAt(0)}</span>
                    )}
                  </div>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content align="end" sideOffset={8} className="z-50 w-56 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 animate-[fade-in_0.2s_ease-out]">
                  <div className="px-3 py-2 mb-2 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs font-medium text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button onClick={() => navigate('/perfil')} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                    <UserIcon className="size-4" /> Mi Perfil Público
                  </button>
                  <button onClick={() => navigate('/configuracion')} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors mt-1">
                    <Settings className="size-4" /> Configuración de Cuenta
                  </button>
                  <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border-t border-slate-100 mt-2 pt-2">
                    <LogOut className="size-4" /> Cerrar Sesión
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : (
            <button 
              onClick={() => navigate('/')} 
              className="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
