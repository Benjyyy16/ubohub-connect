import { useState, useCallback } from "react";
import TopBar from "@/components/dashboard/TopBar";
import StudentView from "@/components/dashboard/StudentView";
import ProfessorView from "@/components/dashboard/ProfessorView";

const Index = () => {
  const [activeView, setActiveView] = useState<"student" | "professor">("student");
  const [viewKey, setViewKey] = useState(0);

  const handleToggle = useCallback((view: "student" | "professor") => {
    setActiveView(view);
    setViewKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar activeView={activeView} onToggle={handleToggle} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div key={viewKey} className="view-enter">
          {activeView === "student" ? <StudentView /> : <ProfessorView />}
        </div>
      </main>
    </div>
  );
};

export default Index;
