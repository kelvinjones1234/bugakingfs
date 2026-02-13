import React from "react";
import { notFound } from "next/navigation";
import { getClientInvestmentDetail } from "@/app/actions/clientInvestments";
import Main from "./components/Main";

// Update the type definition to wrap params in Promise
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // 1. AWAIT the params to get the ID
  const { id } = await params;

  // 2. Fetch data using the unwrapped ID
  const data = await getClientInvestmentDetail(id);

  // 3. Handle invalid ID
  if (!data) {
    notFound(); 
  }

  // 4. Render
  return <Main data={data} />;
}