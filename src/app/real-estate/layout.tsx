// Agriculture navbar

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/nav/Navbar";

export default function AgricultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
