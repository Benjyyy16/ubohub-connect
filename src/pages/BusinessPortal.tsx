import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Lock, CheckCircle2, SlidersHorizontal, ChevronDown,
  ExternalLink, Building2, User, Award, Shield, Briefcase
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import TopBar from "@/components/dashboard/TopBar";
import { toast } from "sonner";

interface Candidate {
  id: string;
  name: string;
  career: string;
  matchScore: number;
  totalHours: number;
  readyToGraduate: boolean;
  topBadges: {
    title: string;
    project: string;
    description: string;
  }[];
}

const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Ana L.",
    career: "Ingeniería Informática",
    matchScore: 98,
    totalHours: 320,
    readyToGraduate: true,
    topBadges: [
      { title: "Arquitectura AWS", project: "Migración a la nube B2B", description: "Diseñó y desplegó una arquitectura serverless que redujo costos AWS." },
      { title: "Node.js Experto", project: "API Gateway Financiero", description: "Implementó un middleware para enrutamiento seguro." },
      { title: "Líder Técnico", project: "Sistema de Salud Estudiantil", description: "Lideró un equipo interdisciplinario de 5 personas." }
    ]
  },
  {
    id: "c2",
    name: "Carlos M.",
    career: "Ciencia de Datos",
    matchScore: 94,
    totalHours: 210,
    readyToGraduate: false,
    topBadges: [
      { title: "Python Básico", project: "Análisis Clínico", description: "Modelos predictivos iniciales." },
      { title: "Limpieza de Datos SQL", project: "Optimización de Inventario", description: "Gestión de bases de ERP masivos." }
    ]
  },
  {
    id: "c3",
    name: "Diego R.",
    career: "Diseño UX/UI",
    matchScore: 88,
    totalHours: 450,
    readyToGraduate: true,
    topBadges: [
      { title: "Sistemas de Diseño", project: "Rediseño Portal Banco", description: "Creación completa de UI Kit." },
      { title: "Investigación UX", project: "App de Movilidad", description: "Pruebas con 100+ usuarios." }
    ]
  },
  {
    id: "c4",
    name: "Valentina G.",
    career: "Ingeniería de Software",
    matchScore: 82,
    totalHours: 150,
    readyToGraduate: false,
    topBadges: [
      { title: "React Frontend", project: "CRM Interno Universitario", description: "Desarrollo de SPA." }
    ]
  }
];

export default function BusinessPortal() {
  const [minHours, setMinHours] = useState([0]);
  const [onlyGraduating, setOnlyGraduating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSimulating, setIsSimulating] = useState<string | null>(null);

  const simulateAction = (id: string, message: string) => {
    setIsSimulating(id);
    setTimeout(() => {
      setIsSimulating(null);
      toast.success(message);
    }, 1200);
  };

  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter(c => {
      if (c.totalHours < minHours[0]) return false;
      if (onlyGraduating && !c.readyToGraduate) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const inName = c.name.toLowerCase().includes(query);
        const inCareer = c.career.toLowerCase().includes(query);
        const inBadges = c.topBadges.some(b => b.title.toLowerCase().includes(query));
        if (!inName && !inCareer && !inBadges) return false;
      }
      return true;
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [minHours, onlyGraduating, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-[#00FF66]/30 selection:text-[#00FF66]">
      <TopBar />
      {/* Navbar Corporativo */}
      <header className="flex w-full flex-col justify-center border-b border-[#262626] bg-[#0A0A0A]/80 px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00FF66]/10">
              <Building2 className="h-5 w-5 text-[#00FF66]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">TalentLink <span className="text-[#00FF66]">Business</span></span>
          </div>

          <div className="flex-1 px-12">
            <div className="group relative mx-auto max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#00FF66]" />
              <input
                type="text"
                placeholder="Buscar por habilidad verificada, insignia o carrera... (Ej. ⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#262626] bg-[#111111] py-2 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#00FF66]/50 focus:ring-1 focus:ring-[#00FF66]/50"
              />
              <div className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
                <kbd className="rounded border border-[#262626] bg-[#0A0A0A] px-1.5 py-0.5 text-[10px] font-medium text-slate-500">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white">Acme Corp</span>
              <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-[#00FF66]">
                <Lock className="h-3 w-3" /> 5 Contactos Restantes
              </span>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#262626] bg-[#111111]">
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-screen-2xl items-start gap-8 p-8">
        {/* Sidebar Filters */}
        <aside className="sticky top-24 w-72 shrink-0 space-y-8 rounded-2xl border border-[#262626] bg-[#111111] p-6 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-4">
            <SlidersHorizontal className="h-4 w-4 text-[#00FF66]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Filtros Avanzados</h2>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Insignias Requeridas</label>
              <button
                onClick={() => simulateAction('filter', 'Filtro de insignias actualizado')}
                disabled={isSimulating === 'filter'}
                className="mt-2 flex w-full items-center justify-between rounded-lg border border-[#262626] bg-[#0A0A0A] px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-700 disabled:opacity-50"
              >
                {isSimulating === 'filter' ? 'Aplicando...' : 'Seleccionar Insignias'} <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            <div className="pt-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Horas Validadas Min.</label>
                <span className="font-mono text-xs font-bold text-[#00FF66]">+{minHours[0]}h</span>
              </div>
              <div className="mt-4 px-1 pb-2">
                 <Slider
                  value={minHours}
                  onValueChange={setMinHours}
                  max={500}
                  step={10}
                  className="[&_[role=slider]]:bg-[#00FF66] [&_[role=slider]]:border-[#00FF66] [&_.bg-primary]:bg-[#00FF66] [&_.bg-secondary]:bg-[#262626]"
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Listo para Egresar</label>
              <Switch
                checked={onlyGraduating}
                onCheckedChange={setOnlyGraduating}
                className="data-[state=checked]:bg-[#00FF66] data-[state=unchecked]:bg-[#262626] [&_span]:shadow-md"
              />
            </div>
          </div>
        </aside>

        {/* Results Grid View */}
        <section className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Viendo {filteredCandidates.length} Talentos Verificados
            </h1>
            <button
              onClick={() => simulateAction('sort', 'Ordenamiento aplicado')}
              disabled={isSimulating === 'sort'}
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
               Ordenar por: Match Score <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredCandidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 260, damping: 20 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#262626] bg-[#111111] transition-all hover:border-[#333333] hover:shadow-2xl hover:shadow-[#00FF66]/5"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#00FF66] transition-colors">{candidate.name}</h3>
                        <p className="mt-0.5 text-xs font-medium text-slate-400">{candidate.career}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1 rounded-full bg-[#00FF66]/10 px-2 py-0.5 text-xs font-bold text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.15)] ring-1 ring-[#00FF66]/20">
                           {candidate.matchScore}% Match
                        </span>
                        <span className="mt-1 font-mono text-[10px] text-slate-500 uppercase flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-[#00FF66]/50" /> {candidate.totalHours} hrs reales
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#262626] group-hover:text-slate-500 transition-colors">Insignias Destacadas (Proof of Work)</p>
                      <div className="space-y-2">
                        {candidate.topBadges.slice(0,3).map((badge, idx) => (
                           <TooltipProvider key={idx} delayDuration={150}>
                             <Tooltip>
                               <TooltipTrigger asChild>
                                  <div className="flex cursor-help items-center gap-3 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] p-2.5 transition-colors hover:border-[#00FF66]/30 hover:bg-[#111111]">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#262626] to-[#111111] border border-[#333333]">
                                      <Award className="h-4 w-4 text-[#00FF66]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-xs font-bold text-slate-200">{badge.title}</p>
                                      <p className="truncate text-[10px] text-slate-500">{badge.project}</p>
                                    </div>
                                  </div>
                               </TooltipTrigger>
                               <TooltipContent
                                  side="right"
                                  align="center"
                                  sideOffset={15}
                                  className="max-w-[250px] border-[#262626] bg-[#111111] p-4 shadow-xl"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-4 w-4 text-[#00FF66]" />
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">Verificado</span>
                                  </div>
                                  <p className="text-sm font-semibold text-white">{badge.project}</p>
                                  <p className="mt-1 text-xs text-slate-400">{badge.description}</p>
                               </TooltipContent>
                             </Tooltip>
                           </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-[#1A1A1A] bg-[#0A0A0A] p-4 group-hover:bg-[#111111] transition-colors">
                     <button
                       onClick={() => toast.info(`Abriendo portafolio de ${candidate.name}`)}
                       className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                     >
                       <ExternalLink className="h-3.5 w-3.5" /> 3 Proyectos
                     </button>
                     <button
                       onClick={() => simulateAction(`contact-${candidate.id}`, `Mensaje enviado a ${candidate.name}`)}
                       disabled={isSimulating === `contact-${candidate.id}`}
                       className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] disabled:opacity-50 disabled:hover:scale-100"
                     >
                       <Briefcase className="h-3.5 w-3.5" />
                       {isSimulating === `contact-${candidate.id}` ? 'Enviando...' : 'Contactar'}
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
