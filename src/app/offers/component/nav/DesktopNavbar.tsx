import Link from "next/link";

export function DesktopNavbar() {
  const links = [
    { name: "Agriculture", href: "/agriculture" },
    { name: "Tech", href: "https://billvest.ng" }, // Fixed missing slash in href
    { name: "Real Estate", href: "/real-estate" },
    { name: "Legacy", href: "/legacy" },
  ];

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest whitespace-nowrap"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}