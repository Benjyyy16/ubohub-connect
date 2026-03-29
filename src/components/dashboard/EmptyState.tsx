import { FolderOpen, Plus, Upload } from "lucide-react";

interface Props {
  onCreateNew: () => void;
}

const EmptyState = ({ onCreateNew }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface py-16 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
        <FolderOpen className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">Sin iniciativas activas</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Crea tu primera iniciativa o importa proyectos existentes para comenzar a conectar con talento estudiantil.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onCreateNew}
          className="btn-press flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Nueva Iniciativa
        </button>
        <button className="btn-press flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Upload className="h-4 w-4" /> Importar desde Syllabus
        </button>
      </div>
      <button className="mt-3 text-xs font-medium text-primary transition-colors hover:text-primary/80">
        Cargar Proyectos de Muestra (Demo)
      </button>
    </div>
  );
};

export default EmptyState;
