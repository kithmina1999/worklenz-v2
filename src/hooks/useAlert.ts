// src/hooks/useAlert.ts
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { alertService } from '@/services/alerts/alertService';
import { showAlert } from '@/services/alerts/alertSlice';
import { AlertMessage, AlertType } from '@/types/alert.types';

export const useAlert = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Set translation function in service
  alertService.setTranslation(t);

  const show = (type: AlertType, title: AlertMessage, message: AlertMessage, duration?: number) => {
    // Update Redux state
    dispatch(showAlert({ type, title, message, duration }));
    // Show alert via service
    alertService[type](title, message, duration);
  };

  return {
    success: (title: AlertMessage, message: AlertMessage, duration?: number) => 
      show('success', title, message, duration),
    error: (title: AlertMessage, message: AlertMessage, duration?: number) => 
      show('error', title, message, duration),
    info: (title: AlertMessage, message: AlertMessage, duration?: number) => 
      show('info', title, message, duration),
    warning: (title: AlertMessage, message: AlertMessage, duration?: number) => 
      show('warning', title, message, duration),
    clearAll: alertService.clearAll
  };
};