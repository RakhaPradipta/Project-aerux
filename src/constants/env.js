// Environment Variables
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Aerux',
  ENV_MODE: import.meta.env.MODE,
};

export const IS_PRODUCTION = ENV.ENV_MODE === 'production';
export const IS_DEVELOPMENT = ENV.ENV_MODE === 'development';
