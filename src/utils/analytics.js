// Analytics and performance monitoring utilities

class Analytics {
  constructor() {
    this.events = [];
    this.isEnabled = import.meta.env.VITE_ANALYTICS_ID && import.meta.env.VITE_ANALYTICS_ID !== 'your_analytics_id_here';
  }

  // Track page views
  trackPageView(pageName) {
    const event = {
      type: 'page_view',
      page: pageName,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Track user interactions
  trackEvent(eventName, properties = {}) {
    const event = {
      type: 'event',
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Track form submissions
  trackFormSubmission(formName, success = true, errorMessage = null) {
    const event = {
      type: 'form_submission',
      form: formName,
      success,
      errorMessage,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Track API calls
  trackAPICall(endpoint, success = true, responseTime = null, errorMessage = null) {
    const event = {
      type: 'api_call',
      endpoint,
      success,
      responseTime,
      errorMessage,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Track investment decisions
  trackInvestmentDecision(decisionType, amount, riskProfile) {
    const event = {
      type: 'investment_decision',
      decision: decisionType,
      amount,
      riskProfile,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Track performance metrics
  trackPerformance(metricName, value, unit = 'ms') {
    const event = {
      type: 'performance',
      metric: metricName,
      value,
      unit,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  // Send events to analytics service
  sendToAnalytics(event) {
    if (!this.isEnabled) {
      // In development, just log to console
      if (import.meta.env.DEV) {
        console.log('Analytics Event:', event);
      }
      return;
    }

    // Here you would integrate with your analytics service
    // For example, Google Analytics, Mixpanel, etc.
    try {
      // Example: Google Analytics 4
      if (window.gtag) {
        window.gtag('event', event.type, {
          event_category: 'investwise',
          event_label: event.name || event.page,
          value: event.value,
          custom_parameters: event.properties
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // Get analytics data for debugging
  getEvents() {
    return this.events;
  }

  // Clear events (useful for testing)
  clearEvents() {
    this.events = [];
  }

  // Export events for debugging
  exportEvents() {
    return JSON.stringify(this.events, null, 2);
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  // Start timing an operation
  startTimer(operationName) {
    this.metrics[operationName] = {
      startTime: performance.now(),
      endTime: null,
      duration: null
    };
  }

  // End timing an operation
  endTimer(operationName) {
    if (this.metrics[operationName]) {
      this.metrics[operationName].endTime = performance.now();
      this.metrics[operationName].duration = 
        this.metrics[operationName].endTime - this.metrics[operationName].startTime;
      
      // Track performance metric
      analytics.trackPerformance(operationName, this.metrics[operationName].duration);
    }
  }

  // Get performance metrics
  getMetrics() {
    return this.metrics;
  }

  // Measure page load performance
  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        analytics.trackPerformance('page_load_time', navigation.loadEventEnd - navigation.loadEventStart);
        analytics.trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      }
    });
  }

  // Measure API response times
  measureAPIResponse(url, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    analytics.trackPerformance(`api_${url}`, duration);
  }
}

// Create global instances
export const analytics = new Analytics();
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.measurePageLoad();
}

// Export utility functions
export const trackPageView = (pageName) => analytics.trackPageView(pageName);
export const trackEvent = (eventName, properties) => analytics.trackEvent(eventName, properties);
export const trackFormSubmission = (formName, success, errorMessage) => 
  analytics.trackFormSubmission(formName, success, errorMessage);
export const trackAPICall = (endpoint, success, responseTime, errorMessage) => 
  analytics.trackAPICall(endpoint, success, responseTime, errorMessage);
export const trackInvestmentDecision = (decisionType, amount, riskProfile) => 
  analytics.trackInvestmentDecision(decisionType, amount, riskProfile);





