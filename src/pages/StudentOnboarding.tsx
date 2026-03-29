import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Cpu, Briefcase, Palette, 
  BookOpen, Rocket, Check, Plus, X, ScanFace, ScanLine
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FACULTIES = [
  { id: "tech", label: "Ingeniería & Tecnología", icon: Cpu },
  { id: "business", label: "Negocios & Economía", icon: Briefcase },
  { id: "arts", label: "Diseño & Artes", icon: Palette },
  { id: "science", label: "Educación & Sociales", icon: BookOpen },
];

const INTERESTS = [
  "Inteligencia Artificial", "Sustentabilidad", "Impacto Social", 
  "Finanzas Personales", "EdTech", "Accesibilidad", 
  "Análisis de Datos", "Diseño UX/UI", "Robótica",
  "Salud Mental", "Ciberseguridad", "Emprendimiento"
];

const DETECTED_SKILLS = [
  "Python (Nivel Básico)",
  "Estadística Descriptiva",
  "Metodologías Ágiles",
  "Gestión de Proyectos"
];

export default function StudentOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>(DETECTED_SKILLS);
  const [newSkill, setNewSkill] = useState("");

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleFacultySelect = (id: string) => {
    setFaculty(id);
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const goToKyc = () => {
    setStep(5);
    // Auto-advance TUI Scan after 3 seconds
    setTimeout(() => {
       setStep(6);
       // Auto-advance Face Scan after 3.5 seconds
       setTimeout(() => {
          setStep(7); // Final Check
          setTimeout(() => {
             navigate('/dashboard');
          }, 1500);
       }, 3500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-600/20">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: "20%" }}
          animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Nav */}
      <div className="pt-8 px-8 sm:px-12 flex items-center justify-between">
        <AnimatePresence>
          {step > 1 && step < 5 && (
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={prevStep}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Atrás
            </motion.button>
          )}
        </AnimatePresence>
        {/* Placeholder logic right alignment if no back button to keep layout absolute or flex-end */}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center w-full"
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Hola, Tomás. <br className="hidden sm:block" />
                <span className="text-blue-600">Construyamos tu futuro.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10">
                En menos de 2 minutos, configuraremos tu perfil para conectarte con proyectos universitarios que realmente te apasionen.
              </p>
              <button 
                onClick={nextStep}
                className="group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 transition-all active:scale-95"
              >
                Comenzar
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: FACULTY */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">¿A qué facultad perteneces?</h2>
              <p className="text-slate-500 mb-8">Esto nos ayuda a buscar bases de conocimiento similares.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FACULTIES.map((fac) => {
                  const isSelected = faculty === fac.id;
                  const Icon = fac.icon;
                  return (
                    <button
                      key={fac.id}
                      onClick={() => handleFacultySelect(fac.id)}
                      className={`relative flex items-center p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-600/5' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`flex items-center justify-center h-12 w-12 rounded-xl mr-4 transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`text-lg font-bold ${
                        isSelected ? 'text-blue-900' : 'text-slate-700'
                      }`}>
                        {fac.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: INTERESTS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Más allá de tus notas, ¿qué temas te apasionan?</h2>
              <p className="text-slate-500 mb-8">Elige al menos 1 tema para alimentar el Smart Match.</p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {INTERESTS.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <motion.button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      whileTap={{ scale: 0.95 }}
                      animate={{ scale: isSelected ? 1.05 : 1 }}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors border-2 ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {interest}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  disabled={interests.length === 0}
                  onClick={nextStep}
                  className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SKILLS */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Hemos detectado estas habilidades en tu currícula</h2>
              <p className="text-slate-500 mb-8">Modifícalas si es necesario, o agrega atributos extrajudiciales tuyos.</p>
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 mb-8 overflow-hidden">
                <ul className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {skills.map(skill => (
                      <motion.li 
                        key={skill}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between px-4 py-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 rounded bg-blue-50 border border-blue-200 flex items-center justify-center">
                            <Check className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="font-semibold text-slate-700">{skill}</span>
                        </div>
                        <button 
                          onClick={() => removeSkill(skill)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <form onSubmit={addSkill} className="border-t border-slate-100 px-4 py-3 flex gap-2">
                  <input 
                    type="text" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Agregar otra habilidad..."
                    className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400 text-slate-900" 
                  />
                  {newSkill.trim() && (
                    <button type="submit" className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </form>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={goToKyc}
                  className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  Continuar a Verificación de Identidad
                  <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: KYC ID SCAN */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><ScanLine className="h-6 w-6 text-blue-500" /> Verificación Institucional</h2>
              <p className="text-slate-400 mb-12 max-w-sm">Enfoca la parte frontal de tu Carnet de Identidad (TUI) dentro del recuadro.</p>
              
              <div className="relative w-80 h-52 rounded-xl border-2 border-white/20 bg-black/50 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] flex items-center justify-center">
                 <div className="absolute inset-x-8 inset-y-6 border border-dashed border-white/40 rounded-lg"></div>
                 {/* Laser Scanner */}
                 <motion.div 
                   className="absolute left-4 right-4 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"
                   animate={{ top: ["10%", "90%", "10%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 />
                 <span className="text-white/20 font-bold tracking-widest uppercase text-sm">Escaneando Documento...</span>
              </div>
            </motion.div>
          )}

          {/* STEP 6: KYC LIVENESS (FACE) */}
          {step === 6 && (
            <motion.div 
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><ScanFace className="h-6 w-6 text-emerald-500" /> Prueba de Vida</h2>
              <p className="text-slate-400 mb-12 max-w-sm">Mueve tu rostro lentamente en círculos para comprobar que eres una persona real.</p>
              
              <div className="relative h-64 w-64 rounded-full border-4 border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                 <div className="h-40 w-32 bg-slate-700/50 rounded-full blur-md animate-pulse"></div>
                 <svg className="absolute inset-0 h-full w-full -rotate-90">
                   <motion.circle
                     cx="128"
                     cy="128"
                     r="124"
                     stroke="currentColor"
                     strokeWidth="8"
                     fill="transparent"
                     className="text-emerald-500"
                     initial={{ strokeDasharray: 780, strokeDashoffset: 780 }}
                     animate={{ strokeDashoffset: 0 }}
                     transition={{ duration: 3, ease: "linear" }}
                   />
                 </svg>
                 <span className="absolute text-emerald-500/80 font-bold tracking-widest text-xs uppercase animate-pulse">Procesando...</span>
              </div>
            </motion.div>
          )}

          {/* FINAL SUCCESS OVERLAY */}
          {step === 7 && (
            <motion.div 
              key="step7"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-50 bg-emerald-600 flex flex-col items-center justify-center p-6 text-center text-white"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="h-28 w-28 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-2xl mb-8"
              >
                <Check className="h-14 w-14" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-4xl font-extrabold tracking-tight mb-2"
              >
                Identidad y Alumno Verificados
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="text-emerald-100 font-medium"
              >
                Cargando tu Workspace protegido...
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
