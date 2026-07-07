import {
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Database,
  FileCheck2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  LineChart,
  Network,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export type ProjectStatus = "abierto" | "en_revision" | "cerrado";
export type ApplicationStatus = "enviada" | "en_revision" | "aceptada" | "rechazada";
export type BadgeLevel = "básico" | "intermedio" | "avanzado";

export interface UboProject {
  id: string;
  title: string;
  description: string;
  faculty: string;
  professorId: string;
  professorName: string;
  requiredSkills: string[];
  interests: string[];
  modality: string;
  duration: string;
  availableSlots: number;
  deadline: string;
  status: ProjectStatus;
  matchScore: number;
  applicationsCount: number;
  interdisciplinary: boolean;
  badgeReward: string;
}

export interface UboStudent {
  id: string;
  name: string;
  email: string;
  career: string;
  year: string;
  faculty: string;
  skills: string[];
  interests: string[];
  availability: string;
  experienceLevel: string;
  profileCompletion: number;
  badges: string[];
  applications: string[];
  recommendedProjects: string[];
}

export interface UboProfessor {
  id: string;
  name: string;
  faculty: string;
  department: string;
  activeProjects: string[];
  email: string;
}

export interface UboApplication {
  id: string;
  studentId: string;
  projectId: string;
  status: ApplicationStatus;
  matchScore: number;
  submittedAt: string;
  note: string;
}

export interface UboBadge {
  id: string;
  name: string;
  skill: string;
  level: BadgeLevel;
  issuedBy: string;
  projectId: string;
  verified: boolean;
  issuedAt: string;
}

export interface UboKpis {
  publishedProjects: number;
  totalApplications: number;
  successfulMatches: number;
  adoptionRate: number;
  satisfactionScore: number;
  retentionRate: number;
  issuedBadges: number;
  matchPrecision: number;
}

export const professors: UboProfessor[] = [
  {
    id: "prof-1",
    name: "Dra. Carmen López Rojas",
    faculty: "Facultad de Educación",
    department: "Laboratorio de Innovación Pedagógica UBO",
    activeProjects: ["proj-1", "proj-4"],
    email: "carmen.lopez@ubo.cl",
  },
  {
    id: "prof-2",
    name: "Dr. Andrés Muñoz Vega",
    faculty: "Facultad de Ingeniería, Ciencia y Tecnología",
    department: "Laboratorio de Datos e IoT",
    activeProjects: ["proj-2"],
    email: "andres.munoz@ubo.cl",
  },
  {
    id: "prof-3",
    name: "Dra. Paula Herrera Medina",
    faculty: "Facultad de Ciencias Sociales",
    department: "Unidad de Trayectorias Estudiantiles",
    activeProjects: ["proj-3"],
    email: "paula.herrera@ubo.cl",
  },
];

export const projects: UboProject[] = [
  {
    id: "proj-1",
    title: "App de apoyo lector para escuelas rurales",
    description: "Diseño y validación de una herramienta móvil para reforzar comprensión lectora en establecimientos rurales con baja conectividad.",
    faculty: "Educación + Ingeniería",
    professorId: "prof-1",
    professorName: "Dra. Carmen López Rojas",
    requiredSkills: ["React", "UX Research", "Accesibilidad"],
    interests: ["EdTech", "Inclusión", "Educación rural"],
    modality: "Híbrida",
    duration: "12 semanas",
    availableSlots: 4,
    deadline: "15 julio 2026",
    status: "abierto",
    matchScore: 96,
    applicationsCount: 18,
    interdisciplinary: true,
    badgeReward: "Diseño UX Inclusivo",
  },
  {
    id: "proj-2",
    title: "Dashboard IoT de calidad ambiental en campus",
    description: "Integración de sensores, limpieza de datos y visualización para monitorear condiciones ambientales del campus UBO.",
    faculty: "Ingeniería + Ciencias de la Salud",
    professorId: "prof-2",
    professorName: "Dr. Andrés Muñoz Vega",
    requiredSkills: ["Python", "SQL", "Visualización"],
    interests: ["Sustentabilidad", "Datos", "Salud ambiental"],
    modality: "Presencial",
    duration: "10 semanas",
    availableSlots: 3,
    deadline: "30 julio 2026",
    status: "en_revision",
    matchScore: 89,
    applicationsCount: 14,
    interdisciplinary: true,
    badgeReward: "Análisis de Datos",
  },
  {
    id: "proj-3",
    title: "Modelo de alerta temprana para retención estudiantil",
    description: "Prototipo de indicadores de acompañamiento académico con foco en trazabilidad y uso responsable de datos.",
    faculty: "Ciencias Sociales + Informática",
    professorId: "prof-3",
    professorName: "Dra. Paula Herrera Medina",
    requiredSkills: ["Python", "Ética de datos", "Investigación"],
    interests: ["Analítica académica", "Retención", "IA responsable"],
    modality: "Remota",
    duration: "14 semanas",
    availableSlots: 5,
    deadline: "12 agosto 2026",
    status: "abierto",
    matchScore: 84,
    applicationsCount: 22,
    interdisciplinary: true,
    badgeReward: "Investigación Aplicada",
  },
  {
    id: "proj-4",
    title: "Repositorio de insignias verificables para innovación",
    description: "Estandarización de evidencias, rúbricas y microcredenciales para proyectos interdisciplinarios UBO.",
    faculty: "Vicerrectoría Académica",
    professorId: "prof-1",
    professorName: "Dra. Carmen López Rojas",
    requiredSkills: ["Producto", "Base de datos", "Documentación"],
    interests: ["Innovación", "Credenciales", "Arquitectura de datos"],
    modality: "Híbrida",
    duration: "8 semanas",
    availableSlots: 2,
    deadline: "22 agosto 2026",
    status: "abierto",
    matchScore: 78,
    applicationsCount: 9,
    interdisciplinary: false,
    badgeReward: "Gestión de Evidencias",
  },
];

export const applications: UboApplication[] = [
  {
    id: "app-1",
    studentId: "stu-1",
    projectId: "proj-1",
    status: "en_revision",
    matchScore: 96,
    submittedAt: "6 julio 2026",
    note: "Preseleccionada para revisión académica.",
  },
  {
    id: "app-2",
    studentId: "stu-1",
    projectId: "proj-2",
    status: "enviada",
    matchScore: 89,
    submittedAt: "4 julio 2026",
    note: "Pendiente de entrevista técnica.",
  },
  {
    id: "app-3",
    studentId: "stu-2",
    projectId: "proj-1",
    status: "aceptada",
    matchScore: 92,
    submittedAt: "3 julio 2026",
    note: "Aceptado para apoyo de trabajo de campo.",
  },
  {
    id: "app-4",
    studentId: "stu-3",
    projectId: "proj-1",
    status: "en_revision",
    matchScore: 88,
    submittedAt: "5 julio 2026",
    note: "Revisar portafolio de accesibilidad.",
  },
  {
    id: "app-5",
    studentId: "stu-4",
    projectId: "proj-3",
    status: "rechazada",
    matchScore: 71,
    submittedAt: "1 julio 2026",
    note: "No calza disponibilidad mínima.",
  },
];

export const badges: UboBadge[] = [
  {
    id: "badge-1",
    name: "Investigación Aplicada",
    skill: "Diseño de investigación",
    level: "avanzado",
    issuedBy: "Facultad de Ingeniería",
    projectId: "proj-2",
    verified: true,
    issuedAt: "28 marzo 2026",
  },
  {
    id: "badge-2",
    name: "Diseño UX Inclusivo",
    skill: "Accesibilidad y pruebas con usuarios",
    level: "intermedio",
    issuedBy: "Laboratorio de Innovación Pedagógica",
    projectId: "proj-1",
    verified: true,
    issuedAt: "16 abril 2026",
  },
  {
    id: "badge-3",
    name: "Análisis de Datos",
    skill: "Limpieza y visualización de datos",
    level: "intermedio",
    issuedBy: "Vicerrectoría Académica",
    projectId: "proj-3",
    verified: true,
    issuedAt: "3 mayo 2026",
  },
];

export const students: UboStudent[] = [
  {
    id: "stu-1",
    name: "María González Soto",
    email: "maria.gonzalez@ubo.cl",
    career: "Ingeniería Civil en Informática",
    year: "4to año",
    faculty: "Facultad de Ingeniería, Ciencia y Tecnología",
    skills: ["React", "Python", "SQL", "UX Research", "Figma", "Análisis de datos"],
    interests: ["EdTech", "Sustentabilidad", "IA educativa", "Inclusión", "Salud digital"],
    availability: "8 horas semanales",
    experienceLevel: "Intermedio",
    profileCompletion: 86,
    badges: ["badge-1", "badge-2", "badge-3"],
    applications: ["app-1", "app-2"],
    recommendedProjects: ["proj-1", "proj-2", "proj-3", "proj-4"],
  },
  {
    id: "stu-2",
    name: "Carlos Peña Muñoz",
    email: "carlos.pena@ubo.cl",
    career: "Pedagogía en Educación Básica",
    year: "3er año",
    faculty: "Facultad de Educación",
    skills: ["Didáctica", "Evaluación", "Trabajo de campo", "Investigación cualitativa"],
    interests: ["Educación rural", "Lectura", "Aprendizaje activo"],
    availability: "6 horas semanales",
    experienceLevel: "Inicial",
    profileCompletion: 72,
    badges: [],
    applications: ["app-3"],
    recommendedProjects: ["proj-1", "proj-3"],
  },
  {
    id: "stu-3",
    name: "Sofía Morales Riquelme",
    email: "sofia.morales@ubo.cl",
    career: "Diseño Digital",
    year: "5to año",
    faculty: "Facultad de Arquitectura, Arte, Diseño y Comunicaciones",
    skills: ["Figma", "Accesibilidad", "Prototipado", "UX Research"],
    interests: ["Inclusión", "Servicios digitales", "Educación"],
    availability: "10 horas semanales",
    experienceLevel: "Avanzado",
    profileCompletion: 91,
    badges: ["badge-2"],
    applications: ["app-4"],
    recommendedProjects: ["proj-1", "proj-4"],
  },
  {
    id: "stu-4",
    name: "Diego Ramírez Vera",
    email: "diego.ramirez@ubo.cl",
    career: "Ingeniería Civil Industrial",
    year: "4to año",
    faculty: "Facultad de Ingeniería, Ciencia y Tecnología",
    skills: ["Gestión ágil", "Métricas", "Investigación", "Producto"],
    interests: ["Innovación", "Impacto social", "Analítica académica"],
    availability: "5 horas semanales",
    experienceLevel: "Intermedio",
    profileCompletion: 68,
    badges: [],
    applications: ["app-5"],
    recommendedProjects: ["proj-3", "proj-4"],
  },
];

export const kpis: UboKpis = {
  publishedProjects: 58,
  totalApplications: 486,
  successfulMatches: 143,
  adoptionRate: 67,
  satisfactionScore: 91,
  retentionRate: 74,
  issuedBadges: 328,
  matchPrecision: 78,
};

export const pilotGoals = [
  { label: "Proyectos publicados", current: kpis.publishedProjects, target: 80, suffix: "" },
  { label: "Emparejamientos", current: kpis.successfulMatches, target: 200, suffix: "" },
  { label: "Insignias emitidas", current: kpis.issuedBadges, target: 300, suffix: "" },
  { label: "Precisión matching", current: kpis.matchPrecision, target: 70, suffix: "%" },
  { label: "Adopción", current: kpis.adoptionRate, target: 55, suffix: "%" },
];

export const recentActivity = [
  { id: "act-1", type: "postulación", text: "María González postuló a App de apoyo lector", detail: "96% de compatibilidad · Hoy 10:30" },
  { id: "act-2", type: "proyecto", text: "Nueva convocatoria publicada por Dra. Carmen López", detail: "Repositorio de insignias verificables · Hoy 09:15" },
  { id: "act-3", type: "insignia", text: "Insignia Diseño UX Inclusivo emitida", detail: "Validada por Laboratorio de Innovación Pedagógica" },
  { id: "act-4", type: "match", text: "Carlos Peña aceptado en proyecto interdisciplinario", detail: "Educación + Ingeniería · 92% match" },
];

export const riskAlerts = [
  { id: "risk-1", title: "Adopción por debajo de meta en primer año", severity: "media", detail: "67% actual. Reforzar difusión en carreras con baja activación." },
  { id: "risk-2", title: "2 proyectos con menos de 3 postulantes", severity: "alta", detail: "Revisar requisitos o promover en cursos relacionados." },
  { id: "risk-3", title: "11 postulaciones pendientes de revisión", severity: "media", detail: "Priorizar convocatorias con cierre durante julio 2026." },
];

export const managementActions = [
  "Gestionar accesos por rol",
  "Preparar integración INTRANET",
  "Exportar reporte institucional",
  "Revisar métricas del piloto",
];

export const expectedMetrics = [
  { label: "proyectos esperados", value: "80" },
  { label: "emparejamientos", value: "200" },
  { label: "insignias", value: "300" },
  { label: "precisión de matching", value: "70%+" },
];

export const landingSections = {
  problem: [
    "Estudiantes con habilidades reales no siempre encuentran proyectos donde aplicarlas.",
    "Académicos pierden tiempo buscando colaboradores adecuados fuera de un flujo institucional.",
    "La evidencia de participación queda dispersa en correos, planillas y certificados manuales.",
  ],
  solution: [
    { title: "Perfiles vivos", text: "Carrera, año, intereses, disponibilidad, habilidades y evidencias verificables.", icon: GraduationCap },
    { title: "Convocatorias claras", text: "Proyectos con cupos, fechas, facultad, habilidades requeridas y estado de postulación.", icon: BookOpen },
    { title: "Match académico", text: "Ranking de compatibilidad para priorizar postulantes con mejor ajuste al objetivo.", icon: SearchCheck },
    { title: "Insignias verificables", text: "Reconocimiento trazable por horas, competencias y evidencias aprobadas.", icon: ShieldCheck },
  ],
  howItWorks: [
    { step: "01", title: "El estudiante completa su perfil", text: "Declara habilidades, intereses, disponibilidad y experiencia previa." },
    { step: "02", title: "El académico publica una convocatoria", text: "Define objetivo, cupos, requisitos, rúbrica y fecha límite." },
    { step: "03", title: "UBOHub calcula compatibilidad", text: "Ordena postulantes por habilidades, motivación, carrera, disponibilidad e historial." },
    { step: "04", title: "La institución mide avance", text: "Administra KPIs, adopción, satisfacción, retención e insignias emitidas." },
  ],
  modules: [
    { title: "Proyectos", text: "Catálogo institucional con filtros por facultad, estado, habilidades y fecha.", icon: Network },
    { title: "Mi perfil", text: "Ficha académica preparada para integrarse con INTRANET y SSO.", icon: Users },
    { title: "Postulaciones", text: "Seguimiento de estados, entrevistas, selección y cierre de convocatoria.", icon: CheckCircle2 },
    { title: "Insignias", text: "Credenciales por competencia, evidencia, horas y unidad emisora.", icon: Award },
    { title: "Dashboard", text: "Indicadores para estudiante, académico y administrador institucional.", icon: BarChart3 },
    { title: "Datos", text: "Mocks estructurados para migrar luego a PostgreSQL o Supabase.", icon: Database },
  ],
  studentBenefits: ["Descubrir proyectos reales sin depender de contactos informales.", "Postular con perfil completo y evidencias de trabajo.", "Recibir insignias verificables por competencias desarrolladas."],
  academicBenefits: ["Publicar convocatorias en minutos con criterios claros.", "Comparar postulantes por compatibilidad y disponibilidad.", "Cerrar proyectos con evidencia y certificación institucional."],
  metrics: expectedMetrics,
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Insignias", href: "/#insignias" },
  { label: "Dashboard", href: "/dashboard" },
];

export const roleUsers = {
  student: {
    id: "1",
    name: students[0].name,
    email: students[0].email,
    role: "student" as const,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=MariaUBO",
  },
  professor: {
    id: "2",
    name: professors[0].name,
    email: professors[0].email,
    role: "professor" as const,
  },
  admin: {
    id: "3",
    name: "Daniela Fuentes Silva",
    email: "admin.innovacion@ubo.cl",
    role: "admin" as const,
  },
};

export const studentProfile = students[0];
export const academicProfile = professors[0];
export const projectCards = projects;
export const applicationStatuses = applications;
export const adminKpis = [
  { label: "Proyectos publicados", value: kpis.publishedProjects, suffix: "", delta: "+12 este semestre", icon: BookOpen },
  { label: "Postulaciones totales", value: kpis.totalApplications, suffix: "", delta: "+34% vs. marzo", icon: FileCheck2 },
  { label: "Emparejamientos exitosos", value: kpis.successfulMatches, suffix: "", delta: "81% con avance activo", icon: Handshake },
  { label: "Tasa de adopción", value: kpis.adoptionRate, suffix: "%", delta: "estudiantes habilitados", icon: LineChart },
  { label: "Satisfacción", value: kpis.satisfactionScore, suffix: "%", delta: "encuesta piloto", icon: HeartHandshake },
  { label: "Retención", value: kpis.retentionRate, suffix: "%", delta: "continúan en proyecto", icon: Target },
  { label: "Insignias emitidas", value: kpis.issuedBadges, suffix: "", delta: "+46 último mes", icon: Award },
  { label: "Precisión de matching", value: kpis.matchPrecision, suffix: "%", delta: "mínimo esperado 70%", icon: SearchCheck },
];

export const iconSet = {
  Sparkles,
  Clock,
  BrainCircuit,
};
