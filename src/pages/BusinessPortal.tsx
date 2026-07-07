import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";

export default function BusinessPortal() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <section className="rounded-3xl border border-white/70 bg-white/65 p-8 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Ruta heredada aislada
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">UBOHub ahora opera como plataforma institucional universitaria.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Esta ruta se conserva para no romper enlaces antiguos, pero el flujo principal está en proyectos, dashboards e insignias UBOHub.
          </p>
          <Link to="/proyectos" className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white">
            Ir a proyectos <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
