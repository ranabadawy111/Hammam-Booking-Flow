import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import ArchFrame from "../ui/ArchFrame";

export default function ServiceCard({
  service,
  onSelect,
  selected,
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(service)}
      whileHover={{
        y: -7,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={`group relative w-full text-left rounded-2xl p-5 overflow-hidden border transition-all duration-300 ${
        selected
          ? "border-rose-500 bg-rose-500/[0.06] shadow-md"
          : "border-plum-800/[0.08] bg-white/60 hover:border-rose-300/60 hover:bg-white hover:shadow-xl hover:shadow-plum-900/[0.06]"
      }`}
    >
      {/* Hover glow */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-rose-300/10 blur-3xl transition-opacity duration-500 ${
          selected
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-rose-300/60 to-transparent transition-opacity duration-300 ${
          selected
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Icon */}
      <motion.div
        animate={
          selected
            ? {
                scale: 1.03,
              }
            : {
                scale: 1,
              }
        }
        whileHover={{
          scale: 1.06,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <ArchFrame
          tone="plum"
          className="relative w-12 h-14 mb-5 flex items-center justify-center"
        >
          <motion.span
            className="font-display italic text-ivory text-lg"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {service.name[0]}
          </motion.span>
        </ArchFrame>
      </motion.div>

      {/* Category */}
      <p className="relative text-[10px] font-mono uppercase tracking-[0.14em] text-rose-600/80 mb-1.5">
        {service.category}
      </p>

      {/* Service name */}
      <h3 className="relative font-display text-xl text-plum-900 mb-2 leading-snug">
        {service.name}
      </h3>

      {/* Description */}
      <p className="relative text-sm text-plum-800/60 leading-relaxed mb-6 min-h-[66px]">
        {service.description}
      </p>

      {/* Bottom info */}
      <div className="relative flex items-end justify-between gap-4">
        <div>
          <span className="flex items-center gap-1.5 text-plum-700/60 font-mono text-xs">
            <Clock size={13} />
            {service.duration} min
          </span>

          <span className="block mt-1 font-display text-xl text-plum-900">
            EGP {service.price}
          </span>
        </div>

        {/* Explore */}
        <span className="flex items-center gap-1 text-xs font-medium text-plum-900/50 group-hover:text-rose-600 transition-colors duration-300">
          <span className="hidden sm:inline">Explore</span>

          <motion.span
            className="flex"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.span>
        </span>
      </div>

      {/* Selected indicator */}
      {selected && (
        <motion.div
          layoutId="selected-service"
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"
        />
      )}
    </motion.button>
  );
}