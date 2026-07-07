/**
 * SkillBiteDashboard Component
 * Vista principal del módulo Skill Check Bites
 * Muestra las rutas de aprendizaje/validación disponibles
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkillBiteRoute, SkillBiteQuestion } from './types';
import { SkillBiteCard } from './SkillBiteCard';
import { SkillProgressRing } from './SkillProgressRing';

interface SkillBiteDashboardProps {
  routes: SkillBiteRoute[];
  onRouteComplete?: (routeId: string) => void;
}

export const SkillBiteDashboard = ({
  routes,
  onRouteComplete,
}: SkillBiteDashboardProps) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedRoutes, setCompletedRoutes] = useState<string[]>([]);

  const activeRoute = selectedRoute
    ? routes.find((r) => r.id === selectedRoute)
    : null;

  const currentQuestion = activeRoute
    ? activeRoute.questions[currentQuestionIndex]
    : null;

  const handleStartRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setCurrentQuestionIndex(0);
  };

  const handleQuestionComplete = () => {
    const totalQuestions = activeRoute?.questions.length || 0;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    if (isLastQuestion) {
      setCompletedRoutes([...completedRoutes, activeRoute?.id || '']);
      if (onRouteComplete && activeRoute) {
        onRouteComplete(activeRoute.id);
      }
      setTimeout(() => {
        setSelectedRoute(null);
        setCurrentQuestionIndex(0);
      }, 2000);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedRoute(null);
    setCurrentQuestionIndex(0);
  };

  // Mostrar tarjeta de pregunta si hay una ruta seleccionada
  if (selectedRoute && activeRoute && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header con información de progreso */}
          <div className="mb-8 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToDashboard}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              ← Volver al dashboard
            </motion.button>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                Pregunta {currentQuestionIndex + 1} de{' '}
                {activeRoute.questions.length}
              </span>
              <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / activeRoute.questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Tarjeta de pregunta */}
          <SkillBiteCard
            key={`${selectedRoute}-${currentQuestionIndex}`}
            question={currentQuestion}
            onComplete={handleQuestionComplete}
            initialLevel={activeRoute.skillLevel}
          />

          {/* Indicador de finalización */}
          {currentQuestionIndex === activeRoute.questions.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg text-center text-green-300 text-sm"
            >
              ¡Esta es la última pregunta de la ruta!
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard principal mostrando todas las rutas
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Skill Check Bites
            </h1>
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Micro-evaluaciones gamificadas para validar tus habilidades y
            construir tu portafolio verificado
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700"
          >
            <div className="text-sm text-gray-400 mb-2">Rutas Disponibles</div>
            <div className="text-3xl font-bold text-white">{routes.length}</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700"
          >
            <div className="text-sm text-gray-400 mb-2">Completadas</div>
            <div className="text-3xl font-bold text-green-400">{completedRoutes.length}</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700"
          >
            <div className="text-sm text-gray-400 mb-2">Progreso Total</div>
            <div className="text-3xl font-bold text-blue-400">
              {routes.length > 0
                ? Math.round(
                    (routes.reduce((sum, r) => sum + r.skillPercentage, 0) /
                      routes.length)
                  )
                : 0}
              %
            </div>
          </motion.div>
        </div>

        {/* Grid de rutas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {routes.map((route, idx) => {
              const isCompleted = completedRoutes.includes(route.id);
              const isLocked = route.difficulty === 'advanced' && !isCompleted;

              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={!isLocked ? { y: -8 } : {}}
                  className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isLocked
                      ? 'bg-gray-900 border-gray-800 opacity-60'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10'
                  }`}
                >
                  {/* Badge de completado */}
                  {isCompleted && (
                    <motion.div
                      className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓ Completado
                    </motion.div>
                  )}

                  {/* Lock badge */}
                  {isLocked && (
                    <div className="absolute top-4 right-4 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Bloqueado
                    </div>
                  )}

                  <div className="p-6 h-full flex flex-col">
                    {/* Skill Ring */}
                    <div className="mb-6 flex justify-center">
                      <SkillProgressRing
                        level={route.skillLevel}
                        skillTag={route.name}
                        size={90}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {route.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {route.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide ${
                            route.difficulty === 'beginner'
                              ? 'bg-blue-900/40 text-blue-300'
                              : route.difficulty === 'intermediate'
                              ? 'bg-purple-900/40 text-purple-300'
                              : 'bg-red-900/40 text-red-300'
                          }`}
                        >
                          {route.difficulty}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-gray-300">
                          {route.completedCount}/{route.questionsCount} preguntas
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          initial={{ width: '0%' }}
                          animate={{
                            width: `${route.skillPercentage}%`,
                          }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        {route.skillPercentage}% completado
                      </div>
                    </div>

                    {/* Button */}
                    <motion.button
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      onClick={() => handleStartRoute(route.id)}
                      disabled={isLocked}
                      className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                        isLocked
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : isCompleted
                          ? 'bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-4 h-4" /> Bloqueado
                        </>
                      ) : isCompleted ? (
                        <>
                          <span>Revisar</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Comenzar</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {routes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No hay rutas disponibles en este momento.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
