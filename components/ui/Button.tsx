import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "inverse" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "whitespace-nowrap select-none cursor-pointer transition-[background-color,color,box-shadow,transform] " +
  "duration-[240ms] [transition-timing-function:var(--ease-out-soft)] " +
  "active:scale-[0.98] focus-visible:outline-none";

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

const variants: Record<Variant, string> = {
  // Money button: black fill, blush glow on hover.
  primary: "bg-black text-white hover:shadow-blush",
  secondary:
    "bg-white text-ink border border-line hover:border-black hover:bg-blush-wash",
  // For use on black surfaces.
  inverse: "bg-white text-black hover:bg-blush",
  // Outline for dark surfaces (e.g. hero secondary CTA).
  outline:
    "bg-transparent border border-white/30 text-white hover:bg-white hover:text-black",
  ghost: "bg-transparent text-rose hover:bg-blush-wash px-4",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref
) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        {...anchorRest}
      >
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
