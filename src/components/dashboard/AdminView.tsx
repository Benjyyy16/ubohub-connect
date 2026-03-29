import { useState, useEffect, useRef } from "react";
import {
  Clock, Network, ShieldCheck, TrendingUp, ArrowUpRight,
  Download, FileText, Award, Eye, Calendar, Building2, Sparkles
} from "lucide-react";

// Animated counter hook
const useCountUp = (target: number, duration = 1200, start = false) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
};

const KPIS = [
  { label: "Horas Administrativas Ahorradas", value: 1250, prefix: "+", suffix: " hrs", delta: "↑ 15% este mes", deltaColor: "text-success", icon: Clock, color: "primary" as const },
  { label: "Proyectos Interdisciplinarios", value: 45, prefix: "", suffix: " activos", delta: "↑ 8 nuevos", deltaColor: "text-success", icon: Network, color: "accent" as const },
  { label: "Insignias Digitales Emitidas", value: 320, prefix: "", suffix: "", delta: "↑ 42 este mes", deltaColor: "text-success", icon: ShieldCheck, color: "success" as const },
  { label: "Tasa de Empleabilidad Proyectada", value: 85, prefix: "", suffix: "%", delta: "↑ 3pp vs semestre anterior", deltaColor: "text-success", icon: TrendingUp, color: "primary" as const },
];

const COLLABORATIONS = [
  { from: "Ingeniería", to: "Diseño", value: 80, projects: 12, color: "bg-primary" },
  { from: "Pedagogía", to: "Informática", value: 65, projects: 8, color: "bg-accent" },
  { from: "Negocios", to: "Ciencias", value: 45, projects: 5, color: "bg-success" },
  { from: "Salud", to: "Informática", value: 35, projects: 4, color: "bg-info" },
  { from: "Humanidades", to: "Diseño", value: 25, projects: 3, color: "bg-warning" },
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
  primary: { bg: "bg-primary-light", text: "text-primary", icon: "text-primary" },
  accent: { bg: "bg-accent-light", text: "text-accent", icon: "text-accent" },
  success: { bg: "bg-success-light", text: "text-success", icon: "text-success" },
};

const KpiCard = ({ kpi, index, mounted }: { kpi: typeof KPIS[0], index: number, mounted: boolean }) => {
  const value = useCountUp(kpi.value, 1400, mounted);
  const c = colorMap[kpi.color];

  return (
    <div
      className={`card-magnetic rounded-xl border border-border bg-card p-5 shadow-sm stagger-${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
          <kpi.icon className={`h-5 w-5 ${c.icon}`} />
        </div>
        <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${kpi.deltaColor}`}>
          <ArrowUpRight className="h-3 w-3" />
          {kpi.delta}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-extrabold tracking-tight text-foreground">
          {kpi.prefix}{value.toLocaleString("es-CL")}{kpi.suffix}
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
      </div>
    </div>
  );
};

const AdminView = () => {
  const [mounted, setMounted] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setBarsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Visión Global</h2>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">Universidad Demo · Panel de Dirección Institucional</p>
        </div>
        <button className="btn-press flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
          <Download className="h-4 w-4 text-primary" /> Exportar Reporte Mensual
        </button>
      </div>

      {/* KPI Cards */}
      <section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {KPIS.map((kpi, idx) => (
            <KpiCard key={kpi.label} kpi={kpi} index={idx} mounted={mounted} />
          ))}
        </div>
      </section>

      {/* Collaboration Chart */}
      <section className="stagger-2">
        <div className="card-magnetic rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Colaboración Interdisciplinaria Activa</h3>
            </div>
            <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
              {COLLABORATIONS.reduce((a, c) => a + c.projects, 0)} proyectos cruzados
            </span>
          </div>

          <div className="space-y-4">
            {COLLABORATIONS.map((collab, idx) => (
              <div key={idx} className="group">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{collab.from}</span>
                    <span className="text-muted-foreground">×</span>
                    <span className="font-semibold text-foreground">{collab.to}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{collab.projects} proyectos</span>
                    <span className="font-bold text-foreground">{collab.value}%</span>
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${collab.color} transition-all duration-1000 ease-out`}
                    style={{ width: barsVisible ? `${collab.value}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary-light/50 px-4 py-2 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            TalentLink ha facilitado la conexión entre {COLLABORATIONS.length} pares de facultades este semestre
          </div>
        </div>
      </section>

      {/* Audit Log */}
      <section className="stagger-3">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Últimas Resoluciones y Credenciales</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Registro automatizado</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="divide-y divide-border">
            {AUDIT_LOG.map((entry, idx) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30 stagger-${Math.min(idx + 1, 4)}`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  entry.type === "pdf" ? "bg-destructive/10" :
                  entry.type === "badge" ? "bg-primary-light" :
                  "bg-success-light"
                }`}>
                  {entry.type === "pdf" ? <FileText className="h-4 w-4 text-destructive" /> :
                   entry.type === "badge" ? <Award className="h-4 w-4 text-primary" /> :
                   <Network className="h-4 w-4 text-success" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{entry.text}</p>
                  <p className="text-xs text-muted-foreground">{entry.detail}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {entry.time}
                  </span>
                  {entry.type !== "project" && (
                    <button className="btn-press flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <Eye className="h-3 w-3" />
                      {entry.type === "pdf" ? "Ver PDF" : "Ver Credencial"}
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
