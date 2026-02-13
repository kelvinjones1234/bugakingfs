// app/page.tsx (or wherever your Home component is)
import { Footer } from "@/components/Footer";
import  Main  from "@/components/Main";
import OfferManager from "@/components/OfferManager";
import { Navbar } from "./authentication/component/nav/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Main /> 

      {/* This component handles all the client-side logic internally */}
      <OfferManager />
      <Footer />
    </div>
  );
}
