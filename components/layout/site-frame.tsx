import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="page-shell relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
