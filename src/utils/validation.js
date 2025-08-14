// Validation utility functions

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Amount validation (positive number)
export const validateAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0;
};

// Percentage validation (0-100)
export const validatePercentage = (percentage) => {
  const num = parseFloat(percentage);
  return !isNaN(num) && num >= 0 && num <= 100;
};

// Required field validation
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Age validation (18-100)
export const validateAge = (age) => {
  const num = parseInt(age);
  return !isNaN(num) && num >= 18 && num <= 100;
};

// PAN card validation (Indian format)
export const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

// Aadhaar validation (12 digits)
export const validateAadhaar = (aadhaar) => {
  const aadhaarRegex = /^[0-9]{12}$/;
  return aadhaarRegex.test(aadhaar);
};

// Investment amount validation (minimum ₹1000)
export const validateInvestmentAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 1000;
};

// Risk score validation (1-10)
export const validateRiskScore = (score) => {
  const num = parseInt(score);
  return !isNaN(num) && num >= 1 && num <= 10;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];
    
    // Check required validation
    if (rules.required && !validateRequired(value)) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (!validateRequired(value)) {
      return;
    }
    
    // Check other validation rules
    if (rules.email && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    } else if (rules.phone && !validatePhone(value)) {
      errors[field] = 'Please enter a valid 10-digit phone number';
    } else if (rules.amount && !validateAmount(value)) {
      errors[field] = 'Please enter a valid amount';
    } else if (rules.percentage && !validatePercentage(value)) {
      errors[field] = 'Percentage must be between 0 and 100';
    } else if (rules.age && !validateAge(value)) {
      errors[field] = 'Age must be between 18 and 100';
    } else if (rules.pan && !validatePAN(value)) {
      errors[field] = 'Please enter a valid PAN number';
    } else if (rules.aadhaar && !validateAadhaar(value)) {
      errors[field] = 'Please enter a valid 12-digit Aadhaar number';
    } else if (rules.investmentAmount && !validateInvestmentAmount(value)) {
      errors[field] = 'Minimum investment amount is ₹1,000';
    } else if (rules.riskScore && !validateRiskScore(value)) {
      errors[field] = 'Risk score must be between 1 and 10';
    } else if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${rules.maxLength} characters`;
    } else if (rules.custom) {
      const customError = rules.custom(value, formData);
      if (customError) {
        errors[field] = customError;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format currency for display
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format percentage for display
export const formatPercentage = (value) => {
  return `${parseFloat(value).toFixed(1)}%`;
};





