import { useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import StudentView from "@/components/dashboard/StudentView";
import ProfessorView from "@/components/dashboard/ProfessorView";

const Index = () => {
  const [activeView, setActiveView] = useState<"student" | "professor">("student");

  return (
    <div className="min-h-screen bg-background">
      <TopBar activeView={activeView} onToggle={setActiveView} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeView === "student" ? <StudentView /> : <ProfessorView />}
      </main>
    </div>
  );
};

export default Index;
