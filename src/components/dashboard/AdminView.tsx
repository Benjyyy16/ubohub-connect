import { useState, useEffect, useRef } from "react";
import {
  Clock, Network, ShieldCheck, TrendingUp, ArrowUpRight,
  Download, FileText, Award, Eye, Calendar, Building2, Sparkles
} from "lucide-react";

const useCountUp = (target: number, duration = 1200, start = false) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
};

const KPIS = [
  { label: "Horas Administrativas Ahorradas", value: 1250, prefix: "+", suffix: " hrs", delta: "↑ 15% este mes", icon: Clock, color: "primary" as const },
  { label: "Proyectos Interdisciplinarios", value: 45, prefix: "", suffix: " activos", delta: "↑ 8 nuevos", icon: Network, color: "primary" as const },
  { label: "Insignias Digitales Emitidas", value: 320, prefix: "", suffix: "", delta: "↑ 42 este mes", icon: ShieldCheck, color: "success" as const },
  { label: "Tasa de Empleabilidad Proyectada", value: 85, prefix: "", suffix: "%", delta: "↑ 3pp vs semestre", icon: TrendingUp, color: "primary" as const },
];

const COLLABORATIONS = [
  { from: "Ingeniería", to: "Diseño", value: 80, projects: 12, color: "bg-primary" },
  { from: "Pedagogía", to: "Informática", value: 65, projects: 8, color: "bg-primary/70" },
  { from: "Negocios", to: "Ciencias", value: 45, projects: 5, color: "bg-primary/50" },
  { from: "Salud", to: "Informática", value: 35, projects: 4, color: "bg-primary/40" },
  { from: "Humanidades", to: "Diseño", value: 25, projects: 3, color: "bg-primary/30" },
];

const AUDIT_LOG = [
  { id: 1, time: "Hoy, 10:30", text: "PDF de Liberación generado para Carlos M.", detail: "Aprobado por Prof. Ramírez", type: "pdf" as const },
  { id: 2, time: "Hoy, 09:15", text: "Insignia 'Data Analytics' acuñada para Ana L.", detail: "Facultad de Ciencias", type: "badge" as const },
  { id: 3, time: "Hoy, 08:45", text: "Nuevo proyecto interdisciplinario registrado", detail: "Ingeniería + Pedagogía · App Inclusión Rural", type: "project" as const },
  { id: 4, time: "Ayer, 17:20", text: "PDF de Liberación generado para Sofía R.", detail: "Aprobado por Prof. Torres", type: "pdf" as const },
  { id: 5, time: "Ayer, 14:10", text: "Insignia 'UX Research' acuñada para Valentina A.", detail: "Lab. Innovación", type: "badge" as const },
  { id: 6, time: "Ayer, 11:00", text: "3 estudiantes invitados a proyecto IoT Ambiental", detail: "Smart Match — Prof. Muñoz", type: "project" as const },
];

const colorMap = {
  primary: { bg: "bg-primary-light", icon: "text-primary" },
  success: { bg: "bg-success-light", icon: "text-success" },
};

const AdminView = () => {
  const [mounted, setMounted] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setBarsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const kpiValues = KPIS.map(k => useCountUp(k.value, 1200, mounted));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Visión Global</h2>
          </div>
          <p className="text-sm text-muted-foreground">Universidad Demo · Dirección Institucional</p>
        </div>
        <button className="btn-press flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Download className="h-4 w-4 text-muted-foreground" /> Exportar Reporte
        </button>
      </div>

      {/* KPIs */}
      <section>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {KPIS.map((kpi, idx) => {
            const c = colorMap[kpi.color];
            return (
              <div key={kpi.label} className={`rounded-lg border border-border bg-card p-4 stagger-${idx + 1}`}>
                <div className="flex items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
                    <kpi.icon className={`h-4 w-4 ${c.icon}`} />
                  </div>
                  <span className="flex items-center gap-0.5 text-[10px] font-medium text-success">
                    <ArrowUpRight className="h-3 w-3" />
                    {kpi.delta}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
                    {kpi.prefix}{kpiValues[idx].toLocaleString("es-CL")}{kpi.suffix}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{kpi.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration */}
      <section className="stagger-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Colaboración Interdisciplinaria</h3>
            </div>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground tabular-nums">
              {COLLABORATIONS.reduce((a, c) => a + c.projects, 0)} proyectos
            </span>
          </div>
          <div className="space-y-3">
            {COLLABORATIONS.map((collab, idx) => (
              <div key={idx}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">{collab.from}</span>
                    <span className="text-muted-foreground">×</span>
                    <span className="font-medium text-foreground">{collab.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{collab.projects} proy.</span>
                    <span className="font-semibold tabular-nums text-foreground">{collab.value}%</span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${collab.color} transition-all duration-700 ease-out`}
                    style={{ width: barsVisible ? `${collab.value}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-primary-light px-3 py-2 text-[11px] text-primary">
            <Sparkles className="h-3 w-3" />
            TalentLink ha facilitado {COLLABORATIONS.length} conexiones interfacultad este semestre
          </div>
        </div>
      </section>

      {/* Audit Log */}
      <section className="stagger-3">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Últimas Resoluciones</h3>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Automatizado</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="divide-y divide-border">
            {AUDIT_LOG.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-muted/30">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  entry.type === "pdf" ? "bg-destructive/10" :
                  entry.type === "badge" ? "bg-primary-light" : "bg-success-light"
                }`}>
                  {entry.type === "pdf" ? <FileText className="h-3.5 w-3.5 text-destructive" /> :
                   entry.type === "badge" ? <Award className="h-3.5 w-3.5 text-primary" /> :
                   <Network className="h-3.5 w-3.5 text-success" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{entry.text}</p>
                  <p className="text-[11px] text-muted-foreground">{entry.detail}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {entry.time}
                  </span>
                  {entry.type !== "project" && (
                    <button className="btn-press rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted">
                      <Eye className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminView;
