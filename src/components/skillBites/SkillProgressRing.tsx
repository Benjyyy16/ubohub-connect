/**
 * SkillProgressRing Component
 * Componente visual que muestra el progreso del nivel de habilidad en tiempo real
 * Usa SVG para máxima personalización y performance
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SkillProgressRingProps {
  level: number; // 0-100
  skillTag: string;
  size?: number; // Tamaño del círculo en píxeles
  strokeWidth?: number;
  showLabel?: boolean;
}

export const SkillProgressRing = ({
  level,
  skillTag,
  size = 120,
  strokeWidth = 4,
  showLabel = true,
}: SkillProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (level / 100) * circumference;

  // Determina el color basado en el nivel
  const getColor = useMemo(() => {
    if (level >= 80) return '#00d9ff'; // Cian brillante (éxito)
    if (level >= 60) return '#0066ff'; // Azul claro primario
    if (level >= 40) return '#6b7280'; // Gris
    return '#374151'; // Gris más oscuro
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Fondo del ring */}
        <svg
          width={size}
          height={size}
          className="absolute inset-0"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Círculo de fondo (track) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1f2937"
            strokeWidth={strokeWidth}
          />

          {/* Círculo de progreso animado */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 102, 255, 0.3))' }}
          />
        </svg>

        {/* Texto central */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-lg font-bold text-white"
              animate={{ opacity: [0.7, 1] }}
              transition={{ duration: 0.5 }}
            >
              {level}%
            </motion.div>
          </div>
        )}
      </div>

      {/* Label de habilidad */}
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          {skillTag}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {level >= 80 && 'Experto'}
          {level >= 60 && level < 80 && 'Intermedio'}
          {level >= 40 && level < 60 && 'Principiante'}
          {level < 40 && 'Sin validar'}
        </p>
      </div>
    </div>
  );
};
