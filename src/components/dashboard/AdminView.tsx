import { AlertTriangle, ArrowUpRight, Download, KeyRound, Link2, LineChart, Settings, ShieldCheck } from "lucide-react";
import { adminKpis, kpis, managementActions, pilotGoals, recentActivity, riskAlerts } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";

const activityColor = {
  postulación: "bg-blue-50 text-blue-700",
  proyecto: "bg-violet-50 text-violet-700",
  insignia: "bg-emerald-50 text-emerald-700",
  match: "bg-teal-50 text-teal-700",
};

export default function AdminView() {
  return (
    <div className="space-y-8">
      <section className={`${glassPanel} p-6 sm:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className={softChip}>Piloto institucional</span>
              <span className={softChip}>{kpis.adoptionRate}% adopción</span>
              <span className={softChip}>{kpis.matchPrecision}% precisión matching</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Panel institucional UBOHub</h1>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Seguimiento ejecutivo de proyectos, postulaciones, emparejamientos e insignias verificables.
            </p>
          </div>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5">
            <Download className="h-4 w-4" />
            Exportar reporte
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((item) => (
          <div key={item.label} className={`${glassPanel} p-5`}>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-extrabold text-slate-950">
                {item.value.toLocaleString("es-CL")}{item.suffix}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700">{item.label}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {item.delta}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={`${glassPanel} p-6`}>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Monitoreo</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Avance contra metas del piloto</h2>
            </div>
            <span className={softChip}>Actualizado hoy</span>
          </div>
          <div className="space-y-5">
            {pilotGoals.map((goal) => {
              const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 130);
              return (
                <div key={goal.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">{goal.label}</span>
                    <span className="font-semibold text-slate-500">
                      {goal.current}{goal.suffix} / {goal.target}{goal.suffix}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/80 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-sky-500 to-accent"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Riesgos y alertas</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Prioridades operativas</h2>
          </div>
          <div className="space-y-3">
            {riskAlerts.map((risk) => (
              <article key={risk.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${risk.severity === "alta" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{risk.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{risk.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className={`${glassPanel} p-6`}>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Actividad reciente</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Eventos del ecosistema</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <article key={activity.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold text-slate-950">{activity.text}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{activity.detail}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${activityColor[activity.type as keyof typeof activityColor]}`}>
                    {activity.type}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Gestión</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Controles institucionales</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {managementActions.map((action, index) => {
              const Icon = [KeyRound, Link2, Download, LineChart][index] || Settings;
              return (
                <button
                  key={action}
                  className="rounded-3xl border border-white/80 bg-white/70 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-bold text-slate-950">{action}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Acción mock preparada para conexión futura con servicios institucionales.</p>
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
              <p className="text-sm font-semibold leading-6 text-emerald-800">
                Estado mock: piloto operativo, integración INTRANET pendiente de validación técnica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
