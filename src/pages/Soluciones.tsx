import LandingNavbar from "@/components/LandingNavbar";
import { ArrowRight, Bot, Target, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Soluciones() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingNavbar onLogin={() => setModalOpen(true)} onStart={() => setModalOpen(true)} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Soluciones diseñadas para <span className="text-blue-600">Escalar el Talento</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Conecta la academia con el mundo real mediante flujos de trabajo inteligentes y validación algorítmica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="rounded-3xl border border-border bg-card p-10 hover:shadow-xl hover:border-blue-500/30 transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 ring-4 ring-blue-50">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Matching Algorítmico</h3>
              <p className="text-muted-foreground mb-6">Nuestro motor de IA conecta instantáneamente los requisitos de proyectos corporativos con las habilidades validadas de miles de estudiantes de último año.</p>
              <Button onClick={() => setModalOpen(true)} variant="link" className="p-0 h-auto text-blue-600 group-hover:text-blue-700">Explorar Motor <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-10 hover:shadow-xl hover:border-emerald-500/30 transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 ring-4 ring-emerald-50">
                <ShieldCheck className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Certificación On-Chain</h3>
              <p className="text-muted-foreground mb-6">Todas las habilidades demostradas se emiten como insignias criptográficas inmutables validadas por la institución educativa originaria.</p>
              <Button onClick={() => setModalOpen(true)} variant="link" className="p-0 h-auto text-emerald-600 group-hover:text-emerald-700">Ver Seguridad <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-10 hover:shadow-xl hover:border-purple-500/30 transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 ring-4 ring-purple-50">
                <Bot className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Copiloto de RRHH</h3>
              <p className="text-muted-foreground mb-6">Atrae el mejor talento de manera proactiva usando nuestro agente inteligente. Describe tu vacante en lenguaje natural y recibe candidatos ideales.</p>
              <Button onClick={() => navigate('/business')} variant="link" className="p-0 h-auto text-purple-600 group-hover:text-purple-700">Agendar Demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-10 hover:shadow-xl hover:border-amber-500/30 transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 ring-4 ring-amber-50">
                <Zap className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Onboarding Ultrasónico</h3>
              <p className="text-muted-foreground mb-6">Convierte estudiantes regulares en perfiles B2B gracias a nuestro flujo KYC biométrico integrado con Microsoft Azure AD.</p>
              <Button onClick={() => setModalOpen(true)} variant="link" className="p-0 h-auto text-amber-600 group-hover:text-amber-700">Probar KYC <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-bold mb-4 relative z-10">¿Listo para transformar tu universidad o empresa?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 relative z-10">Crea tu cuenta de prueba o agenda una llamada comercial con uno de nuestros arquitectos de reclutamiento.</p>
            <div className="flex items-center justify-center gap-4 relative z-10">
              <Button variant="cta-primary" size="lg" onClick={() => setModalOpen(true)}>Comenzar Gratis</Button>
              <Button variant="outline" size="lg" className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white" onClick={() => navigate('/agendar')}>Agendar Demo</Button>
            </div>
          </div>
        </div>
      </main>

      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} initialMode="login" />
    </div>
  );
}
