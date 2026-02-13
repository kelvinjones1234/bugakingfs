import React from 'react';
import { getAllAdminTransactions } from '@/app/actions/adminTransactions';
import Main from './components/Main';

export const dynamic = 'force-dynamic';

export default async function TransactionsPage() {
  const transactions = await getAllAdminTransactions();

  return (
    <>
      <Main data={transactions} />
    </>
  );
}