export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label} is required`;
    } else if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label} must be at least ${rule.minLength} characters`;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label} is invalid`;
    }
  });

  return errors;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const truncateString = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};
