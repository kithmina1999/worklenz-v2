import axios from 'axios';

import alertService from '@/services/alerts/alertService';

const getCsrfToken = (): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split('; XSRF-TOKEN=');
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return null;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add CSRF token
apiClient.interceptors.request.use(
  config => {
    const token = getCsrfToken();
    if (token) {
      const decodedToken = decodeURIComponent(token);
      config.headers['X-CSRF-Token'] = decodedToken;
      config.headers['X-XSRF-TOKEN'] = decodedToken;
      config.headers['XSRF-TOKEN'] = decodedToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor with notification handling based on done flag
apiClient.interceptors.response.use(
  response => {
    if (response.data) {
      const { title, message, auth_error, done } = response.data;

      if (message && message.charAt(0) !== '$') {
        if (done) {
          alertService.success(title || '', message);
        } else {
          alertService.error(title || '', message);
        }
      } else if (auth_error) {
        alertService.error(title || 'Authentication Error', auth_error);
      }
    }
    return response;
  },
  async error => {
    console.log(error.response);

    // Handle errors
    const { status, data } = error.response || {};
    const errorMessage = data?.message || 'An unexpected error occurred';

    // Show error notification
    alertService.error('Error', errorMessage);

    // Development logging
    if (import.meta.env.VITE_APP_ENV === 'development') {
      console.error('API Error:', {
        status,
        data,
        headers: error.config?.headers,
        cookies: document.cookie,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
