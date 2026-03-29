import { useState } from "react";
import {
  Sparkles, Heart, Zap, ShieldCheck, Award, Clock, Star,
  Code, Palette, BookOpen, Beaker, Globe, Lightbulb, Leaf, Monitor, ExternalLink, Lock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";

const SKILLS = ["React", "Python", "UX Research", "Figma", "SQL"];
const INTERESTS = ["EdTech", "Sustentabilidad", "IA Educativa", "Inclusión"];

const OPPORTUNITIES = [
  { id: 1, title: "App Educativa para Escuelas Rurales", professor: "Dra. Carmen López", faculty: "Pedagogía", match: 95, tags: ["Match por Interés", "Interdisciplinario"], skills: ["React", "UX Research"], icon: Monitor },
  { id: 2, title: "Dashboard de Monitoreo Ambiental IoT", professor: "Dr. Andrés Muñoz", faculty: "Ing. Ambiental", match: 88, tags: ["Interdisciplinario"], skills: ["Python", "SQL"], icon: Leaf },
  { id: 3, title: "Plataforma de Tutorías con IA", professor: "Dr. Felipe Herrera", faculty: "Informática", match: 82, tags: ["Match por Interés"], skills: ["React", "Python"], icon: Lightbulb },
  { id: 4, title: "Gamificación de Aprendizaje de Ciencias", professor: "Dra. Isabel Torres", faculty: "Educación", match: 78, tags: [], skills: ["Figma", "UX Research"], icon: Star },
];

const CREDENTIALS = [
  { id: 1, title: "Análisis de Datos", context: "Lab. Física — Proyecto Sismología", faculty: "Facultad de Ciencias", date: "28/03/2026", hours: 120, icon: Beaker, color: "primary" as const },
  { id: 2, title: "Desarrollo Frontend", context: "Depto. Informática — Portal Estudiantil", faculty: "Facultad de Ingeniería", date: "15/02/2026", hours: 80, icon: Code, color: "accent" as const },
  { id: 3, title: "Diseño UX/UI", context: "Lab. Innovación — App Salud Mental", faculty: "Facultad de Diseño", date: "10/01/2026", hours: 60, icon: Palette, color: "success" as const },
  { id: 4, title: "Python Interdisciplinario", context: "Fac. Ciencias — Prof. Ramírez", faculty: "Facultad de Ciencias", date: "28/03/2026", hours: 90, icon: Globe, color: "primary" as const, isNew: true },
  { id: 5, title: "Gestión Ágil de Proyectos", context: "Vicerrectoría de Innovación", faculty: "Institucional", date: "20/12/2025", hours: 40, icon: BookOpen, color: "accent" as const },
];

const colorMap = {
  primary: { stroke: "hsl(var(--primary))", fill: "hsl(var(--primary-light))", text: "text-primary", icon: "text-primary" },
  accent: { stroke: "hsl(var(--accent))", fill: "hsl(var(--accent-light))", text: "text-accent", icon: "text-accent" },
  success: { stroke: "hsl(var(--success))", fill: "hsl(var(--success-light))", text: "text-success", icon: "text-success" },
};

const SECURITY_BADGES = [
  { icon: Lock, text: "Procesamiento OCR Efímero" },
  { icon: ShieldCheck, text: "Cumplimiento GDPR/Ley de Datos" },
  { icon: Lock, text: "Cifrado End-to-End" },
];

const HexBadge = ({ cred }: { cred: typeof CREDENTIALS[number] }) => {
  const c = colorMap[cred.color];
  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="card-magnetic group flex flex-col items-center gap-2.5 rounded-lg border border-border bg-card p-4 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <polygon points="50,4 91,27 91,73 50,96 9,73 9,27" fill="none" stroke={c.stroke} strokeWidth="2.5" className="transition-all duration-300" />
              <polygon points="50,10 86,30 86,70 50,90 14,70 14,30" fill={c.fill} className="transition-all duration-200" />
            </svg>
            <cred.icon className={`relative z-10 h-6 w-6 ${c.icon} transition-transform duration-200 ${hovered ? "scale-110" : ""}`} />
            {"isNew" in cred && cred.isNew && (
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-sm animate-pulse">
                <Sparkles className="h-2.5 w-2.5 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="text-center">
            <h4 className="text-xs font-semibold text-foreground">{cred.title}</h4>
            <p className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{cred.context}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`flex items-center gap-0.5 text-[10px] font-medium tabular-nums ${c.text}`}>
              <Clock className="h-2.5 w-2.5" /> {cred.hours}h
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-2.5 w-2.5" /> Verificado
            </span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <div className="space-y-1">
          <p className="text-xs font-semibold">{cred.title}</p>
          <p className="text-[11px] text-muted-foreground">Emitido el {cred.date} · {cred.hours} Horas · {cred.faculty}</p>
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
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
        <circle
          cx="20" cy="20" r="18" fill="none"
          stroke={value >= 90 ? "hsl(var(--success))" : value >= 80 ? "hsl(var(--primary))" : "hsl(var(--warning))"}
          strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-[11px] font-bold tabular-nums text-foreground">{value}%</span>
    </div>
  );
};

const StudentView = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="overflow-hidden rounded-lg border border-border bg-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
              alt="Foto de perfil de María González"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">María González Soto</h2>
                <p className="text-sm text-muted-foreground">Ingeniería en Informática · 4to año</p>
              </div>
              <Link
                to="/perfil"
                className="btn-press flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" /> Ver perfil público
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Heart className="mr-0.5 h-3 w-3 text-primary" />
                {INTERESTS.map((i) => (
                  <span key={i} className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-medium text-primary">{i}</span>
                ))}
              </div>
            </div>
            {/* Security badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {SECURITY_BADGES.map((b) => (
                <span key={b.text} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <b.icon className="h-3 w-3" /> {b.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Match */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Oportunidades Recomendadas</h3>
          <span className="rounded-md bg-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-primary">Smart Match</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {OPPORTUNITIES.map((opp, idx) => (
            <div key={opp.id} className={`group card-magnetic flex gap-3 rounded-lg border border-border bg-card p-4 stagger-${idx + 1}`}>
              <MatchCircle value={opp.match} />
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground leading-snug">{opp.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{opp.professor} · {opp.faculty}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {opp.tags.map((t) => (
                    <span key={t} className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                      t.includes("Interés") ? "bg-primary-light text-primary" : "bg-success-light text-success"
                    }`}>{t}</span>
                  ))}
                  {opp.skills.map((s) => (
                    <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{s}</span>
                  ))}
                </div>
                <button className="btn-press flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  <Zap className="h-3 w-3" /> Postular con 1 clic
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials Gallery */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Galería de Insignias</h3>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{CREDENTIALS.length} obtenidas</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
