import {
  Plus, Users, BarChart3, Search, UserPlus, FileCheck, Award, Download,
  CheckCircle2, Clock, Heart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import NewInitiativePanel from "./NewInitiativePanel";
import ProjectClosureModal from "./ProjectClosureModal";

const INITIATIVES = [
  {
    id: 1,
    title: "App Educativa para Escuelas Rurales",
    status: "En progreso",
    progress: 65,
    team: [
      { name: "Informática", count: 2 },
      { name: "Diseño", count: 1 },
      { name: "Pedagogía", count: 1 },
    ],
    interdisciplinary: true,
    deadline: "15 Jul 2026",
  },
  {
    id: 2,
    title: "Dashboard Monitoreo Ambiental IoT",
    status: "Buscando talento",
    progress: 20,
    team: [
      { name: "Informática", count: 1 },
      { name: "Ing. Ambiental", count: 2 },
    ],
    interdisciplinary: true,
    deadline: "30 Ago 2026",
  },
  {
    id: 3,
    title: "Estudio de Usabilidad del Campus Virtual",
    status: "En progreso",
    progress: 85,
    team: [
      { name: "Informática", count: 2 },
    ],
    interdisciplinary: false,
    deadline: "01 May 2026",
  },
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Panel de Académico</h2>
          <p className="text-sm text-muted-foreground">Dra. Carmen López · Facultad de Pedagogía</p>
        </div>
        <button
          onClick={() => setShowNewInitiative(true)}
          className="group btn-press flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/25 hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 sparkle-icon" /> Levantar Nueva Iniciativa
        </button>
      </div>

      {/* Active Initiatives */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Mis Iniciativas Activas</h3>
        </div>
        <div className="space-y-3">
          {INITIATIVES.map((init, idx) => (
            <div
              key={init.id}
              onClick={() => setSelectedProject(init.id)}
              className={`card-magnetic cursor-pointer rounded-xl border bg-card p-5 shadow-sm stagger-${idx + 1} ${
                selectedProject === init.id ? "border-primary ring-1 ring-primary/20" : "border-border"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{init.title}</h4>
                    {init.interdisciplinary && (
                      <span className="tag-glow-primary rounded-full px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Interdisciplinario
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className={`rounded-full px-2 py-0.5 font-medium ${
                      init.status === "En progreso" ? "bg-success-light text-success" : "tag-glow-accent text-accent"
                    }`}>
                      {init.status}
                    </span>
                    <span>·</span>
                    <Clock className="h-3 w-3" />
                    <span>{init.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {init.team.map((t) => (
                      <span key={t.name} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                        <Users className="h-3 w-3" /> {t.count} {t.name}
                      </span>
                    ))}
                  </div>
                  <div className="w-24">
                    <Progress value={init.progress} className="h-2" />
                    <span className="mt-0.5 block text-right text-[10px] font-semibold text-muted-foreground">{init.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Talent Search */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Buscador de Talento</h3>
          <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-accent">Match Engine</span>
        </div>
        <div className="card-magnetic overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Nombre</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Carrera</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Habilidades</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-accent" /> Motivación / Interés</span>
                  </th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Match</th>
                  <th className="px-5 py-3 text-center font-semibold text-muted-foreground">Acción</th>
                </tr>
              </thead>
              <tbody>
                {CANDIDATES.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 transition-colors hover:bg-primary-light/50">
                    <td className="px-5 py-3.5 font-medium text-foreground">{c.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{c.career}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.skills.map((s) => (
                          <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="max-w-[220px] px-5 py-3.5 text-xs italic text-accent">{c.motivation}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                        c.match >= 90 ? "bg-success-light text-success" : "tag-glow-primary text-primary"
                      }`}>
                        {c.match}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button className="btn-press inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
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
        <div className="mb-4 flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-success" />
          <h3 className="text-lg font-bold text-foreground">Aprobación y Certificación</h3>
        </div>
        <div className="space-y-3">
          {PENDING_CERTS.map((cert, idx) => (
            <div key={cert.id} className={`card-magnetic flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between stagger-${idx + 1}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-light">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.career} · {cert.project} · {cert.hours}h</p>
                </div>
              </div>
              <button
                onClick={() => setClosureStudent(cert)}
                className="btn-press flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-sm transition-all hover:shadow-md hover:bg-accent/90"
              >
                <Award className="h-4 w-4" />
                Finalizar y Emitir Credencial
              </button>
            </div>
          ))}
        </div>
      </section>
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
