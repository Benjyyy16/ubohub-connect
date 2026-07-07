import { useState, useEffect, useCallback, type SVGProps } from "react";
import {
  X, Award, FileCheck, CheckCircle2, Shield, FileText,
  Download, User, GraduationCap, Sparkles, Star, Cpu
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CertStudent {
  id: number;
  name: string;
  career: string;
  project: string;
  hours: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  student: CertStudent | null;
}

const PROCESSING_STEPS = [
  { icon: Cpu, text: "Analizando métricas del estudiante..." },
  { icon: Shield, text: "Acuñando Insignia Digital Verificada..." },
  { icon: FileSignatureIcon, text: "Firmando Resolución Oficial..." },
];

function FileSignatureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L18 5.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

const ConfettiParticle = ({ delay, left }: { delay: number; left: number }) => (
  <div
    className="absolute h-2 w-2 rounded-full"
    style={{
      left: `${left}%`,
      top: "-8px",
      background: `hsl(${Math.random() * 360}, 70%, 55%)`,
      animation: `confetti-fall 1.8s ease-out ${delay}s forwards`,
      opacity: 0,
    }}
  />
);

export default function ProjectClosureModal({ open, onClose, student }: Props) {
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    if (open && step === 'review') {
      const t = setTimeout(() => setProgressVal(100), 100);
      return () => clearTimeout(t);
    }
  }, [open, step]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep('review');
        setRating(0);
        setProcessingIdx(0);
        setShowConfetti(false);
        setProgressVal(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (step !== 'processing') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setProcessingIdx(1), 1000));
    timers.push(setTimeout(() => setProcessingIdx(2), 2500));
    timers.push(setTimeout(() => {
      setStep('success');
      setTimeout(() => setShowConfetti(true), 200);
    }, 4000));
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const handleApprove = () => {
    setStep('processing');
    setProcessingIdx(0);
  };

  const handleDownloadPDF = useCallback(async () => {
    if (!student) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
    const pageW = doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("RESOLUCIÓN DE LIBERACIÓN", pageW / 2, 40, { align: "center" });
    doc.text(student.name, 25, 60);
    doc.save(`TalentLink_${student.name.replace(/\s/g, "_")}.pdf`);
  }, [student]);

  if (!student) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translateY(300px) rotate(720deg) scale(0.3); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}>
        <div
          className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-500 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {showConfetti && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <ConfettiParticle key={i} delay={i * 0.05} left={2 + Math.random() * 96} />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>

          {/* STEP 1: REVIEW */}
          <div className={`transition-all duration-500 absolute w-full inset-0 ${step === 'review' ? 'opacity-100 visible relative' : 'opacity-0 invisible absolute'}`}>
             <div className="px-6 py-6 pb-2 border-b border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                    <p className="flex items-center gap-1 text-sm text-slate-500">
                      <GraduationCap className="h-4 w-4" /> {student.career}
                    </p>
                  </div>
               </div>
               <div className="mt-6 flex justify-between text-sm font-semibold text-slate-700">
                 <span>Progreso del Proyecto</span>
                 <span className="text-blue-600">{student.hours} / {student.hours} hrs</span>
               </div>
               <Progress value={progressVal} className="mt-2 h-2 w-full transition-all duration-1000 ease-out bg-slate-100" />
             </div>

             <div className="p-6 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                   <h3 className="font-bold text-slate-900">Feedback Engine</h3>
                   <p className="mt-1 text-xs text-slate-500">Evalúa el compromiso del estudiante. (Este dato es privado y calibra nuestro algoritmo de Smart Match).</p>
                   
                   <div className="mt-4 flex justify-center gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         key={star}
                         onMouseEnter={() => setHoverRating(star)}
                         onMouseLeave={() => setHoverRating(0)}
                         onClick={() => setRating(star)}
                         className="p-1 transition-transform hover:scale-110 focus:outline-none"
                       >
                         <Star 
                           className={`h-8 w-8 transition-colors ${
                             (hoverRating || rating) >= star 
                             ? 'fill-amber-400 text-amber-400' 
                             : 'fill-slate-200 text-slate-200'
                           }`} 
                         />
                       </button>
                     ))}
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50/50 p-4">
               <button
                 disabled={rating === 0}
                 onClick={handleApprove}
                 className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
               >
                 <FileCheck className="h-4 w-4" /> Confirmar y Proceder
               </button>
             </div>
          </div>

          {/* STEP 2: PROCESSING ANIMATION */}
          <div className={`transition-all duration-500 absolute w-full inset-0 bg-white flex flex-col items-center justify-center ${step === 'processing' ? 'opacity-100 visible relative' : 'opacity-0 invisible absolute scale-105'}`}>
             <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/20 animate-[spin_4s_linear_infinite]" />
                
                {PROCESSING_STEPS.map((ps, i) => (
                  <div
                    key={i}
                    className={`absolute flex transition-all duration-500 ${
                      processingIdx === i ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-600 text-white animate-[pulse-glow_2s_ease-in-out_infinite]">
                      <ps.icon className="h-10 w-10 animate-bounce" style={{ animationDuration: '2s' }} />
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 text-center min-h-[60px]">
               {PROCESSING_STEPS.map((ps, i) => (
                 <p
                   key={i}
                   className={`text-base font-bold text-slate-800 transition-all duration-500 absolute w-full left-0 ${
                     processingIdx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                   }`}
                 >
                   {ps.text}
                 </p>
               ))}
             </div>
             <p className="mt-1 text-xs text-slate-400">Automatización burocrática en proceso...</p>
          </div>

          {/* STEP 3: SUCCESS (GLASSMORPHISM) */}
          <div className={`transition-all duration-700 bg-slate-50 absolute w-full inset-0 flex flex-col ${step === 'success' ? 'opacity-100 visible relative scale-100' : 'opacity-0 invisible absolute scale-95'}`}>
             <div className="flex-1 p-8 text-center flex flex-col items-center justify-center">
               <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-3 mb-4">
                 <CheckCircle2 className="h-8 w-8 text-emerald-600" />
               </div>
               <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">¡Aprobado con Éxito!</h3>
               <p className="mt-2 text-sm text-slate-500 max-w-[280px]">El proceso ha finalizado. La documentación oficial se ha generado automáticamente.</p>

               <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                 {/* Card 1: Insignia Digital */}
                 <div className="flex flex-col items-center gap-3 rounded-2xl border border-white bg-white/60 p-5 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl">
                   <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/30">
                     <Award className="h-7 w-7 text-white" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">Insignia Digital</p>
                     <p className="mt-1 text-[10px] text-slate-500 leading-tight">
                       Enviada al Perfil Público de {student.name.split(" ")[0]}
                     </p>
                   </div>
                 </div>

                 {/* Card 2: PDF Oficial */}
                 <div className="flex flex-col items-center gap-3 rounded-2xl border border-white bg-white/60 p-5 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl">
                   <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-md shadow-rose-500/30">
                     <FileText className="h-7 w-7 text-white" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">Resolución Oficial</p>
                     <p className="mt-1 text-[10px] text-slate-500 leading-tight">
                       Documento PDF de liberación institucional
                     </p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="flex items-center justify-between gap-3 bg-white p-5 border-t border-slate-100 rounded-b-2xl">
                <button
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Cerrar Panel
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" /> Descargar Copia
                </button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
