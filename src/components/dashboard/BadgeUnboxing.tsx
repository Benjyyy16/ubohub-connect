import { useEffect, useState } from "react";
import { Award, X, ExternalLink, Download, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BadgeUnboxing = ({ open, onClose }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setRevealed(true), 400);
      return () => clearTimeout(t);
    }
    setRevealed(false);
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* CSS for shine effect */}
      <style>{`
        @keyframes badge-shine {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes particle-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
      `}</style>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`relative flex max-w-sm flex-col items-center gap-6 rounded-2xl border border-border/20 bg-card p-8 shadow-2xl transition-all duration-700 ${
            revealed ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground">
            <X className="h-4 w-4" />
          </button>

          {/* Particles */}
          {revealed && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const dist = 80 + Math.random() * 40;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/3 h-1.5 w-1.5 rounded-full"
                    style={{
                      background: `hsl(${200 + Math.random() * 60}, 70%, 55%)`,
                      "--tx": `${Math.cos(angle) * dist}px`,
                      "--ty": `${Math.sin(angle) * dist}px`,
                      animation: `particle-burst 1s ease-out ${0.3 + i * 0.04}s forwards`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          )}

          {/* Badge with shine */}
          <div
            className="relative"
            style={{ animation: revealed ? "badge-float 3s ease-in-out infinite 0.8s" : "none" }}
          >
            {/* Glow */}
            <div className={`absolute -inset-4 rounded-full bg-primary/20 blur-xl transition-opacity duration-1000 ${revealed ? "opacity-100" : "opacity-0"}`} />

            {/* Hexagonal medal */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <polygon
                  points="50,2 93,25 93,75 50,98 7,75 7,25"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="drop-shadow-md"
                />
                <polygon
                  points="50,8 88,28 88,72 50,92 12,72 12,28"
                  fill="hsl(var(--primary-light))"
                />
              </svg>
              <Award className="relative z-10 h-12 w-12 text-primary" />

              {/* Shine sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{
                    animation: revealed ? "badge-shine 2s ease-in-out 0.6s infinite" : "none",
                    width: "50%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`text-center transition-all duration-500 delay-300 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center justify-center gap-1 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Nueva competencia</span>
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="mt-2 text-xl font-extrabold text-foreground">Python Interdisciplinario</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              ¡Felicidades, María! Has desbloqueado una nueva competencia verificada por tu institución.
            </p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-primary font-medium">
              <ShieldCheck className="h-3 w-3" /> Verificado por TalentLink · 120 horas validadas
            </div>
          </div>

          {/* Actions */}
          <div className={`flex w-full flex-col gap-2 transition-all duration-500 delay-500 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={() => { onClose(); navigate("/perfil"); }}
              className="btn-press flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg"
            >
              <ExternalLink className="h-4 w-4" /> Ver en mi Perfil Público
            </button>
            <button
              onClick={onClose}
              className="btn-press flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" /> Descargar Certificado PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgeUnboxing;
