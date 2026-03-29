import { useState, useEffect } from "react";
import { 
  Lock, ShieldAlert, Activity, Database, SlidersHorizontal, 
  Settings, Users, CheckCircle2, Trash2, ArrowRight,
  RefreshCcw, Search, GraduationCap, Shield, Server
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import TopBar from "@/components/dashboard/TopBar";
import { toast } from "sonner";

interface Credential {
  id: string;
  student: string;
  badge: string;
  date: string;
  hash: string;
}

const INITIAL_CREDENTIALS: Credential[] = [
  { id: "crt_8f3c1", student: "Ana López", badge: "Liderazgo Interdisciplinario", date: "29/03/2026", hash: "0x8f3c...b29a" },
  { id: "crt_9a8b2", student: "Carlos M.", badge: "Arquitectura AWS", date: "28/03/2026", hash: "0x9a8b...7d1e" },
  { id: "crt_1e2d3", student: "Sofía R.", badge: "UX Research", date: "27/03/2026", hash: "0x1e2d...3c4b" },
];

import { useAuth } from "@/context/AuthContext";

export default function SuperAdminCenter() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'pulse' | 'controls' | 'audits' | 'users' | 'settings'>('controls');
  const [algoWeights, setAlgoWeights] = useState([50]);
  const [credentials, setCredentials] = useState<Credential[]>(INITIAL_CREDENTIALS);
  
  // Terminal Logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[INFO] Webhook received from HR-Portal",
    "[INFO] Cache cleared successfully",
    "[WARN] Rate limit approached on Canvas API"
  ]);

  const addLog = (entry: string) => {
    setTerminalLogs(prev => [entry, ...prev].slice(0, 15));
  };
  
  // Revoke state
  const [revokeTarget, setRevokeTarget] = useState<Credential | null>(null);
  const [revokeConfirmText, setRevokeConfirmText] = useState("");

  const handleRevoke = (e: React.FormEvent) => {
    e.preventDefault();
    if (revokeConfirmText === "CONFIRMAR" && revokeTarget) {
      setCredentials(prev => prev.filter(c => c.id !== revokeTarget.id));
      toast.error(`La credencial '${revokeTarget.badge}' ha sido destruida irreversiblemente.`);
      addLog(`[SECURITY] Revocación ejecutada - Hash: ${revokeTarget.hash}`);
      setRevokeTarget(null);
      setRevokeConfirmText("");
    }
  };

  const handleDeployWeights = () => {
    toast.success("Pesos algorítmicos actualizados. Recalculando red neuronal...");
    addLog(`[SYSTEM] Algoritmo re-calibrado: GPA ${algoWeights[0]}% | Soft Skills ${100 - algoWeights[0]}%`);
  };

  const [syncingApi, setSyncingApi] = useState<string | null>(null);

  const handleSyncApi = (apiName: string) => {
    if (syncingApi) return;
    setSyncingApi(apiName);
    addLog(`[API] Iniciando sincronización manual para ${apiName}...`);
    setTimeout(() => {
      setSyncingApi(null);
      toast.success(`${apiName} sincronizado exitosamente.`);
      addLog(`[INFO] Sincronización finalizada localmente para ${apiName}`);
    }, 2000);
  };

  const [simulatingForce, setSimulatingForce] = useState(false);
  const handleForceMatch = () => {
    setSimulatingForce(true);
    addLog(`[SYSTEM] Iniciando entrelazado cuántico manual...`);
    setTimeout(() => {
      setSimulatingForce(false);
      toast.success("Vinculación forzada exitosa");
      addLog(`[SUCCESS] Proyecto y Alumno vinculados ignorando restricciones.`);
    }, 1500);
  };

  // RBAC Access Denied View
  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center select-none">

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)] mb-8">
          <Lock className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase">Área Restringida</h1>
        <p className="mt-2 text-sm font-mono text-slate-500">Se requieren credenciales de Nivel 4 (SUPER_ADMIN) para acceder al Command Center.</p>
        
        <div className="mt-12 font-mono text-[10px] text-slate-600 border-t border-[#262626] border-dashed pt-4">
          INCIDENT_LOG: Acceso denegado detectado - {new Date().toISOString()}
        </div>

        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="mt-8 rounded-lg bg-white px-6 py-2.5 text-xs font-bold text-black shadow-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
        >
          <ShieldAlert className="h-4 w-4" /> Volver al Dashboard
        </button>
      </div>
    );
  }

  // SUPER_ADMIN VIEW
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">

      {/* Ultra-thin Left Sidebar */}
      <aside className="w-16 shrink-0 bg-[#0A0A0A] border-r border-[#262626] flex flex-col items-center py-6 gap-8">
         <div className="h-8 w-8 rounded bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
           <Shield className="h-4 w-4 text-white" />
         </div>
         <nav className="flex flex-col gap-6 w-full items-center">
           <button onClick={() => setActiveTab('pulse')} className={`${activeTab === 'pulse' ? 'text-white' : 'text-slate-500 hover:text-slate-300'} transition-colors relative group`}>
             <Activity className="h-5 w-5" />
             <span className="absolute left-10 scale-0 rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100 transition-transform origin-left z-50">Pulse</span>
           </button>
           <button onClick={() => setActiveTab('controls')} className={`${activeTab === 'controls' ? 'text-white' : 'text-slate-500 hover:text-slate-300'} transition-colors relative group`}>
             <SlidersHorizontal className="h-5 w-5" />
             <span className="absolute left-10 scale-0 rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100 transition-transform origin-left z-50">Controls</span>
           </button>
           <button onClick={() => setActiveTab('audits')} className={`${activeTab === 'audits' ? 'text-white' : 'text-slate-500 hover:text-slate-300'} transition-colors relative group`}>
             <Database className="h-5 w-5" />
             <span className="absolute left-10 scale-0 rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100 transition-transform origin-left z-50">Audits</span>
           </button>
           <button onClick={() => setActiveTab('users')} className={`${activeTab === 'users' ? 'text-white' : 'text-slate-500 hover:text-slate-300'} transition-colors relative group`}>
             <Users className="h-5 w-5" />
             <span className="absolute left-10 scale-0 rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100 transition-transform origin-left z-50">Users</span>
           </button>
         </nav>
         <div className="mt-auto">
           <button onClick={() => setActiveTab('settings')} className={`${activeTab === 'settings' ? 'text-white' : 'text-slate-600 hover:text-slate-300'} transition-colors relative group`}>
             <Settings className="h-5 w-5" />
             <span className="absolute left-10 scale-0 rounded bg-slate-800 p-2 text-xs text-white group-hover:scale-100 transition-transform origin-left z-50">Settings</span>
           </button>
         </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 overflow-x-hidden p-8 max-w-7xl mx-auto w-full">
        
        <header className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Command Center</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Supervisión omnisciente y controles divinos del sistema.</p>
        </header>

        {activeTab === 'pulse' && (
          <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
            {/* Sección 1: Ecosystem Pulse */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500" /> Ecosystem Pulse (Live Feed)
                </h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Conexión WebSocket Activa</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                  
                  {/* Event 1 (Match) */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mb-1 tracking-wider uppercase">
                      <span>Hace 2 min</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">MATCH_ENGINE</span>
                    </div>
                    <p className="text-sm text-slate-700">El algoritmo conectó a <span className="font-semibold">Ana L.</span> con el Proyecto IA del Prof. Soto (Match: 95%).</p>
                  </div>

                  {/* Event 2 (Mint) */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mb-1 tracking-wider uppercase">
                      <span>Hace 15 min</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">MINT_SERVER</span>
                    </div>
                    <p className="text-sm text-slate-700">Credencial <span className="font-semibold">'Liderazgo'</span> acuñada y enviada al portafolio B2B de <span className="font-semibold">Carlos M.</span></p>
                  </div>

                  {/* Event 3 (B2B View) */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-purple-500 ring-4 ring-white" />
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mb-1 tracking-wider uppercase">
                      <span>Hace 1 hora</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100">B2B_PORTAL</span>
                    </div>
                    <p className="text-sm text-slate-700">Empresa corporativa <span className="font-semibold">'TechCorp'</span> visualizó de forma orgánica el perfil verificado de <span className="font-semibold">Sofía R.</span></p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'controls' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-[fade-in_0.3s_ease-out]">
            {/* Sección 2: Admin-Only God Controls */}
            <div className="space-y-8">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">Admin-Only God Controls</h2>

              {/* Sub-Control 1: Adjust Match Weights */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-slate-700" />
                    <h3 className="font-bold text-slate-900">Ajuste de Algoritmo Global</h3>
                  </div>
                  <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 tracking-widest border border-red-200 flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" /> ADMIN ONLY
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    <span>Peso de Notas (GPA)</span>
                    <span>Peso de Intereses (Soft)</span>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={algoWeights}
                      onValueChange={setAlgoWeights}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:bg-slate-900 [&_[role=slider]]:border-slate-900 [&_.bg-primary]:bg-slate-900 [&_.bg-secondary]:bg-slate-100"
                    />
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-2 bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200/50 text-xs font-medium">
                    <div className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" /><span>Cuidado: Modificar este slider re-entrenará el modelo.</span></div>
                  </div>
                  <button 
                    onClick={handleDeployWeights}
                    className="mt-3 w-full rounded-md bg-slate-900 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-colors"
                  >
                    Desplegar Pesos
                  </button>
                </div>
              </div>

              {/* Sub-Control 3: Force Match */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Intervención Manual (Forzar Match)</label>
                  <div className="flex flex-col gap-2">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" placeholder="ID Alumno (ej. STU-001)" className="w-full rounded-md border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all" />
                    </div>
                    <div className="relative w-full">
                      <LayersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" placeholder="ID Proyecto (ej. PRJ-004)" className="w-full rounded-md border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all" />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleForceMatch}
                  disabled={simulatingForce}
                  className="h-[38px] px-4 rounded-md bg-slate-900 text-white font-bold text-xs shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {simulatingForce ? "Ejecutando..." : "Forzar Vinculación"}
                </button>
              </div>
            </div>

            {/* Sección 3: System Health & API Status */}
            <div className="space-y-8">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">System Health & APIs</h2>
              
              <div className="flex flex-col gap-3">
                <div className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between group overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
                      <Server className="h-4 w-4 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">SSO Azure AD</h4>
                      <p className="font-mono text-[9px] text-slate-500 mt-0.5 tracking-wider">Última sync: Hace 1 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSyncApi("SSO Azure AD")} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-500 flex items-center gap-1 hover:text-slate-900 absolute right-10 bg-white pl-2">
                       <RefreshCcw className="h-3 w-3" /> Sync
                    </button>
                    <div className="flex h-2 w-2 items-center justify-center relative z-10 bg-white shadow-[0_0_5px_white]">
                      {syncingApi === "SSO Azure AD" ? <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span> : <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${syncingApi === "SSO Azure AD" ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between group overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
                      <GraduationCap className="h-4 w-4 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Canvas LMS Sync</h4>
                      <p className="font-mono text-[9px] text-slate-500 mt-0.5 tracking-wider">Extrayendo notas (Batch B)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSyncApi("Canvas LMS")} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-500 flex items-center gap-1 hover:text-slate-900 absolute right-10 bg-white pl-2">
                       <RefreshCcw className="h-3 w-3" /> Sync
                    </button>
                    <div className="flex h-2 w-2 items-center justify-center relative z-10 bg-white shadow-[0_0_5px_white]">
                      {syncingApi === "Canvas LMS" ? <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span> : <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${syncingApi === "Canvas LMS" ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between group overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
                      <RefreshCcw className="h-4 w-4 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">OCR Scanner Engine</h4>
                      <p className="font-mono text-[9px] text-slate-500 mt-0.5 tracking-wider">Operativo (0 queue)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSyncApi("OCR Engine")} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-500 flex items-center gap-1 hover:text-slate-900 absolute right-10 bg-white pl-2">
                       <RefreshCcw className="h-3 w-3" /> Sync
                    </button>
                    <div className="flex h-2 w-2 items-center justify-center relative z-10 bg-white shadow-[0_0_5px_white]">
                      {syncingApi === "OCR Engine" ? <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span> : <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${syncingApi === "OCR Engine" ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded border border-slate-200 border-dashed bg-slate-50 p-4 font-mono text-[10px] text-slate-400 flex flex-col gap-1 max-h-40 overflow-y-auto w-full break-all">
                <span className="text-slate-600 font-bold sticky top-0 bg-slate-50">LATEST_LOGS:</span>
                {terminalLogs.map((log, idx) => (
                  <span key={idx} className={log.startsWith("[SECURITY]") ? "text-red-500 font-bold" : log.startsWith("[API]") ? "text-amber-500" : ""}>{log}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="animate-[fade-in_0.3s_ease-out]">
            {/* Sub-Control 2: Audit Table & Revoke */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900">Auditoría Criptográfica</h3>
                </div>
                <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 tracking-widest border border-red-200 flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3" /> ADMIN ONLY
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold">ID Transacción</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Alumno</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Insignia Acuñada</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Hash Block</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-right">God Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-[11px]">
                    {credentials.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 font-sans text-sm">No credentials left.</td>
                      </tr>
                    )}
                    {credentials.map((cred) => (
                      <tr key={cred.id} className="transition-colors hover:bg-slate-50 group">
                        <td className="px-6 py-4 text-slate-400">{cred.id}</td>
                        <td className="px-6 py-4 font-sans font-semibold text-slate-900">{cred.student}</td>
                        <td className="px-6 py-4 font-sans text-slate-600">{cred.badge}</td>
                        <td className="px-6 py-4 text-blue-600">{cred.hash}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setRevokeTarget(cred)}
                            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-sans font-bold text-slate-600 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-400 focus:outline-none"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Revocar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-[fade-in_0.3s_ease-out]">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900">Directorio de Usuarios Global</h3>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  + Nuevo Usuario
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold">Nombre del Usuario</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Rol Asignado</th>
                      <th scope="col" className="px-6 py-4 font-semibold">Estado Cuenta</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm">
                    <tr className="transition-colors hover:bg-slate-50">
                       <td className="px-6 py-4 font-semibold text-slate-900">Ana López</td>
                       <td className="px-6 py-4 text-slate-500">alumno@universidad.edu</td>
                       <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-100">Estudiante</span></td>
                       <td className="px-6 py-4"><span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold"><CheckCircle2 className="h-4 w-4"/> Activo</span></td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => toast.success('Rol cambiado localmente')} className="text-xs font-bold text-blue-600 hover:text-blue-800">Editar</button>
                       </td>
                    </tr>
                    <tr className="transition-colors hover:bg-slate-50">
                       <td className="px-6 py-4 font-semibold text-slate-900">Dra. Carmen Soto</td>
                       <td className="px-6 py-4 text-slate-500">prof@universidad.edu</td>
                       <td className="px-6 py-4"><span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-xs font-bold border border-purple-100">Profesor</span></td>
                       <td className="px-6 py-4"><span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold"><CheckCircle2 className="h-4 w-4"/> Activo</span></td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => toast.success('Rol cambiado localmente')} className="text-xs font-bold text-blue-600 hover:text-blue-800">Editar</button>
                       </td>
                    </tr>
                    <tr className="transition-colors hover:bg-slate-50">
                       <td className="px-6 py-4 font-semibold text-slate-900">TechCorp Global</td>
                       <td className="px-6 py-4 text-slate-500">contacto@techcorp.com</td>
                       <td className="px-6 py-4"><span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200">Empresa B2B</span></td>
                       <td className="px-6 py-4"><span className="text-amber-600 flex items-center gap-1.5 text-xs font-bold">Pendiente KYC</span></td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => toast.success('Empresa verificada localmente')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800">Verificar</button>
                       </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-[fade-in_0.3s_ease-out]">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                   <Settings className="h-5 w-5" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-900">Ajustes del Sistema</h2>
                   <p className="text-sm text-slate-500">Configuración global variables de entorno y mantenimiento.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                {/* Global Toggles */}
                <div className="space-y-6">
                   <h3 className="font-bold text-slate-900 mb-4">Mantenimiento y Acceso</h3>
                   
                   <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                     <div>
                       <p className="font-bold text-sm text-slate-900">Modo Mantenimiento Strict</p>
                       <p className="text-xs text-slate-500 mt-0.5">Bloquea todo el acceso excepto a super administradores.</p>
                     </div>
                     <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                     </button>
                   </div>

                   <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                     <div>
                       <p className="font-bold text-sm text-slate-900">Acuñación Blockchain Automática</p>
                       <p className="text-xs text-slate-500 mt-0.5">Permite a los contratos inteligentes mintear credenciales.</p>
                     </div>
                     <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500 transition-colors">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                     </button>
                   </div>
                </div>

                {/* API Storage */}
                <div className="space-y-6">
                   <h3 className="font-bold text-slate-900 mb-4">Limpieza y Control de Datos</h3>
                   
                   <div className="p-4 border border-red-100 bg-red-50 rounded-xl">
                      <p className="font-bold text-sm text-red-900 mb-1">Purga de Cache Global</p>
                      <p className="text-xs text-red-700 mb-4">Fuerza una re-sincronización total de toda la red B2B y Universidades. No impacta proyectos en vivos.</p>
                      <button onClick={() => toast.success("Caché limpiada exitosamente del Clúster.")} className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm">
                        Ejecutar Purga de Cache
                      </button>
                   </div>

                   <div className="p-4 border border-slate-200 rounded-xl">
                      <p className="font-bold text-sm text-slate-900 mb-1">Reiniciar Logs de Instancia</p>
                      <p className="text-xs text-slate-500 mb-4">Limpia la consola LATEST_LOGS de los paneles operativos.</p>
                      <button onClick={() => toast.success("Logs truncados exitosamente.")} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm">
                        Limpiar Registros 
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Revoke Modal DANGER ZONE */}
      {revokeTarget && (
        <>
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-red-100">
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                 <ShieldAlert className="h-6 w-6 text-red-600" />
               </div>
               <h3 className="text-center text-lg font-bold text-slate-900">Revocar Credencial</h3>
               <p className="mt-2 text-center text-sm text-slate-500">
                 Estás a punto de anular e invalidar de la blockchain institucional la credencial <strong className="text-slate-900">'{revokeTarget.badge}'</strong> de <strong className="text-slate-900">{revokeTarget.student}</strong>.
               </p>
               <form onSubmit={handleRevoke} className="mt-6">
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                   Para continuar, escribe "CONFIRMAR"
                 </label>
                 <input 
                   type="text" 
                   value={revokeConfirmText}
                   onChange={e => setRevokeConfirmText(e.target.value)}
                   className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm uppercase outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                   placeholder="Escribe CONFIRMAR"
                   required
                 />
                 <div className="mt-6 flex justify-end gap-3">
                   <button 
                     type="button" 
                     onClick={() => setRevokeTarget(null)}
                     className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                   >
                     Cancelar
                   </button>
                   <button 
                     type="submit" 
                     disabled={revokeConfirmText !== "CONFIRMAR"}
                     className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                   >
                     Destruir Credencial
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

function LayersIcon(props: any) {
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}
