import { Flex, Typography } from 'antd';
import SettingSidebar from '../pages/settings/sidebar/SettingSidebar';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// this layout is a sub layout of the main layout
const SettingsLayout = () => {
  // media queries from react-responsive package
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <div style={{ marginBlock: 96, minHeight: '90vh' }}>
      <Typography.Title level={4}>Settings</Typography.Title>

      {isTablet ? (
        <Flex
          gap={24}
          align="flex-start"
          style={{
            width: '100%',
            marginBlockStart: 24,
          }}
        >
          <Flex style={{ width: '100%', maxWidth: 240 }}>
            <SettingSidebar />
          </Flex>
          <Flex style={{ width: '100%' }}>
            <Outlet />
          </Flex>
        </Flex>
      ) : (
        <Flex
          vertical
          gap={24}
          style={{
            marginBlockStart: 24,
          }}
        >
          <SettingSidebar />
          <Outlet />
        </Flex>
      )}
    </div>
  );
};

export default SettingsLayout;
