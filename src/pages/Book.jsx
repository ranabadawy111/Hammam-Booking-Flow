import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Calendar, User, Phone } from "lucide-react";
import Stepper from "../components/booking/Stepper";
import ServiceCard from "../components/booking/ServiceCard";
import TimeSlotGrid, { toDateStr } from "../components/booking/TimeSlotGrid";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import ArchFrame from "../components/ui/ArchFrame";
import Skeleton from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/Stateviews";
import {
  useGetServicesQuery,
  useGetAvailabilityQuery,
  useCreateBookingMutation,
} from "../services/api";

export default function Book() {
  const location = useLocation();
  const preselected = location.state?.serviceId;

  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(toDateStr(new Date()));
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const servicesQ = useGetServicesQuery();
  const availabilityQ = useGetAvailabilityQuery(date);
  const [createBooking, bookingState] = useCreateBookingMutation();

  const services = servicesQ.data;
  useEffect(() => {
    if (preselected && services) {
      const found = services.find((s) => s.id === preselected);
      if (found) setService(found);
    }
  }, [preselected, services]);

  function goNext() {
    setStep((s) => Math.min(4, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function validateDetails() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Tell us who's visiting.";
    if (!form.phone.trim() || form.phone.trim().length < 8)
      errs.phone = "A working phone number, please.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleConfirm() {
    if (!validateDetails()) return;
    try {
      const result = await createBooking({
        serviceId: service.id,
        date,
        time,
        name: form.name,
        phone: form.phone,
      }).unwrap();
      setConfirmation(result);
      setStep(4);
    } catch {
      // error surfaced via bookingState.isError below
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-5">
      <div className="max-w-2xl mx-auto">
        <Stepper current={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl text-plum-900 text-center mb-2">
                Choose your ritual
              </h2>
              <p className="text-center text-plum-700/55 text-sm mb-8">
                Every treatment is unhurried — take your time here too.
              </p>

              {servicesQ.isLoading && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-56" />
                  ))}
                </div>
              )}
              {servicesQ.isError && (
                <ErrorState message={servicesQ.error?.data} onRetry={servicesQ.refetch} />
              )}
              {services && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <ServiceCard
                      key={s.id}
                      service={s}
                      selected={service?.id === s.id}
                      onSelect={setService}
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-8">
                <Button icon={ArrowRight} disabled={!service} onClick={goNext}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl text-plum-900 text-center mb-2">
                Pick a day and time
              </h2>
              <p className="text-center text-plum-700/55 text-sm mb-8">
                {service?.name} · {service?.duration} min
              </p>

              <Card className="p-5">
                <TimeSlotGrid
                  selectedDate={date}
                  onSelectDate={(d) => {
                    setDate(d);
                    setTime(null);
                  }}
                  slots={availabilityQ.data}
                  isLoading={availabilityQ.isLoading || availabilityQ.isFetching}
                  isError={availabilityQ.isError}
                  error={availabilityQ.error}
                  onRetry={availabilityQ.refetch}
                  selectedTime={time}
                  onSelectTime={setTime}
                />
              </Card>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" icon={ArrowLeft} onClick={goBack}>
                  Back
                </Button>
                <Button icon={ArrowRight} disabled={!time} onClick={goNext}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-2xl text-plum-900 text-center mb-2">
                Your details
              </h2>
              <p className="text-center text-plum-700/55 text-sm mb-8">
                We'll text you a reminder the morning of your visit.
              </p>

              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-plum-800/70 pb-4 border-b border-plum-800/[0.06]">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {time}
                  </span>
                  <span className="font-display text-plum-900">EGP {service?.price}</span>
                </div>

                <Input
                  label="Full name"
                  placeholder="Yara Mostafa"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  error={formErrors.name}
                />
                <Input
                  label="Phone number"
                  placeholder="01x xxx xxxx"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  error={formErrors.phone}
                />

                {bookingState.isError && (
                  <p className="text-sm text-rose-600 flex items-center gap-1.5">
                    {bookingState.error?.data || "Something went wrong."}
                  </p>
                )}
              </Card>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" icon={ArrowLeft} onClick={goBack}>
                  Back
                </Button>
                <Button
                  icon={Check}
                  onClick={handleConfirm}
                  disabled={bookingState.isLoading}
                >
                  {bookingState.isLoading ? "Confirming…" : "Confirm booking"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && confirmation && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <ArchFrame
                tone="rose"
                className="w-20 h-24 mx-auto mb-6 flex items-center justify-center"
              >
                <Check size={28} className="text-ivory" strokeWidth={2.5} />
              </ArchFrame>

              <h2 className="font-display text-3xl text-plum-900 mb-2">
                You're booked, {form.name.split(" ")[0]}
              </h2>
              <p className="text-plum-700/60 mb-8">
                A confirmation text is on its way to you.
              </p>

              <Card className="p-6 text-left max-w-sm mx-auto space-y-3">
                <Row label="Ritual" value={confirmation.service.name} />
                <Row
                  label="When"
                  value={`${new Date(confirmation.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}, ${confirmation.time}`}
                />
                <Row label="Confirmation" value={confirmation.confirmationCode} mono />
                <Row label="Total" value={`EGP ${confirmation.service.price}`} />
              </Card>

              <Link to="/" className="inline-block mt-8">
                <Button variant="secondary">Back to home</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-plum-700/50 font-mono text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-plum-900 ${mono ? "font-mono" : "font-display"}`}>{value}</span>
    </div>
  );
}
