import { Link } from "react-router-dom";
import { Search, UserRound } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { students } from "@/data/ubohub";

export default function Directorio() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-6xl space-y-6 px-5 py-8 sm:px-6">
        <section className="rounded-3xl border border-white/70 bg-white/65 p-6 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Directorio académico UBOHub</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Explora perfiles mock de estudiantes disponibles para proyectos académicos.</p>
          <div className="relative mt-5 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="h-12 w-full rounded-2xl border border-white/80 bg-white/75 pl-11 pr-4 text-sm font-semibold outline-none" placeholder="Buscar por carrera, habilidad o interés" />
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {students.map((student) => (
            <article key={student.id} className="rounded-3xl border border-white/70 bg-white/65 p-5 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl">
              <UserRound className="mb-4 h-6 w-6 text-primary" />
              <h2 className="text-xl font-extrabold text-slate-950">{student.name}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">{student.career} · {student.year}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {student.skills.slice(0, 4).map((skill) => <span key={skill} className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-slate-600">{skill}</span>)}
              </div>
              <Link to="/perfil" className="mt-5 inline-flex h-10 items-center rounded-2xl bg-primary px-4 text-sm font-bold text-white">Ver perfil</Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
