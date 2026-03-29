import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onLogin: () => void;
  onStart: () => void;
}

const LandingNavbar = ({ onLogin, onStart }: NavbarProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading font-bold text-xl tracking-tight text-foreground hover:text-blue-600 transition-colors">
          TalentLink
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/soluciones"
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors duration-200"
          >
            Soluciones
          </Link>
          <Link
            to="/casos"
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors duration-200"
          >
            Casos de Éxito
          </Link>
          <a
            href="/#precios"
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors duration-200"
          >
            Precios
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
             <Button variant="cta" size="sm" onClick={() => navigate('/dashboard')} className="gap-1.5 ml-2">
               Ir a mi Dashboard <ArrowRight className="!size-3.5" />
             </Button>
          ) : (
            <>
              <Button variant="nav-ghost" size="sm" onClick={onLogin}>
                Iniciar Sesión
              </Button>
              <Button variant="cta" size="sm" onClick={onStart} className="gap-1.5">
                Crear Cuenta <ArrowRight className="!size-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
