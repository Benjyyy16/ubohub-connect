import { useState, useEffect } from "react";
import {
  X, Sparkles, CheckCircle2, ChevronRight, ChevronLeft,
  User, GraduationCap, Loader2, Users, Eye, Send, Rocket
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SKILLS_OPTIONS = [
  "React", "Python", "Node.js", "SQL", "Figma", "UX Research",
  "Análisis de Datos", "Machine Learning", "Diseño UX", "Didáctica",
  "Evaluación", "Gestión de Proyectos",
];

const INTERESTS_OPTIONS = [
  "Educación", "Impacto Social", "IA", "Sustentabilidad",
  "Salud", "EdTech", "Inclusión", "IoT", "Datos Abiertos",
  "Innovación Social",
];

const FACULTIES = [
  "Ingeniería", "Educación", "Diseño", "Ciencias", "Humanidades",
  "Salud", "Negocios",
];

interface Candidate {
  id: number;
  name: string;
  career: string;
  match: number;
  highlight: string;
  skills: string[];
  interests: string[];
  invited: boolean;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1, name: "Ana López", career: "Ing. Informática", match: 98,
    highlight: "'React' y 'Educación'",
    skills: ["React", "Python", "SQL"],
    interests: ["Educación", "EdTech", "Impacto Social"],
    invited: false,
  },
  {
    id: 2, name: "Carlos Mendoza", career: "Pedagogía", match: 92,
    highlight: "'Impacto Social'",
    skills: ["Didáctica", "Evaluación", "Gestión de Proyectos"],
    interests: ["Impacto Social", "Educación", "Inclusión"],
    invited: false,
  },
  {
    id: 3, name: "Sofía Reyes", career: "Diseño Gráfico", match: 88,
    highlight: "'Diseño UX'",
    skills: ["Figma", "UX Research", "Diseño UX"],
    interests: ["Educación", "Inclusión", "Innovación Social"],
    invited: false,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const TogglePill = ({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
      selected
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary-light"
    }`}
  >
    {label}
  </button>
);

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
          i < current ? "bg-success text-success-foreground" :
          i === current ? "bg-primary text-primary-foreground" :
          "bg-muted text-muted-foreground"
        }`}>
          {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
        </div>
        {i < total - 1 && (
          <div className={`h-0.5 w-8 rounded-full transition-all duration-300 ${
            i < current ? "bg-success" : "bg-border"
          }`} />
        )}
      </div>
    ))}
  </div>
);

const NewInitiativePanel = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(0);
        setTitle("");
        setFaculty("");
        setSelectedSkills([]);
        setSelectedInterests([]);
        setLoading(false);
        setCandidates([]);
      }, 300);
    }
  }, [open]);

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleSearch = () => {
    setLoading(true);
    setStep(1);
    setTimeout(() => {
      setCandidates(MOCK_CANDIDATES.map(c => ({ ...c, invited: false })));
      setLoading(false);
    }, 1800);
  };

  const handleInvite = (id: number) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, invited: true } : c));
  };

  const handlePublish = () => {
    onClose();
  };

  const isFormValid = title.trim() && faculty && selectedSkills.length > 0 && selectedInterests.length > 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-4">
            <Rocket className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-foreground">Nueva Iniciativa</h2>
              <p className="text-xs text-muted-foreground">
                {step === 0 && "Define tu proyecto"}
                {step === 1 && "Talento encontrado"}
                {step === 2 && "Confirmar y publicar"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StepIndicator current={step} total={3} />
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Step 0: Form */}
          <div className={`transition-all duration-300 ${step === 0 ? "opacity-100" : "hidden opacity-0"}`}>
            <div className="space-y-6 p-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Título del Proyecto</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej: Desarrollo de App para Inclusión Escolar"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Faculty */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Facultad de Origen</label>
                <select
                  value={faculty}
                  onChange={e => setFaculty(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Selecciona una facultad</option>
                  {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Habilidades Técnicas Requeridas
                </label>
                <p className="text-xs text-muted-foreground">Selecciona las competencias que necesita tu equipo</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_OPTIONS.map(s => (
                    <TogglePill
                      key={s}
                      label={s}
                      selected={selectedSkills.includes(s)}
                      onClick={() => toggleItem(s, selectedSkills, setSelectedSkills)}
                    />
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Áreas de Interés / Motivación
                </label>
                <p className="text-xs text-muted-foreground">¿Qué mueve a los candidatos ideales?</p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS_OPTIONS.map(i => (
                    <TogglePill
                      key={i}
                      label={i}
                      selected={selectedInterests.includes(i)}
                      onClick={() => toggleItem(i, selectedInterests, setSelectedInterests)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Results */}
          <div className={`transition-all duration-300 ${step === 1 ? "opacity-100" : "hidden opacity-0"}`}>
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24">
                <div className="relative">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-accent animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-foreground">Analizando perfiles interdisciplinarios en la red...</p>
                <p className="text-xs text-muted-foreground">Cruzando habilidades, intereses y disponibilidad</p>
                <Progress value={65} className="mt-2 h-1.5 w-48" />
              </div>
            ) : (
              <div className="space-y-5 p-6">
                {/* Success banner */}
                <div className="rounded-xl border border-success/20 bg-success-light p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-success" />
                    <p className="text-sm font-bold text-success">
                      ¡Encontramos 12 estudiantes ideales para tu iniciativa!
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Mostrando los 3 mejores candidatos interdisciplinarios</p>
                </div>

                {/* Candidates */}
                <div className="space-y-3">
                  {candidates.map(c => (
                    <div key={c.id} className={`rounded-xl border p-5 transition-all duration-300 ${
                      c.invited ? "border-success/30 bg-success-light/50" : "border-border bg-card shadow-sm hover:shadow-md"
                    }`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{c.name}</p>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <GraduationCap className="h-3 w-3" /> {c.career}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            c.match >= 95 ? "bg-success-light text-success" : c.match >= 90 ? "bg-primary-light text-primary" : "bg-accent-light text-accent"
                          }`}>
                            {c.match}% Match
                          </span>
                          <span className="text-[10px] text-muted-foreground">Coincide: {c.highlight}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.skills.map(s => (
                          <span key={s} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                            selectedSkills.includes(s) ? "bg-primary-light text-primary ring-1 ring-primary/20" : "bg-muted text-muted-foreground"
                          }`}>{s}</span>
                        ))}
                        {c.interests.map(i => (
                          <span key={i} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                            selectedInterests.includes(i) ? "bg-accent-light text-accent ring-1 ring-accent/20" : "bg-muted text-muted-foreground"
                          }`}>{i}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-2">
                        {c.invited ? (
                          <div className="flex items-center gap-2 text-sm font-medium text-success">
                            <CheckCircle2 className="h-4 w-4" />
                            Invitación enviada al portal del alumno
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleInvite(c.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                              <Send className="h-3 w-3" /> Invitar al Proyecto
                            </button>
                            <button className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted">
                              <Eye className="h-3 w-3" /> Ver Perfil
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Confirmation */}
          <div className={`transition-all duration-300 ${step === 2 ? "opacity-100" : "hidden opacity-0"}`}>
            <div className="flex flex-col items-center gap-6 p-8 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">¡Iniciativa lista para publicar!</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {candidates.filter(c => c.invited).length} estudiante(s) recibirán tu invitación al instante
                </p>
              </div>

              <div className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resumen</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proyecto</span>
                    <span className="font-medium text-foreground">{title || "Sin título"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Facultad</span>
                    <span className="font-medium text-foreground">{faculty || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Habilidades</span>
                    <span className="font-medium text-foreground">{selectedSkills.length} seleccionadas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invitaciones</span>
                    <span className="font-medium text-success">{candidates.filter(c => c.invited).length} enviadas</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2 text-xs text-primary">
                <Users className="h-4 w-4" />
                Tu equipo interdisciplinario se notificará automáticamente
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" /> Atrás
              </button>
            ) : <div />}

            {step === 0 && (
              <button
                onClick={handleSearch}
                disabled={!isFormValid}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Sparkles className="h-4 w-4" /> Buscar Talento (Smart Match)
              </button>
            )}
            {step === 1 && !loading && (
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:bg-primary/90"
              >
                Continuar <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === 2 && (
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 rounded-xl bg-success px-6 py-3 text-sm font-bold text-success-foreground shadow-md transition-all hover:shadow-lg hover:bg-success/90"
              >
                <Rocket className="h-4 w-4" /> Publicar Iniciativa y Volver al Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewInitiativePanel;
