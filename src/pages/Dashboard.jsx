import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, TrendingUp, DollarSign, PieChart, ArrowRight, Calendar, Wallet, CreditCard, Building, Receipt, Target, BarChart3 } from 'lucide-react';
import { useInvestmentContext } from '../context/InvestmentContext';
import IncomeForm from '../components/dashboard/IncomeForm';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import InvestmentSummary from '../components/dashboard/InvestmentSummary';
import ActionCard from '../components/dashboard/ActionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { financialData, updateIncome, updateExpenses } = useInvestmentContext();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  useEffect(() => {
    document.title = 'Dashboard | InvestWise';
  }, []);

  const totalIncome = financialData.income.salary + financialData.income.business + financialData.income.other;
  const totalExpenses = financialData.expenses.housing + financialData.expenses.utilities + 
                        financialData.expenses.groceries + financialData.expenses.transportation + 
                        financialData.expenses.other;
  const disposableIncome = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (disposableIncome / totalIncome) * 100 : 0;
  
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
              Financial Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Manage your income, expenses, and track your financial progress
            </p>
          </div>
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-sm">
            <Target className="w-3.5 h-3.5 mr-1.5" />
            AI Optimized
          </Badge>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Income Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Wallet className="mr-2 text-green-500" size={20} />
                  Monthly Income
                </CardTitle>
                <CardDescription>Your recurring earnings</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowIncomeForm(!showIncomeForm)}
                aria-label={showIncomeForm ? "Close income form" : "Add income"}
              >
                <PlusCircle size={20} />
              </Button>
            </CardHeader>
            
            <CardContent>
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
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl text-muted-foreground mr-1">₹</span>
                    <span className="text-3xl font-bold">{totalIncome.toLocaleString()}</span>
                    <span className="ml-2 text-sm text-green-500 font-medium">
                      +12.5% <span className="text-muted-foreground text-xs">from last month</span>
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-accent/30 transition-colors">
                      <span className="text-muted-foreground flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        Salary
                      </span>
                      <span className="font-medium">₹{financialData.income.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-accent/30 transition-colors">
                      <span className="text-muted-foreground flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Business
                      </span>
                      <span className="font-medium">₹{financialData.income.business.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-accent/30 transition-colors">
                      <span className="text-muted-foreground flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        Other
                      </span>
                      <span className="font-medium">₹{financialData.income.other.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Expenses Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <CreditCard className="mr-2 text-red-500" size={20} />
                  Monthly Expenses
                </CardTitle>
                <CardDescription>Your regular spending</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowExpenseForm(!showExpenseForm)}
                aria-label={showExpenseForm ? "Close expense form" : "Add expense"}
              >
                <PlusCircle size={20} />
              </Button>
            </CardHeader>
            
            <CardContent>
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
                  <div className="text-3xl font-bold mb-4">
                    ₹{totalExpenses.toLocaleString()}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Housing</span>
                      <span className="font-medium">₹{financialData.expenses.housing.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Utilities</span>
                      <span className="font-medium">₹{financialData.expenses.utilities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Groceries</span>
                      <span className="font-medium">₹{financialData.expenses.groceries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Transportation</span>
                      <span className="font-medium">₹{financialData.expenses.transportation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Other</span>
                      <span className="font-medium">₹{financialData.expenses.other.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Savings Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl flex items-center">
                <Building className="mr-2 text-primary" size={20} />
                Available for Investment
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ₹{disposableIncome.toLocaleString()}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Savings Rate</span>
                    <span className="font-medium">{savingsRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={savingsRate} className="h-2" />
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-primary mr-2" />
                    <p className="text-sm font-medium">Investment Potential</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {totalIncome === 0 
                      ? "Please add your income details to calculate investment potential."
                      : `You can invest approximately ₹${(disposableIncome * 0.8).toLocaleString()} monthly for long-term growth.`
                    }
                  </p>
                </div>
                
                <Button asChild className="w-full group" variant="outline">
                  <Link to="/risk-assessment" className="group-hover:bg-primary/5 transition-colors">
                    Plan Your Investments
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Investment Summary Section */}
      <InvestmentSummary />
      
      {/* Quick Links */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-16 relative"
      >
        <div className="absolute -top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
                Continue Your Investment Journey
              </h2>
              <p className="text-muted-foreground">Take the next steps towards your financial goals</p>
            </div>
            <Badge variant="outline" className="mt-2 md:mt-0 bg-background/80 backdrop-blur-sm border-primary/20 text-primary px-4 py-1.5 text-sm">
              Quick Actions
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              icon={TrendingUp}
              title="Risk Assessment"
              description="Discover your ideal investment risk profile and preferences"
              link="/risk-assessment"
              buttonText="Get Started"
              color="blue"
            />
            <ActionCard
              icon={PieChart}
              title="Investment Plan"
              description="View your personalized investment strategy and allocations"
              link="/investment-plan"
              buttonText="View Plan"
              color="emerald"
            />
            <ActionCard
              icon={BarChart3}
              title="Historical Performance"
              description="Analyze how your strategy would have performed over time"
              link="/historical-simulation"
              buttonText="View Analysis"
              color="purple"
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Dashboard;