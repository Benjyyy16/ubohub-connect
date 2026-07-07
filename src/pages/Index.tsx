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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.75),transparent_34%),radial-gradient(circle_at_top_right,rgba(204,251,241,0.65),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#f8fafc_100%)]">
      <TopBar onBadgeNotifClick={() => setShowBadgeUnboxing(true)} />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="view-enter">
          {currentUser.role === "student" && <StudentView />}
          {currentUser.role === "professor" && <ProfessorView />}
          {currentUser.role === "admin" && <AdminView />}
          {currentUser.role === "business" && (
            <div className="text-center py-20">
              Rol no habilitado en el piloto institucional UBOHub.
            </div>
          )}
        </div>
      </main>
      <BadgeUnboxing open={showBadgeUnboxing} onClose={() => setShowBadgeUnboxing(false)} />
    </div>
  );
};

export default Index;
