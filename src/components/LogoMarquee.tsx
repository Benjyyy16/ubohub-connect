import { Building2, GraduationCap, Landmark, Library, School } from "lucide-react";

const units = [
  { name: "Facultad de Ingeniería, Ciencia y Tecnología", icon: Building2 },
  { name: "Facultad de Educación", icon: GraduationCap },
  { name: "Facultad de Ciencias de la Salud", icon: School },
  { name: "Vicerrectoría Académica", icon: Landmark },
  { name: "Dirección de Innovación", icon: Library },
];

const LogoMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-border bg-white py-10">
      <p className="mb-7 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Ecosistema institucional preparado para conectar unidades UBO
      </p>
      <div className="relative">
        <div className="flex w-max animate-marquee">
          {[...units, ...units, ...units].map(({ name, icon: Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-8 flex items-center gap-2 whitespace-nowrap text-muted-foreground"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
