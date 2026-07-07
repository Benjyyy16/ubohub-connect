/**
 * Página de demostración del módulo Skill Check Bites
 * Ruta: /skill-bites (agregar a App.tsx)
 */

import { SkillBiteDashboard } from '@/components/skillBites';
import { mockSkillBiteRoutes } from '@/components/skillBites/mockData';

export default function SkillBitesPage() {
  const handleRouteComplete = (routeId: string) => {
    console.log(`Ruta completada: ${routeId}`);
    // Aquí iría la lógica para guardar el progreso en el backend
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <SkillBiteDashboard
        routes={mockSkillBiteRoutes}
        onRouteComplete={handleRouteComplete}
      />
    </main>
  );
}
