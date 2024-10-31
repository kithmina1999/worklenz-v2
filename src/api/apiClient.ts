import axios from 'axios';

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
  withCredentials: true, // Important for handling cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add CSRF token
apiClient.interceptors.request.use(
  (config) => {
    const token = getCsrfToken();
    if (token) {
      config.headers['X-CSRF-Token'] = token;
      config.headers['X-XSRF-TOKEN'] = token;  // Some frameworks check this header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookie
    const token = getCsrfToken();
    if (token) {
      // Set token in multiple headers for compatibility
      config.headers['X-CSRF-Token'] = decodeURIComponent(token);
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
      config.headers['XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (import.meta.env.VITE_APP_ENV === 'development') {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers,
        cookies: document.cookie
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
