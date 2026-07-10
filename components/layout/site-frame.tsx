import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getSessionUser } from "@/lib/auth/session";

export async function SiteFrame({ children }: Readonly<{ children: ReactNode }>) {
  const user = await getSessionUser();

  return (
    <>
      <Navbar isAuthenticated={Boolean(user)} />
      <main id="main" className="page-shell relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
