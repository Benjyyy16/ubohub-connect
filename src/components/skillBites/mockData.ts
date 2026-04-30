/**
 * Datos de ejemplo para el módulo Skill Check Bites
 * Simula las rutas y preguntas disponibles
 */

import { SkillBiteRoute } from './types';

export const mockSkillBiteRoutes: SkillBiteRoute[] = [
  {
    id: 'react-hooks',
    name: 'React Hooks',
    description:
      'Domina los hooks fundamentales de React: useState, useEffect, useContext y más.',
    icon: 'React',
    skillLevel: 65,
    skillPercentage: 65,
    questionsCount: 5,
    completedCount: 3,
    difficulty: 'beginner',
    color: 'blue',
    questions: [
      {
        id: 'react-1',
        title: '¿Cuál es el propósito de useState?',
        description:
          'React Hook que permite agregar estado a componentes funcionales.',
        type: 'multiple-choice',
        content: 'useState permite:',
        options: [
          'Crear estado local en componentes funcionales',
          'Solo en componentes de clase',
          'Gestionar rutas de la aplicación',
          'Validar formularios automáticamente',
        ],
        correctAnswer: 'Crear estado local en componentes funcionales',
        difficulty: 'beginner',
        skillTag: 'React',
        points: 10,
        explanation:
          'useState es el hook que permite crear estado local en componentes funcionales, reemplazando la necesidad de usar this.state en componentes de clase.',
      },
      {
        id: 'react-2',
        title: 'Completa el hook useEffect',
        description: 'Escribe el código correcto para usar useEffect.',
        type: 'code-snippet',
        content: `import { useEffect } from 'react';

export function MyComponent() {
  useEffect(() => {
    console.log('Effect ejecutado');
    return () => {
      console.log('Cleanup ejecutado');
    };
  }, [dependencies]);
  
  return <div>Hola</div>;
}`,
        correctAnswer: '[]',
        difficulty: 'intermediate',
        skillTag: 'React',
        points: 15,
        explanation:
          'Las dependencias [] hacen que el efecto se ejecute solo una vez al montar el componente, similar a componentDidMount.',
      },
      {
        id: 'react-3',
        title: '¿Qué es useContext?',
        description: 'Define el propósito principal de useContext en React.',
        type: 'text-input',
        content: 'useContext permite acceder a valores de context sin envoltura.',
        correctAnswer: 'compartir estado entre componentes sin props',
        difficulty: 'beginner',
        skillTag: 'React',
        points: 10,
        explanation:
          'useContext permite que los componentes consuman valores de un Context sin necesidad de pasar props manualmente a través de toda la jerarquía.',
      },
      {
        id: 'react-4',
        title: 'Reglas de los Hooks',
        description: 'Selecciona las reglas correctas para usar hooks en React.',
        type: 'multiple-choice',
        content: 'Los hooks DEBEN llamarse:',
        options: [
          'Solo en el nivel superior de componentes funcionales',
          'En loops o condicionales',
          'En funciones de utilidad personalizadas',
          'En componentes de clase',
        ],
        correctAnswer: 'Solo en el nivel superior de componentes funcionales',
        difficulty: 'intermediate',
        skillTag: 'React',
        points: 15,
        explanation:
          'Esta es una regla fundamental de React: los hooks siempre deben llamarse en el nivel superior, nunca dentro de loops, condicionales o funciones anidadas.',
      },
      {
        id: 'react-5',
        title: 'useReducer avanzado',
        description:
          'Crea un reducer simple para manejar estado complejo en React.',
        type: 'code-snippet',
        content: `const initialState = { count: 0 };

function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}`,
        correctAnswer: 'reducer',
        difficulty: 'advanced',
        skillTag: 'React',
        points: 20,
        explanation:
          'useReducer es ideal para manejar estado complejo. Recibe un reducer y un estado inicial, retornando el estado actual y un dispatch.',
      },
    ],
  },
  {
    id: 'typescript-basics',
    name: 'TypeScript Basics',
    description:
      'Aprende tipado estático con TypeScript: interfaces, tipos genéricos y más.',
    icon: 'TS',
    skillLevel: 48,
    skillPercentage: 48,
    questionsCount: 4,
    completedCount: 2,
    difficulty: 'beginner',
    color: 'blue',
    questions: [
      {
        id: 'ts-1',
        title: 'Diferencia entre interface y type',
        description: 'Explica la diferencia entre interface y type en TypeScript.',
        type: 'text-input',
        content: 'interface vs type',
        correctAnswer: 'interface es para objetos, type es más flexible',
        difficulty: 'intermediate',
        skillTag: 'TypeScript',
        points: 15,
        explanation:
          'Aunque son similares, interface es específicamente para objetos y puede ser extendida, mientras que type es más versátil y puede ser usado para cualquier tipo.',
      },
      {
        id: 'ts-2',
        title: 'Tipos genéricos',
        description: 'Completa la firma de una función genérica.',
        type: 'code-snippet',
        content: `function obtenerPrimero<T>(arr: T[]): T {
  return arr[0];
}

const num = obtenerPrimero([1, 2, 3]);
const str = obtenerPrimero(['a', 'b', 'c']);`,
        correctAnswer: '<T>',
        difficulty: 'intermediate',
        skillTag: 'TypeScript',
        points: 15,
        explanation:
          'Los genéricos <T> permiten que la función funcione con cualquier tipo mientras mantiene el tipado correcto.',
      },
      {
        id: 'ts-3',
        title: 'Union Types',
        description: 'Define un tipo que puede ser string o number.',
        type: 'multiple-choice',
        content: 'Para un parámetro que acepte string O number, usas:',
        options: [
          'type ID = string | number',
          'type ID = string & number',
          'interface ID extends string, number',
          'type ID = (string, number)',
        ],
        correctAnswer: 'type ID = string | number',
        difficulty: 'beginner',
        skillTag: 'TypeScript',
        points: 10,
        explanation:
          'El operador | (pipe) en TypeScript define un Union Type que permite múltiples tipos.',
      },
      {
        id: 'ts-4',
        title: 'Nunca vs Desconocido',
        description: 'Explica la diferencia entre never y unknown.',
        type: 'text-input',
        content: 'never vs unknown',
        correctAnswer: 'never es imposible de retornar, unknown es cualquier tipo',
        difficulty: 'advanced',
        skillTag: 'TypeScript',
        points: 20,
        explanation:
          'never representa un tipo que nunca ocurre (como una función que siempre lanza), mientras que unknown es el tipo más genérico y seguro.',
      },
    ],
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    description:
      'Domina el desarrollo ágil de interfaces con Tailwind CSS utility-first.',
    icon: 'Tailwind',
    skillLevel: 72,
    skillPercentage: 72,
    questionsCount: 3,
    completedCount: 2,
    difficulty: 'intermediate',
    color: 'cyan',
    questions: [
      {
        id: 'tailwind-1',
        title: 'Responsive Design',
        description: 'Cómo aplicar estilos responsivos con Tailwind.',
        type: 'multiple-choice',
        content: 'Para hacer un elemento más grande en pantallas md:',
        options: [
          'md:text-lg md:p-4',
          '@media md { }',
          ':md-text-lg',
          'screen.md text-lg',
        ],
        correctAnswer: 'md:text-lg md:p-4',
        difficulty: 'beginner',
        skillTag: 'Tailwind',
        points: 10,
        explanation:
          'Tailwind usa prefijos como md:, lg:, xl: para aplicar estilos en diferentes breakpoints.',
      },
      {
        id: 'tailwind-2',
        title: 'Uso de @apply',
        description: 'Cómo reutilizar estilos Tailwind con @apply.',
        type: 'code-snippet',
        content: `@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }
}`,
        correctAnswer: '@apply',
        difficulty: 'intermediate',
        skillTag: 'Tailwind',
        points: 15,
        explanation:
          '@apply permite extraer utilidades comunes en componentes reutilizables dentro de CSS.',
      },
      {
        id: 'tailwind-3',
        title: 'Dark Mode',
        description: 'Activa el modo oscuro en Tailwind CSS.',
        type: 'text-input',
        content: 'dark:',
        correctAnswer: 'dark:bg-gray-900',
        difficulty: 'beginner',
        skillTag: 'Tailwind',
        points: 10,
        explanation:
          'El prefijo dark: aplica estilos cuando el modo oscuro está activado en el proyecto.',
      },
    ],
  },
  {
    id: 'advanced-algorithms',
    name: 'Advanced Algorithms',
    description:
      'Algoritmos complejos: búsqueda, ordenamiento y estructuras de datos.',
    icon: 'Algorithm',
    skillLevel: 0,
    skillPercentage: 0,
    questionsCount: 5,
    completedCount: 0,
    difficulty: 'advanced',
    color: 'red',
    questions: [
      {
        id: 'algo-1',
        title: 'Complejidad temporal',
        description: 'Calcula la complejidad Big O de un algoritmo.',
        type: 'text-input',
        content: 'O(n)',
        correctAnswer: 'O(n)',
        difficulty: 'advanced',
        skillTag: 'Algorithms',
        points: 25,
        explanation: 'O(n) es complejidad lineal, donde el tiempo crece proporcionalmente con n.',
      },
      {
        id: 'algo-2',
        title: 'Búsqueda binaria',
        description: 'Implementa búsqueda binaria.',
        type: 'code-snippet',
        content: `function busquedaBinaria(arr, target) {
  let izq = 0, der = arr.length - 1;
  while (izq <= der) {
    const mid = Math.floor((izq + der) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) izq = mid + 1;
    else der = mid - 1;
  }
  return -1;
}`,
        correctAnswer: 'búsqueda binaria',
        difficulty: 'advanced',
        skillTag: 'Algorithms',
        points: 30,
        explanation:
          'Búsqueda binaria divide el array a la mitad en cada iteración, logrando O(log n).',
      },
      {
        id: 'algo-3',
        title: 'Recursión con memoización',
        description: 'Optimiza recursión con memoización.',
        type: 'text-input',
        content: 'Fibonacci con memoización',
        correctAnswer: 'memoización cache',
        difficulty: 'advanced',
        skillTag: 'Algorithms',
        points: 25,
        explanation:
          'La memoización cachea resultados previos para evitar recálculos innecesarios.',
      },
      {
        id: 'algo-4',
        title: 'Grafos y DFS',
        description: 'Recorre un grafo usando DFS.',
        type: 'code-snippet',
        content: `function dfs(nodo, visitados = new Set()) {
  visitados.add(nodo);
  console.log(nodo);
  for (let vecino of nodo.vecinos) {
    if (!visitados.has(vecino)) {
      dfs(vecino, visitados);
    }
  }
}`,
        correctAnswer: 'DFS',
        difficulty: 'advanced',
        skillTag: 'Algorithms',
        points: 30,
        explanation:
          'DFS (Depth-First Search) explora profundamente antes de explorar anchamente.',
      },
      {
        id: 'algo-5',
        title: 'Dynamic Programming',
        description: 'Resuelve problema de mochila con programación dinámica.',
        type: 'text-input',
        content: '0/1 Knapsack Problem',
        correctAnswer: 'DP tabla',
        difficulty: 'advanced',
        skillTag: 'Algorithms',
        points: 35,
        explanation:
          'Dynamic Programming resuelve problemas reutilizando soluciones de subproblemas.',
      },
    ],
  },
];
