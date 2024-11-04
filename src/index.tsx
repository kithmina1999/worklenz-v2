import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { applyCssVariables } from './styles/colors';
import { ConfigProvider, Layout, Spin, theme } from 'antd';
import { colors } from './styles/colors';

// Initialize theme
const getInitialTheme = () => {
  try {
    return (
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  } catch {
    return 'light';
  }
};

const initialTheme = getInitialTheme();

// Apply CSS variables and initial theme
applyCssVariables();

// Loading component with theme awareness
const ThemedLoading = () => {
  const currentTheme = getInitialTheme();
  const isDark = currentTheme === 'dark';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Layout: {
            colorBgLayout: isDark ? colors.darkGray : '#fafafa',
          },
          Spin: {
            colorPrimary: isDark ? '#fff' : '#1890ff',
          },
        },
      }}
    >
      <Layout
        className="app-loading-container"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          background: isDark ? colors.darkGray : '#fafafa',
          transition: 'none',
        }}
      >
        <Spin
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Layout>
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Apply initial theme to document
document.documentElement.classList.add(initialTheme);
document.documentElement.style.colorScheme = initialTheme;

root.render(
  <ConfigProvider
    theme={{
      algorithm: initialTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Layout: {
          colorBgLayout: initialTheme === 'dark' ? colors.darkGray : '#fafafa',
        },
        Spin: {
          colorPrimary: initialTheme === 'dark' ? '#fff' : '#1890ff',
        },
      },
    }}
  >
    <Suspense fallback={<ThemedLoading />}>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Suspense>
  </ConfigProvider>
);

reportWebVitals();
