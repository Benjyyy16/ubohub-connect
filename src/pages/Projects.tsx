import { useMemo, useState } from "react";
import { CalendarDays, Eye, Filter, Search, Send, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import ApplicationModal from "@/components/projects/ApplicationModal";
import { projects, UboProject } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";
const statusLabels = { abierto: "Abierto", en_revision: "En revisión", cerrado: "Cerrado" };

export default function Projects() {
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState("Todas");
  const [modality, setModality] = useState("Todas");
  const [skill, setSkill] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [interdisciplinary, setInterdisciplinary] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<UboProject | null>(null);
  const [submittedProjects, setSubmittedProjects] = useState<string[]>([]);

  const faculties = ["Todas", ...Array.from(new Set(projects.map((project) => project.faculty)))];
  const modalities = ["Todas", ...Array.from(new Set(projects.map((project) => project.modality)))];
  const skills = ["Todas", ...Array.from(new Set(projects.flatMap((project) => project.requiredSkills)))];

  const filteredProjects = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery = !cleanQuery || [project.title, project.description, project.professorName, project.faculty].join(" ").toLowerCase().includes(cleanQuery);
      const matchesFaculty = faculty === "Todas" || project.faculty === faculty;
      const matchesModality = modality === "Todas" || project.modality === modality;
      const matchesSkill = skill === "Todas" || project.requiredSkills.includes(skill);
      const matchesStatus = status === "Todos" || project.status === status;
      const matchesInterdisciplinary = interdisciplinary === "Todos" || project.interdisciplinary === (interdisciplinary === "Sí");
      return matchesQuery && matchesFaculty && matchesModality && matchesSkill && matchesStatus && matchesInterdisciplinary;
    });
  }, [faculty, interdisciplinary, modality, query, skill, status]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-6">
        <section className={`${glassPanel} p-6 sm:p-8`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Catálogo institucional
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Proyectos disponibles</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Explora proyectos académicos, de investigación e innovación abiertos para estudiantes UBO.
              </p>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por tema, académico o facultad"
                className="h-12 w-full rounded-2xl border border-white/80 bg-white/75 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none ring-primary/20 transition focus:ring-4"
              />
            </div>
          </div>
        </section>

        <section className={`${glassPanel} p-5`}>
          <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-slate-700">
            <Filter className="h-4 w-4 text-primary" />
            Filtros mock
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Facultad", faculty, setFaculty, faculties],
              ["Modalidad", modality, setModality, modalities],
              ["Habilidad", skill, setSkill, skills],
              ["Estado", status, setStatus, ["Todos", "abierto", "en_revision", "cerrado"]],
              ["Interdisciplinario", interdisciplinary, setInterdisciplinary, ["Todos", "Sí", "No"]],
            ].map(([label, value, setter, options]) => (
              <label key={label as string} className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-400">{label as string}</span>
                <select
                  value={value as string}
                  onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-white/80 bg-white/75 px-3 text-sm font-semibold text-slate-700 outline-none"
                >
                  {(options as string[]).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const submitted = submittedProjects.includes(project.id);
            return (
              <article key={project.id} className={`${glassPanel} p-5`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{project.faculty}</span>
                      <span className={softChip}>{statusLabels[project.status]}</span>
                      {project.interdisciplinary && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Interdisciplinario</span>}
                      {submitted && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Postulación enviada</span>}
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-950">{project.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{project.professorName}</p>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-50 text-xl font-extrabold text-emerald-700">
                    {project.matchScore}%
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.requiredSkills.map((item) => <span key={item} className={softChip}>{item}</span>)}
                </div>
                <div className="mt-5 grid gap-3 text-xs font-semibold text-slate-500 sm:grid-cols-3">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {project.availableSlots} cupos</span>
                  <span>{project.modality}</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {project.deadline}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={`/proyectos/${project.id}`} className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/80 bg-white/75 px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-white">
                    <Eye className="h-4 w-4" />
                    Ver detalle
                  </Link>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    {submitted ? "Postular otra vez" : "Postular"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <ApplicationModal
        open={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSubmitted={(projectId) => setSubmittedProjects((current) => Array.from(new Set([...current, projectId])))}
      />
    </div>
  );
}
