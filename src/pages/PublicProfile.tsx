import { Award, CalendarDays, CheckCircle2, Clock, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { applications, badges, projects, studentProfile } from "@/data/ubohub";

const glassPanel = "rounded-3xl border border-white/70 bg-white/65 shadow-[0_24px_80px_-40px_rgba(30,79,149,0.45)] backdrop-blur-xl";
const softChip = "rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm";
const statusLabels = { enviada: "Enviada", en_revision: "En revisión", aceptada: "Aceptada", rechazada: "Rechazada" };

export default function PublicProfile() {
  const earnedBadges = badges.filter((badge) => studentProfile.badges.includes(badge.id));
  const studentApplications = applications.filter((application) => studentProfile.applications.includes(application.id));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar />
      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-6">
        <section className={`${glassPanel} overflow-hidden`}>
          <div className="h-32 bg-gradient-to-br from-primary/20 via-sky-100/70 to-accent/20" />
          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] border-4 border-white bg-gradient-to-br from-primary to-accent text-3xl font-extrabold text-white shadow-xl shadow-primary/20">
                {studentProfile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
                    Perfil verificado UBOHub
                  </span>
                  <span className={softChip}>{studentProfile.profileCompletion}% completo</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">{studentProfile.name}</h1>
                <p className="mt-2 text-sm font-semibold text-slate-600">{studentProfile.career} · {studentProfile.year}</p>
                <p className="mt-1 text-sm text-slate-500">{studentProfile.faculty}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Disponibilidad", value: studentProfile.availability, icon: Clock },
            { label: "Insignias", value: earnedBadges.length, icon: Award },
            { label: "Postulaciones", value: studentApplications.length, icon: CheckCircle2 },
          ].map((item) => (
            <div key={item.label} className={`${glassPanel} p-5`}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className={`${glassPanel} p-6`}>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Perfil académico</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Intereses y experiencia</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-white/80 bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Experiencia</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{studentProfile.experienceLevel}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Habilidades</p>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.skills.map((skill) => <span key={skill} className={softChip}>{skill}</span>)}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Intereses</p>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.interests.map((interest) => <span key={interest} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{interest}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className={`${glassPanel} p-6`}>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Insignias verificables</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">Competencias validadas</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {earnedBadges.map((badge) => {
                const project = projects.find((item) => item.id === badge.projectId);
                return (
                  <article key={badge.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-950">{badge.name}</h3>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{badge.skill} · {badge.level}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-500">{project?.title} · {badge.issuedBy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${glassPanel} p-6`}>
          <div className="mb-5 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Proyectos y postulaciones</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Historial UBOHub</h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {studentApplications.map((application) => {
              const project = projects.find((item) => item.id === application.projectId);
              return (
                <article key={application.id} className="rounded-3xl border border-white/80 bg-white/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-slate-950">{project?.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{project?.faculty}</p>
                    </div>
                    <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">{application.matchScore}%</span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{application.note}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={softChip}>{statusLabels[application.status]}</span>
                    <span className={softChip}><CalendarDays className="mr-1 inline h-3.5 w-3.5" /> {application.submittedAt}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="pb-6 text-center text-xs font-medium text-slate-400">
          <Sparkles className="mr-1 inline h-3.5 w-3.5 text-primary" />
          Perfil emitido por UBOHub con datos mock preparados para integración institucional.
        </footer>
      </main>
    </div>
  );
}
