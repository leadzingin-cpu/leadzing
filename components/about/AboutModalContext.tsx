"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AboutModal } from "./AboutModal";

interface AboutModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AboutModalContext = createContext<AboutModalContextValue | null>(null);

/**
 * Same shape as `BookingModalContext` — wraps the app once (in
 * `app/layout.tsx`) so the Navbar's "About" link can call
 * `useAboutModal().openModal()`. The modal renders here, as a
 * sibling to `children`, exactly like the booking modal.
 */
export function AboutModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return (
    <AboutModalContext.Provider value={value}>
      {children}
      <AboutModal />
    </AboutModalContext.Provider>
  );
}

export function useAboutModal(): AboutModalContextValue {
  const ctx = useContext(AboutModalContext);
  if (!ctx) {
    throw new Error("useAboutModal must be used within an AboutModalProvider");
  }
  return ctx;
}
