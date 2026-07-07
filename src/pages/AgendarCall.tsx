import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";

export default function AgendarCall() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <LandingNavbar onLogin={() => {}} onStart={() => {}} />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-28 sm:px-6">
        <section className="rounded-3xl border border-white/70 bg-white/65 p-8 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl">
          <CalendarDays className="mb-5 h-8 w-8 text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Coordinación institucional UBOHub</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Esta ruta queda reservada para futuras sesiones de implementación con equipos UBO. Por ahora, puedes revisar el catálogo y dashboards mock.
          </p>
          <Link to="/proyectos" className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white">
            Explorar proyectos <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
