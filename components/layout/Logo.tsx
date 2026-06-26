import Link from "next/link";
import Image from "next/image";

/**
 * deCRUZ logo lockup. The supplied asset is solid black on transparent, so on
 * dark surfaces (the hero before you scroll) we invert it to white.
 */
export function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="deCRUZ — Construction Marketing — home"
      className={`group inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/decruz-logo.png"
        alt="deCRUZ"
        width={300}
        height={92}
        priority
        className={`h-10 w-auto transition-[filter,transform] duration-[240ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-[1.03] sm:h-12 ${
          onDark
            ? // Inverted to white over the hero. The hero's top-right corner is
              // the lightest part of the scrim, so a bare white mark can vanish
              // against bright imagery — a drop shadow keeps it legible anywhere.
              "[filter:invert(1)_drop-shadow(0_1px_4px_rgba(0,0,0,0.65))]"
            : ""
        }`}
      />
    </Link>
  );
}
