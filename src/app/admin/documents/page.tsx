// src/app/admin/documents/page.tsx
import React from 'react';
import Main from './components/Main';
import { getDocuments } from "@/app/actions/documentActions";
import prisma from '../../../../lib/data/prisma';


export default async function DocumentsPage() {
  // 1. Fetch the documents using the action we created
  const documents = await getDocuments();
  
  // 2. Fetch the users for the "Assign to User" dropdown in the modal
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
    }
  });

  return (
    <div>
      {/* 3. Pass the fetched data as props */}
      <Main documents={documents} users={users} />
    </div>
  );
}