import { Link } from "react-router-dom";
import { ArrowRight, Award, BarChart3, SearchCheck, Users } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";

export default function Soluciones() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <LandingNavbar onLogin={() => {}} onStart={() => {}} />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-6">
        <section className={`${glassPanel} p-8`}>
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Soluciones UBOHub</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Módulos institucionales para conectar talento y proyectos UBO.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            UBOHub organiza perfiles, proyectos, postulaciones, compatibilidad, insignias y métricas para apoyar experiencias reales antes del egreso.
          </p>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { title: "Perfiles de estudiante", text: "Habilidades, intereses, disponibilidad, experiencia e insignias.", icon: Users },
            { title: "Publicación de proyectos", text: "Convocatorias académicas con cupos, modalidad y fecha límite.", icon: SearchCheck },
            { title: "Insignias verificables", text: "Credenciales por habilidad asociadas a proyectos reales.", icon: Award },
            { title: "Métricas institucionales", text: "KPIs de adopción, matches, retención y satisfacción.", icon: BarChart3 },
          ].map((item) => (
            <article key={item.title} className={`${glassPanel} p-6`}>
              <item.icon className="mb-4 h-6 w-6 text-primary" />
              <h2 className="text-xl font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>
        <Link to="/proyectos" className="mt-8 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white shadow-xl shadow-primary/20">
          Explorar proyectos <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    </div>
  );
}
