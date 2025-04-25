import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInvestmentContext } from '../context/InvestmentContext';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { LineChart, AlertCircle, ArrowRight, Info } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const HistoricalSimulation = () => {
  const { investmentPlan, hasCompletedRiskAssessment, historicalData } = useInvestmentContext();
  const [simulationData, setSimulationData] = useState(null);
  const [cumulativeReturns, setCumulativeReturns] = useState(null);
  
  useEffect(() => {
    document.title = 'Historical Simulation | InvestWise';
    
    if (hasCompletedRiskAssessment) {
      runSimulation();
    }
  }, [hasCompletedRiskAssessment, investmentPlan]);
  
  const runSimulation = () => {
    if (!historicalData || !investmentPlan) return;
    
    const years = historicalData.equity.map(item => item.year);
    
    // Calculate weighted returns for each year based on asset allocation
    const weightedReturns = years.map((year, index) => {
      const equityReturn = historicalData.equity[index].return * (investmentPlan.equityAllocation / 100);
      const bondsReturn = historicalData.bonds[index].return * (investmentPlan.bondsAllocation / 100);
      const goldReturn = historicalData.gold[index].return * (investmentPlan.goldAllocation / 100);
      const cryptoReturn = historicalData.crypto[index].return * (investmentPlan.cryptoAllocation / 100);
      const cashReturn = 3.5 * (investmentPlan.cashAllocation / 100); // Assuming 3.5% for cash
      
      const totalReturn = equityReturn + bondsReturn + goldReturn + cryptoReturn + cashReturn;
      return {
        year,
        totalReturn: parseFloat(totalReturn.toFixed(2)),
        equityReturn: parseFloat(equityReturn.toFixed(2)),
        bondsReturn: parseFloat(bondsReturn.toFixed(2)),
        goldReturn: parseFloat(goldReturn.toFixed(2)),
        cryptoReturn: parseFloat(cryptoReturn.toFixed(2)),
        cashReturn: parseFloat(cashReturn.toFixed(2))
      };
    });
    
    // Calculate cumulative returns
    const initialInvestment = 100; // Starting from 100
    let cumulativeValue = initialInvestment;
    
    const cumulativeData = weightedReturns.map(yearData => {
      cumulativeValue = cumulativeValue * (1 + yearData.totalReturn / 100);
      return {
        year: yearData.year,
        value: parseFloat(cumulativeValue.toFixed(2))
      };
    });
    
    setSimulationData(weightedReturns);
    setCumulativeReturns(cumulativeData);
  };
  
  // Chart data for annual returns
  const annualReturnsChartData = {
    labels: simulationData?.map(data => data.year) || [],
    datasets: [
      {
        label: 'Portfolio Annual Returns (%)',
        data: simulationData?.map(data => data.totalReturn) || [],
        borderColor: 'rgba(74, 0, 224, 1)',
        backgroundColor: 'rgba(74, 0, 224, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(74, 0, 224, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
  
  // Chart data for cumulative growth
  const cumulativeGrowthChartData = {
    labels: cumulativeReturns?.map(data => data.year) || [],
    datasets: [
      {
        label: 'Portfolio Value (Starting from 100)',
        data: cumulativeReturns?.map(data => data.value) || [],
        borderColor: 'rgba(0, 184, 212, 1)',
        backgroundColor: 'rgba(0, 184, 212, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(0, 184, 212, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
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
        displayColors: false
      }
    }
  };
  
  // If user hasn't completed risk assessment, redirect to assessment page
  if (!hasCompletedRiskAssessment) {
    return (
      <div className="pt-24 pb-12 max-w-4xl mx-auto">
        <div className="glass-card p-8 text-center">
          <AlertCircle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Risk Assessment Required</h2>
          <p className="text-gray-600 mb-6">
            Please complete your risk assessment first to view historical simulations.
          </p>
          <Link to="/risk-assessment" className="btn btn-primary">
            Go to Risk Assessment
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Historical Performance Simulation</h1>
        <p className="text-lg text-gray-600">
          See how your recommended portfolio would have performed in previous years
        </p>
      </div>
      
      {simulationData && cumulativeReturns ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Annual Returns Chart */}
            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4">Annual Portfolio Returns</h3>
              <div className="h-80">
                <Line data={annualReturnsChartData} options={chartOptions} />
              </div>
            </motion.div>
            
            {/* Cumulative Growth Chart */}
            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Cumulative Growth</h3>
              <div className="h-80">
                <Line data={cumulativeGrowthChartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
          
          {/* Performance Metrics */}
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Average Annual Return */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Average Annual Return</h4>
                <p className="text-2xl font-bold text-indigo-600">
                  {(simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
              </div>
              
              {/* Best Year */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Best Year</h4>
                <p className="text-2xl font-bold text-green-600">
                  {Math.max(...simulationData.map(item => item.totalReturn)).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">
                  {simulationData.find(item => item.totalReturn === Math.max(...simulationData.map(i => i.totalReturn)))?.year}
                </p>
              </div>
              
              {/* Worst Year */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Worst Year</h4>
                <p className="text-2xl font-bold text-red-600">
                  {Math.min(...simulationData.map(item => item.totalReturn)).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">
                  {simulationData.find(item => item.totalReturn === Math.min(...simulationData.map(i => i.totalReturn)))?.year}
                </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Growth */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Total Growth (Entire Period)</h4>
                <p className="text-2xl font-bold text-indigo-600">
                  {((cumulativeReturns[cumulativeReturns.length - 1]?.value / 100 - 1) * 100).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">
                  Investment of 100 would have grown to {cumulativeReturns[cumulativeReturns.length - 1]?.value}
                </p>
              </div>
              
              {/* Annualized Return */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Compound Annual Growth Rate</h4>
                <p className="text-2xl font-bold text-indigo-600">
                  {(Math.pow(cumulativeReturns[cumulativeReturns.length - 1]?.value / 100, 1 / cumulativeReturns.length) - 1) * 100 > 0 
                    ? ((Math.pow(cumulativeReturns[cumulativeReturns.length - 1]?.value / 100, 1 / cumulativeReturns.length) - 1) * 100).toFixed(2) 
                    : 0}%
                </p>
                <p className="text-xs text-gray-500">
                  Consistent annual growth rate needed to reach the final value
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contribution Breakdown */}
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Asset Class Contribution</h3>
            <p className="text-sm text-gray-600 mb-4">
              Average annual contribution to returns from each asset class
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Equity</h4>
                <p className="text-xl font-bold text-indigo-600">
                  {(simulationData.reduce((sum, item) => sum + item.equityReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="h-1.5 rounded-full bg-indigo-600" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (simulationData.reduce((sum, item) => sum + item.equityReturn, 0) / simulationData.length) / (simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Bonds</h4>
                <p className="text-xl font-bold text-teal-600">
                  {(simulationData.reduce((sum, item) => sum + item.bondsReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="h-1.5 rounded-full bg-teal-500" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (simulationData.reduce((sum, item) => sum + item.bondsReturn, 0) / simulationData.length) / (simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Gold</h4>
                <p className="text-xl font-bold text-amber-600">
                  {(simulationData.reduce((sum, item) => sum + item.goldReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="h-1.5 rounded-full bg-amber-400" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (simulationData.reduce((sum, item) => sum + item.goldReturn, 0) / simulationData.length) / (simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Crypto</h4>
                <p className="text-xl font-bold text-red-600">
                  {(simulationData.reduce((sum, item) => sum + item.cryptoReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="h-1.5 rounded-full bg-red-500" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (simulationData.reduce((sum, item) => sum + item.cryptoReturn, 0) / simulationData.length) / (simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm text-gray-500 mb-1">Cash</h4>
                <p className="text-xl font-bold text-gray-600">
                  {(simulationData.reduce((sum, item) => sum + item.cashReturn, 0) / simulationData.length).toFixed(2)}%
                </p>
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="h-1.5 rounded-full bg-gray-500" 
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (simulationData.reduce((sum, item) => sum + item.cashReturn, 0) / simulationData.length) / (simulationData.reduce((sum, item) => sum + item.totalReturn, 0) / simulationData.length) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Disclaimer */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-start">
              <Info size={20} className="text-amber-500 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This historical simulation is based on past performance data and is provided for educational purposes only. 
                  Past performance is not indicative of future results. The simulation does not account for inflation, taxes, 
                  or investment fees which would reduce returns.
                </p>
                <p className="text-sm text-gray-600">
                  Each asset class's returns are simplified averages and may not represent the specific returns of individual 
                  investments within that class. Actual returns will vary based on the specific investments selected, market conditions, 
                  and other factors.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link to="/comparison" className="btn btn-primary">
                Compare with Traditional Strategies
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="glass-card p-8 text-center">
          <LineChart size={48} className="text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Preparing Simulation</h2>
          <p className="text-gray-600">
            We're analyzing historical data to simulate how your portfolio would have performed.
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoricalSimulation;