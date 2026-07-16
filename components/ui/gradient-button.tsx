import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type GradientButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function GradientButton({ href, children, ...props }: Readonly<GradientButtonProps>) {
  return (
    <ButtonLink href={href} {...props}>
      {children}
    </ButtonLink>
  );
}
