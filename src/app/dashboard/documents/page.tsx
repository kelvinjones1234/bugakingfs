// src/app/admin/documents/page.tsx
import React from 'react';
import Main from './components/Main';
import { getUserDocuments } from "@/app/actions/documentActions";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from "next/navigation";

export default async function DocumentPage() {
  const session = await getServerSession(authOptions);

  // 1. If no session, redirect to login
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Fetch ONLY this user's documents
  const documents = await getUserDocuments(session.user.id);

  return (
    <div>
      <Main initialDocuments={documents} />
    </div>
  );
}