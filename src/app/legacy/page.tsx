import React from "react";
import Main from "./components/Main";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";

const LegacyPage = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default LegacyPage;
