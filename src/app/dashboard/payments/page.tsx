import React from 'react';
import { Metadata } from 'next';
import Main from './components/Main';

export const metadata: Metadata = {
  title: 'Payment History | Bugah King Admin',
  description: 'View and manage transaction history',
};

const PaymentPage = () => {
  return (
    <>
      <Main />
    </>
  );
}

export default PaymentPage;