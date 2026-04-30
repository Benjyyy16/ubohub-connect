/**
 * Hook personalizado para validación de habilidades
 * Maneja la lógica de la mutación y el estado de validación
 */

import { useState, useCallback } from 'react';
import { ValidateSkillResponse } from './types';

interface UseSkillValidationProps {
  skillTag: string;
  correctAnswer: string | string[];
  points: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const useSkillValidation = ({
  skillTag,
  correctAnswer,
  points,
  difficulty,
}: UseSkillValidationProps) => {
  const [status, setStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<ValidateSkillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Simula una mutación asíncrona al backend
   * En producción, esto llamaría a un endpoint de IA
   */
  const validateAnswer = useCallback(
    async (userAnswer: string): Promise<ValidateSkillResponse> => {
      setStatus('validating');
      setError(null);

      try {
        // Simular delay de 1.5 segundos (como si fuera una llamada IA real)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Lógica de validación
        const isCorrect = Array.isArray(correctAnswer)
          ? correctAnswer.some(
              (answer) =>
                answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
            )
          : correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

        // Cálculo dinámico del nivel de habilidad
        const baseMultiplier = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 1.5 : 2;
        const pointsEarned = isCorrect ? Math.floor(points * baseMultiplier) : 0;
        const newSkillLevel = Math.min(isCorrect ? Math.floor(Math.random() * 20) + 50 : 0, 100);

        const validationResponse: ValidateSkillResponse = {
          isCorrect,
          feedback: isCorrect
            ? `¡Excelente! Has validado tu habilidad en ${skillTag}`
            : `La respuesta no es correcta. Intenta de nuevo.`,
          pointsEarned,
          newSkillLevel,
          explanation: isCorrect
            ? `Tu respuesta fue precisa. Has ganado ${pointsEarned} puntos.`
            : `Revisa la explicación correcta y vuelve a intentarlo.`,
        };

        setResponse(validationResponse);
        setStatus('success');
        return validationResponse;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error en validación';
        setError(errorMessage);
        setStatus('error');
        throw err;
      }
    },
    [correctAnswer, skillTag, points, difficulty]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setResponse(null);
    setError(null);
  }, []);

  return {
    status,
    response,
    error,
    validateAnswer,
    reset,
  };
};
