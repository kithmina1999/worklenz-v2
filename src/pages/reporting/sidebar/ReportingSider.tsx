import { ConfigProvider, Flex, Menu, MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../../styles/colors';
import { reportingsItems } from '../../../lib/reporting/reportingConstantants';

const ReportingSider = () => {
  const location = useLocation();

  // function to get the active menu key based on the current location
  const getCurrentActiveKey = () => {
    const afterWorklenzString = location.pathname?.split(
      '/worklenz/reporting/'
    )[1];
    const pathKey = afterWorklenzString?.split('/')[0];
    return pathKey;
  };

  // helper function to generate menu items with submenus
  const generateMenuItems = (): MenuProps['items'] =>
    reportingsItems.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          label: item.name,
          children: item.children.map((child) => ({
            key: child.key,
            label: (
              <Link to={`/worklenz/reporting/${child.endpoint}`}>
                {child.name}
              </Link>
            ),
          })),
        };
      } else {
        return {
          key: item.key,
          label: (
            <Link to={`/worklenz/reporting/${item.endpoint}`}>{item.name}</Link>
          ),
        };
      }
    });

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverBg: colors.transparent,
            itemHoverColor: colors.skyBlue,
            borderRadius: 12,
            itemMarginBlock: 4,
            subMenuItemBg: colors.transparent,
          },
        },
      }}
    >
      <Flex gap={24} vertical style={{ marginBlock: 84 }}>
        <Menu
          className="custom-reporting-sider"
          items={generateMenuItems()}
          selectedKeys={[getCurrentActiveKey()]}
          mode="inline"
          style={{ width: '100%' }}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default ReportingSider;
