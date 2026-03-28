import { useState, useEffect, useRef } from "react";
import { Bell, Award, FileText, Mail, Eye, X, Sparkles } from "lucide-react";

interface Notification {
  id: number;
  text: string;
  detail?: string;
  type: "badge" | "pdf" | "invite";
  unread: boolean;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, text: "¡Insignia 'Python Interdisciplinario' otorgada!", detail: "Emitida por Prof. Ramírez · Fac. de Ciencias", type: "badge", unread: true, time: "Hace 5 min" },
  { id: 2, text: "Tu PDF de liberación de 120 horas ha sido generado.", detail: "Proyecto: App de Inclusión Escolar", type: "pdf", unread: true, time: "Hace 1 hora" },
  { id: 3, text: "Prof. Soto te ha invitado a 'IA para Salud'.", detail: "Proyecto interdisciplinario · Fac. de Ingeniería", type: "invite", unread: true, time: "Hace 3 horas" },
];

interface Props {
  onBadgeClick?: () => void;
}

const NotificationCenter = ({ onBadgeClick }: Props) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleNotifClick = (n: Notification) => {
    markRead(n.id);
    if (n.type === "badge" && onBadgeClick) {
      setOpen(false);
      onBadgeClick();
    }
  };

  const iconMap = {
    badge: <Award className="h-4 w-4 text-primary" />,
    pdf: <FileText className="h-4 w-4 text-destructive" />,
    invite: <Mail className="h-4 w-4 text-accent" />,
  };

  const bgMap = {
    badge: "bg-primary-light",
    pdf: "bg-destructive/10",
    invite: "bg-accent-light",
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground animate-pulse shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover panel */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 w-80 origin-top-right rounded-xl border border-border bg-card shadow-xl transition-all duration-300 ${
          open ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 -translate-y-1"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Notificaciones</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-primary">{unreadCount} nuevas</span>
            )}
          </div>
          <button onClick={() => setOpen(false)} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Notifications */}
        <div className="max-h-72 overflow-y-auto divide-y divide-border">
          {notifications.map((n, idx) => (
            <button
              key={n.id}
              onClick={() => handleNotifClick(n)}
              className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${n.unread ? "bg-primary-light/30" : ""}`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgMap[n.type]}`}>
                {iconMap[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs leading-relaxed ${n.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {n.text}
                </p>
                {n.detail && <p className="mt-0.5 text-[10px] text-muted-foreground">{n.detail}</p>}
                <p className="mt-1 text-[10px] text-muted-foreground/70">{n.time}</p>
              </div>
              {n.unread && <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2">
          <button className="flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-light">
            <Eye className="h-3 w-3" /> Ver todas las notificaciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
