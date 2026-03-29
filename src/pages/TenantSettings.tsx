import { useState } from "react";
import { 
  Palette, Blocks, Users, CreditCard, UploadCloud, CheckCircle2, 
  Settings, Link2, Key, HelpCircle, FileText, Download, Trash2, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";
import { toast } from "sonner";

export default function TenantSettings() {
  const [activeTab, setActiveTab] = useState("branding");

  // State for Integration Testing
  const [testingConnection, setTestingConnection] = useState(false);
  const [canvasUrl, setCanvasUrl] = useState("https://canvas.instructure.com/api/v1");
  const [canvasToken, setCanvasToken] = useState("");

  const handleTestConnection = () => {
    setTestingConnection(true);
    toast.info("Probando conexión segura con el LMS...");
    setTimeout(() => {
      setTestingConnection(false);
      toast.success("Conexión exitosa. Extraídos 12,000 registros históricos y mallas curriculares.");
    }, 2500);
  };

  const TABS = [
    { id: "branding", label: "Branding & Apariencia", icon: Palette },
    { id: "integrations", label: "Integraciones y APIs", icon: Blocks },
    { id: "directory", label: "Directorio y Acceso", icon: Users },
    { id: "billing", label: "Suscripción y Facturación", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans selection:bg-slate-200">
      <TopBar />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 items-start">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1 md:sticky top-24">
          <div className="mb-8 px-4">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Configuración</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Tenant ID: inst_19aB4</p>
          </div>

          <nav className="flex flex-col gap-1 w-full relative">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isActive 
                      ? 'text-slate-900 bg-slate-200/50' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="tenant-nav-active" 
                      className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 -z-10" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Content */}
        <section className="flex-1 min-w-0 flex flex-col gap-8 w-full">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: BRANDING */}
            {activeTab === "branding" && (
              <motion.div 
                key="tab-brand"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Branding & Apariencia</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Personaliza el entorno (White-labeling) para tus estudiantes y profesores.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900 mb-6 uppercase tracking-wider">Logotipo Institucional</h3>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-[#FAFAFA] p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50/20 transition-colors cursor-pointer group">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 text-slate-400 group-hover:text-blue-500 transition-colors">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Arrastra tu logo vectorial aquí</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Formatos soportados: SVG, PNG (Fondo Transparente)</p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Color Picker Section */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-900 mb-6 uppercase tracking-wider">Colores Corporativos</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="text-xs font-bold text-slate-500 mb-2 block">Color Primario Institucional (Acento)</label>
                        <div className="flex items-center gap-3">
                          <input type="color" defaultValue="#0055FF" className="w-10 h-10 rounded border-none bg-transparent cursor-pointer p-0" />
                          <input type="text" defaultValue="#0055FF" className="w-full max-w-[120px] font-mono text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="flex-1 bg-[#111] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                    <div className="relative z-10">
                      <h3 className="text-[10px] font-mono text-blue-400 mb-6 uppercase tracking-widest border-b border-white/10 pb-2">Live Preview (Estudiante)</h3>
                      <div className="bg-white rounded-xl p-4 shadow-xl shadow-black/50 pointer-events-none">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-[#0055FF]" />
                            <span className="font-bold text-slate-900 text-sm">Universidad Demo</span>
                          </div>
                          <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <span>Misión</span>
                            <span>Proyectos</span>
                          </div>
                        </div>
                        <button className="w-full bg-[#0055FF] text-white font-bold text-xs py-2 rounded-lg shadow-sm shadow-[#0055FF]/20">
                          Acción Primaria
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button className="bg-slate-900 text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Guardar Apariencia
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: INTEGRATIONS */}
            {activeTab === "integrations" && (
              <motion.div 
                key="tab-integrations"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Integraciones y APIs</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Sincroniza el ecosistema académico y de identidad de la universidad directamente a TalentLink.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  {/* Canvas LMS Accordion/Card */}
                  <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center p-2.5 shadow-md border border-red-500/20">
                           <svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg> 
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Canvas LMS
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Conectado
                            </span>
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">Sincronización de notas, habilidades e identidades (Read-only).</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-900"><Settings className="h-5 w-5" /></button>
                    </div>

                    <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-slate-200 space-y-4">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/2">
                          <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Link2 className="h-3 w-3" /> API Base URL</label>
                          <input 
                            type="text" 
                            value={canvasUrl}
                            onChange={(e) => setCanvasUrl(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none" 
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Key className="h-3 w-3" /> Bearer Token</label>
                          <input 
                            type="password" 
                            placeholder="sk_live_..................."
                            value={canvasToken}
                            onChange={(e) => setCanvasToken(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none" 
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button 
                          onClick={handleTestConnection}
                          disabled={testingConnection}
                          className="bg-white border border-slate-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                          {testingConnection ? <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-400 border-t-slate-800 animate-spin" /> : <Shield className="h-3.5 w-3.5" />}
                          Probar Conexión
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Azure AD Card */}
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 opacity-60">
                        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center p-2.5 shadow-sm border border-blue-200">
                          <Blocks className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Azure Active Directory (SSO)
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">Configurado por Administradores de TI Microsoft.</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 hover:text-slate-900 transition-colors">Configurar</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: DIRECTORY */}
            {activeTab === "directory" && (
              <motion.div 
                key="tab-directory"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Directorio y Acceso</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Gestiona los curadores, administradores y la fuerza académica aprobada.</p>
                </div>

                {/* Allowed Domains */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 mb-1 uppercase tracking-wider flex items-center gap-2">Dominios Autorizados <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" /></h3>
                      <p className="text-xs font-medium text-slate-500">Los estudiantes y profesores con estos dominios en sus correos serán auto-aprobados vía SSO.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
                      <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-700 shadow-sm shadow-slate-200/50">@universidaddemo.edu.mx</span>
                      <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">+ Añadir</button>
                    </div>
                  </div>
                </div>

                {/* Administrators Grid List */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                  <div className="border-b border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Administradores Delegados</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">Importar CSV</button>
                      <button className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm shadow-slate-900/10 hover:bg-slate-800 transition-colors">Invitar Directivo</button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[#FAFAFA] border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4">Usuario</th>
                          <th className="px-6 py-4">Rol en Tenant</th>
                          <th className="px-6 py-4">Último Ingreso</th>
                          <th className="px-6 py-4 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">TI</div>
                            <div>
                              <p className="font-bold text-slate-900">Dr. Roberto Sánchez (Tú)</p>
                              <p className="text-[10px] text-slate-500 font-mono">dir.tecnologia@uni.edu</p>
                            </div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-bold text-[10px] uppercase">Tenant Owner</span></td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-500">Ahora</td>
                          <td className="px-6 py-4 text-right"></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">CS</div>
                            <div>
                              <p className="font-bold text-slate-900">Carmen Soto</p>
                              <p className="text-[10px] text-slate-500 font-mono">carmen.soto@uni.edu</p>
                            </div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-md font-bold text-[10px] uppercase">Curador Académico</span></td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-500">Hace 3 días</td>
                          <td className="px-6 py-4 text-right">
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: BILLING */}
            {activeTab === "billing" && (
              <motion.div 
                key="tab-billing"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Suscripción y Facturación</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Gestiona tu contrato Enterprise (SaaS) directamente con TalentLink.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-lg mb-4">Enterprise Tier</span>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Contrato Universitario L3</h3>
                    <p className="text-sm font-medium text-slate-500 mb-6 max-w-sm">Renovación automática el 01 de Enero 2027. Incluye integración total APIs, marca blanca completa y SLA de 99.9%.</p>
                    <button className="bg-white border border-slate-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Contactar Cuenta Dedicada</button>
                  </div>
                  
                  <div className="w-full md:w-1/2 bg-[#FAFAFA] border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-blue-500 h-full"></div>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Capacidad Facturada</p>
                        <p className="text-2xl font-black text-slate-900">4,500 <span className="text-sm font-semibold text-slate-500">/ 5,000 Alumnos</span></p>
                      </div>
                      <p className="text-xs font-bold text-blue-600">90% Completado</p>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden ring-1 ring-inset ring-slate-900/5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 mt-3 text-right">Si excedes el límite, se cobrará $0.15 USD / alumno adicional según T&C.</p>
                  </div>
                </div>

                {/* Invoice Table */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                  <div className="border-b border-slate-200 p-6 bg-slate-50/50">
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Historial de Pagos</h3>
                  </div>
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                          <FileText className="h-4 w-4 text-slate-400" />
                          Factura Mensual P03
                        </td>
                        <td className="px-6 py-4 text-slate-500">Marzo 2026</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">$3,500.00 USD</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md font-bold text-[10px] uppercase border border-emerald-200">Pagado</span></td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-all font-bold text-xs flex items-center gap-2 outline-none">
                            <Download className="h-3.5 w-3.5" /> PDF
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                          <FileText className="h-4 w-4 text-slate-400" />
                          Factura Mensual P02
                        </td>
                        <td className="px-6 py-4 text-slate-500">Febrero 2026</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">$3,500.00 USD</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md font-bold text-[10px] uppercase border border-emerald-200">Pagado</span></td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-all font-bold text-xs flex items-center gap-2 outline-none">
                            <Download className="h-3.5 w-3.5" /> PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
