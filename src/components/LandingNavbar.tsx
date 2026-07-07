import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { navItems } from "@/data/ubohub";

interface NavbarProps {
  onLogin: () => void;
  onStart: () => void;
}

const LandingNavbar = ({ onLogin, onStart }: NavbarProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold tracking-tight text-foreground transition-colors hover:text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl">UBOHub</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          {currentUser ? (
            <Button variant="cta" size="sm" onClick={() => navigate("/dashboard")} className="gap-1.5">
              Ir al dashboard <ArrowRight className="!size-3.5" />
            </Button>
          ) : (
            <>
              <Button variant="nav-ghost" size="sm" onClick={onLogin}>
                Ingresar
              </Button>
              <Button variant="cta" size="sm" onClick={onStart} className="gap-1.5">
                Explorar proyectos <ArrowRight className="!size-3.5" />
              </Button>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground sm:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Abrir navegación"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="cta" size="sm" onClick={currentUser ? () => navigate("/dashboard") : onLogin}>
              {currentUser ? "Ir al dashboard" : "Ingresar"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
