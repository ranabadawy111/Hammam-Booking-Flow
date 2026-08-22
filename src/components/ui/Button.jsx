const variants = {
  primary: "bg-plum-800 text-ivory hover:bg-plum-700",
  accent: "bg-rose-500 text-ivory hover:bg-rose-600",
  secondary:
    "bg-transparent text-plum-800 border border-plum-800/25 hover:bg-plum-800/5",
  ghost: "bg-transparent text-plum-700 hover:bg-plum-800/5",
};

const sizes = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-7 py-3.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2} />}
    </button>
  );
}
