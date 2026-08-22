import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Quote, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import ArchFrame from "../components/ui/ArchFrame";
import Skeleton from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/Stateviews";
import ServiceCard from "../components/booking/ServiceCard";
import { testimonials } from "../data/mockDb";
import { useGetServicesQuery } from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
export default function Home() {
  const {
    data: services,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetServicesQuery();
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-plum-900 text-ivory pt-32 pb-28 lg:pt-44 lg:pb-40">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Decorative arch */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-plum-800/60 border border-ivory/[0.06]"
          style={{ borderRadius: "50% 50% 0 0 / 60% 60% 0 0" }}
        />

        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-xs font-mono uppercase tracking-[0.2em] text-rose-300 mb-5"
          >
            Est. in the old quarter
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6"
          >
            Steam, scrub, and{" "}
            <span className="italic text-rose-300">stillness</span> — a ritual
            older than the city around it.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-ivory/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Hammam Zahra keeps the pace of a slower century — black soap, warm
            marble, rosewater, and no clock on the wall.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <Link to="/book">
              <Button variant="accent" size="lg">
                Book a ritual
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About strip */}
      <section
        id="about"
        className="max-w-5xl mx-auto px-5 lg:px-8 py-20 grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ArchFrame
            tone="rose"
            className="w-full aspect-[4/5] flex items-center justify-center"
          >
            <Sparkles size={40} className="text-ivory/70" />
          </ArchFrame>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-3">
            Our approach
          </p>
          <h2 className="font-display text-3xl text-plum-900 mb-4 leading-tight">
            No two visits rushed the same way twice.
          </h2>
          <p className="text-plum-800/65 leading-relaxed">
            We keep one guest per room, one attendant per ritual, and mint tea
            waiting in the courtyard for when you're done. Everything here is
            timed by feel, not by the clock — treatments run until they're
            finished, not until the slot ends.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-5 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-3">
            The rituals
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-plum-900">
            Choose your steam
          </h2>
        </div>

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        )}

        {isError && <ErrorState message={error?.data} onRetry={refetch} />}

        {!isLoading && !isError && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                selected={false}
                onSelect={() =>
                  navigate("/book", { state: { serviceId: s.id } })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="bg-plum-800/[0.04] py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-3">
              Words from guests
            </p>

            <h2 className="font-display text-3xl lg:text-4xl text-plum-900">
              What lingers after
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={cardAnimation}
                whileHover={{
                  y: -5,
                }}
                transition={{ duration: 0.25 }}
                className="bg-white/60 rounded-2xl p-6 border border-plum-800/[0.06] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Quote size={18} className="text-rose-400 mb-3" />

                <p className="text-plum-800/80 leading-relaxed mb-5 text-sm">
                  "{t.quote}"
                </p>

                <p className="font-display text-plum-900">{t.name}</p>

                <p className="text-xs text-plum-700/50 font-mono mt-0.5">
                  {t.visit}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-4xl mx-auto px-5 py-24 text-center">
        <h2 className="font-display text-3xl lg:text-4xl text-plum-900 mb-5">
          The room is quiet. The water's warm.
        </h2>
        <Link to="/book">
          <Button variant="primary" size="lg">
            Reserve your ritual
          </Button>
        </Link>
      </section>
    </div>
  );
}
