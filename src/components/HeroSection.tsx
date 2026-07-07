import { Button } from "@/components/ui/button";
import { academicProfile, expectedMetrics, projects, studentProfile } from "@/data/ubohub";
import { ArrowRight, Award, CalendarDays, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";

interface HeroProps {
  onStudentLogin: () => void;
  onDemo: () => void;
}

const HeroSection = ({ onStudentLogin, onDemo }: HeroProps) => {
  const featuredProject = projects[0];

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 lg:pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,white_58%,hsl(var(--secondary)/0.65)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-white px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            Plataforma institucional Universidad Bernardo O'Higgins
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            UBOHub conecta estudiantes UBO con proyectos reales para ganar experiencia antes de egresar.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Descubre proyectos académicos, de investigación e innovación, postula con tu perfil institucional
            y recibe insignias verificables por las habilidades que desarrollas en la Universidad Bernardo O'Higgins.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="cta-primary" size="lg" onClick={onStudentLogin} className="h-12 gap-2 px-6 text-base">
              Explorar proyectos <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="cta-outline" size="lg" onClick={onDemo} className="h-12 px-6 text-base">
              Publicar proyecto
            </Button>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-4">
            {expectedMetrics.map(({ value, label }) => (
              <div key={label} className="rounded-lg border border-border bg-white/80 p-4 shadow-sm">
                <p className="text-2xl font-extrabold text-foreground">{value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="watermark-bg rounded-xl border border-border bg-white p-4 shadow-soft">
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Proyecto recomendado</p>
                  <h2 className="mt-1 text-xl font-extrabold text-foreground">{featuredProject.title}</h2>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-success-light text-xl font-extrabold text-success">
                  {featuredProject.matchScore}%
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{featuredProject.description}</p>
            </div>

            <div className="grid gap-3 py-4 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  Perfil estudiante
                </div>
                <p className="font-semibold text-foreground">{studentProfile.name}</p>
                <p className="text-xs text-muted-foreground">{studentProfile.career} · {studentProfile.year}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {studentProfile.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-primary-light p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Académico responsable
                </div>
                <p className="font-semibold text-foreground">{academicProfile.name}</p>
                <p className="text-xs text-muted-foreground">{academicProfile.department}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Cierre: {featuredProject.deadline}
                </div>
              </div>
            </div>

            <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
              {[
                { label: featuredProject.status, icon: CheckCircle2 },
                { label: `${featuredProject.availableSlots} cupos`, icon: Users },
                { label: "Insignia al cierre", icon: Award },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground">
                  <item.icon className="h-4 w-4 text-accent" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
