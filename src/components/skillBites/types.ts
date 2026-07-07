/**
 * Types para el módulo Skill Check Bites
 * Micro-evaluaciones gamificadas y validación de habilidades
 */

export type SkillBiteType = 'multiple-choice' | 'code-snippet' | 'text-input' | 'drag-drop';

export type ValidationStatus = 'idle' | 'validating' | 'success' | 'error';

export interface SkillBiteQuestion {
  id: string;
  title: string;
  description: string;
  type: SkillBiteType;
  content: string;
  options?: string[]; // Para multiple-choice
  correctAnswer: string | string[]; // Respuesta correcta
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skillTag: string; // Ej: "React", "TypeScript", "Python"
  points: number;
  explanation: string; // Explicación de la respuesta correcta
}

export interface SkillBiteRoute {
  id: string;
  name: string;
  description: string;
  icon: string;
  skillLevel: number; // 0-100
  skillPercentage: number; // 0-100
  questionsCount: number;
  completedCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: string; // Tailwind color class
  questions: SkillBiteQuestion[];
}

export interface SkillBiteProgress {
  routeId: string;
  userId: string;
  completedQuestions: string[];
  totalPoints: number;
  currentLevel: number;
  startedAt: Date;
  lastUpdatedAt: Date;
}

export interface UserSkillProfile {
  userId: string;
  skills: {
    skillTag: string;
    level: number; // 0-100
    lastValidated: Date;
    points: number;
  }[];
}

export interface ValidateSkillResponse {
  isCorrect: boolean;
  feedback: string;
  pointsEarned: number;
  newSkillLevel: number;
  explanation: string;
}
