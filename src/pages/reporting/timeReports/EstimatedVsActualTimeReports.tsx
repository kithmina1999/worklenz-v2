import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Segmented,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import CustomPageHeader from '../pageHeader/CustomPageHeader';
import { DownOutlined } from '@ant-design/icons';
import TimeReportPageHeader from './pageHeader/TimeReportPageHeader';
import EstimatedVsActualTimeSheet from './estimatedVsActualTimeSheet/EstimatedVsActualTimeSheet';

const EstimatedVsActualTimeReports = () => {
  return (
    <Flex vertical>
      <CustomPageHeader
        title="Estimated vs Actual"
        children={
          <Space>
            <Button>
              <Checkbox />
              <Typography.Text>Include Archived Projects</Typography.Text>
            </Button>

            <Dropdown menu={{ items: [{ key: '1', label: 'Excel' }] }}>
              <Button type="primary" icon={<DownOutlined />} iconPosition="end">
                Export
              </Button>
            </Dropdown>
          </Space>
        }
      />

      <Card
        style={{ borderRadius: '4px' }}
        title={
          <div
            style={{
              padding: '16px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TimeReportPageHeader />
            <Segmented
              style={{ fontWeight: 500 }}
              options={['Working Days', 'Man Days']}
            />
          </div>
        }
        styles={{
          body: {
            maxWidth: 'calc(100vw - 220px)',
            overflowX: 'auto',
            padding: '16px'
          },
        }}
      >
        <EstimatedVsActualTimeSheet />
      </Card>
    </Flex>
  );
};

export default EstimatedVsActualTimeReports;
