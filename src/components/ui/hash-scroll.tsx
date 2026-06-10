"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll-to-hash";

export function HashScroll() {
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        requestAnimationFrame(() => {
          scrollToHash(window.location.hash, "auto");
        });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
