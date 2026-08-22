import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Quote, Sparkles, ArrowDown, ArrowRight } from "lucide-react";

import Button from "../components/ui/Button";
import ArchFrame from "../components/ui/ArchFrame";
import Skeleton from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/Stateviews";
import ServiceCard from "../components/booking/ServiceCard";

import { testimonials } from "../data/mockDb";
import { useGetServicesQuery } from "../services/api";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-plum-900 text-ivory pt-32 pb-28 lg:pt-44 lg:pb-40">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Soft glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-rose-400/20 blur-3xl"
        />

        {/* Decorative arch */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-plum-800/60 border border-ivory/[0.06]"
          style={{
            borderRadius: "50% 50% 0 0 / 60% 60% 0 0",
          }}
        />

        {/* Hero content */}
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

          {/* Scroll hint */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-20 hidden lg:flex flex-col items-center gap-2 text-ivory/40 hover:text-ivory/70 transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.18em]">
              Discover
            </span>

            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown size={15} />
            </motion.span>
          </motion.a>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="max-w-5xl mx-auto px-5 lg:px-8 py-20 lg:py-28 grid md:grid-cols-2 gap-10 lg:gap-20 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
          >
            <ArchFrame
              tone="rose"
              className="w-full aspect-[4/5] flex items-center justify-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles size={40} className="text-ivory/70" />
              </motion.div>
            </ArchFrame>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-3">
            Our approach
          </p>

          <h2 className="font-display text-3xl lg:text-4xl text-plum-900 mb-5 leading-tight">
            No two visits rushed the same way twice.
          </h2>

          <p className="text-plum-800/65 leading-relaxed mb-6">
            We keep one guest per room, one attendant per ritual, and mint tea
            waiting in the courtyard for when you're done. Everything here is
            timed by feel, not by the clock — treatments run until they're
            finished, not until the slot ends.
          </p>

          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-plum-900 group"
          >
            Explore our rituals
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="relative bg-plum-800/[0.025] py-20 lg:py-28"
      >
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-14"
          >
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-3">
              The rituals
            </p>

            <h2 className="font-display text-3xl lg:text-4xl text-plum-900 mb-4">
              Choose your steam
            </h2>

            <p className="max-w-md mx-auto text-sm text-plum-800/55 leading-relaxed">
              Each ritual is designed to slow the body down and leave you
              feeling lighter than when you arrived.
            </p>
          </motion.div>

          {/* Loading */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-72" />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <ErrorState
              message={error?.data}
              onRetry={refetch}
            />
          )}

          {/* Services */}
          {!isLoading && !isError && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={cardAnimation}>
                  <ServiceCard
                    service={service}
                    selected={false}
                    onSelect={() =>
                      navigate("/book", {
                        state: {
                          serviceId: service.id,
                        },
                      })
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="bg-plum-800/[0.04] py-20 lg:py-28"
      >
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

      {/* ================= CTA ================= */}
      <section className="relative max-w-4xl mx-auto px-5 py-24 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 mb-4">
            Your ritual awaits
          </p>

          <h2 className="font-display text-3xl lg:text-5xl text-plum-900 mb-5 leading-tight">
            The room is quiet.
            <br />
            The water's warm.
          </h2>

          <p className="text-sm text-plum-800/55 max-w-md mx-auto mb-8">
            Leave the outside world at the door and give yourself a little
            time to simply be.
          </p>

          <Link to="/book">
            <Button variant="primary" size="lg">
              Reserve your ritual
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}