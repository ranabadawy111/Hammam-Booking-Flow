export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-mono uppercase tracking-[0.1em] text-plum-700/70 mb-1.5">
          {label}
        </span>
      )}
      <input
        className={`w-full bg-white/70 border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-plum-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-shadow ${
          error ? "border-rose-600/60" : "border-plum-800/10"
        } ${className}`}
        {...props}
      />
      {error && <span className="block text-xs text-rose-600 mt-1">{error}</span>}
    </label>
  );
}
