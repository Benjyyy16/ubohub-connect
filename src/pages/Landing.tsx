import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import AuthModal from "@/components/AuthModal";

const Landing = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar
        onLogin={() => setModalOpen(true)}
        onStart={() => setModalOpen(true)}
      />
      <HeroSection
        onStudentLogin={() => setModalOpen(true)}
        onDemo={() => {}}
      />
      <LogoMarquee />
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Landing;
