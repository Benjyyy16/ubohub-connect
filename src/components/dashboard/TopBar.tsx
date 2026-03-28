import { Bell, Search, GraduationCap, BookOpen, Sparkles } from "lucide-react";

interface TopBarProps {
  activeView: "student" | "professor";
  onToggle: (view: "student" | "professor") => void;
}

const TopBar = ({ activeView, onToggle }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
            <Sparkles className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Talent<span className="text-primary">Link</span>
          </span>
        </div>

        {/* View Toggle */}
        <div className="relative flex h-10 items-center rounded-full bg-muted p-1">
          <div
            className="absolute h-8 rounded-full bg-primary shadow-md shadow-primary/20 transition-all duration-300 ease-out"
            style={{
              width: "calc(50% - 4px)",
              left: activeView === "student" ? "4px" : "calc(50%)",
            }}
          />
          <button
            onClick={() => onToggle("student")}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
              activeView === "student"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Estudiante
          </button>
          <button
            onClick={() => onToggle("professor")}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
              activeView === "professor"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Profesor
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-light ring-2 ring-primary/10">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Maria"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
