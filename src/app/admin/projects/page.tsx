// app/admin/investments/page.tsx
import React from 'react';
import { getAllProjects } from '@/app/actions/getInvestments';
import Main from './components/Main';

// This is a Server Component by default
export default async function Page() {
  // 👇 CHANGE THIS: Pass 'true' to fetch EVERYTHING (active & inactive)
  const investmentData = await getAllProjects(true);

  return (
    <>
      <Main data={investmentData} />
    </>
  );
} 