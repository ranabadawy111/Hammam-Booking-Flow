import Skeleton from "../ui/Skeleton";
import { ErrorState } from "../ui/Stateviews";

function nextDays(count = 10) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function toDateStr(d) {
  return d.toISOString().slice(0, 10);
}

export default function TimeSlotGrid({
  selectedDate,
  onSelectDate,
  slots,
  isLoading,
  isError,
  error,
  onRetry,
  selectedTime,
  onSelectTime,
}) {
  const days = nextDays();

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-3 mb-6">
        {days.map((d) => {
          const dateStr = toDateStr(d);
          const active = dateStr === selectedDate;
          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-colors ${
                active
                  ? "bg-plum-800 border-plum-800 text-ivory"
                  : "border-plum-800/10 text-plum-800/70 hover:border-plum-800/25"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wide opacity-70">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="font-display text-xl mt-1">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-11" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={error?.data} onRetry={onRetry} />}

      {!isLoading && !isError && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {slots?.map(({ time, available }) => {
            const active = time === selectedTime;
            return (
              <button
                key={time}
                disabled={!available}
                onClick={() => onSelectTime(time)}
                className={`py-2.5 rounded-xl text-sm font-mono transition-colors ${
                  active
                    ? "bg-rose-500 text-ivory"
                    : available
                    ? "bg-white/70 border border-plum-800/10 text-plum-800 hover:border-rose-400"
                    : "bg-plum-800/[0.04] text-plum-700/25 line-through cursor-not-allowed"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { toDateStr };
