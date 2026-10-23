"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const apiBase = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");

/** Compte une page vue (sans cookie, sans donnée personnelle). Silencieux en cas d'échec. */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const entry = !sessionStorage.getItem("jb_session");
      sessionStorage.setItem("jb_session", "1");
      let referrer = "";
      if (entry && document.referrer && new URL(document.referrer).hostname !== window.location.hostname) {
        referrer = document.referrer;
      }
      const body = JSON.stringify({ path: pathname, entry, referrer });
      const url = `${apiBase}/analytics/track/`;
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }));
      } else {
        void fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } });
      }
    } catch {
      // le comptage ne doit jamais gêner la navigation
    }
  }, [pathname]);

  return null;
}
