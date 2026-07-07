import { Search, MapPin, Building2, GraduationCap, ChevronRight } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import { useState } from "react";
import { toast } from "sonner";

export default function Directorio() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success("Resultados encontrados (simulación)");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <TopBar />
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">

        <div className="text-center mb-10 mt-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Directorio de Talento B2B</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Encuentra estudiantes certificados, profesores investigadores y oportunidades corporativas en segundos.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          <Search className="h-6 w-6 text-slate-400 ml-4 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por habilidad, rol, universidad o empresa..."
            className="flex-1 bg-transparent px-2 py-4 text-base font-medium outline-none text-slate-900 placeholder:text-slate-400"
          />
          <button type="submit" disabled={isSearching} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl ml-2 shadow-sm transition-colors mr-1">
            {isSearching ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-3" /> : "Buscar"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Talento Estudiantil</h3>
            <p className="text-sm text-slate-500 mb-4">Explora portafolios verificados de estudiantes listos para la inserción laboral.</p>
            <div className="flex items-center text-sm font-bold text-blue-600">Ver perfiles <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Socios Corporativos</h3>
            <p className="text-sm text-slate-500 mb-4">Empresas B2B buscando talento y publicando oportunidades exclusivas.</p>
            <div className="flex items-center text-sm font-bold text-purple-600">Ver empresas <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Proyectos de Innovación</h3>
            <p className="text-sm text-slate-500 mb-4">Iniciativas abiertas orquestadas por profesores e investigadores.</p>
            <div className="flex items-center text-sm font-bold text-emerald-600">Ver proyectos <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></div>
          </div>
        </div>
      </main>
    </div>
  );
}
