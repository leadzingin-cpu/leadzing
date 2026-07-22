"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { Button } from "@/components/ui/Button";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { useAboutModal } from "@/components/about/AboutModalContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { direction, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useBookingModal();
  const { openModal: openAboutModal } = useAboutModal();
  const headerRef = useRef<HTMLElement>(null);

  const hidden = direction === "down" && !isAtTop && !mobileOpen;

  // The "About" link opens the About modal instead of scrolling to a
  // (non-existent) #about section — every other link keeps its normal
  // anchor-scroll behavior, untouched.
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label !== "About") return;
    e.preventDefault();
    setMobileOpen(false);
    openAboutModal();
  };

  // Only the mobile dropdown needs these — on desktop `mobileOpen` never
  // becomes true, so both are no-ops there.
  useLockBodyScroll(mobileOpen);
  useOnClickOutside(headerRef, () => setMobileOpen(false), mobileOpen);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <motion.header
      ref={headerRef}
      className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-4 sm:top-[max(1.5rem,env(safe-area-inset-top))] sm:px-6"
      animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-container items-center justify-between gap-6 rounded-cta border border-white/60",
          "bg-white/70 px-4 py-2.5 backdrop-blur-glass transition-shadow duration-medium ease-out-premium sm:px-6",
          isAtTop ? "shadow-glass" : "shadow-high"
        )}
      >
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <Image
            src="/assets/logo/logo-icon.png"
            alt="LeadZing"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            LeadZing
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.label)}
                className="font-body text-[0.9375rem] font-medium text-ink-700 transition-colors duration-fast hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="md" onClick={openModal}>
            Book Discovery Call
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-[calc(100%+8px)] rounded-base border border-white/60 bg-white/90 p-6 shadow-high backdrop-blur-glass lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavLinkClick(e, link.label);
                    }}
                    className="font-body text-base font-medium text-ink-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              size="md"
              className="mt-6 w-full"
              onClick={() => {
                setMobileOpen(false);
                openModal();
              }}
            >
              Book Discovery Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
