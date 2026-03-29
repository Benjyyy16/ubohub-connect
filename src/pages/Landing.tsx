import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import AuthModal from "@/components/AuthModal";
import PricingSection from "@/components/PricingSection";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar
        onLogin={() => { setAuthMode('login'); setModalOpen(true); }}
        onStart={() => { setAuthMode('register'); setModalOpen(true); }}
      />
      <HeroSection
        onStudentLogin={() => { setAuthMode('register'); setModalOpen(true); }}
        onDemo={() => navigate('/agendar')}
      />
      <LogoMarquee />
      <PricingSection />
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default Landing;
