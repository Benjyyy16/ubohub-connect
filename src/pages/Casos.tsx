import LandingNavbar from "@/components/LandingNavbar";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Casos() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingNavbar onLogin={() => setModalOpen(true)} onStart={() => setModalOpen(true)} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Casos de <span className="text-emerald-600">Integración B2B</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Cómo las principales corporaciones y centros educativos están eliminando el sesgo en la contratación.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Caso 1 */}
            <div className="rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 p-8 sm:p-12 flex flex-col md:flex-row gap-12 group hover:bg-indigo-50 transition-colors">
              <div className="md:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-indigo-700">
                    <Building2 className="h-6 w-6" /> <span className="font-bold text-lg tracking-tight">TechCorp Global</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mb-8 text-sm">
                    <MapPin className="h-4 w-4" /> Santiago, Hub de Innovación
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1">3x</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">MÁS RÁPIDO EN ONBOARDING</div>
                </div>
              </div>
              
              <div className="md:w-2/3 border-l md:border-indigo-200 md:pl-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">"Redujimos el tiempo de evaluación técnica en un 70% usando las métricas pre-validadas de TalentLink."</h3>
                <p className="text-lg text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 italic">
                  Las insignias criptográficas nos dieron total confianza de que los pasantes ya dominaban AWS y React antes de la primera entrevista, gracias a su certificación universitaria.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge" alt="CTO" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Jorge Valdivia</div>
                    <div className="text-sm text-slate-500">VP of Engineering, TechCorp Global</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="rounded-[2.5rem] bg-emerald-50/50 border border-emerald-100 p-8 sm:p-12 flex flex-col md:flex-row gap-12 group hover:bg-emerald-50 transition-colors">
              <div className="md:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-emerald-700">
                     <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
                     </svg> 
                     <span className="font-bold text-lg tracking-tight">Banco Cima</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mb-8 text-sm">
                    <MapPin className="h-4 w-4" /> Distrito Financiero
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1">+450</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">TALENTOS CAPTADOS</div>
                </div>
              </div>
              
              <div className="md:w-2/3 border-l md:border-emerald-200 md:pl-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">"Construimos toda nuestra cantera de analistas de datos usando el Match Engine Predictivo."</h3>
                <p className="text-lg text-slate-600 mb-8 border-l-4 border-emerald-500 pl-4 py-1 italic">
                  Buscábamos estudiantes con habilidades en SQL y Metodologías Ágiles. TalentLink orquestó matchings bidireccionales evitando que tuviéramos que filtrar 5000 currículums a mano.
                </p>
                <div className="flex items-center gap-3">
                   <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Andrea" alt="HR" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Andrea Schmidt</div>
                    <div className="text-sm text-slate-500">Directora de Atracción de Talento, Banco Cima</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-16 text-center">
            <Link to="/business" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-slate-800 transition-colors">
              Unete a la red empresarial <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
      
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} initialMode="login" />
    </div>
  );
}
