import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, DollarSign, PieChart, Shield, Award, LineChart, FileText } from 'lucide-react';

const LandingPage = () => {
  const featuresRef = useRef(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'InvestWise | AI-Powered Investment Planning';
  }, []);
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Plan Your Financial Future with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized investment strategies powered by artificial intelligence. Plan your SIPs, crypto, and gold investments to maximize returns based on your risk profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="btn btn-primary">
                  Start Planning
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <button 
                  onClick={scrollToFeatures} 
                  className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-6 md:p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                  AI Powered
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Quick Investment Planner
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <DollarSign className="absolute top-3 left-3 text-indigo-500" size={20} />
                    <input 
                      type="number" 
                      placeholder="Monthly Income" 
                      className="input-field pl-10"
                    />
                  </div>
                  <div className="relative">
                    <TrendingUp className="absolute top-3 left-3 text-indigo-500" size={20} />
                    <select className="input-field pl-10">
                      <option value="">Select Risk Level</option>
                      <option value="low">Conservative</option>
                      <option value="medium">Moderate</option>
                      <option value="high">Aggressive</option>
                    </select>
                  </div>
                </div>
                <Link to="/risk-assessment" className="btn btn-primary w-full">
                  Get Full Assessment
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-indigo-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Smart Features for Smart Investors
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI-powered platform provides comprehensive tools to help you make informed investment decisions.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-indigo-600" size={32} />,
                title: "Risk Assessment",
                description: "Complete a detailed risk tolerance assessment to understand your investment style.",
                link: "/risk-assessment"
              },
              {
                icon: <PieChart className="text-teal-500" size={32} />,
                title: "Portfolio Allocation",
                description: "Get AI-generated asset allocation suggestions tailored to your financial goals.",
                link: "/investment-plan"
              },
              {
                icon: <LineChart className="text-amber-500" size={32} />,
                title: "Historical Simulation",
                description: "See how your recommended portfolio would have performed in past market conditions.",
                link: "/historical-simulation"
              },
              {
                icon: <Award className="text-indigo-600" size={32} />,
                title: "Strategy Comparison",
                description: "Compare AI suggestions with traditional investment approaches to make the best choice.",
                link: "/comparison"
              },
              {
                icon: <FileText className="text-teal-500" size={32} />,
                title: "Downloadable Reports",
                description: "Generate comprehensive PDF reports of your investment plan to review offline.",
                link: "/investment-plan"
              },
              {
                icon: <TrendingUp className="text-amber-500" size={32} />,
                title: "Market Insights",
                description: "Access AI-powered market analysis and investment recommendations.",
                link: "/dashboard"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.link} className="text-indigo-600 font-medium flex items-center group">
                  Learn more 
                  <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 md:p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your financial future?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Start your personalized investment journey today with our AI-powered planning tools.
            </p>
            <Link to="/dashboard" className="btn bg-white text-indigo-700 hover:bg-indigo-50">
              Create Your Investment Plan
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;