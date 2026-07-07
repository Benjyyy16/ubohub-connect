import { useState } from "react";
import { ArrowRight, Building2, GraduationCap, Loader2, ShieldCheck, UserCog, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "@/lib/motion";
import { toast } from "sonner";
import { useAuth, User } from "@/context/AuthContext";
import { roleUsers } from "@/data/ubohub";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

const demoRoles = [
  {
    label: "Entrar como estudiante",
    description: "Perfil, proyectos recomendados, postulaciones e insignias.",
    icon: GraduationCap,
    user: roleUsers.student,
  },
  {
    label: "Entrar como académico",
    description: "Convocatorias, ranking de postulantes y publicación mock.",
    icon: Building2,
    user: roleUsers.professor,
  },
  {
    label: "Entrar como administrador",
    description: "KPIs institucionales, metas, riesgos y gestión del piloto.",
    icon: UserCog,
    user: roleUsers.admin,
  },
];

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const enterAs = async (user: User) => {
    await login(user);
    toast.success(`Sesión iniciada como ${user.name}`);
    onClose();
    navigate("/dashboard");
  };

  const handleManualLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Completa tus credenciales institucionales");
      return;
    }

    if (email === "adm" && password === "adm123") {
      await enterAs(roleUsers.admin);
      return;
    }

    if (email === "prof" && password === "prof123") {
      await enterAs(roleUsers.professor);
      return;
    }

    await enterAs(roleUsers.student);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-xl"
        onClick={!isLoading ? onClose : undefined}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_30px_120px_-45px_rgba(30,79,149,0.65)] backdrop-blur-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/15 via-sky-200/30 to-accent/15" />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold text-primary shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Simulación SSO UBO
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Acceso a UBOHub</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Selecciona un rol demo o usa credenciales institucionales. Este flujo está preparado para una futura integración con INTRANET.
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-950 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 grid gap-3">
              {demoRoles.map(({ label, description, icon: Icon, user }) => (
                <button
                  key={label}
                  onClick={() => enterAs(user)}
                  disabled={isLoading}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/70 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-extrabold text-slate-950">{label}</span>
                      <span className="mt-1 block text-sm leading-5 text-slate-500">{description}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              ))}
            </div>

            <form onSubmit={handleManualLogin} className="mt-7 rounded-3xl border border-white/80 bg-white/55 p-4">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Acceso con credenciales UBO</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={email}
                  disabled={isLoading}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nombre.apellido@ubo.cl"
                  className="h-11 rounded-2xl border border-white/80 bg-white/80 px-4 text-sm font-semibold text-slate-900 outline-none ring-primary/20 transition focus:ring-4"
                />
                <input
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Contraseña institucional"
                  className="h-11 rounded-2xl border border-white/80 bg-white/80 px-4 text-sm font-semibold text-slate-900 outline-none ring-primary/20 transition focus:ring-4"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Validando...</> : <>Continuar con SSO <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] font-medium text-slate-400">
              UBOHub usa datos mock en esta versión. No se conecta todavía a servicios reales de INTRANET.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
