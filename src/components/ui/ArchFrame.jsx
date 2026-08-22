// The signature visual motif for the site: a keyhole/horseshoe arch,
// echoing hammam doorway architecture. Used to frame imagery, icons,
// and the booking stepper instead of a generic rounded rectangle.
export default function ArchFrame({ children, className = "", tone = "plum" }) {
  const bg =
    tone === "rose"
      ? "bg-rose-500"
      : tone === "ivory"
      ? "bg-ivory border border-plum-800/10"
      : "bg-plum-800";
  return (
    <div
      className={`relative rounded-t-full rounded-b-2xl overflow-hidden ${bg} ${className}`}
      style={{ borderRadius: "50% 50% 12px 12px / 60% 60% 12px 12px" }}
    >
      {children}
    </div>
  );
}
