"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus cycling within `ref` while `active` is
 * true, and moves focus to the first focusable element inside it on
 * activation. Restores focus to whatever was focused before on
 * deactivation/unmount — standard modal-dialog accessibility
 * behavior, kept generic enough for any future modal to reuse.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    // Move focus in on open — slight delay lets the entrance animation's
    // initial render settle first so focus doesn't visually "jump".
    const focusTimeout = window.setTimeout(() => {
      getFocusable()[0]?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    node.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimeout);
      node.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [ref, active]);
}
