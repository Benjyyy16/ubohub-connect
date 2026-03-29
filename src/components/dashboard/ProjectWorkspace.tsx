import { useState } from "react";
import { 
  LayoutDashboard, Flag, FileText, MessageSquare, LogOut,
  CheckCircle, Clock, CircleDashed, UploadCloud, ChevronDown,
  Building2, GraduationCap, X, Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import { toast } from "sonner";

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState("hitos");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Simulated stats
  const totalHours = 120;
  const approvedHours = 20;
  const percent = Math.round((approvedHours / totalHours) * 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const handleUploadSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadModalOpen(false);
      toast.success("Entregable subido exitosamente. Notificando al profesor...");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-600/20">
      <TopBar />
      
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* COLUMNA 1: Navegación (20%) */}
        <aside className="w-full lg:w-1/5 shrink-0 flex flex-col gap-8">
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'resumen', label: 'Resumen General', icon: LayoutDashboard },
              { id: 'hitos', label: 'Hitos & Entregables', icon: Flag },
              { id: 'archivos', label: 'Archivos Adjuntos', icon: FileText },
              { id: 'chat', label: 'Chat del Equipo', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors w-full">
              <LogOut className="h-4 w-4" /> Abandonar Proyecto
            </button>
          </div>
        </aside>

        {/* COLUMNA 2: Contenido Principal (55%) */}
        <section className="flex-1 min-w-0 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Desarrollo de App para Inclusión Escolar</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-slate-400" /> Facultad de Educación
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <GraduationCap className="h-3.5 w-3.5 text-slate-400" /> Prof. Carmen Soto
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 capitalize">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                En Desarrollo
              </span>
            </div>
          </div>

          {/* Collapsible Details */}
          <div className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
            <button 
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className="w-full flex items-center justify-between p-5 text-sm font-bold text-slate-700 hover:bg-slate-100/50 transition-colors"
            >
              Descripción y Objetivos
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isDescriptionOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-5 pt-0 text-sm text-slate-600 leading-relaxed max-w-3xl">
                    Este proyecto interdisciplinario busca diseñar un prototipo funcional (Figma) y una base arquitectónica en React para una aplicación móvil orientada a profesores de zonas rurales, permitiendo sincronizar material educativo offline.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Renderizado Condicional por Pestaña */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === 'hitos' && (
                <motion.div 
                  key="hitos"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="relative pl-4 space-y-12"
                >
                  {/* Hito 1: Aprobado */}
                  <div className="relative flex gap-6">
                    <div className="absolute left-[11px] top-8 bottom-[-48px] w-px bg-slate-200"></div>
                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-white">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-400 line-through decoration-slate-300">Investigación de requerimientos UX</h3>
                      <p className="mt-1 text-sm font-semibold text-emerald-600 flex items-center gap-1.5">Aprobado: 20 Hrs</p>
                    </div>
                  </div>

                  {/* Hito 2: Activo */}
                  <div className="relative flex gap-6">
                    <div className="absolute left-[11px] top-8 bottom-[-48px] w-px border-l-2 border-dashed border-slate-200"></div>
                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">Diseño de Prototipo en Figma</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500 flex items-center gap-1.5">Asignado: 40 Hrs</p>
                      
                      <div className="mt-5 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                        <p className="text-xs font-medium text-slate-600 mb-4">El profesor ha habilitado la entrega. Sube tu archivo fuente o enlázalo aquí.</p>
                        <button 
                          onClick={() => setUploadModalOpen(true)}
                          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 transition-all active:scale-95"
                        >
                          <UploadCloud className="h-4 w-4" /> Subir Entregable para Revisión
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hito 3: Bloqueado */}
                  <div className="relative flex gap-6">
                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-4 ring-white">
                      <CircleDashed className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-400">Pruebas de usabilidad con usuarios</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-400 flex items-center gap-1.5">Pendiente</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'resumen' && (
                <motion.div key="resumen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Resumen General del Proyecto</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h3 className="text-sm font-bold text-slate-500 mb-1">Fecha de Inicio</h3>
                       <p className="text-lg font-extrabold text-slate-900">12 de Octubre, 2026</p>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h3 className="text-sm font-bold text-slate-500 mb-1">Impacto Esperado</h3>
                       <p className="text-lg font-extrabold text-slate-900">2,500 Profesionales</p>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'archivos' && (
                <motion.div key="archivos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Recursos y Documentos</h2>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 group transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"><FileText className="h-5 w-5" /></div>
                         <div>
                           <h3 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Brief_Docente_v{i}.pdf</h3>
                           <p className="text-xs text-slate-400">Generado ayer por Prof. Carmen</p>
                         </div>
                      </div>
                      <button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Descargar</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'chat' && (
                <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex flex-col gap-4 h-[300px] overflow-y-auto mb-4 p-2">
                     <div className="self-start max-w-[80%] bg-white p-3 rounded-xl rounded-tl-sm border border-slate-200 shadow-sm">
                       <p className="text-xs font-bold text-amber-600 mb-1">Prof. Carmen Soto</p>
                       <p className="text-sm text-slate-700">Hola equipo. ¿Pudieron revisar los requerimientos del módulo offline?</p>
                     </div>
                     <div className="self-end max-w-[80%] bg-blue-600 text-white p-3 rounded-xl rounded-tr-sm shadow-sm">
                       <p className="text-sm">¡Hola Prof! Sí, justo estoy armando los wireframes en Figma.</p>
                     </div>
                  </div>
                  <div className="flex gap-2 relative">
                    <input type="text" placeholder="Escribe un mensaje..." className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 outline-none" />
                    <button onClick={() => toast.success("Mensaje enviado")} className="bg-blue-600 text-white px-4 rounded-lg font-bold hover:bg-blue-700 transition">Enviar</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* COLUMNA 3: Widgets (25%) */}
        <aside className="w-full lg:w-1/4 shrink-0 flex flex-col gap-6">
          
          {/* Widget de Progreso */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <h3 className="text-sm font-bold text-slate-900 w-full text-left mb-6">Emisión de Credencial</h3>
            
            <div className="relative flex items-center justify-center h-32 w-32 mb-4">
              <svg className="transform -rotate-90 w-32 h-32 absolute">
                <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                <motion.circle
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="6" fill="transparent"
                  strokeDasharray={circumference}
                  className="text-blue-600 drop-shadow-md"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{percent}%</span>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-900">{approvedHours} / {totalHours} Horas</p>
            <p className="mt-2 text-[10px] font-medium text-slate-500 leading-relaxed px-2">
              Al completar las 120 horas validadas, tu insignia se acuñará automáticamente mediante blockchain.
            </p>
          </div>

          {/* Widget de Equipo */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-5">Equipo Interdisciplinario</h3>
            <div className="space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                  AL
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Ana L. <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">TÚ</span>
                  </p>
                  <p className="text-xs text-slate-500 truncate">Ing. Civil Informática</p>
                </div>
              </div>

              <div className="group/tooltip relative flex items-center gap-3 cursor-help">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <span className="text-slate-500 font-bold text-sm">JM</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">Javier M.</p>
                  <p className="text-xs text-slate-500 truncate">Diseño UX/UI</p>
                </div>
                {/* Custom CSS Tooltip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-x-2 transition-all z-20">
                  <div className="bg-slate-900 text-white text-[10px] p-2 rounded shadow-xl whitespace-nowrap">
                    Especialista Figma.<br/>Ver Perfil Público.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-900 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Prof. Carmen Soto <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 uppercase">Líder</span>
                  </p>
                  <p className="text-xs text-slate-500 truncate">Fac. Pedagogía</p>
                </div>
              </div>

            </div>
          </div>
        </aside>
      </main>

      {/* Upload Modal (Simulated State) */}
      <AnimatePresence>
        {uploadModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => !isUploading && setUploadModalOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Subir Entregable</h3>
                    <p className="text-xs font-semibold text-slate-500">Diseño de Prototipo en Figma</p>
                  </div>
                  <button onClick={() => setUploadModalOpen(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-400">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-10 flex flex-col items-center justify-center text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Haz clic para buscar o arrastra tu archivo</p>
                    <p className="text-xs text-slate-500">ZIP, PDF o Enlaces (Max 50MB)</p>
                  </div>
                  <div className="mt-6">
                    <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Comentarios (Opcional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Dejar comentarios para el profesor revisor..."
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-end">
                  <button 
                    onClick={handleUploadSubmit}
                    disabled={isUploading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Enviando...</span>
                    ) : (
                      <span className="flex items-center gap-2"><UploadCloud className="h-4 w-4" /> Enviar a Profesor</span>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
