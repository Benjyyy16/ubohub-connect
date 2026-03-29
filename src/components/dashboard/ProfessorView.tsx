import {
  Plus, Users, BarChart3, Search, UserPlus, FileCheck, Award, 
  CheckCircle2, Clock, Heart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import NewInitiativePanel from "./NewInitiativePanel";
import ProjectClosureModal from "./ProjectClosureModal";
import EmptyState from "./EmptyState";

const INITIATIVES = [
  { id: 1, title: "App Educativa para Escuelas Rurales", status: "En progreso", progress: 65, team: [{ name: "Informática", count: 2 }, { name: "Diseño", count: 1 }, { name: "Pedagogía", count: 1 }], interdisciplinary: true, deadline: "15 Jul 2026" },
  { id: 2, title: "Dashboard Monitoreo Ambiental IoT", status: "Buscando talento", progress: 20, team: [{ name: "Informática", count: 1 }, { name: "Ing. Ambiental", count: 2 }], interdisciplinary: true, deadline: "30 Ago 2026" },
  { id: 3, title: "Estudio de Usabilidad del Campus Virtual", status: "En progreso", progress: 85, team: [{ name: "Informática", count: 2 }], interdisciplinary: false, deadline: "01 May 2026" },
];

const CANDIDATES = [
  { id: 1, name: "María González", career: "Ing. Informática", skills: ["React", "Python"], motivation: "Le apasiona EdTech y la inclusión educativa", match: 95 },
  { id: 2, name: "Carlos Peña", career: "Pedagogía", skills: ["Didáctica", "Evaluación"], motivation: "Investiga metodologías activas en zonas rurales", match: 91 },
  { id: 3, name: "Sofía Morales", career: "Diseño", skills: ["Figma", "UX Research"], motivation: "Interesada en diseño accesible e inclusivo", match: 87 },
  { id: 4, name: "Diego Ramírez", career: "Ing. Informática", skills: ["Node.js", "SQL"], motivation: "Quiere aplicar datos a problemas sociales", match: 80 },
];

const PENDING_CERTS = [
  { id: 1, name: "Valentina Araya", career: "Diseño", project: "Portal Estudiantil", hours: 80, status: "Completado" },
  { id: 2, name: "Tomás Bustos", career: "Ing. Informática", project: "App Salud Mental", hours: 120, status: "Completado" },
  { id: 3, name: "Isidora Fuentes", career: "Psicología", project: "App Salud Mental", hours: 60, status: "Completado" },
];

const ProfessorView = () => {
  const [selectedProject, setSelectedProject] = useState(1);
  const [showNewInitiative, setShowNewInitiative] = useState(false);
  const [closureStudent, setClosureStudent] = useState<typeof PENDING_CERTS[number] | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Panel de Académico</h2>
          <p className="text-sm text-muted-foreground">Dra. Carmen López · Facultad de Pedagogía</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmpty(!showEmpty)}
            className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {showEmpty ? "Ver Datos" : "Ver Empty State"}
          </button>
          <button
            onClick={() => setShowNewInitiative(true)}
            className="btn-press flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Nueva Iniciativa
          </button>
        </div>
      </div>

      {showEmpty ? (
        <EmptyState onCreateNew={() => { setShowEmpty(false); setShowNewInitiative(true); }} />
      ) : (
        <>
          {/* Active Initiatives */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Mis Iniciativas Activas</h3>
            </div>
            <div className="space-y-2">
              {INITIATIVES.map((init, idx) => (
                <div
                  key={init.id}
                  onClick={() => setSelectedProject(init.id)}
                  className={`card-magnetic cursor-pointer rounded-lg border bg-card p-4 stagger-${idx + 1} ${
                    selectedProject === init.id ? "border-primary ring-1 ring-primary/10" : "border-border"
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground">{init.title}</h4>
                        {init.interdisciplinary && (
                          <span className="rounded-md bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary">
                            Interdisciplinario
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        <span className={`rounded-md px-1.5 py-0.5 font-medium ${
                          init.status === "En progreso" ? "bg-success-light text-success" : "bg-primary-light text-primary"
                        }`}>
                          {init.status}
                        </span>
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {init.deadline}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-1">
                        {init.team.map((t) => (
                          <span key={t.name} className="flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            <Users className="h-2.5 w-2.5" /> {t.count} {t.name}
                          </span>
                        ))}
                      </div>
                      <div className="w-20">
                        <Progress value={init.progress} className="h-1.5" />
                        <span className="mt-0.5 block text-right text-[10px] font-medium tabular-nums text-muted-foreground">{init.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Talent Search */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Buscador de Talento</h3>
              <span className="rounded-md bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary">Match Engine</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Nombre</th>
                      <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Carrera</th>
                      <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Habilidades</th>
                      <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-primary" /> Motivación</span>
                      </th>
                      <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Match</th>
                      <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CANDIDATES.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 transition-colors duration-150 hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{c.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{c.career}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {c.skills.map((s) => (
                              <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="max-w-[200px] px-4 py-3 text-[11px] text-muted-foreground">{c.motivation}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                            c.match >= 90 ? "bg-success-light text-success" : "bg-primary-light text-primary"
                          }`}>
                            {c.match}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="btn-press inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                            <UserPlus className="h-3 w-3" /> Invitar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Certification */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-success" />
              <h3 className="text-sm font-bold text-foreground">Aprobación y Certificación</h3>
            </div>
            <div className="space-y-2">
              {PENDING_CERTS.map((cert, idx) => (
                <div key={cert.id} className={`card-magnetic flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between stagger-${idx + 1}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-light">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{cert.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cert.career} · {cert.project} · {cert.hours}h</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setClosureStudent(cert)}
                    className="btn-press flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Award className="h-3.5 w-3.5" />
                    Finalizar y Emitir Credencial
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <NewInitiativePanel open={showNewInitiative} onClose={() => setShowNewInitiative(false)} />
      <ProjectClosureModal
        open={!!closureStudent}
        onClose={() => setClosureStudent(null)}
        student={closureStudent}
      />
    </div>
  );
};

export default ProfessorView;
