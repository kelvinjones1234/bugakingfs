import Link from "next/link";

export function DesktopNavbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Agriculture", href: "/agriculture" },
    { name: "Tech", href: "https://billvest.ng" },
    { name: "Real Estate", href: "/real-estate" },
    { name: "Offers", href: "/offers" },
    { name: "Legacy", href: "/legacy" },
  ];

  return (
    <div className="flex items-center gap-10 justify-between w-full">
      {/* Navigation Links */}
      <nav className="flex gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
