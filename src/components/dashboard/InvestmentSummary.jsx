import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInvestmentContext } from '../../context/InvestmentContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const InvestmentSummary = () => {
  const { investmentPlan, hasCompletedRiskAssessment } = useInvestmentContext();
  
  // Chart data
  const chartData = {
    labels: ['Equity Mutual Funds', 'Government Bonds', 'Gold ETFs', 'Cryptocurrency', 'Cash'],
    datasets: [
      {
        data: [
          investmentPlan.equityAllocation || 30, 
          investmentPlan.bondsAllocation || 40, 
          investmentPlan.goldAllocation || 15, 
          investmentPlan.cryptoAllocation || 5, 
          investmentPlan.cashAllocation || 10
        ],
        backgroundColor: [
          'rgba(74, 0, 224, 0.8)',
          'rgba(0, 184, 212, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(244, 67, 54, 0.8)',
          'rgba(158, 158, 158, 0.8)'
        ],
        borderColor: [
          'rgba(74, 0, 224, 1)',
          'rgba(0, 184, 212, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(158, 158, 158, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 14
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1a202c',
        bodyColor: '#4a5568',
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };
  
  return (
    <motion.div 
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Investment Summary</h2>
        <Link to="/investment-plan" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800">
          View detailed plan
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {hasCompletedRiskAssessment ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 col-span-1">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-indigo-600" size={20} />
              Risk Profile
            </h3>
            <p className="text-lg mb-2">
              <span className="font-medium">Risk Score:</span> {investmentPlan.riskScore || 5}/10
            </p>
            <p className="text-lg mb-4">
              <span className="font-medium">Profile:</span> {investmentPlan.riskProfile || 'Moderate'}
            </p>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                {investmentPlan.riskDescription || 'Based on your responses, you have a moderate risk tolerance. Your investment plan balances growth with security.'}
              </p>
            </div>
          </div>
          
          <div className="glass-card p-6 col-span-2">
            <h3 className="text-xl font-semibold mb-4">Recommended Asset Allocation</h3>
            <div className="h-80">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <TrendingUp size={48} className="text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Complete Your Risk Assessment</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Complete a quick risk assessment to get your personalized investment plan with AI-powered recommendations.
          </p>
          <Link to="/risk-assessment" className="btn btn-primary inline-flex">
            Start Risk Assessment
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default InvestmentSummary;