// Mock data for Hammam Zahra — a boutique bathhouse & wellness ritual studio.

export const services = [
  {
    id: "black-soap-scrub",
    name: "Black Soap & Kessa Scrub",
    duration: 50,
    price: 850,
    description:
      "A traditional exfoliation ritual with warm olive-oil black soap and a raw silk kessa glove, finished with a rinse of orange-blossom water.",
    category: "Signature",
  },
  {
    id: "rose-steam",
    name: "Rose Steam Ritual",
    duration: 40,
    price: 650,
    description:
      "Twenty minutes in a rose-scented steam chamber, followed by a cool rosewater rinse to close the pores and calm the skin.",
    category: "Signature",
  },
  {
    id: "argan-massage",
    name: "Warm Argan Massage",
    duration: 60,
    price: 950,
    description:
      "A full-body massage with hand-pressed argan oil from the Souss valley, worked slowly to ease the shoulders and lower back.",
    category: "Massage",
  },
  {
    id: "henna-hand",
    name: "Henna Hand Ritual",
    duration: 30,
    price: 450,
    description:
      "A quiet hand-and-forearm treatment — warm oil, a light scrub, and a hand-painted henna pattern to take home.",
    category: "Add-on",
  },
  {
    id: "full-ritual",
    name: "The Full Zahra Ritual",
    duration: 120,
    price: 1800,
    description:
      "Our complete journey: steam, scrub, mask, and massage, spaced with mint tea in the courtyard between each step.",
    category: "Signature",
  },
  {
    id: "clay-mask",
    name: "Ghassoul Clay Mask",
    duration: 25,
    price: 400,
    description:
      "A mineral-rich clay mask from the Atlas mountains, applied warm and left to draw out the day before a cool-water rinse.",
    category: "Add-on",
  },
];

export const testimonials = [
  {
    name: "Yara M.",
    quote:
      "The steam room alone is worth the visit — I left feeling like I'd slept for two days.",
    visit: "The Full Zahra Ritual",
  },
  {
    name: "Hana K.",
    quote: "Quiet, unhurried, and the argan massage undid weeks of desk tension.",
    visit: "Warm Argan Massage",
  },
  {
    name: "Sara T.",
    quote: "I've booked the rose steam every month since my first visit. It's become a ritual, not a treat.",
    visit: "Rose Steam Ritual",
  },
];

export const hours = [
  { day: "Saturday – Wednesday", time: "10:00 AM – 9:00 PM" },
  { day: "Thursday – Friday", time: "12:00 PM – 11:00 PM" },
];

function buildSlots() {
  const slots = [];
  const start = 10; // 10 AM
  const end = 20; // 8 PM last slot
  for (let h = start; h <= end; h += 1) {
    for (const m of [0, 30]) {
      if (h === end && m === 30) continue;
      slots.push(`${String(h).padStart(2, "0")}:${m === 0 ? "00" : "30"}`);
    }
  }
  return slots;
}

export const allTimeSlots = buildSlots();

// Deterministic pseudo-random "already booked" slots per date, so the
// availability grid feels alive without needing a real backend.
export function bookedSlotsFor(dateStr) {
  let seed = 0;
  for (const ch of dateStr) seed += ch.charCodeAt(0);
  const booked = new Set();
  const count = 3 + (seed % 5);
  let cursor = seed;
  for (let i = 0; i < count; i += 1) {
    cursor = (cursor * 9301 + 49297) % 233280;
    const idx = Math.floor((cursor / 233280) * allTimeSlots.length);
    booked.add(allTimeSlots[idx]);
  }
  return booked;
}
