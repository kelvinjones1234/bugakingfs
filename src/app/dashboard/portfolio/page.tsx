"use client";

import React, { useState } from 'react';
import Main from './components/Main';
import InvestmentDetail from './components/InvestmentDetail';

const PortfolioPage = () => {
  // 👇 1. Update the state type to accept a string instead of a number
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | null>(null);

  return (
    <div className='md:pt-[4rem] lg:pt-0'>
      {selectedInvestmentId !== null ? (
        <InvestmentDetail 
          id={selectedInvestmentId} 
          onBack={() => setSelectedInvestmentId(null)} 
        />
      ) : (
        <Main 
          onNavigateToDetail={(id) => setSelectedInvestmentId(id)} 
        />
      )}
    </div>
  );
};

export default PortfolioPage;