import { useState, useCallback } from "react";
import TopBar from "@/components/dashboard/TopBar";
import AppSidebar from "@/components/dashboard/AppSidebar";
import StudentView from "@/components/dashboard/StudentView";
import ProfessorView from "@/components/dashboard/ProfessorView";
import AdminView from "@/components/dashboard/AdminView";
import BadgeUnboxing from "@/components/dashboard/BadgeUnboxing";

type ViewType = "student" | "professor" | "admin";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("student");
  const [viewKey, setViewKey] = useState(0);
  const [showBadgeUnboxing, setShowBadgeUnboxing] = useState(true);

  const handleToggle = useCallback((view: ViewType) => {
    setActiveView(view);
    setViewKey(k => k + 1);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activeView={activeView} onToggle={handleToggle} />
      <div className="flex flex-1 flex-col">
        <TopBar
          activeView={activeView}
          onToggle={handleToggle}
          onBadgeNotifClick={() => setShowBadgeUnboxing(true)}
        />
        <main className="flex-1 bg-surface px-6 py-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div key={viewKey} className="view-enter">
              {activeView === "student" && <StudentView />}
              {activeView === "professor" && <ProfessorView />}
              {activeView === "admin" && <AdminView />}
            </div>
          </div>
        </main>
      </div>
      <BadgeUnboxing open={showBadgeUnboxing} onClose={() => setShowBadgeUnboxing(false)} />
    </div>
  );
};

export default Index;
