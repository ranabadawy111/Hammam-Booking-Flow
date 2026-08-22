import { RefreshCw, Droplets } from "lucide-react";
import Button from "./Button";

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
        <Droplets size={16} className="text-rose-600" />
      </div>
      <p className="font-display text-base text-plum-900 mb-1">A drop spilled</p>
      <p className="text-sm text-plum-700/60 max-w-xs mb-5">
        {message || "Something interrupted the ritual. Please try again."}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
