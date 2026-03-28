import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
  onLogin: () => void;
  onStart: () => void;
}

const LandingNavbar = ({ onLogin, onStart }: NavbarProps) => {
  const links = ["Plataforma", "Universidades", "Casos"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-heading font-bold text-xl tracking-tight text-foreground">
          TalentLink
        </span>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="nav-ghost" size="sm" onClick={onLogin}>
            Iniciar Sesión
          </Button>
          <Button variant="cta" size="sm" onClick={onStart} className="gap-1.5">
            Comenzar <ArrowRight className="!size-3.5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
