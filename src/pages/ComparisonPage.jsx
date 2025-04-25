import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInvestmentContext } from '../context/InvestmentContext';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { GitCompare, AlertCircle, ArrowRight, Check, Info } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const strategies = {
  conservative: {
    name: "Conservative",
    allocation: {
      equity: 20,
      bonds: 60,
      gold: 15,
      crypto: 0,
      cash: 5
    },
    description: "Low-risk strategy focused on capital preservation with minimal volatility. Ideal for short-term goals or risk-averse investors."
  },
  balanced: {
    name: "Balanced",
    allocation: {
      equity: 50,
      bonds: 30,
      gold: 10,
      crypto: 0,
      cash: 10
    },
    description: "Moderate-risk strategy balancing growth and income. Suitable for medium-term goals with some tolerance for market fluctuations."
  },
  growth: {
    name: "Growth",
    allocation: {
      equity: 70,
      bonds: 20,
      gold: 5,
      crypto: 0,
      cash: 5
    },
    description: "Higher-risk strategy prioritizing long-term growth. Designed for investors with longer time horizons who can withstand market volatility."
  },
  aggressive: {
    name: "Aggressive",
    allocation: {
      equity: 80,
      bonds: 5,
      gold: 5,
      crypto: 10,
      cash: 0
    },
    description: "Highest-risk strategy targeting maximum growth. For experienced investors with very long time horizons and high risk tolerance."
  }
};

const ComparisonPage = () => {
  const { investmentPlan, hasCompletedRiskAssessment, historicalData } = useInvestmentContext();
  const [comparisonData, setComparisonData] = useState(null);
  
  useEffect(() => {
    document.title = 'Strategy Comparison | InvestWise';
    
    if (hasCompletedRiskAssessment && historicalData) {
      runComparison();
    }
  }, [hasCompletedRiskAssessment, investmentPlan, historicalData]);
  
  const runComparison = () => {
    if (!historicalData || !investmentPlan) return;
    
    const years = historicalData.equity.map(item => item.year);
    
    // Function to calculate returns for a strategy
    const calculateReturns = (allocation) => {
      // Calculate annual returns
      const annualReturns = years.map((year, index) => {
        const equityReturn = historicalData.equity[index].return * (allocation.equity / 100);
        const bondsReturn = historicalData.bonds[index].return * (allocation.bonds / 100);
        const goldReturn = historicalData.gold[index].return * (allocation.gold / 100);
        const cryptoReturn = historicalData.crypto[index].return * (allocation.crypto / 100);
        const cashReturn = 3.5 * (allocation.cash / 100); // Assuming 3.5% for cash
        
        const totalReturn = equityReturn + bondsReturn + goldReturn + cryptoReturn + cashReturn;
        return parseFloat(totalReturn.toFixed(2));
      });
      
      // Calculate averages and metrics
      const avgReturn = parseFloat((annualReturns.reduce((sum, val) => sum + val, 0) / annualReturns.length).toFixed(2));
      const bestReturn = parseFloat(Math.max(...annualReturns).toFixed(2));
      const worstReturn = parseFloat(Math.min(...annualReturns).toFixed(2));
      
      // Calculate volatility (standard deviation)
      const variance = annualReturns.reduce((sum, val) => sum + Math.pow(val - avgReturn, 2), 0) / annualReturns.length;
      const volatility = parseFloat(Math.sqrt(variance).toFixed(2));
      
      // Calculate cumulative growth
      let cumulativeValue = 100; // Starting from 100
      for (const returnVal of annualReturns) {
        cumulativeValue *= (1 + returnVal / 100);
      }
      const totalGrowth = parseFloat((cumulativeValue - 100).toFixed(2));
      
      return {
        annualReturns,
        avgReturn,
        bestReturn,
        worstReturn,
        volatility,
        totalGrowth
      };
    };
    
    // Calculate for each strategy and AI recommendation
    const aiAllocation = {
      equity: investmentPlan.equityAllocation,
      bonds: investmentPlan.bondsAllocation,
      gold: investmentPlan.goldAllocation,
      crypto: investmentPlan.cryptoAllocation,
      cash: investmentPlan.cashAllocation
    };
    
    const results = {
      aiRecommended: {
        name: `AI Recommended (${investmentPlan.riskProfile})`,
        allocation: aiAllocation,
        metrics: calculateReturns(aiAllocation)
      },
      conservative: {
        name: strategies.conservative.name,
        allocation: strategies.conservative.allocation,
        metrics: calculateReturns(strategies.conservative.allocation),
        description: strategies.conservative.description
      },
      balanced: {
        name: strategies.balanced.name,
        allocation: strategies.balanced.allocation,
        metrics: calculateReturns(strategies.balanced.allocation),
        description: strategies.balanced.description
      },
      growth: {
        name: strategies.growth.name,
        allocation: strategies.growth.allocation,
        metrics: calculateReturns(strategies.growth.allocation),
        description: strategies.growth.description
      },
      aggressive: {
        name: strategies.aggressive.name,
        allocation: strategies.aggressive.allocation,
        metrics: calculateReturns(strategies.aggressive.allocation),
        description: strategies.aggressive.description
      }
    };
    
    setComparisonData(results);
  };
  
  // Chart data for return comparison
  const returnComparisonChartData = comparisonData ? {
    labels: ['Average Annual Return', 'Best Year Return', 'Worst Year Return', 'Volatility', 'Total Growth / 100'],
    datasets: [
      {
        label: 'AI Recommended',
        data: [
          comparisonData.aiRecommended.metrics.avgReturn,
          comparisonData.aiRecommended.metrics.bestReturn,
          comparisonData.aiRecommended.metrics.worstReturn,
          comparisonData.aiRecommended.metrics.volatility,
          comparisonData.aiRecommended.metrics.totalGrowth / 100
        ],
        backgroundColor: 'rgba(74, 0, 224, 0.7)'
      },
      {
        label: 'Conservative',
        data: [
          comparisonData.conservative.metrics.avgReturn,
          comparisonData.conservative.metrics.bestReturn,
          comparisonData.conservative.metrics.worstReturn,
          comparisonData.conservative.metrics.volatility,
          comparisonData.conservative.metrics.totalGrowth / 100
        ],
        backgroundColor: 'rgba(0, 184, 212, 0.7)'
      },
      {
        label: 'Balanced',
        data: [
          comparisonData.balanced.metrics.avgReturn,
          comparisonData.balanced.metrics.bestReturn,
          comparisonData.balanced.metrics.worstReturn,
          comparisonData.balanced.metrics.volatility,
          comparisonData.balanced.metrics.totalGrowth / 100
        ],
        backgroundColor: 'rgba(255, 215, 0, 0.7)'
      },
      {
        label: 'Growth',
        data: [
          comparisonData.growth.metrics.avgReturn,
          comparisonData.growth.metrics.bestReturn,
          comparisonData.growth.metrics.worstReturn,
          comparisonData.growth.metrics.volatility,
          comparisonData.growth.metrics.totalGrowth / 100
        ],
        backgroundColor: 'rgba(0, 200, 83, 0.7)'
      },
      {
        label: 'Aggressive',
        data: [
          comparisonData.aggressive.metrics.avgReturn,
          comparisonData.aggressive.metrics.bestReturn,
          comparisonData.aggressive.metrics.worstReturn,
          comparisonData.aggressive.metrics.volatility,
          comparisonData.aggressive.metrics.totalGrowth / 100
        ],
        backgroundColor: 'rgba(244, 67, 54, 0.7)'
      }
    ]
  } : null;
  
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
            size: 12
          },
          usePointStyle: true,
          padding: 15
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
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            let value = context.parsed.y || 0;
            return `${label}: ${value.toFixed(2)}${context.dataIndex < 4 ? '%' : 'x'}`;
          }
        }
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
            Please complete your risk assessment first to view strategy comparisons.
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Strategy Comparison</h1>
        <p className="text-lg text-gray-600">
          Compare your AI-recommended strategy with traditional investment approaches
        </p>
      </div>
      
      {comparisonData ? (
        <>
          {/* Performance Comparison Chart */}
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6">Performance Comparison</h3>
            <div className="h-96">
              <Bar data={returnComparisonChartData} options={chartOptions} />
            </div>
          </motion.div>
          
          {/* Comparison Table */}
          <motion.div 
            className="glass-card p-6 mb-8 overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4">Detailed Strategy Comparison</h3>
            <div className="min-w-full">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Return</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Best Year</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Worst Year</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Volatility</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Growth</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* AI Recommended */}
                  <tr className="bg-indigo-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Check size={16} className="text-indigo-600 mr-2" />
                        <div>
                          <div className="font-medium text-gray-900">{comparisonData.aiRecommended.name}</div>
                          <div className="text-xs text-gray-500">Personalized for You</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData.aiRecommended.metrics.avgReturn}%</td>
                    <td className="py-4 px-4 text-center font-medium text-green-600">{comparisonData.aiRecommended.metrics.bestReturn}%</td>
                    <td className="py-4 px-4 text-center font-medium text-red-600">{comparisonData.aiRecommended.metrics.worstReturn}%</td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData.aiRecommended.metrics.volatility}%</td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData.aiRecommended.metrics.totalGrowth}%</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: `${comparisonData.aiRecommended.allocation.equity}%` }}></div>
                        <div className="bg-teal-500 h-2 rounded-sm" style={{ width: `${comparisonData.aiRecommended.allocation.bonds}%` }}></div>
                        <div className="bg-amber-400 h-2 rounded-sm" style={{ width: `${comparisonData.aiRecommended.allocation.gold}%` }}></div>
                        <div className="bg-red-500 h-2 rounded-sm" style={{ width: `${comparisonData.aiRecommended.allocation.crypto}%` }}></div>
                        <div className="bg-gray-500 h-2 rounded-sm" style={{ width: `${comparisonData.aiRecommended.allocation.cash}%` }}></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        E: {comparisonData.aiRecommended.allocation.equity}% | 
                        B: {comparisonData.aiRecommended.allocation.bonds}% | 
                        G: {comparisonData.aiRecommended.allocation.gold}% | 
                        C: {comparisonData.aiRecommended.allocation.crypto}% | 
                        Cash: {comparisonData.aiRecommended.allocation.cash}%
                      </div>
                    </td>
                  </tr>
                  
                  {/* Traditional Strategies */}
                  {['conservative', 'balanced', 'growth', 'aggressive'].map((strategy) => (
                    <tr key={strategy} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{comparisonData[strategy].name}</div>
                        <div className="text-xs text-gray-500">Traditional Strategy</div>
                      </td>
                      <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData[strategy].metrics.avgReturn}%</td>
                      <td className="py-4 px-4 text-center font-medium text-green-600">{comparisonData[strategy].metrics.bestReturn}%</td>
                      <td className="py-4 px-4 text-center font-medium text-red-600">{comparisonData[strategy].metrics.worstReturn}%</td>
                      <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData[strategy].metrics.volatility}%</td>
                      <td className="py-4 px-4 text-center font-medium text-gray-900">{comparisonData[strategy].metrics.totalGrowth}%</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: `${comparisonData[strategy].allocation.equity}%` }}></div>
                          <div className="bg-teal-500 h-2 rounded-sm" style={{ width: `${comparisonData[strategy].allocation.bonds}%` }}></div>
                          <div className="bg-amber-400 h-2 rounded-sm" style={{ width: `${comparisonData[strategy].allocation.gold}%` }}></div>
                          <div className="bg-red-500 h-2 rounded-sm" style={{ width: `${comparisonData[strategy].allocation.crypto}%` }}></div>
                          <div className="bg-gray-500 h-2 rounded-sm" style={{ width: `${comparisonData[strategy].allocation.cash}%` }}></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          E: {comparisonData[strategy].allocation.equity}% | 
                          B: {comparisonData[strategy].allocation.bonds}% | 
                          G: {comparisonData[strategy].allocation.gold}% | 
                          C: {comparisonData[strategy].allocation.crypto}% | 
                          Cash: {comparisonData[strategy].allocation.cash}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Traditional Strategies Explanation */}
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Understanding Traditional Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['conservative', 'balanced', 'growth', 'aggressive'].map((strategy) => (
                <div key={strategy} className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">{comparisonData[strategy].name} Strategy</h4>
                  <p className="text-gray-600 text-sm mb-3">{comparisonData[strategy].description}</p>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Equity</span>
                      <span className="font-medium">{comparisonData[strategy].allocation.equity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="h-1.5 rounded-full bg-indigo-600" 
                        style={{ width: `${comparisonData[strategy].allocation.equity}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Bonds</span>
                      <span className="font-medium">{comparisonData[strategy].allocation.bonds}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="h-1.5 rounded-full bg-teal-500" 
                        style={{ width: `${comparisonData[strategy].allocation.bonds}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Gold</span>
                      <span className="font-medium">{comparisonData[strategy].allocation.gold}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="h-1.5 rounded-full bg-amber-400" 
                        style={{ width: `${comparisonData[strategy].allocation.gold}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Crypto</span>
                      <span className="font-medium">{comparisonData[strategy].allocation.crypto}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="h-1.5 rounded-full bg-red-500" 
                        style={{ width: `${comparisonData[strategy].allocation.crypto}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Cash</span>
                      <span className="font-medium">{comparisonData[strategy].allocation.cash}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div 
                        className="h-1.5 rounded-full bg-gray-500" 
                        style={{ width: `${comparisonData[strategy].allocation.cash}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Benefits of AI-Driven Strategy */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-start">
              <Info size={20} className="text-indigo-600 mr-3 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-3">Benefits of Your AI-Driven Strategy</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your personalized AI-recommended investment strategy offers several advantages over traditional approaches:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-700 mb-2">Personalization</h4>
                    <p className="text-sm text-gray-600">
                      Your strategy is tailored specifically to your risk tolerance, financial situation, and goals, rather than using a generic model.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-700 mb-2">Risk-Adjusted Returns</h4>
                    <p className="text-sm text-gray-600">
                      The AI optimizes for your specific risk tolerance, potentially offering better risk-adjusted returns than standard portfolios.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-700 mb-2">Diversification</h4>
                    <p className="text-sm text-gray-600">
                      Your strategy includes a carefully balanced mix of multiple asset classes calibrated to your specific risk profile.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-indigo-700 mb-2">Modern Asset Classes</h4>
                    <p className="text-sm text-gray-600">
                      Unlike many traditional portfolios, your strategy may include emerging asset classes like cryptocurrency where appropriate.
                    </p>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Remember:</strong> All investment strategies involve risk, and past performance does not guarantee future results. 
                    The AI-recommended portfolio is based on your stated preferences and historical market data, but markets can behave 
                    differently in the future.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Link to="/investment-plan" className="btn btn-primary">
                Return to Your Investment Plan
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="glass-card p-8 text-center">
          <GitCompare size={48} className="text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Preparing Comparison</h2>
          <p className="text-gray-600">
            We're comparing your AI-recommended strategy with traditional investment approaches.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;