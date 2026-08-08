"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarCheck, MessageCircle, Users, X } from "lucide-react";
import { consultationHref, siteConfig } from "@/lib/constants";
import Link from "next/link";

export function StickyActions() {
  const [visible, setVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTooltipDismissed(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {!tooltipDismissed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                className="flex flex-col gap-2 rounded-2xl border border-[#d6ebff]/14 bg-[#0d2338]/95 p-3.5 text-sm font-medium text-[var(--text-primary)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md max-w-xs"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#d6ebff]/10 pb-2">
                  <span className="text-xs font-semibold text-[#b9ddff]">Direct DevOps Support</span>
                  <button
                    type="button"
                    onClick={() => setTooltipDismissed(true)}
                    aria-label="Dismiss tooltip"
                    className="grid h-5 w-5 place-items-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Chat directly with our team or join our WhatsApp engineering group!
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={siteConfig.whatsappGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 px-2.5 py-1.5 text-xs font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Join Group
                  </a>
                  <a
                    href={siteConfig.whatsappContactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#4da3ff]/40 bg-[#4da3ff]/15 px-2.5 py-1.5 text-xs font-semibold text-[#b9ddff] transition hover:bg-[#4da3ff] hover:text-[#06111f]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Consultation Button */}
          <Link
            href={consultationHref}
            className="group flex items-center gap-2 rounded-xl border border-[#4da3ff]/50 bg-[#4da3ff] px-4 py-3 text-sm font-semibold text-[#06111f] shadow-[0_16px_44px_rgba(77,163,255,0.3)] transition hover:-translate-y-0.5 hover:bg-[#b9ddff] hover:shadow-[0_20px_50px_rgba(77,163,255,0.35)]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Free Consultation
          </Link>

          {/* WhatsApp Direct & Group Action Stack */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Join WhatsApp Group"
              aria-label="Join WhatsApp Group"
              className="group flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#0d2338]/90 px-3.5 py-2.5 text-xs font-semibold text-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">WhatsApp Group</span>
            </a>

            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp (+91 9555179269)"
              aria-label="Chat on WhatsApp (+91 9555179269)"
              className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle className="h-6 w-6 text-white transition-transform group-hover:scale-110" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
