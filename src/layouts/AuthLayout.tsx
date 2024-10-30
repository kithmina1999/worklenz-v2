import { ConfigProvider, Flex, Layout } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { colors } from '../styles/colors';

const AuthLayout = () => {
  const themeMode = useAppSelector((state) => state.themeReducer.mode);
  const layoutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle smooth theme transitions
  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.style.transition = 'background-color 0.3s ease';
    }
  }, []);

  // Prevent flash during navigation
  useEffect(() => {
    if (layoutRef.current) {
      // Temporarily disable transitions during navigation
      layoutRef.current.style.transition = 'none';
      
      // Re-enable transitions after a short delay
      setTimeout(() => {
        if (layoutRef.current) {
          layoutRef.current.style.transition = 'background-color 0.3s ease';
        }
      }, 50);
    }
  }, [location.pathname]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgLayout: themeMode === 'dark' ? colors.darkGray : '#fafafa',
          },
          Card: {
            colorBgContainer: themeMode === 'dark' ? colors.darkGray : '#fafafa',
          },
        },
        token: {
          // Motion durations as strings with 's' suffix
          motionDurationFast: '0.1s',
          motionDurationMid: '0.2s',
          motionDurationSlow: '0.3s',
        },
      }}
    >
      <Layout
        ref={layoutRef}
        className="auth-layout"
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          background: themeMode === 'dark' ? colors.darkGray : '#fafafa',
        }}
      >
        <Flex
          className="auth-content"
          style={{
            marginBlockStart: 96,
            marginBlockEnd: 48,
            marginInline: 24,
            width: '90%',
            maxWidth: 440,
            position: 'relative',
          }}
        >
          <Outlet />
        </Flex>
      </Layout>
    </ConfigProvider>
  );
};

export default AuthLayout;