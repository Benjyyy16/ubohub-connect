import { Building2, GraduationCap, Landmark, Library, School } from "lucide-react";

const icons = [Building2, GraduationCap, Landmark, Library, School, Building2, GraduationCap, Landmark, Library, School];
const names = ["U. de Chile", "UTFSM", "UC", "UdeC", "UAI", "U. de Chile", "UTFSM", "UC", "UdeC", "UAI"];

const LogoMarquee = () => {
  return (
    <section className="py-12 bg-secondary border-y border-border/50 overflow-hidden">
      <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium mb-8">
        Universidades que confían en TalentLink
      </p>
      <div className="relative">
        <div className="flex animate-marquee w-max">
          {[...icons, ...icons].map((Icon, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-10 text-muted-foreground/50 hover:text-foreground transition-colors duration-300 cursor-default group"
            >
              <Icon className="size-5" />
              <span className="text-sm font-medium whitespace-nowrap">{names[i % names.length]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
