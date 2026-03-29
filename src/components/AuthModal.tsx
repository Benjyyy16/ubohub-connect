import { useState } from "react";
import { X, Mail, Building2, GraduationCap, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ open, onClose, initialMode = 'login' }: AuthModalProps) {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'student' | 'business'>('student');

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleStudentSSO = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor completa tus credenciales");
      return;
    }

    // BACKDOOR GOD MODE
    if (email === 'adm' && password === 'adm123') {
      await login({ id: '0', name: 'Super Admin', email, role: 'admin' });
      toast.success("God Mode Activado. Desplegando Command Center.");
      onClose();
      navigate('/super-admin-command-center');
      return;
    }

    // BACKDOOR PROFESOR
    if (email === 'prof' && password === 'prof123') {
      await login({ id: '2', name: 'Dra. Carmen Soto', email, role: 'professor' });
      toast.success("Autenticación SSO exitosa (Profesor)");
      onClose();
      navigate('/dashboard');
      return;
    }

    // Simular flujo SSO estándar para estudiante
    await login({ id: '1', name: 'usuario', email: email, role: 'student' });
    toast.success("Autenticación SSO exitosa");
    onClose();
    navigate('/onboarding');
  };

  const handleBusinessLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Completa todos los campos corporativos");
      return;
    }

    // Simular flujo B2B
    await login({ id: '2', name: 'Reclutador Tech', email, role: 'business' });
    toast.success("Sesión corporativa iniciada");
    onClose();
    navigate('/business');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={!isLoading ? onClose : undefined}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-0 flex justify-between items-center relative z-10">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Acceso a TalentLink</h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="size-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-6 mb-6">
            <div className="flex p-1 bg-slate-100 rounded-xl relative">
              <button
                disabled={isLoading}
                onClick={() => setActiveTab('student')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all z-10 ${activeTab === 'student' ? 'text-slate-900 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <GraduationCap className="h-4 w-4" /> Universitario
              </button>
              <button
                disabled={isLoading}
                onClick={() => setActiveTab('business')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all z-10 ${activeTab === 'business' ? 'text-slate-900 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <Building2 className="h-4 w-4" /> B2B Empresas
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-0">
            {activeTab === 'student' ? (
              <form onSubmit={handleStudentSSO} className="flex flex-col animate-[fade-in_0.3s_ease-out]">
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Ingresa con tu correo institucional. Te redirigiremos al portal SSO de tu universidad (SAML/Azure) automáticamente.
                  </p>
                  <label className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-2 block">Email Institucional</label>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      required
                      disabled={isLoading}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alumno@universidad.edu"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block px-4 py-3.5 transition-colors disabled:opacity-50 outline-none"
                    />
                  </div>
                  <label className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-2 block">Contraseña MiPortal</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      disabled={isLoading}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block px-4 py-3.5 transition-colors disabled:opacity-50 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-sm px-5 py-3.5 text-center flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-lg shadow-blue-500/20"
                >
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Conectando...</> : <><Mail className="w-5 h-5" /> Continuar con SSO</>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleBusinessLogin} className="flex flex-col animate-[fade-in_0.3s_ease-out]">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-extrabold tracking-widest uppercase text-slate-400 mb-2 block">Email Corporativo</label>
                    <input
                      type="text"
                      required
                      disabled={isLoading}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 block p-3.5 transition-colors disabled:opacity-50 outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-extrabold tracking-widest uppercase text-slate-400">Contraseña</label>
                      <a href="#" className="text-xs font-bold text-blue-600 hover:underline">¿Olvidaste tu clave?</a>
                    </div>
                    <input
                      type="password"
                      required
                      disabled={isLoading}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 block p-3.5 transition-colors disabled:opacity-50 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 font-bold rounded-xl text-sm px-5 py-3.5 text-center flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-lg shadow-slate-900/20"
                >
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Validando Credenciales...</> : <>Ingresar a Business <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            <p className="text-[10px] text-center text-slate-400 font-medium mt-6">
              Al ingresar aceptas los <a href="#" className="underline">Términos de Servicio</a> B2B y <a href="#" className="underline">Política de Privacidad</a> de TalentLink.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
