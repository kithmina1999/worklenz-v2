import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import ThemeWrapper from './features/theme/ThemeWrapper';
import PreferenceSelector from './components/PreferenceSelector';
import { SocketProvider } from './socket/socketContext';
import router from './app/routes';
import { useAppSelector } from './hooks/useAppSelector';

const App: React.FC = () => {
  const themeMode = useAppSelector((state) => state.themeReducer.mode);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);  // Set theme on <html> element
  }, [themeMode]);
  return (
    <SocketProvider>
      <ThemeWrapper>
        <RouterProvider router={router} />
        <PreferenceSelector />
      </ThemeWrapper>
    </SocketProvider>
  );
};

export default App;