import { useState } from "react";
import { 
  User, Briefcase, Settings, UploadCloud, ShieldCheck, 
  Trash2, Plus, Edit2, Github, Linkedin, CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { toast } from "sonner";
import TopBar from "@/components/dashboard/TopBar";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  url?: string;
  isVerified: boolean;
}

const INITIAL_VERIFIED: Project[] = [
  {
    id: "v1",
    title: "App Educativa para Escuelas Rurales",
    role: "Lead Frontend Engineer",
    description: "Desarrollo de plataforma colaborativa con React y Firebase para zonas de baja conectividad.",
    skills: ["React", "UX Research", "Pedagogía"],
    isVerified: true
  },
  {
    id: "v2",
    title: "Dashboard de Monitoreo Ambiental IoT",
    role: "Data Analyst",
    description: "Creación de ETL y visualización de datos usando Python y SQL.",
    skills: ["Python", "SQL", "Data Science"],
    isVerified: true
  }
];

const INITIAL_MANUAL: Project[] = [
  {
    id: "m1",
    title: "Clon de Netflix (Proyecto Personal)",
    role: "Full-Stack Developer",
    description: "Implementación de clon responsivo con Next.js, Tailwind y Stripe.",
    skills: ["Next.js", "Tailwind", "Stripe"],
    url: "github.com/ana-lopez/netflix-clone",
    isVerified: false
  }
];

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState("portafolio");
  const [isSaving, setIsSaving] = useState(false);
  const [manualProjects, setManualProjects] = useState<Project[]>(INITIAL_MANUAL);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSkills, setNewSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Perfil actualizado correctamente");
    }, 1000);
  };

  const handleDeleteManual = (id: string) => {
    setManualProjects(prev => prev.filter(p => p.id !== id));
    toast.error("Proyecto eliminado del portafolio");
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      if (!newSkills.includes(skillInput.trim())) {
        setNewSkills([...newSkills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setNewSkills(prev => prev.filter(s => s !== skill));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      const newProj: Project = {
        id: `m${Date.now()}`,
        title: newTitle,
        role: newRole,
        description: newDesc,
        url: newUrl,
        skills: newSkills,
        isVerified: false
      };
      setManualProjects([newProj, ...manualProjects]);
      setIsSaving(false);
      setIsModalOpen(false);
      // Reset form
      setNewTitle(""); setNewRole(""); setNewDesc(""); setNewUrl(""); setNewSkills([]);
      toast.success("Proyecto añadido exitosamente");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-600/20 pb-20">
      <TopBar />
      
      <main className="max-w-6xl mx-auto px-6 py-10 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navegación */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "personal" 
                ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
            }`}
          >
            <User className="h-4 w-4" /> Información Personal
          </button>
          <button 
            onClick={() => setActiveTab("portafolio")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "portafolio" 
                ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
            }`}
          >
            <Briefcase className="h-4 w-4" /> Portafolio Híbrido
          </button>
          <button 
            onClick={() => setActiveTab("preferencias")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "preferencias" 
                ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
            }`}
          >
            <Settings className="h-4 w-4" /> Preferencias de Match
          </button>
        </aside>

        {/* Cuerpos de Pestañas */}
        <div className="flex-1">
          
          {/* TAB 1: Información Personal */}
          {activeTab === "personal" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">Tu Perfil Público</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group cursor-pointer h-24 w-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors overflow-hidden">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=AnaLopez" alt="Avatar" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                    <UploadCloud className="absolute text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-900">Foto de Perfil</h3>
                     <p className="text-xs text-slate-500 mt-1">Sube una imagen profesional en formato JPG o PNG. Tamaño máximo 2MB.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Titular / Bio Corta</label>
                    <input type="text" defaultValue="Desarrolladora Frontend MERN | Apasionada por EdTech" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 flex items-center gap-2"><Linkedin className="h-3 w-3" /> Linkedin</label>
                      <input type="url" placeholder="https://linkedin.com/in/..." className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 flex items-center gap-2"><Github className="h-3 w-3" /> GitHub</label>
                      <input type="url" placeholder="https://github.com/..." className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-slate-900 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center min-w-[150px]"
                  >
                    {isSaving ? <div className="h-4 w-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" /> : "Guardar Cambios"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Portafolio Híbrido */}
          {activeTab === "portafolio" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Portafolio Híbrido</h2>
                  <p className="text-sm text-slate-500 mt-1">Este es tu Proof-of-Work. Combina insignias universitarias con proyectos propios.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Añadir Proyecto
                </button>
              </div>

              {/* Bloque A: Autenticado */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="h-4 w-4 text-emerald-500" /> Credenciales Verificadas Institucionalmente
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                   {INITIAL_VERIFIED.map(proj => (
                      <div key={proj.id} className="relative bg-blue-50/50 border border-blue-100 rounded-xl p-6 shadow-sm group">
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-blue-100 shadow-sm cursor-help hover:border-blue-300 transition-colors" title="Este registro es inmutable y fue firmado criptográficamente por la institución">
                           <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                           <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Validado por la U</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 mb-1 pr-32">{proj.title}</h4>
                        <p className="text-xs font-bold text-blue-800 mb-3">{proj.role}</p>
                        <p className="text-sm text-slate-600 mb-4 max-w-2xl">{proj.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {proj.skills.map(s => (
                            <span key={s} className="bg-white border border-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                   ))}
                 </div>
              </div>

              {/* Bloque B: Manual */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <User className="h-4 w-4 text-slate-400" /> Experiencia Externa / Proyectos Propios
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                   <AnimatePresence>
                     {manualProjects.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-sm">
                          Aún no has añadido proyectos auto-reportados.
                        </motion.div>
                     )}
                     {manualProjects.map(proj => (
                        <motion.div 
                          key={proj.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm group hover:border-slate-300 transition-colors"
                        >
                          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="h-8 w-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                               <Edit2 className="h-3.5 w-3.5" />
                             </button>
                             <button 
                               onClick={() => handleDeleteManual(proj.id)}
                               className="h-8 w-8 rounded bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                             >
                               <Trash2 className="h-3.5 w-3.5" />
                             </button>
                          </div>
                          
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                             <User className="h-3 w-3" /> Auto-reportado
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 mb-1 pr-24">{proj.title}</h4>
                          <p className="text-xs font-bold text-slate-700 mb-3">{proj.role}</p>
                          <p className="text-sm text-slate-600 mb-4 max-w-2xl">{proj.description}</p>
                          
                          {proj.url && (
                             <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline mb-4">
                               {proj.url}
                             </a>
                          )}
                          
                          <div className="flex flex-wrap gap-2">
                            {proj.skills.map(s => (
                              <span key={s} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                     ))}
                   </AnimatePresence>
                 </div>
              </div>

            </motion.div>
          )}

        </div>
      </main>

      {/* MODAL PARA PROYECTO EXTERNO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSaving && setIsModalOpen(false)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-full"
            >
               <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                 <h3 className="text-lg font-extrabold text-slate-900">Añadir Proyecto Externo</h3>
                 <button onClick={() => !isSaving && setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X className="h-5 w-5" /></button>
               </div>
               
               <div className="p-6 overflow-y-auto space-y-5 flex-1">
                 
                 <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Título del Proyecto</label>
                   <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Ej: App de Delivery" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 outline-none" required />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Rol Principal</label>
                      <input type="text" value={newRole} onChange={e=>setNewRole(e.target.value)} placeholder="Ej: Backend Developer" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">URL (Opcional)</label>
                      <input type="url" value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="github.com/... o sitio web" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 outline-none" />
                    </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Descripción y Logros</label>
                   <textarea rows={3} value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="¿Qué construiste y qué impacto tuvo?" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 outline-none resize-none" required />
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Habilidades Aplicadas (Presiona Enter)</label>
                   <input 
                     type="text" 
                     value={skillInput} 
                     onChange={e=>setSkillInput(e.target.value)} 
                     onKeyDown={handleAddSkill}
                     placeholder="Ej: TypeScript" 
                     className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 outline-none mb-2" 
                    />
                    <div className="flex flex-wrap gap-2">
                       {newSkills.map(s => (
                         <div key={s} className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 group">
                           {s}
                           <button onClick={() => removeSkill(s)} type="button" className="text-slate-400 hover:text-red-500 p-0.5"><X className="h-3 w-3" /></button>
                         </div>
                       ))}
                    </div>
                 </div>

               </div>

               <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
                  <button 
                    onClick={handleAddProject}
                    disabled={isSaving || !newTitle || !newRole || !newDesc}
                    className="bg-blue-600 text-white px-5 py-2 text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Guardando...</> : "Publicar Proyecto"}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
