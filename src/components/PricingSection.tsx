import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="precios" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Precios simples y transparentes
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Escala el talento de tu institución educativa o empresa con planes adaptados a tu volumen de operaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan Académico */}
          <div className="flex flex-col bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-50 text-blue-700 mb-4">
                Universidades e Institutos
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900">Plan Académico</h3>
              <p className="text-sm text-slate-500 mt-2">Perfecto para validar credenciales y vincular estudiantes con proyectos internos.</p>
            </div>
            <div className="mb-6 flex items-baseline text-slate-900">
              <span className="text-5xl font-extrabold tracking-tight">$2</span>
              <span className="text-lg font-medium text-slate-500 ml-1">/ alumno activo / mes</span>
            </div>
            <button className="w-full bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-colors mb-8 shadow-sm">
              Contactar Ventas
            </button>
            <ul className="space-y-4 text-sm text-slate-600 flex-1">
              {[
                "Hasta 10,000 estudiantes activos",
                "Integración SSO (SAML/Azure AD)",
                "Sincronización con Canvas/Blackboard LMS",
                "Emisión de credenciales verificadas",
                "Soporte por email 24/7"
              ].map((feature, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Plan Enterprise */}
          <div className="flex flex-col bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="mb-6 relative">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-500/20 text-blue-300 mb-4 ring-1 ring-blue-500/30">
                Corporativo B2B
              </span>
              <h3 className="text-3xl font-extrabold text-white">Plan Enterprise</h3>
              <p className="text-sm text-slate-400 mt-2">Reclutamiento sin fricción y validación matemática de talento para grandes empresas.</p>
            </div>
            <div className="mb-6 flex items-baseline text-white relative">
              <span className="text-5xl font-extrabold tracking-tight">Personalizado</span>
            </div>
            <button className="relative w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors mb-8 shadow-lg shadow-blue-900/50">
              Agendar Demo Corporativa
            </button>
            <ul className="space-y-4 text-sm text-slate-300 flex-1 relative">
              {[
                "Procesamiento masivo de IA (Smart Match)",
                "Panel de monitoreo avanzado y marca blanca",
                "Algoritmo de recomendación dedicado",
                "APIs de reclutamiento para ATS propio",
                "Account Manager dedicado (SLA 99.9%)"
              ].map((feature, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-blue-400 shrink-0" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
