import React from "react";
import Main from "./component/Main";
import { Navbar } from "./component/nav/Navbar";
import { Footer } from "@/components/Footer";
import { getAllProjects } from "../../../lib/data/project-serializer";
const OfferPage = async () => {
  // 1. Fetch data directly on the server (Prisma logic)
  const projects = await getAllProjects();

  return (
    <div>
      <Navbar />
      {/* 2. Pass the data to the Client Component */}
      <Main initialProjects={projects} />
      <Footer />
    </div>
  );
};

export default OfferPage;