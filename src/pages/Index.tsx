import { useState, useCallback } from "react";
import TopBar from "@/components/dashboard/TopBar";
import StudentView from "@/components/dashboard/StudentView";
import ProfessorView from "@/components/dashboard/ProfessorView";
import AdminView from "@/components/dashboard/AdminView";

type ViewType = "student" | "professor" | "admin";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("student");
  const [viewKey, setViewKey] = useState(0);

  const handleToggle = useCallback((view: ViewType) => {
    setActiveView(view);
    setViewKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar activeView={activeView} onToggle={handleToggle} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div key={viewKey} className="view-enter">
          {activeView === "student" && <StudentView />}
          {activeView === "professor" && <ProfessorView />}
          {activeView === "admin" && <AdminView />}
        </div>
      </main>
    </div>
  );
};

export default Index;
