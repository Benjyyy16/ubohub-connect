import { Search, Menu, BookOpen, GraduationCap, Building2 } from "lucide-react";
import NotificationCenter from "./NotificationCenter";

type ViewType = "student" | "professor" | "admin";

interface TopBarProps {
  activeView: ViewType;
  onToggle: (view: ViewType) => void;
  onBadgeNotifClick?: () => void;
}

const TABS: { key: ViewType; label: string; icon: typeof BookOpen }[] = [
  { key: "student", label: "Estudiante", icon: BookOpen },
  { key: "professor", label: "Profesor", icon: GraduationCap },
  { key: "admin", label: "Institución", icon: Building2 },
];

const TopBar = ({ activeView, onToggle, onBadgeNotifClick }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      {/* Mobile: logo + menu */}
      <div className="flex items-center gap-3 lg:hidden">
        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-foreground">
          Talent<span className="text-primary">Link</span>
        </span>
      </div>

      {/* Mobile tabs */}
      <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5 lg:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onToggle(tab.key)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
              activeView === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* Desktop: breadcrumb-style label */}
      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <span className="text-sm text-muted-foreground">Panel</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-sm font-medium text-foreground">
          {TABS.find(t => t.key === activeView)?.label}
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Search className="h-4 w-4" />
        </button>
        <NotificationCenter onBadgeClick={onBadgeNotifClick} />
        <div className="ml-1 h-7 w-7 overflow-hidden rounded-full bg-muted ring-1 ring-border">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
            alt="Avatar del usuario"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
