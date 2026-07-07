import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
import { projects } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";

export default function Casos() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <LandingNavbar onLogin={() => {}} onStart={() => {}} />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-6">
        <section className={`${glassPanel} p-8`}>
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Casos UBOHub</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Ejemplos de proyectos académicos con impacto formativo.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Estos casos mock muestran cómo UBOHub puede vincular estudiantes, académicos y unidades institucionales en experiencias reales.
          </p>
        </section>
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <article key={project.id} className={`${glassPanel} p-6`}>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{project.faculty}</span>
                {project.interdisciplinary && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Interdisciplinario</span>}
              </div>
              <h2 className="text-xl font-extrabold text-slate-950">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {project.matchScore}% compatibilidad de referencia
              </div>
              <Link to={`/proyectos/${project.id}`} className="mt-5 inline-flex h-10 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-white">
                Ver detalle <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
