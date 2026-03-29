import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network, BarChart3, ShieldCheck, User, BrainCircuit, Activity, 
  ArrowRight, AlertTriangle, ShieldAlert, Lock, Fingerprint, Banknote,
  Server, BadgeCheck, FileSignature, Sparkles, Binary
} from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";

type ViewType = 'algorithm' | 'intelligence' | 'verification';

export default function Showcase() {
  const [activeView, setActiveView] = useState<ViewType>('algorithm');
  const [isScanning, setIsScanning] = useState(false);

  // Re-trigger scan animation when entering verification tab
  useEffect(() => {
    if (activeView === 'verification') {
      setIsScanning(true);
      const t = setTimeout(() => setIsScanning(false), 2500);
      return () => clearTimeout(t);
    }
  }, [activeView]);

  return (
    <>
      <TopBar />
      <div className={`min-h-screen font-sans transition-colors duration-700 ease-in-out ${
        activeView === 'algorithm' ? 'bg-[#0A0A0A]' : 
        activeView === 'intelligence' ? 'bg-[#F8FAFC]' : 'bg-slate-100'
      }`}>
      {/* Dynamic Header & Navigation */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-500 backdrop-blur-md ${
        activeView === 'algorithm' ? 'border-[#262626] bg-[#0A0A0A]/80' : 'border-slate-200 bg-white/80'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Sparkles className={`h-6 w-6 ${activeView === 'algorithm' ? 'text-blue-500' : 'text-slate-900'}`} />
            <span className={`font-bold tracking-tight ${activeView === 'algorithm' ? 'text-white' : 'text-slate-900'}`}>
              Enterprise Showcase Hub
            </span>
          </div>

          <nav className="flex space-x-1 rounded-lg bg-slate-500/10 p-1">
            {[
              { id: 'algorithm', icon: Network, label: 'Match Explainability' },
              { id: 'intelligence', icon: BarChart3, label: 'Curriculum Intelligence' },
              { id: 'verification', icon: ShieldCheck, label: 'Zero-Trust Portal' }
            ].map((item) => {
              const isActive = activeView === item.id;
              const isDark = activeView === 'algorithm';
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as ViewType)}
                  className={`relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                    isActive 
                      ? (isDark ? 'text-white shadow-sm' : 'text-slate-900 shadow-sm')
                      : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="showcase-nav-active"
                      className={`absolute inset-0 rounded-md ${
                        activeView === 'algorithm' ? 'bg-[#1A1A1A] border border-[#333333]' : 'bg-white border border-slate-200'
                      }`}
                      style={{ originY: "0px" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <item.icon className={`relative z-10 h-4 w-4 ${isActive && activeView === 'algorithm' ? 'text-blue-500' : ''}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl p-8 overflow-hidden min-h-[calc(100vh-4rem)] relative flex items-center justify-center">
        <AnimatePresence mode="wait">

          {/* --- VISTA 1: ALGORITHM --- */}
          {activeView === 'algorithm' && (
            <motion.div 
              key="algo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex w-full flex-col lg:flex-row gap-12"
            >
              {/* Left: SVG Node Visualizer */}
              <div className="relative flex-1 rounded-2xl border border-[#262626] bg-[#111111] p-10 overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Flowing Lines SVG */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ opacity: 0.7 }}>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                      <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Base paths */}
                  <path d="M150,200 C250,200 350,100 450,100" fill="none" stroke="#262626" strokeWidth="2" />
                  <path d="M150,200 C250,200 350,300 450,300" fill="none" stroke="#262626" strokeWidth="2" />
                  <path d="M150,200 C300,200 300,200 450,200" fill="none" stroke="#262626" strokeWidth="2" />

                  {/* Animated glowing paths */}
                  <path d="M150,200 C250,200 350,100 450,100" fill="none" stroke="url(#grad1)" strokeWidth="3" filter="url(#glow)" strokeDasharray="100 200" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="300" to="-300" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M150,200 C300,200 300,200 450,200" fill="none" stroke="url(#grad1)" strokeWidth="4" filter="url(#glow)" strokeDasharray="150 150" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="300" to="-300" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M150,200 C250,200 350,300 450,300" fill="none" stroke="url(#grad1)" strokeWidth="3" filter="url(#glow)" strokeDasharray="80 220" strokeDashoffset="0">
                    <animate attributeName="stroke-dashoffset" from="300" to="-300" dur="4s" repeatCount="indefinite" />
                  </path>
                </svg>

                {/* Nodes UI */}
                <div className="absolute left-8 flex flex-col items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-900/40 border border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.4)] relative z-10">
                    <User className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-xs font-bold text-white tracking-widest">ALUMNO_01</p>
                    <p className="text-[10px] text-slate-500">Ana L. (Dataset)</p>
                  </div>
                </div>

                <div className="absolute right-8 flex flex-col items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-900/40 border border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.4)] relative z-10">
                    <BrainCircuit className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-xs font-bold text-white tracking-widest">PROYECTO_IA</p>
                    <p className="text-[10px] text-slate-500">IA Médica (Target)</p>
                  </div>
                </div>

                <div className="absolute top-8 rounded-full border border-[#333333] bg-[#111111]/80 px-4 py-1.5 backdrop-blur-md">
                   <p className="text-xs font-semibold tracking-widest text-[#00E5FF] flex items-center gap-2">
                     <Activity className="h-3 w-3" /> NEURAL MATCH ENGINE
                   </p>
                </div>
              </div>

              {/* Right: Math Breakdown */}
              <div className="lg:w-[400px] shrink-0 rounded-2xl border border-[#262626] bg-[#111111] p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white m-0">98% Compatible</h2>
                  <p className="mt-2 text-sm text-slate-400">Desglose paramétrico de las similitudes latentes detectadas por el algoritmo.</p>
                  
                  <div className="mt-8 space-y-5 font-mono text-xs">
                    <div className="group border-l-2 border-[#333333] pl-4 transition-colors hover:border-blue-500">
                      <p className="text-slate-500 uppercase tracking-widest">Vector Sociocultural</p>
                      <div className="flex justify-between items-end mt-1 text-slate-200">
                        <span className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Alineación Intereses:</span>
                        <span className="font-bold text-emerald-400">+40.2%</span>
                      </div>
                    </div>

                    <div className="group border-l-2 border-[#333333] pl-4 transition-colors hover:border-blue-500">
                      <p className="text-slate-500 uppercase tracking-widest">Auditoría de Skills</p>
                      <div className="flex justify-between items-end mt-1 text-slate-200">
                        <span className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Stack Python/React:</span>
                        <span className="font-bold text-emerald-400">+35.5%</span>
                      </div>
                    </div>

                    <div className="group border-l-2 border-[#333333] pl-4 transition-colors hover:border-blue-500">
                      <p className="text-slate-500 uppercase tracking-widest">Metadatos de Tiempo</p>
                      <div className="flex justify-between items-end mt-1 text-slate-200">
                        <span className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Disponibilidad 120 hrs:</span>
                        <span className="font-bold text-emerald-400">+23.1%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#262626]">
                   <div className="flex items-center gap-2 font-mono text-xs text-slate-500 break-all">
                     <Binary className="h-4 w-4 shrink-0 text-indigo-500" />
                     <span className="opacity-50">hash: 0x8f3c...b29a</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- VISTA 2: INTELLIGENCE --- */}
          {activeView === 'intelligence' && (
            <motion.div 
              key="intel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex w-full flex-col lg:flex-row gap-8"
            >
              {/* Left: Bar Chart Simulator */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Brecha Curricular (Oferta vs Demanda)</h2>
                  <p className="mt-1 text-sm text-slate-500">Inteligencia generada desde búsquedas activas de reclutadores vs estudiantes titulables este semestre.</p>
                </div>

                <div className="space-y-6">
                  {/* Item 1 */}
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span className="text-slate-700">Análisis de Datos Avanzado</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Demanda</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 1 }} className="absolute h-full bg-slate-400 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-white drop-shadow-md">500 empresas buscando</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Oferta</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} transition={{ duration: 1, delay: 0.2 }} className="absolute h-full bg-blue-600 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-slate-900 drop-shadow-md">+12 Alumnos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span className="text-slate-700">Diseño UX/UI y Accesibilidad</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Demanda</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1, delay: 0.1 }} className="absolute h-full bg-slate-400 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-white drop-shadow-md">350 empresas buscando</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Oferta</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.3 }} className="absolute h-full bg-blue-600 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-white drop-shadow-md">+420 Alumnos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span className="text-slate-700">Ciberseguridad & Cloud</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Demanda</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.2 }} className="absolute h-full bg-slate-400 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-white drop-shadow-md">280 empresas buscando</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-right text-xs text-slate-500 font-medium">Oferta</span>
                        <div className="h-5 flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center relative">
                          <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.4 }} className="absolute h-full bg-blue-600 rounded-sm" />
                          <span className="relative z-10 ml-2 text-[10px] font-bold text-slate-900 drop-shadow-md">+8 Alumnos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Insights */}
              <div className="lg:w-[380px] shrink-0 space-y-4">
                <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm ring-1 ring-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-orange-900">Brecha Crítica Detectada</h3>
                  </div>
                  <p className="mt-4 text-sm font-medium text-orange-800 leading-relaxed">
                    Las empresas del portal están buscando <span className="font-bold underline">"Análisis de Datos"</span> un 75% más que el semestre pasado, pero solo 12 alumnos de la Facultad de Negocios cumplen los requisitos prácticos.
                  </p>
                  <button className="mt-5 w-full rounded-lg bg-orange-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition-colors">
                    Generar Reporte para Rectoría
                  </button>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm ring-1 ring-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-emerald-900">Oportunidad de Sinergia</h3>
                  </div>
                  <p className="mt-3 text-sm font-medium text-emerald-800 leading-relaxed">
                    Hay un sobre-stock de talento UX/UI. Sugerimos abrir proyectos cruzados para que apoyen a la Facultad de Ciencias en sus interfaces.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- VISTA 3: VERIFICATION (BLOCKCHAIN UI) --- */}
          {activeView === 'verification' && (
            <motion.div 
              key="verif"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex w-full items-center justify-center"
            >
              <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-300 xl:scale-110">
                {/* Laser scan animation */}
                {isScanning && (
                   <motion.div 
                     initial={{ top: '-10%' }}
                     animate={{ top: '110%' }}
                     transition={{ duration: 2, ease: "linear" }}
                     className="absolute left-0 right-0 z-50 h-32 bg-gradient-to-b from-transparent to-emerald-400/20 border-b-2 border-emerald-400 shadow-[0_5px_30px_rgba(52,211,153,0.4)]"
                   />
                )}

                {/* Secure Banner */}
                <div className="flex items-center justify-between bg-emerald-600 px-8 py-4">
                  <div className="flex items-center gap-3">
                    <Lock className={`h-5 w-5 text-white ${isScanning ? 'animate-pulse' : ''}`} />
                    <span className="font-bold tracking-widest text-white uppercase text-sm">
                      Documento Criptográficamente Auténtico
                    </span>
                  </div>
                  <div className="rounded-full bg-emerald-500/50 px-3 py-1 text-[10px] font-bold text-white border border-emerald-400">
                    NETWORK ESTABLE
                  </div>
                </div>

                <div className="p-10 pb-12">
                  <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 border border-slate-200">
                      <BadgeCheck className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Experto en Datos SQL</h2>
                    <p className="mt-2 text-sm font-semibold text-slate-500">Emitido a favor de Carlos Peña · ID: TALENT-992A4B</p>
                  </div>

                  {/* Audit Trail Timeline */}
                  <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pl-8 mt-12">
                    {/* Item 1 */}
                    <div className="relative">
                      <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-white border-2 border-emerald-500">
                         <Fingerprint className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-xs font-bold text-emerald-600 mb-1">✓ 12/03/2026 14:32 GMT-3</p>
                      <h4 className="text-base font-bold text-slate-900">Identidad Verificada</h4>
                      <p className="mt-1 text-sm text-slate-500">Verificación biométrica y contraste con bases ministeriales completado exitosamente.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white border-2 border-blue-500">
                         <FileSignature className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-xs font-bold text-blue-600 mb-1">✓ 15/04/2026 09:15 GMT-3</p>
                      <h4 className="text-base font-bold text-slate-900">Aprobación Institucional</h4>
                      <p className="mt-1 text-sm text-slate-500">Aprobación por Dra. Carmen López. Liberación total de 120 horas prácticas obligatorias.</p>
                      <div className="mt-3 flex items-center gap-2 rounded-md bg-slate-50 p-2 font-mono text-[10px] font-medium text-slate-400 w-fit border border-slate-200">
                        <span className="text-blue-500">Firma Hash:</span> 0x9a8b4f2c...7d1e
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 ring-4 ring-white border-2 border-slate-700">
                         <Server className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-xs font-bold text-slate-900 mb-1">✓ 20/05/2026 18:00 GMT-3</p>
                      <h4 className="text-base font-bold text-slate-900">Insignia Acuñada / Emitida</h4>
                      <p className="mt-1 text-sm text-slate-500">Registro sellado en el servidor "TalentLink B2B Network" e inyectado al perfil público del egresado.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
    </>
  );
}
