import { Send, Users, Search, MoreVertical, Paperclip } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { useState } from "react";
import { toast } from "sonner";

export default function Mensajes() {
  const [msg, setMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMsg("");
      toast.success("Mensaje enviado (simulación)");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans h-screen overflow-hidden">
      <TopBar />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 flex gap-4 overflow-hidden h-full">
        {/* Sidebar */}
        <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" /> Mensajes
            </h2>
            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">2 Nuevos</div>
          </div>
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input type="text" placeholder="Buscar conversaciones..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Contact 1 */}
            <button className="w-full text-left p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 flex items-center gap-3 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
              <div className="relative h-10 w-10 bg-slate-200 rounded-full overflow-hidden shrink-0">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Profesor" alt="Profesor" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-sm font-bold text-slate-900 truncate">Prof. Carlos Muñoz</p>
                  <p className="text-[10px] text-blue-600 font-semibold">10:45 AM</p>
                </div>
                <p className="text-xs text-slate-600 truncate font-medium">Revisé tu perfil para el proyecto IoT...</p>
              </div>
            </button>
            {/* Contact 2 */}
            <button className="w-full text-left p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 flex items-center gap-3">
              <div className="relative h-10 w-10 bg-slate-200 rounded-full overflow-hidden shrink-0">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Ana" alt="HR" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-sm font-bold text-slate-700 truncate">TechCorp Global HR</p>
                  <p className="text-[10px] text-slate-400">Ayer</p>
                </div>
                <p className="text-xs text-slate-500 truncate">Hola, ¿tienes disponibilidad para una...</p>
              </div>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Profesor" alt="Profesor" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Prof. Carlos Muñoz</h3>
                <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 block"></span> En línea ahora
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2"><MoreVertical className="h-5 w-5" /></button>
          </div>

          <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto flex flex-col gap-4">
            <div className="text-center font-mono text-[10px] text-slate-400 uppercase tracking-widest my-4">Ayer, 10:45 AM</div>
            {/* Bubble 1 */}
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm">
                Hola. Estaba revisando el directorio interno y vi que tienes una certificación validada en React y UX. Estamos levantando un proyecto de IoT, ¿te interesaría participar?
              </div>
            </div>
          </div>

          <div className="h-20 border-t border-slate-100 bg-white p-4 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2 h-full">
              <button type="button" className="text-slate-400 hover:text-blue-600 px-3 cursor-pointer transition-colors"><Paperclip className="h-5 w-5" /></button>
              <input 
                type="text" 
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Escribe tu mensaje..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none" 
              />
              <button 
                type="submit" 
                disabled={isSending || !msg.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg px-4 flex items-center justify-center transition-colors"
               >
                 {isSending ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
               </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
