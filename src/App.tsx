import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import ThemeWrapper from './features/theme/ThemeWrapper';
import PreferenceSelector from './components/PreferenceSelector';
import { SocketProvider } from './socket/SocketContext';

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