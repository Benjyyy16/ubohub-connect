import { useState } from "react";
import {
  Sparkles, Heart, Zap, ShieldCheck, Award, Clock, Star,
  Code, Palette, BookOpen, Beaker, Globe, Lightbulb, Leaf, Monitor, ExternalLink
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";

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
    context: "Lab. Física — Proyecto Sismología",
    faculty: "Facultad de Ciencias",
    date: "28/03/2026",
    hours: 120,
    icon: Beaker,
    color: "primary" as const,
  },
  {
    id: 2,
    title: "Desarrollo Frontend",
    context: "Depto. Informática — Portal Estudiantil",
    faculty: "Facultad de Ingeniería",
    date: "15/02/2026",
    hours: 80,
    icon: Code,
    color: "accent" as const,
  },
  {
    id: 3,
    title: "Diseño UX/UI",
    context: "Lab. Innovación — App Salud Mental",
    faculty: "Facultad de Diseño",
    date: "10/01/2026",
    hours: 60,
    icon: Palette,
    color: "success" as const,
  },
  {
    id: 4,
    title: "Python Interdisciplinario",
    context: "Fac. Ciencias — Prof. Ramírez",
    faculty: "Facultad de Ciencias",
    date: "28/03/2026",
    hours: 90,
    icon: Globe,
    color: "primary" as const,
    isNew: true,
  },
  {
    id: 5,
    title: "Gestión Ágil de Proyectos",
    context: "Vicerrectoría de Innovación",
    faculty: "Institucional",
    date: "20/12/2025",
    hours: 40,
    icon: BookOpen,
    color: "accent" as const,
  },
];

const colorMap = {
  primary: {
    stroke: "hsl(var(--primary))",
    fill: "hsl(var(--primary-light))",
    text: "text-primary",
    icon: "text-primary",
    glow: "shadow-primary/20",
    bg: "bg-primary-light",
  },
  accent: {
    stroke: "hsl(var(--accent))",
    fill: "hsl(var(--accent-light))",
    text: "text-accent",
    icon: "text-accent",
    glow: "shadow-accent/20",
    bg: "bg-accent-light",
  },
  success: {
    stroke: "hsl(var(--success))",
    fill: "hsl(var(--success-light))",
    text: "text-success",
    icon: "text-success",
    glow: "shadow-success/20",
    bg: "bg-success-light",
  },
};

// Hexagonal badge medal component
const HexBadge = ({ cred }: { cred: typeof CREDENTIALS[number] }) => {
  const c = colorMap[cred.color];
  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="card-magnetic group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-sm cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Hexagonal medal */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <polygon
                points="50,4 91,27 91,73 50,96 9,73 9,27"
                fill="none"
                stroke={c.stroke}
                strokeWidth="3"
                className={`transition-all duration-500 ${hovered ? "drop-shadow-lg" : ""}`}
              />
              <polygon
                points="50,10 86,30 86,70 50,90 14,70 14,30"
                fill={c.fill}
                className="transition-all duration-300"
              />
            </svg>

            {/* Icon */}
            <cred.icon className={`relative z-10 h-8 w-8 ${c.icon} transition-transform duration-300 ${hovered ? "scale-110" : ""}`} />

            {/* Shine sweep on hover */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ${
                  hovered ? "translate-x-full" : "-translate-x-full"
                }`}
                style={{ width: "60%" }}
              />
            </div>

            {/* New badge indicator */}
            {"isNew" in cred && cred.isNew && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-md animate-pulse">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground">{cred.title}</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{cred.context}</p>
          </div>

          {/* Hours + Verified */}
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 text-[10px] font-semibold ${c.text}`}>
              <Clock className="h-3 w-3" /> {cred.hours}h
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> Verificado
            </span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <div className="space-y-1">
          <p className="text-xs font-semibold">{cred.title}</p>
          <p className="text-[11px] text-muted-foreground">Emitido el {cred.date} · {cred.hours} Horas · {cred.faculty}</p>
          <p className="text-[11px] text-muted-foreground">{cred.context}</p>
          <p className="flex items-center gap-1 text-[10px] text-primary font-medium">
            <ShieldCheck className="h-3 w-3" /> Verificado por TalentLink
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const MatchCircle = ({ value }: { value: number }) => {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <circle
          cx="20" cy="20" r="18" fill="none"
          stroke={value >= 90 ? "hsl(var(--success))" : value >= 80 ? "hsl(var(--primary))" : "hsl(var(--warning))"}
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
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="watermark-bg card-magnetic overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-primary/20 shadow-md shadow-primary/10">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
              alt="María González"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">María González Soto</h2>
                <p className="text-sm text-muted-foreground">Ingeniería en Informática · 4to año</p>
              </div>
              <Link
                to="/perfil"
                className="btn-press flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" /> Ver perfil público
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
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
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Oportunidades Recomendadas</h3>
          <span className="ml-1 rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary">Smart Match</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {OPPORTUNITIES.map((opp, idx) => (
            <div key={opp.id} className={`group card-magnetic flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm stagger-${idx + 1}`}>
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
                          ? "tag-glow-accent text-accent"
                          : "tag-glow-primary text-primary"
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
                <button 
                  onClick={() => navigate("/workspace")}
                  className="btn-press flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Zap className="h-3 w-3" /> Ver Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials Gallery */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Galería de Insignias</h3>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary">{CREDENTIALS.length} obtenidas</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CREDENTIALS.map((cred, idx) => (
            <div key={cred.id} className={`stagger-${Math.min(idx + 1, 4)}`}>
              <HexBadge cred={cred} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentView;
