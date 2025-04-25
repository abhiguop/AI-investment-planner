import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp, DollarSign, PieChart, ArrowRight, Calendar, Wallet, CreditCard, Building, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInvestmentContext } from '../context/InvestmentContext';
import IncomeForm from '../components/dashboard/IncomeForm';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import InvestmentSummary from '../components/dashboard/InvestmentSummary';

const Dashboard = () => {
  const { financialData, updateIncome, updateExpenses } = useInvestmentContext();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  useEffect(() => {
    document.title = 'Dashboard | InvestWise';
  }, []);
  
  return (
    <div className="pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Financial Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your income, expenses, and view investment opportunities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Income Card */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <Wallet className="mr-2 text-green-500" size={20} />
                Monthly Income
              </h3>
              <p className="text-gray-500 text-sm">Your recurring earnings</p>
            </div>
            <button 
              onClick={() => setShowIncomeForm(!showIncomeForm)}
              className="text-indigo-600 hover:text-indigo-800"
              aria-label={showIncomeForm ? "Close income form" : "Add income"}
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          {showIncomeForm ? (
            <IncomeForm 
              onSubmit={(data) => {
                updateIncome(data);
                setShowIncomeForm(false);
              }}
              onCancel={() => setShowIncomeForm(false)}
              currentData={financialData.income}
            />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">
                ₹{(financialData.income.salary + financialData.income.business + financialData.income.other).toLocaleString()}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">₹{financialData.income.salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Business</span>
                  <span className="font-medium">₹{financialData.income.business.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Other Income</span>
                  <span className="font-medium">₹{financialData.income.other.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
        
        {/* Expenses Card */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <CreditCard className="mr-2 text-red-500" size={20} />
                Monthly Expenses
              </h3>
              <p className="text-gray-500 text-sm">Your regular spending</p>
            </div>
            <button 
              onClick={() => setShowExpenseForm(!showExpenseForm)}
              className="text-indigo-600 hover:text-indigo-800"
              aria-label={showExpenseForm ? "Close expense form" : "Add expense"}
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          {showExpenseForm ? (
            <ExpenseForm 
              onSubmit={(data) => {
                updateExpenses(data);
                setShowExpenseForm(false);
              }}
              onCancel={() => setShowExpenseForm(false)}
              currentData={financialData.expenses}
            />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">
                ₹{(financialData.expenses.housing + financialData.expenses.utilities + 
                    financialData.expenses.groceries + financialData.expenses.transportation + 
                    financialData.expenses.other).toLocaleString()}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Housing</span>
                  <span className="font-medium">₹{financialData.expenses.housing.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Utilities</span>
                  <span className="font-medium">₹{financialData.expenses.utilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Groceries</span>
                  <span className="font-medium">₹{financialData.expenses.groceries.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Transportation</span>
                  <span className="font-medium">₹{financialData.expenses.transportation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Other</span>
                  <span className="font-medium">₹{financialData.expenses.other.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
        
        {/* Savings Card */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold flex items-center mb-4">
            <Building className="mr-2 text-indigo-500" size={20} />
            Available for Investment
          </h3>
          
          <h2 className="text-3xl font-bold mb-4">
            ₹{(
              (financialData.income.salary + financialData.income.business + financialData.income.other) - 
              (financialData.expenses.housing + financialData.expenses.utilities + 
               financialData.expenses.groceries + financialData.expenses.transportation + 
               financialData.expenses.other)
            ).toLocaleString()}
          </h2>
          
          <div className="bg-indigo-50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <Calendar size={18} className="text-indigo-600 mr-2" />
              <p className="text-sm font-medium">Investment Potential</p>
            </div>
            <p className="text-gray-600 text-sm">
              {(financialData.income.salary + financialData.income.business + financialData.income.other) === 0 
                ? "Please add your income details to calculate investment potential."
                : `You can invest approximately ₹${(
                    ((financialData.income.salary + financialData.income.business + financialData.income.other) - 
                     (financialData.expenses.housing + financialData.expenses.utilities + 
                      financialData.expenses.groceries + financialData.expenses.transportation + 
                      financialData.expenses.other)) * 0.8
                  ).toLocaleString()} monthly for long-term growth.`
              }
            </p>
          </div>
          
          <Link to="/risk-assessment" className="btn btn-primary w-full">
            Plan Your Investments
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
      
      {/* Investment Summary Section */}
      <InvestmentSummary />
      
      {/* Quick Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Continue Your Investment Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/risk-assessment" className="card flex items-center p-5 hover:scale-[1.02] transition-transform">
            <TrendingUp className="text-indigo-600 mr-4" size={24} />
            <div>
              <h3 className="font-medium mb-1">Risk Assessment</h3>
              <p className="text-sm text-gray-600">Determine your investment risk profile</p>
            </div>
          </Link>
          
          <Link to="/investment-plan" className="card flex items-center p-5 hover:scale-[1.02] transition-transform">
            <PieChart className="text-teal-500 mr-4" size={24} />
            <div>
              <h3 className="font-medium mb-1">Investment Plan</h3>
              <p className="text-sm text-gray-600">View your personalized investment strategy</p>
            </div>
          </Link>
          
          <Link to="/historical-simulation" className="card flex items-center p-5 hover:scale-[1.02] transition-transform">
            <Receipt className="text-amber-500 mr-4" size={24} />
            <div>
              <h3 className="font-medium mb-1">Historical Performance</h3>
              <p className="text-sm text-gray-600">See how your plan would have performed</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;