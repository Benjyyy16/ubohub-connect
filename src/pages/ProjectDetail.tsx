import { useState } from "react";
import { Award, CalendarDays, CheckCircle2, Send, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import ApplicationModal from "@/components/projects/ApplicationModal";
import { applications, professors, projects, students } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.id === projectId) || projects[0];
  const professor = professors.find((item) => item.id === project.professorId);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const projectApplicants = applications
    .filter((application) => application.projectId === project.id)
    .map((application) => ({
      application,
      student: students.find((student) => student.id === application.studentId),
    }))
    .filter((item) => item.student);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-6">
        <section className={`${glassPanel} overflow-hidden`}>
          <div className="bg-gradient-to-br from-primary/15 via-sky-100/60 to-accent/15 p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{project.faculty}</span>
              {project.interdisciplinary && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Interdisciplinario</span>}
              {submitted && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Postulación enviada</span>}
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{project.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{project.description}</p>
              </div>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.75rem] bg-white/80 text-2xl font-extrabold text-emerald-700 shadow-sm">
                {project.matchScore}%
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Postular a este proyecto
              </button>
              <Link to="/proyectos" className="inline-flex h-12 items-center rounded-2xl border border-white/80 bg-white/75 px-5 text-sm font-bold text-slate-700 shadow-sm">
                Volver a proyectos
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={`${glassPanel} p-6`}>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Información del proyecto</p>
            <div className="mt-5 grid gap-3">
              {[
                ["Académico responsable", project.professorName],
                ["Departamento", professor?.department || "Unidad académica UBO"],
                ["Modalidad", project.modality],
                ["Duración", project.duration],
                ["Fecha límite", project.deadline],
                ["Cupos disponibles", `${project.availableSlots}`],
                ["Recompensa", project.badgeReward],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${glassPanel} p-6`}>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Compatibilidad y requisitos</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Qué busca esta convocatoria</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              UBOHub cruza habilidades, intereses, disponibilidad y experiencia para sugerir postulaciones con al menos 70% de compatibilidad.
            </p>
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Habilidades requeridas</p>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((item) => <span key={item} className={softChip}>{item}</span>)}
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Intereses relacionados</p>
              <div className="flex flex-wrap gap-2">
                {project.interests.map((item) => <span key={item} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{item}</span>)}
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/70 p-4"><Users className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-slate-900">{projectApplicants.length} postulantes</p></div>
              <div className="rounded-3xl bg-white/70 p-4"><CalendarDays className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-slate-900">{project.deadline}</p></div>
              <div className="rounded-3xl bg-white/70 p-4"><Award className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-slate-900">{project.badgeReward}</p></div>
            </div>
          </div>
        </section>

        <section className={`${glassPanel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Postulantes mock</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Actividad de postulación</h2>
            </div>
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {projectApplicants.map(({ application, student }) => student && (
              <article key={application.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-950">{student.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{student.career} · {student.year}</p>
                  </div>
                  <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-700">{application.matchScore}%</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">{application.note}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <ApplicationModal open={modalOpen} project={project} onClose={() => setModalOpen(false)} onSubmitted={() => setSubmitted(true)} />
    </div>
  );
}
