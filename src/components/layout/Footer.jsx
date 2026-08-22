import { hours } from "../../data/mockDb";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="visit" className="scroll-mt-16 bg-plum-900 text-ivory">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display italic text-2xl mb-3">Hammam Zahra</p>
          <p className="text-sm text-ivory/55 leading-relaxed max-w-xs">
            A quiet bathhouse in the heart of the old quarter — rituals passed
            down, unhurried, one guest at a time.
          </p>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-300 mb-4">
            Visit
          </p>
          <div className="space-y-3 text-sm text-ivory/70">
            <p className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              14 Sharia El Moez, Old Quarter
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0" />
              +20 10 000 0000
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-300 mb-4">
            Hours
          </p>
          <div className="space-y-2.5 text-sm text-ivory/70">
            {hours.map((h) => (
              <p key={h.day} className="flex items-start gap-2.5">
                <Clock size={15} className="mt-0.5 shrink-0" />
                <span>
                  {h.day}
                  <br />
                  <span className="text-ivory/45">{h.time}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/35">
        © {new Date().getFullYear()} Hammam Zahra. A fictional studio built for
        portfolio purposes.
      </div>
    </footer>
  );
}
