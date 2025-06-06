import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RiskAssessment from './pages/RiskAssessment';
import InvestmentPlan from './pages/InvestmentPlan';
import HistoricalSimulation from './pages/HistoricalSimulation';
import ComparisonPage from './pages/ComparisonPage';
import { BackgroundAnimation } from './components/animations/BackgroundAnimation';
import { InvestmentProvider } from './context/InvestmentContext';

function App() {
  return (
    <Router>
      <InvestmentProvider>
        <div className="relative min-h-screen text-gray-800 bg-gradient-to-br from-indigo-50 to-teal-50 overflow-hidden">
          <BackgroundAnimation />
          <div className="relative z-10">
            <Navbar />
            <main className="container mx-auto px-4 py-8 mb-16">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/investment-plan" element={<InvestmentPlan />} />
                <Route path="/historical-simulation" element={<HistoricalSimulation />} />
                <Route path="/comparison" element={<ComparisonPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </InvestmentProvider>
    </Router>
  );
}

export default App;