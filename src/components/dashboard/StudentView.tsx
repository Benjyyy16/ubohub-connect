import { Award, CalendarDays, CheckCircle2, Eye, GraduationCap, LogIn, Send, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { applications, badges, projects, studentProfile } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";

const statusLabel = {
  enviada: "Enviada",
  en_revision: "En revisión",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

const statusClass = {
  enviada: "bg-blue-50 text-blue-700 border-blue-100",
  en_revision: "bg-amber-50 text-amber-700 border-amber-100",
  aceptada: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rechazada: "bg-rose-50 text-rose-700 border-rose-100",
};

const getProject = (projectId: string) => projects.find((project) => project.id === projectId);
const studentApplications = applications.filter((application) => studentProfile.applications.includes(application.id));
const recommendedProjects = studentProfile.recommendedProjects
  .map((projectId) => projects.find((project) => project.id === projectId))
  .filter(Boolean);
const earnedBadges = badges.filter((badge) => studentProfile.badges.includes(badge.id));
const averageMatch = Math.round(
  recommendedProjects.reduce((sum, project) => sum + (project?.matchScore || 0), 0) / recommendedProjects.length,
);

export default function StudentView() {
  const navigate = useNavigate();

  const handleApply = (title: string) => {
    toast.success(`Postulación mock enviada a "${title}"`);
  };

  return (
    <div className="space-y-8">
      <section className={`${glassPanel} overflow-hidden p-6 sm:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className={softChip}>
                  <LogIn className="mr-1 inline h-3.5 w-3.5" />
                  Ingreso con credenciales UBO
                </span>
                <span className={softChip}>Perfil {studentProfile.profileCompletion}% completo</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Hola, {studentProfile.name.split(" ")[0]}</h1>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {studentProfile.career} · {studentProfile.year} · {studentProfile.faculty}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/perfil")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5"
          >
            <UserRound className="h-4 w-4" />
            Completar perfil
          </button>
        </div>
        <div className="mt-6">
          <Progress value={studentProfile.profileCompletion} className="h-2.5 bg-white/70" />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Proyectos recomendados", value: recommendedProjects.length, icon: Sparkles },
          { label: "Postulaciones activas", value: studentApplications.filter((item) => item.status !== "rechazada").length, icon: Send },
          { label: "Insignias obtenidas", value: earnedBadges.length, icon: Award },
          { label: "Compatibilidad promedio", value: `${averageMatch}%`, icon: CheckCircle2 },
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

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`${glassPanel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Mi perfil</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Ficha académica</h2>
            </div>
            <span className={softChip}>{studentProfile.experienceLevel}</span>
          </div>
          <dl className="space-y-4 text-sm">
            {[
              ["Carrera", studentProfile.career],
              ["Facultad", studentProfile.faculty],
              ["Año", studentProfile.year],
              ["Disponibilidad", studentProfile.availability],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/60 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
                <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Habilidades</p>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill) => (
                <span key={skill} className={softChip}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Intereses</p>
            <div className="flex flex-wrap gap-2">
              {studentProfile.interests.map((interest) => (
                <span key={interest} className="rounded-full border border-teal-100 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-700">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Proyectos recomendados</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Smart Match UBOHub</h2>
            </div>
            <span className={softChip}>Mínimo esperado 70%</span>
          </div>
          <div className="grid gap-4">
            {recommendedProjects.map((project) => project && (
              <article key={project.id} className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{project.faculty}</span>
                      {project.interdisciplinary && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Interdisciplinario</span>}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-950">{project.title}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">{project.professorName}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-50 text-xl font-extrabold text-emerald-700">
                    {project.matchScore}%
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill} className={softChip}>{skill}</span>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 text-xs font-semibold text-slate-500 sm:grid-cols-3">
                  <span>{project.availableSlots} cupos</span>
                  <span>{project.modality} · {project.duration}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {project.deadline}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleApply(project.title)}
                    className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    Postular
                  </button>
                  <button
                    onClick={() => navigate("/workspace")}
                    className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-white"
                  >
                    <Eye className="h-4 w-4" />
                    Ver detalle
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className={`${glassPanel} p-6`}>
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Postulaciones</p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">Seguimiento activo</h2>
          <div className="mt-5 space-y-3">
            {studentApplications.map((application) => {
              const project = getProject(application.projectId);
              return (
                <div key={application.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{project?.title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-500">{application.note}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass[application.status]}`}>
                      {statusLabel[application.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                    <span>{application.submittedAt}</span>
                    <span>{application.matchScore}% match</span>
                    <span>Siguiente acción: revisar notificación UBOHub</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Insignias</p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">Credenciales verificables</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {earnedBadges.map((badge) => {
              const project = getProject(badge.projectId);
              return (
                <div key={badge.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{badge.name}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{badge.skill}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={softChip}>{badge.level}</span>
                    <span className={softChip}>{badge.verified ? "Verificable" : "Pendiente"}</span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{project?.title} · {badge.issuedAt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
