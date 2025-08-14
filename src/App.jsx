import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/Error';
import Chatbot from './components/chat/Chatbot';
import { Toaster } from '@/components/ui/toaster';
import { BackgroundAnimation } from './components/animations/BackgroundAnimation';

// Import pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RiskAssessment from './pages/RiskAssessment';
import InvestmentPlan from './pages/InvestmentPlan';
import HistoricalSimulation from './pages/HistoricalSimulation';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-background text-foreground">
        <BackgroundAnimation />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/risk-assessment" element={<RiskAssessment />} />
              <Route path="/investment-plan" element={<InvestmentPlan />} />
              <Route path="/historical-simulation" element={<HistoricalSimulation />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Chatbot />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;
