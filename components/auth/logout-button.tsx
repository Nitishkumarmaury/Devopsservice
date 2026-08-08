"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton({ className }: Readonly<{ className?: string }>) {
  const [submitting, setSubmitting] = useState(false);

  const logout = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.assign("/");
    }
  };

  return (
    <Button type="button" variant="secondary" className={className} onClick={logout} disabled={submitting}>
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {submitting ? "Logging out..." : "Logout"}
    </Button>
  );
}
