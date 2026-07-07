import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing.tsx";
import Index from "./pages/Index.tsx";
import PublicProfile from "./pages/PublicProfile.tsx";
import BusinessPortal from "./pages/BusinessPortal.tsx";
import ProjectWorkspace from "./components/dashboard/ProjectWorkspace.tsx";
import Showcase from "./pages/Showcase.tsx";
import SuperAdminCenter from "./pages/SuperAdminCenter.tsx";
import NotFound from "./pages/NotFound.tsx";
import StudentOnboarding from "./pages/StudentOnboarding.tsx";
import TenantSettings from "./pages/TenantSettings.tsx";
import ProjectCreationWizard from "./pages/ProjectCreationWizard.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Soluciones from "./pages/Soluciones.tsx";
import Casos from "./pages/Casos.tsx";
import Configuracion from "./pages/Configuracion.tsx";
import Mensajes from "./pages/Mensajes.tsx";
import Directorio from "./pages/Directorio.tsx";
import AgendarCall from "./pages/AgendarCall.tsx";
import SkillBites from "./pages/SkillBites.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/:projectId" element={<ProjectDetail />} />
          <Route path="/perfil" element={<PublicProfile />} />
          <Route path="/business" element={<BusinessPortal />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/super-admin-command-center" element={<SuperAdminCenter />} />
          <Route path="/onboarding" element={<StudentOnboarding />} />
          <Route path="/tenant-settings" element={<TenantSettings />} />
          <Route path="/wizard" element={<ProjectCreationWizard />} />
          
          {/* Nuevas Vistas y Vistas Autónomas */}
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/agendar" element={<AgendarCall />} />
          <Route path="/skill-bites" element={<SkillBites />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
