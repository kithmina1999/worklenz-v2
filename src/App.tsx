// Core dependencies
import React, { Suspense, useEffect } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import i18next from 'i18next';

// Components
import ThemeWrapper from './features/theme/ThemeWrapper';
import PreferenceSelector from './components/PreferenceSelector';
import { SocketProvider } from './socket/socketContext';

// Routes
import router from './app/routes';

// Hooks & Utils
import { useAppSelector } from './hooks/useAppSelector';
import { initMixpanel } from './utils/mixpanelInit';

// Types & Constants
import { Language } from './features/i18n/localesSlice';
import logger from './utils/errorLogger';
import { SuspenseFallback } from './components/suspense-fallback/suspense-fallback';
import { Spin } from 'antd';

// New ErrorBoundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error caught in ErrorBoundary', {error, errorInfo: errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return <Spin />; // You can customize this to show a fallback UI
    }

    return this.props.children; 
  }
}

const App: React.FC<{children: React.ReactNode}> = ({children}) => {
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const language = useAppSelector(state => state.localesReducer.lng);

  initMixpanel(import.meta.env.VITE_MIXPANEL_TOKEN as string);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    i18next.changeLanguage(language || Language.EN, err => {
      if (err) return logger.error('Error changing language', err);
    });
  }, [language]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<SuspenseFallback />}>
        <SocketProvider>
          <ThemeWrapper>
            <RouterProvider router={router} future={{ v7_startTransition: true }} />
            <PreferenceSelector />
          </ThemeWrapper>
        </SocketProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
