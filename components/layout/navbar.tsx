"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { ServiceIcon } from "@/components/services/service-icon";
import { seoMoneyPages } from "@/data/seo-pages";
import { consultationHref, navItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks/use-interaction-capabilities";

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
  const scrollLockRef = useRef<number | null>(null);
  const isTouchDevice = useIsTouchDevice();
  const reduceMotion = usePrefersReducedMotion();
  const loginHref = `/login?next=${encodeURIComponent(pathname || "/")}`;
  const signupHref = `/signup?next=${encodeURIComponent(pathname || "/")}`;
  const servicesActive = isActivePath(pathname, "/services") || serviceLinks.some((service) => isActivePath(pathname, service.href));
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

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      left: style.left,
      overflow: style.overflow,
      position: style.position,
      right: style.right,
      top: style.top,
      width: style.width,
    };

    scrollLockRef.current = scrollY;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollLockRef.current ?? scrollY);
      scrollLockRef.current = null;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-[#d6ebff]/14 bg-[#06111f]/88 shadow-[0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-xl"
          : "border-[#d6ebff]/8 bg-[#06111f]/58 backdrop-blur-md",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#d6ebff]/8">
        <div ref={progressRef} className="h-px origin-left scale-x-0 bg-gradient-to-r from-[#4da3ff] via-[#7dd3fc] to-[#ff8a7a] will-change-transform" />
      </div>
      <div className="mx-auto flex min-h-[5.25rem] max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:min-h-[6rem] sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          aria-label="CloudOpsync"
          onClick={() => {
            closeMobileMenu();
            if (pathname === "/") {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }}
          className="inline-flex min-h-[4.75rem] min-w-[7.25rem] shrink-0 flex-col items-start justify-center rounded-lg border border-transparent bg-transparent px-0 py-1 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff] sm:min-h-[5rem] sm:min-w-[7.7rem] xl:mr-4"
        >
          <Image
            src={siteConfig.logoFull}
            alt="CloudOpsync"
            width={siteConfig.logoWidth}
            height={siteConfig.logoHeight}
            className="h-12 w-auto object-contain sm:h-14"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
            unoptimized
          />
          <span className="sr-only">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-xl border border-[#d6ebff]/12 bg-[#0d2338]/72 p-1 text-sm text-[var(--text-secondary)] shadow-[0_16px_44px_rgba(0,0,0,0.22)] xl:flex">
          {navItems.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  if (!isTouchDevice) setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice) setServicesOpen(false);
                }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onFocus={() => setServicesOpen(true)}
                  onClick={() => setServicesOpen((value) => !value)}
                  className={cn(
                    "relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff]",
                    servicesActive
                      ? "bg-[#4da3ff]/12 text-[#e5f2ff] shadow-[0_0_26px_rgba(77,163,255,0.12)]"
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
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-[calc(100%+0.75rem)] z-[80] w-[620px] max-w-[calc(100vw-2rem)] rounded-[18px] border border-[#d6ebff]/14 bg-[#0d2338] p-3 shadow-[0_34px_90px_rgba(0,0,0,0.42)] ring-1 ring-white/5"
                    >
                      <div className="grid gap-2 sm:grid-cols-2">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            role="menuitem"
                            href={service.href}
                            onClick={() => setServicesOpen(false)}
                            className="group grid min-w-0 grid-cols-[2.25rem_1fr] gap-3 rounded-xl border border-transparent bg-[#081a2e]/70 px-3 py-2.5 transition hover:border-[#4da3ff]/20 hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4da3ff]"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#4da3ff]/16 bg-[#4da3ff]/10 text-[#4da3ff]">
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
                        className="mt-2 flex items-center justify-center rounded-xl border border-[#4da3ff]/14 bg-[#4da3ff]/10 px-4 py-3 text-sm font-semibold text-[#e5f2ff] transition hover:bg-[#4da3ff]/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4da3ff]"
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
                  "relative whitespace-nowrap rounded-lg px-3 py-2 transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff]",
                  isActivePath(pathname, item.href)
                    ? "bg-[#4da3ff]/12 text-[#e5f2ff] shadow-[0_0_26px_rgba(77,163,255,0.12)]"
                    : "text-[var(--text-secondary)]",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <>
              <AnimatedShinyButton url={loginHref} tone="soft" showArrow={false} className="nav-header-button nav-login-button px-3">
                Login
              </AnimatedShinyButton>
              <AnimatedShinyButton url={signupHref} showArrow={false} className="nav-header-button px-3.5">
                Sign up
              </AnimatedShinyButton>
            </>
          )}
          <AnimatedShinyButton url={consultationHref} showArrow={false} className="nav-header-button shrink-0 px-3.5">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Consultation
          </AnimatedShinyButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() =>
            setOpen((value) => {
              if (value) setMobileServicesOpen(false);
              return !value;
            })
          }
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#d6ebff]/14 bg-[#0d2338]/80 text-[var(--text-primary)] transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff] xl:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile primary"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-navigation-panel overflow-y-auto border-t border-[#d6ebff]/14 bg-[#06111f]/96 px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl xl:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) =>
                item.label === "Services" ? (
                  <div key={item.href} className="rounded-xl border border-[#d6ebff]/14 bg-[#0d2338]/82">
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((value) => !value)}
                      className="flex min-h-11 w-full items-center justify-between px-3 py-3 text-left text-base font-medium text-[var(--text-primary)]"
                    >
                      Services
                      <ChevronDown className={cn("h-4 w-4 transition", mobileServicesOpen ? "rotate-180" : "")} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen ? (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 px-2 pb-2">
                            <Link
                              href="/services"
                              onClick={closeMobileMenu}
                              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-[#e5f2ff] hover:bg-[#12304b]"
                            >
                              View all services
                            </Link>
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={closeMobileMenu}
                                className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[#12304b] hover:text-[var(--text-primary)]"
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
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 py-3 text-base font-medium transition hover:bg-[#12304b] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4da3ff]",
                      isActivePath(pathname, item.href) ? "bg-[#4da3ff]/12 text-[#e5f2ff]" : "text-[var(--text-secondary)]",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <AnimatedShinyButton url={consultationHref} onClick={closeMobileMenu} className="mt-3 w-full">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book a Consultation
              </AnimatedShinyButton>
              {isAuthenticated ? (
                <LogoutButton className="mt-2 w-full" />
              ) : (
                <>
                  <AnimatedShinyButton url={signupHref} onClick={closeMobileMenu} showArrow={false} className="mt-2 w-full">
                    Sign up
                  </AnimatedShinyButton>
                  <AnimatedShinyButton url={loginHref} onClick={closeMobileMenu} tone="soft" showArrow={false} className="nav-login-button mt-2 w-full">
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
