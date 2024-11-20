import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ThemeWrapper from './features/theme/ThemeWrapper';
import PreferenceSelector from './components/PreferenceSelector';
import { SocketProvider } from './socket/socketContext';
import router from './app/routes';

const App: React.FC = () => {
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