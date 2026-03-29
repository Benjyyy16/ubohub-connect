import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle2, Video, Sparkles, Building2, User, X } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
import { toast } from "sonner";

export default function AgendarCall() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBadgeNotif, setShowBadgeNotif] = useState(false);

  const DATES = [
    { day: "Lun", date: 15 },
    { day: "Mar", date: 16 },
    { day: "Mié", date: 17 },
    { day: "Jue", date: 18 },
    { day: "Vie", date: 19 },
  ];

  const TIMES = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return toast.error("Selecciona un día y hora");
    setStep(2);
  };

  const playSuccessChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 — acorde mayor
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.18 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.45);
        osc.start(ctx.currentTime + i * 0.18);
        osc.stop(ctx.currentTime + i * 0.18 + 0.5);
      });
    } catch (_) {}
  };

  const triggerSuccessNotif = () => {
    playSuccessChime();
    setShowBadgeNotif(true);
    setTimeout(() => setShowBadgeNotif(false), 6000);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      triggerSuccessNotif();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <LandingNavbar onLogin={() => {}} onStart={() => {}} />

      {/* Floating Badge Notification — mirrors NotificationCenter style */}
      <div
        className={`fixed bottom-6 right-6 z-[100] w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/15 p-4 flex items-start gap-3 transition-all duration-500 ${
          showBadgeNotif
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900">¡Llamada confirmada!</p>
          <p className="text-xs text-slate-500 mt-0.5">Equipo Comercial TalentLink · Día {selectedDate}</p>
          <p className="text-[10px] text-slate-400 mt-1">Ahora mismo</p>
        </div>
        <button
          onClick={() => setShowBadgeNotif(false)}
          className="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
        {/* Blue unread dot */}
        <div className="absolute top-4 right-10 h-2 w-2 rounded-full bg-blue-600" />
      </div>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex justify-center">
        {step === 3 ? (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-10 sm:p-16 border border-slate-200 shadow-xl shadow-slate-900/5 text-center animate-[fade-in_0.5s_ease-out]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6 animate-[bounce_0.6s_ease-out]">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">¡Llamada Agendada!</h1>
            <p className="text-lg text-slate-500 max-w-md mx-auto mb-8">
              Hemos enviado una invitación de Google Meet a tu correo electrónico. Te esperamos el día seleccionado.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 flex flex-col gap-3 max-w-md mx-auto">
               <div className="flex items-center gap-3 text-slate-700 font-semibold"><CalendarIcon className="h-5 w-5 text-blue-600"/> Día {selectedDate} del presente mes</div>
               <div className="flex items-center gap-3 text-slate-700 font-semibold"><Clock className="h-5 w-5 text-blue-600"/> {selectedTime} (Zona Horaria Local)</div>
               <div className="flex items-center gap-3 text-slate-700 font-semibold"><Video className="h-5 w-5 text-blue-600"/> Link seguro de Google Meet</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/')}
                className="rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-colors"
              >
                Volver al Inicio
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col md:flex-row animate-[fade-in_0.3s_ease-out]">

            {/* Left Column: Info */}
            <div className="w-full md:w-[40%] bg-slate-50 p-10 border-r border-slate-200 flex flex-col">
              <button onClick={() => { if(step===2) setStep(1); else navigate('/'); }} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-10 w-fit">
                <ArrowLeft className="h-4 w-4" /> Volver
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/20 mb-6">
                 <Sparkles className="h-6 w-6 text-white" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Llamada de Ventas B2B</h2>
              <p className="font-semibold text-slate-500 mb-8">Equipo Comercial de TalentLink</p>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <Clock className="h-5 w-5 text-slate-400" /> 30 Minutos
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <Video className="h-5 w-5 text-slate-400" /> Videoconferencia en Google Meet
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mt-8 pt-8 border-t border-slate-200">
                Descubre cómo unificar tu campus académico y conectar el talento de tus estudiantes corporativamente usando IA e insignias verificadas.
              </p>
            </div>

            {/* Right Column: Interaction */}
            <div className="w-full md:w-[60%] p-10 flex flex-col justify-center">

              {step === 1 && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-6">Selecciona Fecha y Hora</h3>

                  <div className="mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Días Disponibles</p>
                    <div className="flex flex-wrap gap-3">
                      {DATES.map(d => (
                        <button
                          key={d.date}
                          onClick={() => setSelectedDate(d.date)}
                          className={`flex flex-col items-center justify-center p-3 w-16 h-20 rounded-2xl border-2 transition-all duration-200 ${
                            selectedDate === d.date
                              ? 'border-blue-600 bg-blue-50/50'
                              : 'border-slate-100 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className={`text-xs font-bold ${selectedDate === d.date ? 'text-blue-600' : 'text-slate-500'}`}>{d.day}</span>
                          <span className={`text-xl font-extrabold mt-1 ${selectedDate === d.date ? 'text-blue-700' : 'text-slate-900'}`}>{d.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="mb-8 animate-[fade-in_0.2s_ease-out]">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Horas Disponibles</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {TIMES.map(t => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                              selectedTime === t
                                ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={handleNext}
                      disabled={!selectedDate || !selectedTime}
                      className="rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      Siguiente Paso
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-6">Confirma tus Datos</h3>
                  <form onSubmit={handleBook} className="space-y-5">

                    <div>
                      <label className="text-xs font-extrabold tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1.5 block"><User className="h-3.5 w-3.5"/> Nombre y Apellido</label>
                      <input required disabled={isSubmitting} type="text" placeholder="John Doe" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20" />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold tracking-widest text-slate-400 uppercase mb-2 block">Correo Corporativo</label>
                      <input required disabled={isSubmitting} type="email" placeholder="john@tuempresa.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20" />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1.5 block"><Building2 className="h-3.5 w-3.5" /> Institución/Empresa</label>
                      <input required disabled={isSubmitting} type="text" placeholder="Universidad Tecnológica" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20" />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl w-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Agendando...</>
                        ) : "Confirmar Llamada"}
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
