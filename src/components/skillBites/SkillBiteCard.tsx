/**
 * SkillBiteCard Component
 * Tarjeta interactiva de micro-retos con validación en tiempo real
 * Soporta múltiples tipos: multiple-choice, code-snippet, text-input, drag-drop
 */

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SkillBiteQuestion } from './types';
import { useSkillValidation } from './useSkillValidation';
import { SkillProgressRing } from './SkillProgressRing';

interface SkillBiteCardProps {
  question: SkillBiteQuestion;
  onComplete?: (response: any) => void;
  initialLevel?: number;
}

// Esquema de validación con Zod
const createValidationSchema = (questionType: string) => {
  return z.object({
    answer: z.string().min(1, 'La respuesta es requerida'),
  });
};

type FormInputs = {
  answer: string;
};

export const SkillBiteCard = ({
  question,
  onComplete,
  initialLevel = 0,
}: SkillBiteCardProps) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [isFlipped, setIsFlipped] = useState(false);

  const { status, response, validateAnswer, reset } = useSkillValidation({
    skillTag: question.skillTag,
    correctAnswer: question.correctAnswer,
    points: question.points,
    difficulty: question.difficulty,
  });

  const schema = createValidationSchema(question.type);
  const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const validationResponse = await validateAnswer(data.answer);
      setCurrentLevel(validationResponse.newSkillLevel);

      if (onComplete) {
        onComplete({
          questionId: question.id,
          userAnswer: data.answer,
          isCorrect: validationResponse.isCorrect,
          pointsEarned: validationResponse.pointsEarned,
        });
      }
    } catch (error) {
      console.error('Error durante validación:', error);
    }
  };

  const handleNext = () => {
    reset();
    resetForm();
    setIsFlipped(false);
  };

  // Renderizar según el tipo de pregunta
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Simular selección
                  handleSubmit(async () => {
                    await onSubmit({ answer: option });
                  })();
                }}
                className="w-full p-3 text-left rounded-lg border border-gray-700 bg-gray-800/30 hover:bg-gray-800/60 text-gray-200 transition-colors duration-200"
              >
                <span className="text-sm">{option}</span>
              </motion.button>
            ))}
          </div>
        );

      case 'code-snippet':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Completa el fragmento de código</span>
              </div>
              <code className="text-sm text-gray-300 font-mono">{question.content}</code>
            </div>
            <Textarea
              {...register('answer')}
              placeholder="Escribe tu respuesta aquí..."
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              rows={4}
            />
            {errors.answer && (
              <p className="text-xs text-red-400">{errors.answer.message}</p>
            )}
            <Button
              type="submit"
              disabled={status === 'validating'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {status === 'validating' ? 'Validando...' : 'Enviar respuesta'}
            </Button>
          </form>
        );

      case 'text-input':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('answer')}
              type="text"
              placeholder="Escribe tu respuesta..."
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.answer && (
              <p className="text-xs text-red-400">{errors.answer.message}</p>
            )}
            <Button
              type="submit"
              disabled={status === 'validating'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {status === 'validating' ? 'Validando...' : 'Verificar'}
            </Button>
          </form>
        );

      default:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('answer')}
              type="text"
              placeholder="Escribe tu respuesta..."
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button
              type="submit"
              disabled={status === 'validating'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {status === 'validating' ? 'Validando...' : 'Enviar'}
            </Button>
          </form>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Card principal */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl border border-gray-800 p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Progress Ring en esquina superior derecha */}
        <div className="absolute top-6 right-6">
          <SkillProgressRing
            level={currentLevel}
            skillTag={question.skillTag}
            size={100}
            strokeWidth={3}
          />
        </div>

        {/* Header */}
        <div className="pr-32 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-2 py-1 bg-blue-900/40 rounded text-blue-300 text-xs font-semibold uppercase tracking-wide">
              {question.difficulty}
            </span>
            <span className="inline-block px-2 py-1 bg-gray-800 rounded text-gray-400 text-xs font-semibold">
              +{question.points} pts
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {question.title}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {question.description}
          </p>
        </div>

        {/* Contenido de la pregunta */}
        <div className="my-8">
          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.div
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderQuestionContent()}
              </motion.div>
            ) : status === 'validating' ? (
              <motion.div
                key="validating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 gap-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-2 border-gray-700 border-t-blue-400 rounded-full"
                />
                <p className="text-gray-400 text-sm">Calculando tu respuesta...</p>
              </motion.div>
            ) : status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-lg border ${
                  response?.isCorrect
                    ? 'bg-green-900/20 border-green-700'
                    : 'bg-red-900/20 border-red-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      response?.isCorrect
                        ? 'bg-green-900/40 text-green-300'
                        : 'bg-red-900/40 text-red-300'
                    }`}
                  >
                    {response?.isCorrect ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <X className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold mb-2 ${
                        response?.isCorrect
                          ? 'text-green-300'
                          : 'text-red-300'
                      }`}
                    >
                      {response?.feedback}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      {response?.explanation}
                    </p>
                    {response?.isCorrect && (
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-200">
                          +{response?.pointsEarned} puntos ganados
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Button siguiente */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mt-8"
          >
            <Button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Siguiente
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Revisar respuesta
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
