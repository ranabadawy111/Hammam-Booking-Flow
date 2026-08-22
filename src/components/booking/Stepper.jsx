const steps = ["Ritual", "Time", "Details", "Confirmed"];

export default function Stepper({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const idx = i + 1;
        const active = idx === current;
        const done = idx < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide transition-colors ${
                active
                  ? "bg-plum-800 text-ivory"
                  : done
                  ? "bg-rose-500/15 text-rose-700"
                  : "bg-plum-800/[0.06] text-plum-700/40"
              }`}
            >
              <span>{idx}</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {idx < steps.length && (
              <span
                className={`w-4 sm:w-8 h-px ${
                  done ? "bg-rose-400" : "bg-plum-800/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
