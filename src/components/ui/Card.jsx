export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white/60 border border-plum-800/[0.06] rounded-2xl shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
