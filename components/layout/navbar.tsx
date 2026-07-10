"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { ServiceIcon } from "@/components/services/service-icon";
import { seoMoneyPages } from "@/data/seo-pages";
import { consultationHref, navItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const serviceLinks = seoMoneyPages.map((page) => ({
  title: page.shortTitle,
  description: page.metaDescription,
  href: `/${page.slug}`,
  icon: page.icon,
}));

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
  const loginHref = `/login?next=${encodeURIComponent(pathname || "/")}`;
  const signupHref = `/signup?next=${encodeURIComponent(pathname || "/")}`;
  const servicesActive = isActivePath(pathname, "/services") || serviceLinks.some((service) => isActivePath(pathname, service.href));

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
        setOpen(false);
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        scrolled
          ? "border-rose-200/70 bg-white/85 shadow-[0_14px_42px_rgba(65,39,71,0.12)] backdrop-blur-xl"
          : "border-white/0 bg-white/40 backdrop-blur-sm",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-rose-100/60">
        <div ref={progressRef} className="h-px origin-left scale-x-0 bg-gradient-to-r from-[#102437] via-[#0f6f7d] to-[#d5a645] will-change-transform" />
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label={siteConfig.name} className="group inline-flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_12px_28px_rgba(15,34,48,0.14)] ring-1 ring-cyan-100/70">
            <Image src={siteConfig.logo} alt="" width={527} height={323} className="h-8 w-10 object-contain" priority />
          </span>
          <span className="hidden h-11 w-[152px] items-center overflow-hidden rounded-lg border border-white/70 bg-white px-2 shadow-[0_12px_28px_rgba(15,34,48,0.1)] ring-1 ring-cyan-100/60 min-[520px]:inline-flex sm:w-[172px]">
            <Image src={siteConfig.logoWordmark} alt={`${siteConfig.name} logo`} width={1012} height={185} className="h-auto w-full object-contain" priority />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-rose-200/70 bg-white/78 p-1 text-sm text-[var(--text-secondary)] shadow-[0_12px_34px_rgba(65,39,71,0.08)] lg:flex">
          {navItems.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onFocus={() => setServicesOpen(true)}
                  onClick={() => setServicesOpen((value) => !value)}
                  className={cn(
                    "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400",
                    servicesActive
                      ? "bg-rose-100 text-rose-800 shadow-[0_0_26px_rgba(14,165,183,0.12)]"
                      : "text-[var(--text-secondary)]",
                  )}
                >
                  Services
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-[calc(100%+0.75rem)] z-[80] w-[620px] max-w-[calc(100vw-2rem)] rounded-[22px] border border-rose-100 bg-white p-3 shadow-[0_34px_90px_rgba(65,39,71,0.22)] ring-1 ring-white"
                    >
                      <div className="grid gap-2 sm:grid-cols-2">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            role="menuitem"
                            href={service.href}
                            onClick={() => setServicesOpen(false)}
                            className="group grid min-w-0 grid-cols-[2.25rem_1fr] gap-3 rounded-2xl border border-transparent bg-white px-3 py-2.5 transition hover:border-rose-100 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-700">
                              <ServiceIcon icon={service.icon} />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">{service.title}</span>
                              <span className="mt-0.5 block truncate text-xs leading-5 text-[var(--text-muted)]">{service.description}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/services"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className="mt-2 flex items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800 transition hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                      >
                        View all services
                      </Link>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setServicesOpen(false)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400",
                  isActivePath(pathname, item.href)
                    ? "bg-rose-100 text-rose-800 shadow-[0_0_26px_rgba(14,165,183,0.12)]"
                    : "text-[var(--text-secondary)]",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <>
              <AnimatedShinyButton url={loginHref} tone="soft" showArrow={false} className="nav-login-button px-3">
                Login
              </AnimatedShinyButton>
              <AnimatedShinyButton url={signupHref} showArrow={false} className="px-3.5">
                Sign up
              </AnimatedShinyButton>
            </>
          )}
          <AnimatedShinyButton url={consultationHref} showArrow={false} className="px-3.5">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Consultation
          </AnimatedShinyButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-rose-200/70 bg-white/80 text-[var(--text-primary)] transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile primary"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rose-200/70 bg-white/96 px-5 py-5 shadow-[0_18px_60px_rgba(65,39,71,0.14)] backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) =>
                item.label === "Services" ? (
                  <div key={item.href} className="rounded-xl border border-rose-100 bg-rose-50/60">
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((value) => !value)}
                      className="flex w-full items-center justify-between px-3 py-3 text-left text-base font-medium text-[var(--text-primary)]"
                    >
                      Services
                      <ChevronDown className={cn("h-4 w-4 transition", mobileServicesOpen ? "rotate-180" : "")} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 px-2 pb-2">
                            <Link
                              href="/services"
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-800 hover:bg-white"
                            >
                              View all services
                            </Link>
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base font-medium transition hover:bg-rose-50 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
                      isActivePath(pathname, item.href) ? "bg-rose-100 text-rose-800" : "text-[var(--text-secondary)]",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <AnimatedShinyButton url={consultationHref} onClick={() => setOpen(false)} className="mt-3 w-full">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book a Consultation
              </AnimatedShinyButton>
              {isAuthenticated ? (
                <LogoutButton className="mt-2 w-full" />
              ) : (
                <>
                  <AnimatedShinyButton url={signupHref} onClick={() => setOpen(false)} showArrow={false} className="mt-2 w-full">
                    Sign up
                  </AnimatedShinyButton>
                  <AnimatedShinyButton url={loginHref} onClick={() => setOpen(false)} tone="soft" showArrow={false} className="nav-login-button mt-2 w-full">
                    Login
                  </AnimatedShinyButton>
                </>
              )}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
