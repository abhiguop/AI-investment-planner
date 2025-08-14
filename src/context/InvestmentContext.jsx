import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';

const InvestmentContext = createContext();

export const useInvestmentContext = () => useContext(InvestmentContext);

export const InvestmentProvider = ({ children }) => {
  // Initial state for financial data
  const [financialData, setFinancialData] = useState(() => 
    loadFromStorage(STORAGE_KEYS.FINANCIAL_DATA, {
      income: {
        salary: 80000,
        business: 0,
        other: 5000
      },
      expenses: {
        housing: 25000,
        utilities: 5000,
        groceries: 10000,
        transportation: 5000,
        other: 10000
      }
    })
  );
  
  // Investment plan state
  const [investmentPlan, setInvestmentPlan] = useState(() => 
    loadFromStorage(STORAGE_KEYS.INVESTMENT_PLAN, {
      riskScore: null,
      riskProfile: null,
      riskDescription: null,
      equityAllocation: 40,
      bondsAllocation: 30,
      goldAllocation: 15,
      cryptoAllocation: 5,
      cashAllocation: 10,
      monthlyInvestmentAmount: 0,
      suggestedInvestments: null
    })
  );
  
  // Track if the user has completed the risk assessment
  const [hasCompletedRiskAssessment, setHasCompletedRiskAssessment] = useState(() => 
    loadFromStorage(STORAGE_KEYS.RISK_ASSESSMENT, false)
  );
  
  // Market data for simulations
  const [historicalData, setHistoricalData] = useState({
    equity: [
      { year: '2018', return: -5.0 },
      { year: '2019', return: 12.5 },
      { year: '2020', return: 15.0 },
      { year: '2021', return: 22.3 },
      { year: '2022', return: -12.1 },
      { year: '2023', return: 14.2 },
    ],
    bonds: [
      { year: '2018', return: 6.2 },
      { year: '2019', return: 5.8 },
      { year: '2020', return: 7.2 },
      { year: '2021', return: 4.2 },
      { year: '2022', return: 3.5 },
      { year: '2023', return: 6.8 },
    ],
    gold: [
      { year: '2018', return: 3.5 },
      { year: '2019', return: 18.0 },
      { year: '2020', return: 24.5 },
      { year: '2021', return: -3.6 },
      { year: '2022', return: 0.7 },
      { year: '2023', return: 8.5 },
    ],
    crypto: [
      { year: '2018', return: -73.0 },
      { year: '2019', return: 87.0 },
      { year: '2020', return: 302.0 },
      { year: '2021', return: 58.0 },
      { year: '2022', return: -65.0 },
      { year: '2023', return: 95.0 },
    ]
  });
  
  // Update income details
  const updateIncome = (newIncome) => {
    const updatedData = {
      ...financialData,
      income: newIncome
    };
    setFinancialData(updatedData);
    saveToStorage(STORAGE_KEYS.FINANCIAL_DATA, updatedData);
  };
  
  // Update expense details
  const updateExpenses = (newExpenses) => {
    const updatedData = {
      ...financialData,
      expenses: newExpenses
    };
    setFinancialData(updatedData);
    saveToStorage(STORAGE_KEYS.FINANCIAL_DATA, updatedData);
  };
  
  // Update risk profile and investment allocations
  const updateRiskProfile = (riskData) => {
    const updatedPlan = {
      ...investmentPlan,
      ...riskData
    };
    setInvestmentPlan(updatedPlan);
    setHasCompletedRiskAssessment(true);
    
    // Calculate monthly investment amount
    const totalIncome = financialData.income.salary + financialData.income.business + financialData.income.other;
    const totalExpenses = financialData.expenses.housing + financialData.expenses.utilities + 
                          financialData.expenses.groceries + financialData.expenses.transportation + 
                          financialData.expenses.other;
    
    const disposableIncome = totalIncome - totalExpenses;
    const recommendedInvestmentAmount = Math.max(0, Math.round(disposableIncome * 0.8));
    
    const finalPlan = {
      ...updatedPlan,
      monthlyInvestmentAmount: recommendedInvestmentAmount
    };
    
    setInvestmentPlan(finalPlan);
    saveToStorage(STORAGE_KEYS.INVESTMENT_PLAN, finalPlan);
    saveToStorage(STORAGE_KEYS.RISK_ASSESSMENT, true);
  };
  
  // Update investment suggestions from Gemini API
  const updateInvestmentSuggestions = (suggestions) => {
    const updatedPlan = {
      ...investmentPlan,
      suggestedInvestments: suggestions
    };
    setInvestmentPlan(updatedPlan);
    saveToStorage(STORAGE_KEYS.INVESTMENT_PLAN, updatedPlan);
  };
  
  const value = {
    financialData,
    investmentPlan,
    hasCompletedRiskAssessment,
    historicalData,
    updateIncome,
    updateExpenses,
    updateRiskProfile,
    updateInvestmentSuggestions
  };
  
  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};