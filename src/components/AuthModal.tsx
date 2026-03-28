import { useState, useEffect, useCallback } from "react";
import { X, Mail, ScanFace, ShieldCheck, Award, Camera, Loader2, CheckCircle2, ArrowLeft, AlertCircle, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ModalStep = "selection" | "scanning" | "verifying" | "success";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const MOCK_NAME = "María González";
const MOCK_RUT = "19.456.789-2";

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ModalStep>("selection");
  const [showAlert, setShowAlert] = useState(false);
  const [verifyText, setVerifyText] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("selection");
        setShowAlert(false);
        setVerifyText("");
      }, 300);
    }
  }, [open]);

  // Verifying flow: cycle through texts then go to success
  useEffect(() => {
    if (step !== "verifying") return;

    setVerifyText("Extrayendo datos del documento...");

    const t1 = setTimeout(() => setVerifyText("Validando RUT en el sistema..."), 2000);
    const t2 = setTimeout(() => setStep("success"), 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step]);

  // Dismiss alert after 3s
  useEffect(() => {
    if (!showAlert) return;
    const t = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(t);
  }, [showAlert]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!open) return null;

  const renderRightColumn = () => {
    switch (step) {
      case "selection":
        return <SelectionView onScan={() => setStep("scanning")} onSSO={() => setShowAlert(true)} showAlert={showAlert} />;
      case "scanning":
        return <ScanningView onCapture={() => setStep("verifying")} onCancel={() => setStep("selection")} />;
      case "verifying":
        return <VerifyingView text={verifyText} />;
      case "success":
        return <SuccessView name={MOCK_NAME} rut={MOCK_RUT} onConnect={() => { onClose(); navigate("/dashboard"); }} />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="animate-modal-in bg-card rounded-2xl shadow-modal w-full max-w-[880px] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column - Visual */}
        <LeftColumn step={step} />

        {/* Right Column - Dynamic */}
        <div className="flex-1 p-8 md:p-10 relative min-h-[420px] flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
          >
            <X className="size-4" />
          </button>

          {renderRightColumn()}
        </div>
      </div>
    </div>
  );
};

/* ─── Left Column (adapts messaging per step) ─── */
const leftContent: Record<ModalStep, { title: string; subtitle: string }> = {
  selection: {
    title: "Tu próximo proyecto\nte está esperando.",
    subtitle: "Conecta con oportunidades académicas reales y construye tu portafolio profesional.",
  },
  scanning: {
    title: "Verificación\nrápida y segura.",
    subtitle: "Solo necesitamos una foto de tu documento para validar tu identidad.",
  },
  verifying: {
    title: "Procesando tu\ninformación...",
    subtitle: "Nuestro sistema valida tus datos en segundos con total seguridad.",
  },
  success: {
    title: "¡Bienvenido a\nTalentLink!",
    subtitle: "Tu identidad ha sido verificada. Estás a un paso de comenzar.",
  },
};

const LeftColumn = ({ step }: { step: ModalStep }) => (
  <div className="hidden md:flex md:w-[45%] bg-secondary p-10 flex-col justify-between relative overflow-hidden">
    <div>
      <p className="font-heading font-bold text-2xl text-foreground leading-snug mb-3 whitespace-pre-line transition-all duration-300">
        {leftContent[step].title}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-300">
        {leftContent[step].subtitle}
      </p>
    </div>

    <div className="mt-10 flex items-center justify-center">
      <div className="relative">
        <div className="size-28 rounded-2xl bg-primary/10 flex items-center justify-center rotate-6">
          <Award className="size-12 text-primary" />
        </div>
        <div className="absolute -bottom-3 -right-3 size-16 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center -rotate-6">
          <ShieldCheck className="size-7 text-primary/60" />
        </div>
      </div>
    </div>

    <p className="text-[10px] text-muted-foreground/60 mt-8">
      TalentLink © 2026 · Certificaciones verificadas en blockchain
    </p>
  </div>
);

/* ─── Step: Selection ─── */
const SelectionView = ({
  onScan,
  onSSO,
  showAlert,
}: {
  onScan: () => void;
  onSSO: () => void;
  showAlert: boolean;
}) => (
  <div className="flex-1 flex flex-col animate-fade-up">
    <h2 className="font-heading font-bold text-2xl text-foreground mb-1">
      Acceso al Portal
    </h2>
    <p className="text-sm text-muted-foreground mb-8">
      Ingresa con tu cuenta institucional o verifica tu identidad.
    </p>

    {/* Alert */}
    <div
      className={`overflow-hidden transition-all duration-300 ${
        showAlert ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"
      }`}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/15 text-sm">
        <AlertCircle className="size-4 text-primary mt-0.5 shrink-0" />
        <p className="text-foreground/80 text-xs leading-relaxed">
          Para nuevos ingresos, por favor verifica tu identidad primero.
        </p>
      </div>
    </div>

    {/* SSO Button */}
    <Button variant="sso" size="lg" className="h-12 gap-3 mb-6" onClick={onSSO}>
      <Mail className="!size-5 text-muted-foreground" />
      Continuar con Correo Institucional
    </Button>

    {/* Separator */}
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-muted-foreground">O nuevo ingreso</span>
      <div className="flex-1 h-px bg-border" />
    </div>

    {/* Scan Area */}
    <div
      onClick={onScan}
      className="group border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary hover:bg-primary/[0.02] transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-center mb-4">
        <div className="size-14 rounded-xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
          <ScanFace className="size-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
      </div>
      <p className="font-heading font-semibold text-foreground mb-1">
        Verificar Identidad
      </p>
      <p className="text-xs text-muted-foreground">
        Escanea tu Carnet o TUI para validar tu RUT
      </p>
    </div>

    <p className="text-[10px] text-muted-foreground/50 text-center mt-auto pt-6">
      Al continuar, aceptas los Términos de Servicio y Política de Privacidad.
    </p>
  </div>
);

/* ─── Step: Scanning ─── */
const ScanningView = ({
  onCapture,
  onCancel,
}: {
  onCapture: () => void;
  onCancel: () => void;
}) => (
  <div className="flex-1 flex flex-col animate-fade-up">
    <button
      onClick={onCancel}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 w-fit"
    >
      <ArrowLeft className="size-4" />
      Volver
    </button>

    <h2 className="font-heading font-bold text-xl text-foreground mb-1">
      Escaneo de Documento
    </h2>
    <p className="text-sm text-muted-foreground mb-6">
      Centra tu TUI o Carnet de Identidad en el recuadro.
    </p>

    {/* Camera viewfinder simulation */}
    <div className="relative flex-1 min-h-[200px] bg-foreground rounded-xl overflow-hidden flex items-center justify-center mb-6">
      {/* Corner brackets */}
      <div className="absolute inset-6">
        {/* Top-left */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/80 rounded-tl-lg" />
        {/* Top-right */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/80 rounded-tr-lg" />
        {/* Bottom-left */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/80 rounded-bl-lg" />
        {/* Bottom-right */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/80 rounded-br-lg" />
      </div>

      {/* Scanning line animation */}
      <div className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan-line" />

      <div className="text-center z-10">
        <Scan className="size-10 text-primary/40 mx-auto mb-2" />
        <p className="text-xs text-primary-foreground/50">Esperando documento...</p>
      </div>
    </div>

    <div className="flex gap-3">
      <Button variant="cta-outline" className="flex-1" onClick={onCancel}>
        Cancelar
      </Button>
      <Button variant="cta-primary" className="flex-1 gap-2" onClick={onCapture}>
        <Camera className="!size-4" />
        Capturar
      </Button>
    </div>
  </div>
);

/* ─── Step: Verifying ─── */
const VerifyingView = ({ text }: { text: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
      <Loader2 className="size-8 text-primary animate-spin" />
    </div>

    <h2 className="font-heading font-bold text-xl text-foreground mb-2">
      Verificando identidad
    </h2>

    <p className="text-sm text-muted-foreground transition-all duration-300 min-h-[20px]">
      {text}
    </p>

    {/* Progress bar */}
    <div className="w-48 h-1 bg-secondary rounded-full mt-8 overflow-hidden">
      <div className="h-full bg-primary rounded-full animate-progress" />
    </div>
  </div>
);

/* ─── Step: Success ─── */
const SuccessView = ({
  name,
  rut,
  onConnect,
}: {
  name: string;
  rut: string;
  onConnect: () => void;
}) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
    <div className="size-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
      <CheckCircle2 className="size-9 text-green-500" />
    </div>

    <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
      ¡Identidad Verificada!
    </h2>

    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-8">
      Hola, <span className="font-semibold text-foreground">{name}</span>. Hemos validado tu RUT{" "}
      <span className="font-mono text-foreground">{rut}</span>. Ahora, enlaza tu correo
      institucional para finalizar.
    </p>

    <Button variant="cta-primary" size="lg" className="gap-2 h-12 px-8" onClick={onConnect}>
      <Mail className="!size-4" />
      Conectar Correo Institucional
    </Button>
  </div>
);

export default AuthModal;
