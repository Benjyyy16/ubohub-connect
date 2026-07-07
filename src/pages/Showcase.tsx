import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, GraduationCap } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { kpis } from "@/data/ubohub";

export default function Showcase() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
        <section className="rounded-3xl border border-white/70 bg-white/65 p-8 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl">
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Showcase UBOHub</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Vista resumida del piloto institucional.</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Proyectos", kpis.publishedProjects],
              ["Postulaciones", kpis.totalApplications],
              ["Insignias", kpis.issuedBadges],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-white/70 p-5">
                <BarChart3 className="mb-3 h-5 w-5 text-primary" />
                <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/dashboard" className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white">
            Abrir dashboard <GraduationCap className="h-4 w-4" /> <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
