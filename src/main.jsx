import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './components/theme-provider';
import { InvestmentProvider } from './context/InvestmentContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <InvestmentProvider>
          <App />
        </InvestmentProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);