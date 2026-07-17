"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingModal } from "./BookingModalContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ProgressHeader } from "./ProgressHeader";
import { CloseButton } from "./CloseButton";
import { ScheduleStep } from "./ScheduleStep";
import { DetailsStep } from "./DetailsStep";
import { ConfirmStep } from "./ConfirmStep";
import { SuccessScreen } from "./SuccessScreen";
import { EMPTY_BOOKING_FORM, type BookingFormData } from "./bookingData";
import { submitBooking } from "@/lib/bookingApi";
import { backdropVariants, modalVariants, stepVariants } from "@/animations/bookingModalAnimations";

type WizardStep = 1 | 2 | 3 | "success";

/** Formats a Date as YYYY-MM-DD using its local calendar fields — `toISOString()` converts to UTC first, which can shift the date by a day depending on the user's timezone. */
function formatIsoDate_(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * The single, shared "Book Discovery Call" popup. Rendered once by
 * `BookingModalProvider`; every CTA on the site opens this same
 * instance via `useBookingModal().openModal()`. "Confirm Booking"
 * posts to the Google Apps Script backend (see `lib/bookingApi.ts`)
 * and only advances to the success screen once that request actually
 * succeeds.
 */
export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();

  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_BOOKING_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  // `isSubmitting` state disables the button visually, but state updates
  // aren't synchronous — a very fast double-click could fire handleConfirm
  // twice before the re-render lands. This ref is checked and set
  // immediately, before any `await`, so a second click is rejected
  // regardless of render timing: only one booking is ever created per click.
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useLockBodyScroll(isOpen);
  useOnClickOutside(containerRef, closeModal, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  // Reset the wizard shortly after the close animation finishes, so the
  // modal never visibly flashes back to a blank state mid-exit.
  useEffect(() => {
    if (isOpen) return;
    const timeout = setTimeout(() => {
      setStep(1);
      setDirection(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData(EMPTY_BOOKING_FORM);
      setIsSubmitting(false);
      setSubmitError(null);
      isSubmittingRef.current = false;
    }, 320);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const goTo = (next: WizardStep, dir: 1 | -1) => {
    setDirection(dir);
    setStep(next);
  };

  const handleFormChange: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void = (
    field,
    value
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Sends the completed booking to the Google Apps Script backend. Only
   * advances to the success screen once the request actually succeeds —
   * on failure, the user stays on the Confirm step with an inline error
   * and can retry without re-entering anything.
   */
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitBooking({
        bookingDate: formatIsoDate_(selectedDate),
        bookingTime: selectedTime,
        fullName: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        purpose: formData.purpose,
        goals: formData.message,
      });

      if (!isMountedRef.current) return;
      goTo("success", 1);
    } catch (err) {
      isSubmittingRef.current = false;
      if (!isMountedRef.current) return;
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      if (isMountedRef.current) setIsSubmitting(false);
    }
  };

  const progressStep = step === "success" ? 3 : step;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/50 p-4 py-8 backdrop-blur-sm sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          role="presentation"
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Book a discovery call"
            variants={modalVariants}
            className="relative flex max-h-[85vh] w-full max-w-[900px] flex-col overflow-hidden rounded-cta border border-white/60 bg-white shadow-high sm:max-h-[88vh]"
            style={{ boxShadow: "0 32px 80px rgba(10,11,12,0.28), 0 0 0 1px rgba(255,255,255,0.4), 0 0 64px rgba(18,225,242,0.10)" }}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pt-10">
              <ProgressHeader currentStep={progressStep as 1 | 2 | 3} />
              <CloseButton onClick={closeModal} />
            </div>

            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div key="step-1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <ScheduleStep
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onSelectDate={setSelectedDate}
                      onSelectTime={setSelectedTime}
                      onContinue={() => goTo(2, 1)}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <DetailsStep
                      formData={formData}
                      onChange={handleFormChange}
                      onBack={() => goTo(1, -1)}
                      onContinue={() => goTo(3, 1)}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <ConfirmStep
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      formData={formData}
                      onBack={() => goTo(2, -1)}
                      onConfirm={handleConfirm}
                      isSubmitting={isSubmitting}
                      errorMessage={submitError}
                    />
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div key="step-success" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <SuccessScreen onReturn={closeModal} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
