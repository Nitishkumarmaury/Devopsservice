"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { ServiceIcon } from "@/components/services/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { services } from "@/data/services";
import { consultationHref, navItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks/use-interaction-capabilities";

const devopsServices = services.filter((s) => s.category === "devops").map((s) => ({
  title: s.shortTitle,
  description: s.description,
  href: `/services/${s.slug}`,
  icon: s.icon,
}));

const devServices = services.filter((s) => s.category === "development").map((s) => ({
  title: s.shortTitle,
  description: s.description,
  href: `/services/${s.slug}`,
  icon: s.icon,
}));

const allServiceHrefs = services.map((s) => `/services/${s.slug}`);

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ isAuthenticated = false }: Readonly<{ isAuthenticated?: boolean }>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const isTouchDevice = useIsTouchDevice();
  const reduceMotion = usePrefersReducedMotion();
  const servicesActive =
    isActivePath(pathname, "/services") || allServiceHrefs.some((href) => isActivePath(pathname, href));

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextScrolled = window.scrollY > 12;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeMobileMenu]);

  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        open ? "border-border bg-canvas" : scrolled ? "border-border bg-canvas/95 backdrop-blur-sm" : "border-transparent bg-canvas/80",
      )}
    >
      {/* Scroll progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border">
        <div
          ref={progressRef}
          className="h-px origin-left scale-x-0 bg-secondary will-change-transform"
        />
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label={siteConfig.name}
          onClick={closeMobileMenu}
          className="inline-flex shrink-0 items-center gap-3 border-r border-border pr-4 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4"
        >
          <Image
            src={siteConfig.logoFull}
            alt={siteConfig.name}
            width={siteConfig.logoWidth}
            height={siteConfig.logoHeight}
            className="h-7 w-auto object-contain"
            priority
            unoptimized
          />
          <span className="hidden font-mono text-xs font-bold tracking-widest text-ink sm:block">
            {siteConfig.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => { if (!isTouchDevice) setServicesOpen(true); }}
                onMouseLeave={() => { if (!isTouchDevice) setServicesOpen(false); }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onFocus={() => setServicesOpen(true)}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
                    servicesActive
                      ? "border-b-2 border-secondary text-secondary"
                      : "text-ink-secondary hover:text-ink",
                  )}
                >
                  Services
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      role="menu"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-[calc(100%+0.5rem)] z-[80] w-[680px] max-w-[calc(100vw-2rem)] border border-border bg-canvas-surface p-4"
                    >
                      {/* Two-column layout: DevOps | Development */}
                      <div className="grid grid-cols-2 gap-px bg-border">
                        {/* DevOps column */}
                        <div className="bg-canvas-surface p-3">
                          <p className="mb-2 px-2 font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
                            DevOps &amp; Infrastructure
                          </p>
                          <div className="grid gap-0.5">
                            {devopsServices.map((service) => (
                              <Link
                                key={service.href}
                                role="menuitem"
                                href={service.href}
                                onClick={() => setServicesOpen(false)}
                                className="group grid min-w-0 grid-cols-[1.75rem_1fr] gap-2.5 border border-transparent px-2 py-2 transition hover:border-border hover:bg-canvas-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                              >
                                <span className="grid h-7 w-7 shrink-0 place-items-center border border-border text-brand">
                                  <ServiceIcon icon={service.icon} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block truncate font-mono text-xs font-semibold text-ink">{service.title}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Development column */}
                        <div className="bg-canvas-surface p-3">
                          <p className="mb-2 px-2 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Development
                          </p>
                          <div className="grid gap-0.5">
                            {devServices.map((service) => (
                              <Link
                                key={service.href}
                                role="menuitem"
                                href={service.href}
                                onClick={() => setServicesOpen(false)}
                                className="group grid min-w-0 grid-cols-[1.75rem_1fr] gap-2.5 border border-transparent px-2 py-2 transition hover:border-border hover:bg-canvas-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                              >
                                <span className="grid h-7 w-7 shrink-0 place-items-center border border-border text-secondary">
                                  <ServiceIcon icon={service.icon} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block truncate font-mono text-xs font-semibold text-ink">{service.title}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/services"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className="mt-3 flex items-center justify-center border border-border bg-canvas-soft px-4 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-canvas-soft hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        View all services →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setServicesOpen(false)}
                className={cn(
                  "whitespace-nowrap px-3 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
                  isActivePath(pathname, item.href)
                    ? "border-b-2 border-secondary text-secondary"
                    : "text-ink-secondary hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions — Consultation only (Login/Signup moved to footer) */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {isAuthenticated && <LogoutButton />}
          <ButtonLink href={consultationHref} variant="primary" className="shrink-0 gap-2 px-4">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Consultation
          </ButtonLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => { if (v) setMobileServicesOpen(false); return !v; })}
          className="inline-flex h-10 w-10 items-center justify-center border border-border bg-canvas text-ink transition hover:bg-canvas-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 xl:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile primary"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-navigation-panel border-t border-border bg-canvas px-5 py-4 xl:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) =>
                item.label === "Services" ? (
                  <div key={item.href} className="border border-border">
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="flex min-h-11 w-full items-center justify-between px-3 py-3 text-left font-mono text-sm font-medium text-ink"
                    >
                      Services
                      <ChevronDown className={cn("h-4 w-4 transition", mobileServicesOpen && "rotate-180")} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden border-t border-border"
                        >
                          <div className="grid gap-0 px-0 pb-0">
                            <Link
                              href="/services"
                              onClick={closeMobileMenu}
                              className="flex min-h-11 items-center border-b border-border px-3 py-2 font-mono text-sm font-semibold text-secondary"
                            >
                              View all services →
                            </Link>
                            <p className="border-b border-border bg-canvas-soft px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
                              DevOps &amp; Infrastructure
                            </p>
                            {devopsServices.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={closeMobileMenu}
                                className="flex min-h-11 items-center border-b border-border px-3 py-2 font-mono text-sm text-ink-secondary last:border-0 hover:bg-canvas-soft hover:text-ink"
                              >
                                {service.title}
                              </Link>
                            ))}
                            <p className="border-b border-t border-border bg-canvas-soft px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                              Development
                            </p>
                            {devServices.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={closeMobileMenu}
                                className="flex min-h-11 items-center border-b border-border px-3 py-2 font-mono text-sm text-ink-secondary last:border-0 hover:bg-canvas-soft hover:text-ink"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex min-h-11 items-center px-3 py-2 font-mono text-sm font-medium transition hover:bg-canvas-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand",
                      isActivePath(pathname, item.href)
                        ? "border-l-2 border-secondary text-secondary"
                        : "text-ink-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="mt-3 grid gap-2 border-t border-border pt-3">
                <ButtonLink href={consultationHref} onClick={closeMobileMenu} variant="primary" className="w-full justify-center">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Book a Consultation
                </ButtonLink>
                {isAuthenticated && (
                  <LogoutButton className="mt-1 w-full" />
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
