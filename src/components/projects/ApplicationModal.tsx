import { useState } from "react";
import { ArrowRight, CheckCircle2, Send, X } from "lucide-react";
import { toast } from "sonner";
import { UboProject } from "@/data/ubohub";

interface ApplicationModalProps {
  project: UboProject | null;
  open: boolean;
  onClose: () => void;
  onSubmitted?: (projectId: string) => void;
}

export default function ApplicationModal({ project, open, onClose, onSubmitted }: ApplicationModalProps) {
  const [note, setNote] = useState("");

  if (!open || !project) return null;

  const handleSubmit = () => {
    onSubmitted?.(project.id);
    toast.success(`Postulación enviada a "${project.title}"`);
    setNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-xl">
      <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_30px_120px_-45px_rgba(30,79,149,0.7)] backdrop-blur-2xl">
        <div className="bg-gradient-to-br from-primary/15 via-sky-100/60 to-accent/15 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Compatibilidad {project.matchScore}%
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Postular a este proyecto</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{project.title}</p>
            </div>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-500 hover:bg-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-3xl border border-white/80 bg-white/70 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Resumen</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              {project.professorName} · {project.faculty} · {project.modality} · {project.availableSlots} cupos
            </p>
          </div>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Nota breve opcional</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Cuéntale al académico por qué te interesa participar..."
              className="mt-2 min-h-28 w-full resize-none rounded-3xl border border-white/80 bg-white/80 p-4 text-sm font-medium text-slate-800 outline-none ring-primary/20 transition focus:ring-4"
            />
          </label>
          <button
            onClick={handleSubmit}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Enviar postulación
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
