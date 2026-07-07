import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import HeroSection from "@/components/HeroSection";
import LandingNavbar from "@/components/LandingNavbar";
import LogoMarquee from "@/components/LogoMarquee";
import { Button } from "@/components/ui/button";
import { expectedMetrics, landingSections, projects } from "@/data/ubohub";

const SectionTitle = ({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <p className="text-xs font-extrabold uppercase tracking-widest text-primary">{eyebrow}</p>
    <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h2>
    {text && <p className="mt-4 text-base leading-7 text-muted-foreground">{text}</p>}
  </div>
);

const Landing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar onLogin={() => openAuth("login")} onStart={() => openAuth("register")} />
      <HeroSection onStudentLogin={() => openAuth("register")} onDemo={() => openAuth("login")} />
      <LogoMarquee />

      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Problema actual"
            title="El talento existe, pero la conexión académica sigue demasiado manual."
            text="UBOHub ordena el flujo completo para que estudiantes, académicos y administradores trabajen con la misma información."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {landingSections.problem.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/15 text-warning">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Solución UBOHub"
            title="Una plataforma institucional para descubrir, postular, seleccionar y certificar."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {landingSections.solution.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-border bg-background p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Cómo funciona" title="Cuatro pasos simples, con trazabilidad desde el inicio." />
          <div className="grid gap-4 md:grid-cols-4">
            {landingSections.howItWorks.map((item) => (
              <div key={item.step} className="rounded-lg border border-border bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-primary">{item.step}</p>
                <h3 className="mt-3 font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="insignias" className="bg-white px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Módulos principales" title="La navegación refleja el trabajo diario de UBOHub." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {landingSections.modules.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-border bg-background p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Beneficios para estudiantes</p>
            <h2 className="mt-3 text-2xl font-extrabold text-foreground">De habilidades declaradas a proyectos concretos.</h2>
            <ul className="mt-6 space-y-3">
              {landingSections.studentBenefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-widest text-accent">Beneficios para académicos</p>
            <h2 className="mt-3 text-2xl font-extrabold text-foreground">Convocatorias ordenadas y selección defendible.</h2>
            <ul className="mt-6 space-y-3">
              {landingSections.academicBenefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Métricas esperadas"
            title="Indicadores iniciales para validar adopción e impacto institucional."
            text="Estas cifras mock funcionan como metas de referencia para el piloto UBOHub y preparan el modelo de datos para reportes reales."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expectedMetrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-border bg-background p-6 text-center">
                <p className="text-4xl font-extrabold text-primary">{metric.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Proyectos visibles"
            title="Tarjetas de proyecto listas para migrar a datos reales."
            text="Cada tarjeta contiene los campos necesarios para una futura integración con PostgreSQL o Supabase."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="rounded-lg border border-border bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.faculty} · {project.professorName}</p>
                  </div>
                  <span className="rounded-lg bg-success-light px-3 py-2 text-sm font-extrabold text-success">{project.matchScore}%</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill} className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
                  <span>{project.availableSlots} cupos</span>
                  <span>Cierre: {project.deadline}</span>
                  <Button size="sm" variant="cta-primary" onClick={() => openAuth("register")}>
                    Postular
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-xl bg-foreground p-8 text-background shadow-soft sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-secondary">CTA final</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Probar UBOHub como estudiante, académico o administrador.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-background/70">
                Esta versión usa datos mock estructurados, pero la arquitectura visual ya separa los flujos clave para una integración real con backend, PostgreSQL e INTRANET.
              </p>
            </div>
            <Button variant="secondary" size="lg" onClick={() => openAuth("login")} className="h-12 shrink-0 gap-2">
              Ingresar al demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white px-5 py-8 text-center text-sm text-muted-foreground">
        UBOHub · Universidad Bernardo O'Higgins · Plataforma de proyectos, postulaciones e insignias verificables.
      </footer>

      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default Landing;
