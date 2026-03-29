import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  label: string;
  helpText?: string;
  value: number;
  onChange: (val: number) => void;
}

const StarRating = ({ label, helpText, value, onChange }: Props) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            className="rounded p-0.5 transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`h-5 w-5 transition-colors duration-150 ${
                star <= (hover || value)
                  ? "fill-warning text-warning"
                  : "text-border"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs tabular-nums text-muted-foreground">{value}/5</span>
      </div>
      {helpText && (
        <p className="text-[11px] text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

export default StarRating;
