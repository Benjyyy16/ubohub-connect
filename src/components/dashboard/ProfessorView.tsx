import { Award, CalendarDays, Check, Edit3, Eye, FilePlus2, Lock, Send, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { applications, badges, professors, projects, students } from "@/data/ubohub";
import NewInitiativePanel from "./NewInitiativePanel";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";

const statusLabel = {
  abierto: "Abierto",
  en_revision: "En revisión",
  cerrado: "Cerrado",
};

const appStatusLabel = {
  enviada: "Enviada",
  en_revision: "En revisión",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

export default function ProfessorView() {
  const professor = professors[0];
  const professorProjects = projects.filter((project) => project.professorId === professor.id);
  const [selectedProjectId, setSelectedProjectId] = useState(professorProjects[0]?.id || projects[0].id);
  const [showNewInitiative, setShowNewInitiative] = useState(false);
  const selectedProject = projects.find((project) => project.id === selectedProjectId) || professorProjects[0];

  const rankedApplicants = useMemo(() => {
    return applications
      .filter((application) => application.projectId === selectedProject?.id)
      .map((application) => ({
        application,
        student: students.find((item) => item.id === application.studentId),
      }))
      .filter((item) => item.student)
      .sort((a, b) => b.application.matchScore - a.application.matchScore);
  }, [selectedProject?.id]);

  const totalApplicants = professorProjects.reduce((sum, project) => sum + project.applicationsCount, 0);
  const selectedStudents = applications.filter((application) => application.status === "aceptada").length;
  const averageMatch = Math.round(
    applications.reduce((sum, application) => sum + application.matchScore, 0) / applications.length,
  );

  const handleAction = (action: string, name?: string) => {
    toast.success(`${action}${name ? `: ${name}` : ""}`);
  };

  return (
    <div className="space-y-8">
      <section className={`${glassPanel} p-6 sm:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className={softChip}>Académico UBO</span>
              <span className={softChip}>{professor.activeProjects.length} proyectos activos</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Hola, {professor.name}</h1>
            <p className="mt-2 text-sm font-medium text-slate-600">{professor.faculty} · {professor.department}</p>
          </div>
          <button
            onClick={() => setShowNewInitiative(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5"
          >
            <FilePlus2 className="h-4 w-4" />
            Publicar proyecto
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Convocatorias activas", value: professorProjects.filter((project) => project.status !== "cerrado").length, icon: FilePlus2 },
          { label: "Postulantes recibidos", value: totalApplicants, icon: Users },
          { label: "Match promedio", value: `${averageMatch}%`, icon: Award },
          { label: "Estudiantes seleccionados", value: selectedStudents, icon: Check },
        ].map((kpi) => (
          <div key={kpi.label} className={`${glassPanel} p-5`}>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <kpi.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-extrabold text-slate-950">{kpi.value}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-600">{kpi.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className={`${glassPanel} p-6`}>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Convocatorias</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Proyectos publicados</h2>
          </div>
          <div className="grid gap-4">
            {professorProjects.map((project) => (
              <article
                key={project.id}
                className={`rounded-3xl border p-5 transition ${
                  selectedProjectId === project.id ? "border-primary/40 bg-primary-light/70" : "border-white/80 bg-white/70"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <button className="text-left" onClick={() => setSelectedProjectId(project.id)}>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className={softChip}>{statusLabel[project.status]}</span>
                      {project.interdisciplinary && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Interdisciplinario</span>}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-950">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                  </button>
                  <div className="rounded-3xl bg-white/80 p-4 text-center shadow-sm">
                    <p className="text-2xl font-extrabold text-primary">{project.availableSlots}</p>
                    <p className="text-xs font-bold text-slate-500">cupos</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill} className={softChip}>{skill}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                    <span>{project.applicationsCount} postulaciones</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {project.deadline}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleAction("Convocatoria abierta para edición", project.title)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-white/80 px-3 text-xs font-bold text-slate-700 shadow-sm"><Edit3 className="h-3.5 w-3.5" /> Editar</button>
                    <button onClick={() => setSelectedProjectId(project.id)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-primary px-3 text-xs font-bold text-white shadow-sm"><Eye className="h-3.5 w-3.5" /> Ver postulantes</button>
                    <button onClick={() => handleAction("Convocatoria marcada para cierre", project.title)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-slate-950 px-3 text-xs font-bold text-white shadow-sm"><Lock className="h-3.5 w-3.5" /> Cerrar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Ranking de postulantes</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">{selectedProject?.title}</h2>
          </div>
          <div className="space-y-3">
            {rankedApplicants.map(({ application, student }) => student && (
              <article key={application.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-950">{student.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{student.career} · {student.year}</p>
                  </div>
                  <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">{application.matchScore}%</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {student.skills.filter((skill) => selectedProject?.requiredSkills.includes(skill)).map((skill) => (
                    <span key={skill} className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{skill}</span>
                  ))}
                  <span className={softChip}>{appStatusLabel[application.status]}</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">{application.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => handleAction("Aceptado", student.name)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-emerald-600 px-3 text-xs font-bold text-white"><Check className="h-3.5 w-3.5" /> Aceptar</button>
                  <button onClick={() => handleAction("En revisión", student.name)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-white/80 px-3 text-xs font-bold text-slate-700 shadow-sm"><Eye className="h-3.5 w-3.5" /> Revisar</button>
                  <button onClick={() => handleAction("Rechazado", student.name)} className="inline-flex h-9 items-center gap-2 rounded-2xl bg-rose-50 px-3 text-xs font-bold text-rose-700"><X className="h-3.5 w-3.5" /> Rechazar</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${glassPanel} p-6`}>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Crear proyecto mock</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Nueva convocatoria institucional</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Esta sección anticipa el formulario real de publicación. Hoy funciona como maqueta visual preparada para conectar con backend.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Título", "Proyecto interdisciplinario UBO"],
              ["Descripción", "Problema, objetivo y entregables"],
              ["Habilidades", "React, Python, investigación"],
              ["Cupos", "3 a 5 estudiantes"],
              ["Modalidad", "Híbrida o remota"],
              ["Fecha límite", "Cierre de convocatoria"],
              ["Insignia asociada", badges[0].name],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewInitiativePanel open={showNewInitiative} onClose={() => setShowNewInitiative(false)} />
    </div>
  );
}
