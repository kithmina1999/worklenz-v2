import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import ThemeWrapper from './features/theme/ThemeWrapper';
import PreferenceSelector from './components/PreferenceSelector';

const App: React.FC = () => {
  return (
    <ThemeWrapper>
      <RouterProvider router={router} />
      <PreferenceSelector />
    </ThemeWrapper>
  );
};

export default App;
