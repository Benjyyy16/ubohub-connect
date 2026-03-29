import { useState, useEffect, useCallback } from "react";
import {
  X, Award, FileCheck, CheckCircle2, Settings, Shield, FileText,
  Download, User, GraduationCap, Sparkles
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StarRating from "./StarRating";

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
  { icon: Settings, text: "Validando horas en el sistema...", spin: true },
  { icon: Shield, text: "Acuñando Insignia Digital Verificada...", spin: false },
  { icon: FileText, text: "Generando PDF de Resolución Oficial...", spin: false },
];

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

const ProjectClosureModal = ({ open, onClose, student }: Props) => {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [processingIdx, setProcessingIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [commitmentRating, setCommitmentRating] = useState(0);
  const [clarityRating, setClarityRating] = useState(0);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(0);
        setFeedback("");
        setProcessingIdx(0);
        setShowConfetti(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (step !== 1) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setProcessingIdx(1), 900));
    timers.push(setTimeout(() => setProcessingIdx(2), 1800));
    timers.push(setTimeout(() => {
      setStep(2);
      setTimeout(() => setShowConfetti(true), 200);
    }, 2800));
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const handleApprove = () => {
    setStep(1);
    setProcessingIdx(0);
  };

  const handleDownloadPDF = useCallback(async () => {
    if (!student) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });

    const pageW = doc.internal.pageSize.getWidth();
    const margin = 25;
    const contentW = pageW - margin * 2;
    let y = margin;

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1.2);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("UNIVERSIDAD DEMO", pageW / 2, y, { align: "center" });
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Vicerrectoría Académica · Dirección de Innovación Curricular", pageW / 2, y, { align: "center" });
    y += 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text("RESOLUCIÓN DE LIBERACIÓN", pageW / 2, y, { align: "center" });
    y += 7;
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("DE HORAS DE PROYECTO", pageW / 2, y, { align: "center" });
    y += 16;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);

    const lines = [
      `Por medio del presente documento se certifica que:`,
      "",
      `${student.name}`,
      `Carrera: ${student.career}`,
      "",
      `Ha completado satisfactoriamente un total de ${student.hours} horas`,
      `de participación en el proyecto:`,
      "",
      `"${student.project}"`,
      "",
      `Las horas han sido validadas por el académico responsable y registradas`,
      `oficialmente en el sistema institucional TalentLink.`,
    ];

    lines.forEach((line) => {
      if (line === "") {
        y += 5;
      } else if (line === `${student.name}`) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(30, 30, 30);
        doc.text(line, margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
      } else if (line.startsWith('"')) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text(line, margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
      } else {
        doc.text(line, margin, y);
        y += 7;
      }
    });

    if (feedback.trim()) {
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("Comentario del Académico:", margin, y);
      y += 6;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      const feedbackLines = doc.splitTextToSize(`"${feedback}"`, contentW);
      doc.text(feedbackLines, margin, y);
      y += feedbackLines.length * 5 + 4;
    }

    y = Math.max(y + 20, 200);
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + 65, y);
    doc.line(pageW - margin - 65, y, pageW - margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Firma Académico Responsable", margin, y);
    doc.text("Sello Institucional", pageW - margin - 65, y);

    y = doc.internal.pageSize.getHeight() - margin;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, y - 8, pageW - margin, y - 8);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Documento generado por TalentLink · Verificable digitalmente · " + new Date().toLocaleDateString("es-CL"),
      pageW / 2,
      y - 2,
      { align: "center" }
    );

    doc.save(`Resolucion_${student.name.replace(/\s/g, "_")}.pdf`);
  }, [student, feedback]);

  if (!student) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translateY(260px) rotate(720deg) scale(0.3); }
        }
        @keyframes card-reveal {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}>
        <div
          className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-500 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {showConfetti && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <ConfettiParticle key={i} delay={i * 0.06} left={4 + Math.random() * 92} />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className={`transition-all duration-400 ${step === 0 ? "block" : "hidden"}`}>
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <h2 className="text-base font-bold text-foreground">Cierre de Iniciativa</h2>
              <p className="text-xs text-muted-foreground">{student.project}</p>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{student.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3" /> {student.career}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{student.hours}/{student.hours} hrs</p>
                  <Progress value={100} className="mt-1 h-1.5 w-20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Comentario de desempeño (opcional)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={`Deja un comentario sobre el desempeño de ${student.name.split(" ")[0]} (visible en su perfil público)`}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Bidirectional Rating */}
              <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
                <p className="text-[11px] font-medium text-muted-foreground">Evaluación de Cierre (Feedback 360)</p>
                <StarRating
                  label="Compromiso del alumno"
                  helpText="Solo visible para el algoritmo y administradores"
                  value={commitmentRating}
                  onChange={setCommitmentRating}
                />
                <StarRating
                  label="Claridad del líder del proyecto"
                  helpText="Estas métricas alimentan nuestro algoritmo de Smart Match para mejorar futuras conexiones."
                  value={clarityRating}
                  onChange={setClarityRating}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 ring-1 ring-primary/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                    <Award className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Experto en {student.project.includes("Salud") ? "Desarrollo de Software" : "Diseño & UX"}</p>
                    <p className="text-xs text-muted-foreground">Validado por {student.hours} horas de proyecto real</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-primary font-medium">
                      <Shield className="h-3 w-3" /> Credencial verificable institucionalmente
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:bg-primary/90"
              >
                <FileCheck className="h-4 w-4" /> Aprobar y Emitir Documentos
              </button>
            </div>
          </div>

          <div className={`transition-all duration-400 ${step === 1 ? "block" : "hidden"}`}>
            <div className="flex flex-col items-center gap-8 px-6 py-16">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_6s_linear_infinite]" />
                {PROCESSING_STEPS.map((ps, i) => (
                  <div
                    key={i}
                    className={`absolute transition-all duration-500 ${
                      processingIdx === i ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                      <ps.icon className={`h-7 w-7 text-primary-foreground ${ps.spin && processingIdx === i ? "animate-[spin_1.5s_linear_infinite]" : ""}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                {PROCESSING_STEPS.map((ps, i) => (
                  <p
                    key={i}
                    className={`text-sm font-semibold text-foreground transition-all duration-300 ${
                      processingIdx === i ? "block opacity-100" : "hidden opacity-0"
                    }`}
                  >
                    {ps.text}
                  </p>
                ))}
                <p className="mt-2 text-xs text-muted-foreground">Esto puede tomar unos segundos</p>
              </div>

              <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${((processingIdx + 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-400 ${step === 2 ? "block" : "hidden"}`}>
            <div className="flex flex-col items-center gap-6 px-6 py-10">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" style={{ animationDuration: '2s' }} />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 animate-[card-reveal_0.5s_ease-out]">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="text-center animate-[card-reveal_0.5s_ease-out_0.1s_both]">
                <h3 className="text-lg font-bold text-foreground">¡Proyecto Finalizado con Éxito!</h3>
                <p className="mt-1 text-sm text-muted-foreground">Todos los documentos han sido generados</p>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 animate-[card-reveal_0.5s_ease-out_0.2s_both]">
                <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5 text-center ring-1 ring-primary/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25 transition-transform duration-500 hover:scale-110">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Insignia Digital</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Enviada a la Billetera de {student.name.split(" ")[0]}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" /> Entregada
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Resolución Oficial</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Liberación de {student.hours} hrs
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:shadow-md"
                  >
                    <Download className="h-3 w-3" /> Descargar PDF
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-[10px] text-muted-foreground animate-[card-reveal_0.5s_ease-out_0.35s_both]">
                <Sparkles className="h-3 w-3 text-primary" />
                Credencial verificable emitida a través de TalentLink
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 border-t border-border px-6 py-4 animate-[card-reveal_0.5s_ease-out_0.4s_both]">
              <button
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                Volver al Panel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectClosureModal;
