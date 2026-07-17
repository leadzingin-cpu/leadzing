"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingModal } from "./BookingModal";

interface BookingModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

/**
 * Wraps the app once (in `app/layout.tsx`) so any component, anywhere
 * in the tree, can call `useBookingModal().openModal()` to trigger
 * the single shared booking popup — no prop drilling, no duplicate
 * modal instances. The modal itself renders here, as a sibling to
 * `children`, so it's never affected by a section's own overflow or
 * stacking context.
 */
export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}
