import { Col, ConfigProvider, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import { useAppSelector } from '../hooks/useAppSelector';
import { useMediaQuery } from 'react-responsive';
import { colors } from '../styles/colors';
import { useAuthService } from '@/hooks/useAuth';
import { useEffect } from 'react';

const MainLayout = () => {
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const { getCurrentSession } = useAuthService();
  const currentSession = getCurrentSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSession?.is_expired) {
      navigate('/worklenz/license-expired');
    }
  }, [currentSession, navigate]);

  const headerStyles = {
    zIndex: 999,
    position: 'fixed',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    borderBottom: themeMode === 'dark' ? '1px solid #303030' : 'none',
  } as const;

  const contentStyles = {
    paddingInline: isDesktop ? 64 : 24,
    overflowX: 'hidden',
  } as const;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgLayout: themeMode === 'dark' ? colors.darkGray : colors.white,
            headerBg: themeMode === 'dark' ? colors.darkGray : colors.white,
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header
          className={`shadow-md ${themeMode === 'dark' ? '' : 'shadow-[#18181811]'}`}
          style={headerStyles}
        >
          <Navbar />
        </Layout.Header>

        <Layout.Content>
          <Col
            xxl={{ span: 18, offset: 3, flex: '100%' }}
            style={contentStyles}
          >
            <Outlet />
          </Col>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
