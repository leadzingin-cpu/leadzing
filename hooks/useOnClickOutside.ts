"use client";

import { useEffect, type RefObject } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  active = true
): void {
  useEffect(() => {
    if (!active) return;

    const listener = (event: PointerEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, [ref, handler, active]);
}
