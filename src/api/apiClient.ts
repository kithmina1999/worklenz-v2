import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { IServerResponse } from '@/types/common.types';
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
  (config) => {
    const token = getCsrfToken();
    if (token) {
      const decodedToken = decodeURIComponent(token);
      config.headers['X-CSRF-Token'] = decodedToken;
      config.headers['X-XSRF-TOKEN'] = decodedToken;
      config.headers['XSRF-TOKEN'] = decodedToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with notification handling based on done flag
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data as IServerResponse<unknown>;
    console.log('data', data);

    // Only show notification if there's a message
      if (data.done) {
        // Success notification
        alertService.success(data.title || 'Success', data?.message || '');
      } else {
        // Error notification even for successful HTTP response
        alertService.error(data.title || 'Error', data?.message || '');
      }
    
    // If done is false, reject the promise to trigger error handling
    if (!data.done) {
      return Promise.reject({ response: { data } });
    }
    
    return response;
  },
  async (error) => {
    // Handle error responses
    const errorResponse = error.response?.data as IServerResponse<unknown>;
    
    if (errorResponse?.message) {
      alertService.error(errorResponse.title || 'Error', errorResponse.message);
    } else {
      // Generic error if no specific message
      alertService.error('Error', 'An unexpected error occurred. Please try again.');
    }

    // Development logging
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