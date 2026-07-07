import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Sparkles, ArrowRight, Wand2, Calendar, Clock, BookOpen, Trash2, Plus, BrainCircuit, X } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProjectCreationWizard() {
  const [phase, setPhase] = useState<"input" | "generating" | "review">("input");
  const [prompt, setPrompt] = useState("");
  const [loadingText, setLoadingText] = useState("Analizando requerimientos...");
  const navigate = useNavigate();

  // Review Form State
  const [title, setTitle] = useState("Modelo Predictivo de Retención Estudiantil");
  const [hours, setHours] = useState("120");
  const [faculties, setFaculties] = useState(["Ingeniería de Datos", "Psicología/Sociología"]);
  const [milestones, setMilestones] = useState([
    { id: 1, text: "Limpieza de base de datos Excel", hrs: "30" },
    { id: 2, text: "Entrenamiento de modelo en Python", hrs: "50" },
    { id: 3, text: "Análisis cualitativo de variables sociales", hrs: "40" }
  ]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setPhase("generating");
  };

  useEffect(() => {
    if (phase === "generating") {
      const t1 = setTimeout(() => setLoadingText("Extrayendo habilidades clave..."), 1500);
      const t2 = setTimeout(() => setLoadingText("Estructurando hitos de trabajo..."), 3000);
      const t3 = setTimeout(() => setPhase("review"), 4500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase]);

  const handlePublish = () => {
    toast.success("Proyecto publicado exitosamente. Buscando matches...");
    setTimeout(() => {
      navigate('/professor'); // Assuming there's a professor dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-600/20">
      <TopBar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* FASE 1: INPUT */}
          {phase === "input" && (
            <motion.div 
              key="phase-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl text-center"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 shadow-sm">
                <Wand2 className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Asistente de Creación IA
              </h1>
              <p className="text-slate-500 mb-8 font-medium">
                Describe lo que necesitas investigar o construir en lenguaje natural. Transformaremos tu idea en un proyecto estructurado al instante.
              </p>

              <div className="relative group shadow-sm bg-white rounded-2xl">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ej: Necesito crear un modelo predictivo para analizar la deserción estudiantil basándome en los datos históricos de Excel de mi facultad..."
                  className="w-full h-40 resize-none rounded-2xl border border-slate-200 p-5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium leading-relaxed bg-transparent z-10 relative"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
              </div>

              <motion.button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
                whileTap={{ scale: prompt.trim() ? 0.98 : 1 }}
                className="mt-8 flex items-center gap-2 mx-auto bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-slate-900/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" /> 
                Generar Estructura con IA
              </motion.button>
            </motion.div>
          )}

          {/* FASE 2: GENERATING (SKELETONS) */}
          {phase === "generating" && (
            <motion.div 
              key="phase-generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xl shadow-slate-200/50"
            >
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <div className="relative flex h-16 w-16 mb-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></span>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 border-2 border-indigo-100 text-indigo-600 shadow-inner">
                    <BrainCircuit className="h-7 w-7 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 transition-all">
                  {loadingText}
                </h3>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                {/* Title Skeleton */}
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                  <div className="h-10 w-3/4 bg-slate-100 rounded-lg animate-pulse" />
                </div>
                {/* Metadata Skeleton */}
                <div className="flex gap-4">
                  <div className="h-8 w-32 bg-slate-100 rounded-full animate-pulse" />
                  <div className="h-8 w-40 bg-slate-100 rounded-full animate-pulse" />
                </div>
                {/* Milestones Skeleton */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="h-4 w-48 bg-slate-100 rounded animate-pulse mb-6" />
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="h-12 flex-1 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
                      <div className="h-12 w-20 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* FASE 3: REVIEW & PUBLISH */}
          {phase === "review" && (
            <motion.div 
              key="phase-review"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
            >
              <div className="bg-indigo-600/5 border-b border-indigo-100/50 p-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Borrador Generado Exitosamente
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Revisa y ajusta los parámetros antes de publicar.</p>
                </div>
                <button 
                  onClick={() => setPhase("input")}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 underline underline-offset-4"
                >
                  Regenerar Borrador
                </button>
              </div>

              <div className="p-6 md:p-10 space-y-8">
                {/* Main Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5"/> Título del Proyecto</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">Facultades (Tags)</label>
                      <div className="flex flex-wrap gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 min-h-[52px]">
                        {faculties.map((fac, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
                            {fac}
                            <button onClick={() => setFaculties(faculties.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                        <button className="text-xs font-bold text-indigo-600 ml-2 hover:underline">Añadir Tag</button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 shrink-0">
                      <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/> Est. Horas</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pr-12 text-lg font-bold text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Hrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones Editor */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/> Plan de Entregables</label>
                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                      <Plus className="h-3.5 w-3.5" /> Añadir Hito
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {milestones.map((ms, index) => (
                      <div key={ms.id} className="group flex items-start gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-colors shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={ms.text}
                          onChange={(e) => setMilestones(milestones.map(m => m.id === ms.id ? { ...m, text: e.target.value } : m))}
                          className="flex-1 bg-transparent border-0 border-b border-transparent focus:border-indigo-500 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-0 px-0 py-1.5 transition-colors"
                        />
                        <div className="relative w-24 shrink-0">
                          <input
                            type="number"
                            value={ms.hrs}
                            onChange={(e) => setMilestones(milestones.map(m => m.id === ms.id ? { ...m, hrs: e.target.value } : m))}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-bold text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-center"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">h</span>
                        </div>
                        <button onClick={() => setMilestones(milestones.filter(m => m.id !== ms.id))} className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePublish}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30"
                  >
                    Publicar Proyecto y Buscar Talento
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
