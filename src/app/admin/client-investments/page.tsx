import React from "react";
import { getAllClientInvestments } from "@/app/actions/clientInvestments";
import Main from "./components/Main";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getAllClientInvestments();

  return <Main data={data} />;
}
