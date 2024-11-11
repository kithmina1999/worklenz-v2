import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Layout,
  Tooltip,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import Navbar from '../features/navbar/Navbar';
import { useAppSelector } from '../hooks/useAppSelector';
import { colors } from '../styles/colors';
import {
  GlobalOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { themeWiseColor } from '../utils/themeWiseColor';
import ReportingSider from '../pages/reporting/sidebar/ReportingSider';
import { Outlet } from 'react-router-dom';

const ReportingLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        components: {
          Layout: {
            siderBg: themeMode === 'dark' ? colors.darkGray : colors.white,
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Layout.Header
          className={`shadow-md ${themeMode === 'dark' ? 'shadow-[#5f5f5f1f]' : 'shadow-[#18181811]'}`}
          style={{
            zIndex: 999,
            position: 'fixed',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Navbar />
        </Layout.Header>

        <Layout.Sider
          collapsed={isCollapsed}
          collapsedWidth={16}
          width={160}
          style={{
            position: 'relative',
            borderInlineEnd: `1px solid ${themeWiseColor('#f0f0f0', '#303030', themeMode)}`,
          }}
        >
          {/* sidebar collapsed button */}
          <Tooltip
            title={!isCollapsed && 'Current organization'}
            placement="right"
            trigger={'hover'}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{
                position: 'absolute',
                top: 72,
                width: '100%',
                right: isCollapsed ? -4 : -16,
                height: 40,
              }}
            >
              {!isCollapsed && (
                <Flex gap={8} align="center" style={{ marginInlineStart: 16 }}>
                  <GlobalOutlined
                    style={{
                      color: themeWiseColor(
                        colors.darkGray,
                        colors.white,
                        themeMode
                      ),
                    }}
                  />
                  <Typography.Text strong>Ceydigital</Typography.Text>
                </Flex>
              )}

              <Button
                className="borderless-icon-btn"
                style={{
                  background: themeWiseColor(
                    colors.white,
                    colors.darkGray,
                    themeMode
                  ),
                  boxShadow: 'none',
                  padding: 0,
                  zIndex: 1000,
                }}
                onClick={() => setIsCollapsed((prev) => !prev)}
                icon={
                  isCollapsed ? (
                    <RightCircleOutlined
                      style={{
                        fontSize: 22,
                        color: themeWiseColor(
                          '#c5c5c5',
                          colors.lightGray,
                          themeMode
                        ),
                      }}
                    />
                  ) : (
                    <LeftCircleOutlined
                      style={{
                        fontSize: 22,
                        color: themeWiseColor(
                          '#c5c5c5',
                          colors.lightGray,
                          themeMode
                        ),
                      }}
                    />
                  )
                }
              />
            </Flex>
          </Tooltip>
          {!isCollapsed && (
            <div style={{ marginBlock: 120 }}>
              <ReportingSider />
            </div>
          )}
        </Layout.Sider>

        <Layout.Content style={{ marginBlock: 96 }}>
          <Col style={{ paddingInline: 32 }}>
            <Outlet />
          </Col>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ReportingLayout;
