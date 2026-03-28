import {
  Sparkles, Heart, Zap, ShieldCheck, Award, Clock, ArrowRight, Star,
  Code, Palette, BookOpen, Beaker, Globe, Lightbulb, Leaf, Monitor
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SKILLS = ["React", "Python", "UX Research", "Figma", "SQL"];
const INTERESTS = ["EdTech", "Sustentabilidad", "IA Educativa", "Inclusión"];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "App Educativa para Escuelas Rurales",
    professor: "Dra. Carmen López",
    faculty: "Pedagogía",
    match: 95,
    tags: ["Match por Interés", "Proyecto Interdisciplinario"],
    skills: ["React", "UX Research"],
    icon: Monitor,
  },
  {
    id: 2,
    title: "Dashboard de Monitoreo Ambiental IoT",
    professor: "Dr. Andrés Muñoz",
    faculty: "Ing. Ambiental",
    match: 88,
    tags: ["Proyecto Interdisciplinario"],
    skills: ["Python", "SQL"],
    icon: Leaf,
  },
  {
    id: 3,
    title: "Plataforma de Tutorías con IA",
    professor: "Dr. Felipe Herrera",
    faculty: "Informática",
    match: 82,
    tags: ["Match por Interés"],
    skills: ["React", "Python"],
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "Gamificación de Aprendizaje de Ciencias",
    professor: "Dra. Isabel Torres",
    faculty: "Educación",
    match: 78,
    tags: [],
    skills: ["Figma", "UX Research"],
    icon: Star,
  },
];

const CREDENTIALS = [
  {
    id: 1,
    title: "Análisis de Datos",
    context: "Lab. Física — Proyecto Sismología UBO",
    hours: 120,
    icon: Beaker,
    color: "primary" as const,
  },
  {
    id: 2,
    title: "Desarrollo Frontend",
    context: "Depto. Informática — Portal Estudiantil",
    hours: 80,
    icon: Code,
    color: "accent" as const,
  },
  {
    id: 3,
    title: "Diseño UX/UI",
    context: "Lab. Innovación — App Salud Mental",
    hours: 60,
    icon: Palette,
    color: "success" as const,
  },
];

const MatchCircle = ({ value }: { value: number }) => {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <circle
          cx="20" cy="20" r="18" fill="none"
          stroke={value >= 90 ? "hsl(var(--success))" : value >= 80 ? "hsl(var(--info))" : "hsl(var(--warning))"}
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-xs font-bold text-foreground">{value}%</span>
    </div>
  );
};

const StudentView = () => {
  return (
    <div className="animate-slide-in space-y-8">
      {/* Profile Header */}
      <div className="watermark-bg overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-primary-light">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
              alt="María González"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">María González Soto</h2>
              <p className="text-sm text-muted-foreground">Ingeniería en Informática · 4to año</p>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Heart className="mr-1 h-3.5 w-3.5 text-accent" />
                {INTERESTS.map((i) => (
                  <span key={i} className="rounded-md bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Match */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Oportunidades Recomendadas</h3>
          <span className="ml-1 rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-accent">Smart Match</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="group flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <MatchCircle value={opp.match} />
              <div className="flex-1 space-y-2.5">
                <div>
                  <h4 className="font-semibold text-foreground leading-snug">{opp.title}</h4>
                  <p className="text-xs text-muted-foreground">{opp.professor} · {opp.faculty}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        t.includes("Interés")
                          ? "bg-accent-light text-accent"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  {opp.skills.map((s) => (
                    <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  <Zap className="h-3 w-3" /> Postular con 1 clic
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Mi Billetera de Credenciales</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {CREDENTIALS.map((cred) => {
            const colorMap = {
              primary: { bg: "bg-primary-light", text: "text-primary", border: "border-primary/20", icon: "text-primary" },
              accent: { bg: "bg-accent-light", text: "text-accent", border: "border-accent/20", icon: "text-accent" },
              success: { bg: "bg-success-light", text: "text-success", border: "border-success/20", icon: "text-success" },
            };
            const c = colorMap[cred.color];
            return (
              <div key={cred.id} className={`rounded-xl border ${c.border} bg-card p-5 shadow-sm`}>
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
                    <cred.icon className={`h-5 w-5 ${c.icon}`} />
                  </div>
                  <ShieldCheck className={`h-4 w-4 ${c.icon}`} />
                </div>
                <h4 className="font-semibold text-foreground">{cred.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{cred.context}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={c.text}>{cred.hours} horas validadas</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default StudentView;
