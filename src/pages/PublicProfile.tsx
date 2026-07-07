import {
  ShieldCheck, Clock, Users, Award, ExternalLink, Calendar,
  BadgeCheck, Sparkles, ArrowLeft, Beaker, Code, Palette,
  BarChart3, Globe, BookOpen, Link2, GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";

const BADGES = [
  {
    id: 1,
    title: "Análisis de Datos Avanzado",
    issuer: "Facultad de Ciencias — Prof. Ramírez",
    hours: 120,
    color: "primary" as const,
    icon: BarChart3,
  },
  {
    id: 2,
    title: "Desarrollo Frontend con React",
    issuer: "Depto. Informática — Prof. Herrera",
    hours: 80,
    color: "accent" as const,
    icon: Code,
  },
  {
    id: 3,
    title: "Investigación UX / Diseño Centrado en el Usuario",
    issuer: "Lab. Innovación — Profa. Torres",
    hours: 60,
    color: "success" as const,
    icon: Palette,
  },
  {
    id: 4,
    title: "Gestión de Proyectos Interdisciplinarios",
    issuer: "Vicerrectoría de Innovación",
    hours: 40,
    color: "primary" as const,
    icon: Users,
  },
  {
    id: 5,
    title: "Modelamiento Estadístico Aplicado",
    issuer: "Facultad de Ciencias — Prof. Soto",
    hours: 90,
    color: "accent" as const,
    icon: Beaker,
  },
];

const PROJECTS = [
  {
    year: "2026",
    title: "App de Inclusión Escolar para Zonas Rurales",
    role: "UX Researcher & Frontend Developer",
    collaboration: "Trabajo conjunto con la Facultad de Pedagogía",
    description: "Diseño e implementación de una aplicación educativa accesible para escuelas sin conectividad estable, impactando a más de 200 estudiantes.",
    skills: ["React", "UX Research", "Educación"],
  },
  {
    year: "2025",
    title: "Dashboard de Monitoreo Ambiental IoT",
    role: "Analista de Datos",
    collaboration: "Proyecto interdisciplinario con Ing. Ambiental",
    description: "Desarrollo de visualizaciones en tiempo real para sensores ambientales desplegados en tres campus universitarios.",
    skills: ["Python", "SQL", "Visualización"],
  },
  {
    year: "2025",
    title: "Plataforma de Tutorías con Inteligencia Artificial",
    role: "Desarrolladora Full-Stack",
    collaboration: "Depto. de Informática",
    description: "Sistema de recomendación de tutores basado en el perfil académico y estilo de aprendizaje del estudiante.",
    skills: ["React", "Python", "Machine Learning"],
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary-light",
    border: "border-primary/20",
    text: "text-primary",
    gradient: "from-primary/5 to-primary/10",
    ring: "ring-primary/15",
  },
  accent: {
    bg: "bg-accent-light",
    border: "border-accent/20",
    text: "text-accent",
    gradient: "from-accent/5 to-accent/10",
    ring: "ring-accent/15",
  },
  success: {
    bg: "bg-success-light",
    border: "border-success/20",
    text: "text-success",
    gradient: "from-success/5 to-success/10",
    ring: "ring-success/15",
  },
};

const PublicProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <div className="mx-auto max-w-4xl px-6 pb-16">
        {/* Hero Section */}
        <section className="view-enter">
          {/* Banner */}
          <div className="relative h-40 overflow-hidden rounded-b-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-accent/6">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          {/* Profile info */}
          <div className="relative px-2">
            <div className="-mt-14 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
              <div className="relative shrink-0">
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-card bg-card shadow-lg">
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
                    alt="María González Soto"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md shadow-primary/30">
                  <BadgeCheck className="h-4.5 w-4.5 text-primary-foreground" />
                </div>
              </div>

              <div className="flex-1 pb-1 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h1 className="text-2xl font-extrabold tracking-tight text-foreground">María González Soto</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/15">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Estudiante Verificada — Universidad Demo
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Ingeniería Civil Informática · Especialista en Análisis de Datos y UX
                </p>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  Apasionada por la intersección entre tecnología, educación e impacto social.
                  Experiencia comprobada en proyectos interdisciplinarios que conectan innovación con necesidades reales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="mt-10 stagger-1">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Horas de Proyecto Validadas", value: "260", icon: Clock, color: "primary" as const },
              { label: "Proyectos Interdisciplinarios", value: "3", icon: Users, color: "accent" as const },
              { label: "Insignias Oficiales", value: "5", icon: Award, color: "success" as const },
            ].map((m) => {
              const c = colorMap[m.color];
              return (
                <div key={m.label} className={`card-magnetic flex flex-col items-center gap-2 rounded-xl border ${c.border} bg-card p-5 text-center shadow-sm`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                    <m.icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <span className="text-2xl font-extrabold text-foreground">{m.value}</span>
                  <span className="text-[11px] font-medium leading-tight text-muted-foreground">{m.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Credentials & Validated Skills */}
        <section className="mt-12 stagger-2">
          <div className="mb-5 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Credenciales y Habilidades Validadas</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BADGES.map((badge, idx) => {
              const c = colorMap[badge.color];
              return (
                <div
                  key={badge.id}
                  className={`card-magnetic group relative overflow-hidden rounded-xl border ${c.border} bg-gradient-to-br ${c.gradient} p-5 shadow-sm ring-1 ${c.ring}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Decorative corner */}
                  <div className={`absolute -right-3 -top-3 h-16 w-16 rounded-full ${c.bg} opacity-50`} />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg} shadow-sm`}>
                        <badge.icon className={`h-5 w-5 ${c.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground leading-snug">{badge.title}</h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <GraduationCap className="h-3 w-3 shrink-0" /> {badge.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Validado mediante {badge.hours} horas de proyecto real
                      </span>
                      <button className={`btn-press flex items-center gap-1 text-[11px] font-semibold ${c.text} opacity-70 transition-opacity group-hover:opacity-100`}>
                        Ver Evidencia <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Project Portfolio Timeline */}
        <section className="mt-12 stagger-3">
          <div className="mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Portafolio de Proyectos Universitarios</h2>
          </div>

          <div className="relative ml-4 border-l-2 border-border pl-8 space-y-8">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="relative view-enter" style={{ animationDelay: `${idx * 120}ms` }}>
                {/* Timeline dot */}
                <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-card">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="card-magnetic rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="font-semibold">{project.year}</span>
                    <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-semibold text-primary">{project.role}</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-accent">
                    <Globe className="h-3 w-3" /> {project.collaboration}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.skills.map(s => (
                      <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 stagger-4 border-t border-border pt-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">
                Talent<span className="text-primary">Link</span>
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Perfil verificado y emitido por la institución a través de TalentLink.
              Todas las credenciales han sido validadas por profesores y unidades académicas oficiales.
            </p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <ShieldCheck className="h-3 w-3" />
              Verificación institucional · Datos protegidos · Portabilidad garantizada
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicProfile;
