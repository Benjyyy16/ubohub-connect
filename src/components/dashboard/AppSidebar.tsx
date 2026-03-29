import {
  BookOpen, GraduationCap, Building2, Link2, ShieldCheck,
  ToggleRight, Settings, HelpCircle, LogOut, Sparkles
} from "lucide-react";

type ViewType = "student" | "professor" | "admin";

interface Props {
  activeView: ViewType;
  onToggle: (view: ViewType) => void;
}

const NAV_ITEMS: { key: ViewType; label: string; icon: typeof BookOpen }[] = [
  { key: "student", label: "Estudiante", icon: BookOpen },
  { key: "professor", label: "Profesor", icon: GraduationCap },
  { key: "admin", label: "Institución", icon: Building2 },
];

const INTEGRATIONS = [
  { name: "Azure AD / Google SSO", status: "Conectado", active: true },
  { name: "Canvas LMS API", status: "Conectado", active: true },
  { name: "Blackboard Data Sync", status: "Pendiente", active: false },
];

const AppSidebar = ({ activeView, onToggle }: Props) => {
  return (
    <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:border-r lg:border-border lg:bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-foreground">
          Talent<span className="text-primary">Link</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Vistas
        </p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onToggle(item.key)}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 ${
              activeView === item.key
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}

        {/* Integrations */}
        <div className="mt-6">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Integraciones Institucionales
          </p>
          <div className="space-y-1">
            {INTEGRATIONS.map((int) => (
              <div
                key={int.name}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[12px] text-muted-foreground"
              >
                <Link2 className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1 truncate">{int.name}</span>
                <ToggleRight
                  className={`h-4 w-4 shrink-0 ${int.active ? "text-success" : "text-muted-foreground/40"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-6">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Seguridad
          </p>
          <div className="space-y-1.5 px-2">
            {[
              { icon: ShieldCheck, text: "Cumplimiento GDPR" },
              { icon: ShieldCheck, text: "Cifrado End-to-End" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <badge.icon className="h-3 w-3 text-success" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-border px-3 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings className="h-4 w-4" /> Configuración
        </button>
        <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <HelpCircle className="h-4 w-4" /> Ayuda
        </button>
        <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-destructive/70 transition-colors hover:bg-destructive/5 hover:text-destructive">
          <LogOut className="h-4 w-4" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
