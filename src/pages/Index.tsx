import { useState, useEffect } from "react";
import TopBar from "@/components/dashboard/TopBar";
import StudentView from "@/components/dashboard/StudentView";
import ProfessorView from "@/components/dashboard/ProfessorView";
import AdminView from "@/components/dashboard/AdminView";
import BadgeUnboxing from "@/components/dashboard/BadgeUnboxing";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showBadgeUnboxing, setShowBadgeUnboxing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <TopBar onBadgeNotifClick={() => setShowBadgeUnboxing(true)} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="view-enter">
          {currentUser.role === "student" && <StudentView />}
          {currentUser.role === "professor" && <ProfessorView />}
          {currentUser.role === "admin" && <AdminView />}
          {currentUser.role === "business" && (
            <div className="text-center py-20">
              Redirigiendo al portal B2B empresarial...
            </div>
          )}
        </div>
      </main>
      <BadgeUnboxing open={showBadgeUnboxing} onClose={() => setShowBadgeUnboxing(false)} />
    </div>
  );
};

export default Index;
