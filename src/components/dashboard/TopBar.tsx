import { ArrowLeft, GraduationCap, LogOut, Search, Settings, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "sonner";
import NotificationCenter from "./NotificationCenter";
import { useAuth } from "@/context/AuthContext";

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
      toast.info("Búsqueda global UBOHub en preparación.");
    }, 800);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.history.length > 2) navigate(-1);
              else navigate("/dashboard");
            }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-950"
            aria-label="Volver"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button onClick={() => navigate(currentUser ? "/dashboard" : "/")} className="flex items-center gap-3 rounded-2xl px-1 outline-none">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-lg font-extrabold tracking-tight text-slate-950">UBOHub</span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">Proyectos UBO</span>
            </span>
          </button>
        </div>

        <button
          onClick={handleSearchClick}
          disabled={isSearching}
          className="hidden h-11 min-w-[320px] items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 text-left text-sm font-semibold text-slate-400 shadow-sm transition hover:bg-white disabled:opacity-60 md:flex"
        >
          {isSearching ? <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-primary animate-spin" /> : <Search className="h-4 w-4" />}
          Buscar proyectos, estudiantes o insignias
          <span className="ml-auto rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">⌘ K</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSearchClick}
            disabled={isSearching}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-950 disabled:opacity-60 md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>

          <NotificationCenter onBadgeClick={onBadgeNotifClick} />

          {currentUser ? (
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 py-1 pl-3 pr-1 shadow-sm transition hover:bg-white">
                  <span className="hidden text-sm font-bold text-slate-700 sm:block">{currentUser.name.split(" ")[0]}</span>
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-primary-light text-xs font-extrabold text-primary">
                    {currentUser.avatar ? <img src={currentUser.avatar} alt="Avatar" className="h-full w-full object-cover" /> : currentUser.name.charAt(0)}
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content align="end" sideOffset={10} className="z-50 w-64 rounded-3xl border border-white/80 bg-white/90 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="text-sm font-extrabold text-slate-950">{currentUser.name}</p>
                    <p className="truncate text-xs font-medium text-slate-500">{currentUser.email}</p>
                  </div>
                  <button onClick={() => navigate("/perfil")} className="mt-2 flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
                    <UserIcon className="h-4 w-4" /> Mi perfil
                  </button>
                  <button onClick={() => navigate("/configuracion")} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
                    <Settings className="h-4 w-4" /> Configuración
                  </button>
                  <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-2 rounded-2xl border-t border-slate-100 px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Cerrar sesión
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : (
            <button onClick={() => navigate("/")} className="rounded-2xl bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-slate-900/15">
              Ingresar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
