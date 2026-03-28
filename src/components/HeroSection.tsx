import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, FolderKanban, Award } from "lucide-react";

interface HeroProps {
  onStudentLogin: () => void;
  onDemo: () => void;
}

const HeroSection = ({ onStudentLogin, onDemo }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--secondary))_0%,_hsl(var(--background))_70%)]" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary text-sm text-muted-foreground mb-8">
          <Sparkles className="size-3.5" />
          La nueva red de talento universitario
        </div>

        {/* Title */}
        <h1 className="animate-fade-up-delay-1 font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-foreground mb-6">
          Conecta el talento.
          <br />
          Automatiza el progreso.
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-delay-2 text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          La plataforma que une estudiantes y proyectos académicos, certificando
          habilidades con insignias verificadas.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button variant="cta-primary" size="lg" onClick={onStudentLogin} className="gap-2 text-base px-7 h-12">
            Ingresar como Estudiante <ArrowRight className="!size-4" />
          </Button>
          <Button variant="cta-outline" size="lg" onClick={onDemo} className="text-base px-7 h-12">
            Demo para Universidades
          </Button>
        </div>

        {/* UI Mockup */}
        <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Student Card */}
          <div className="animate-float bg-card rounded-2xl shadow-soft border border-border p-6 w-64 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">María González</p>
                <p className="text-xs text-muted-foreground">Ing. Civil Industrial</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-secondary w-full" />
              <div className="h-2 rounded-full bg-secondary w-3/4" />
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Python</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Data</span>
              </div>
            </div>
          </div>

          {/* Connection line */}
          <div className="hidden sm:flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-border" />
            <div className="size-3 rounded-full border-2 border-primary bg-background" />
            <div className="w-16 h-px bg-border" />
            <div className="size-3 rounded-full border-2 border-primary bg-primary" />
            <div className="w-px h-4 bg-border" />
          </div>

          {/* Project Card */}
          <div className="animate-float-delayed bg-card rounded-2xl shadow-soft border border-border p-6 w-64 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderKanban className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">Análisis Energético</p>
                <p className="text-xs text-muted-foreground">Prof. Ramírez · 120 hrs</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Award className="size-4 text-primary" />
              <span className="text-xs text-muted-foreground">Insignia: Eficiencia Energética</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
