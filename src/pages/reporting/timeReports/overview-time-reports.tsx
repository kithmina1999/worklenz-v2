import React from 'react';
import TimeReportPageHeader from '@/pages/reporting/timeReports/page-header/time-report-page-header';
import { Button, Checkbox, Dropdown, Flex, Space, Typography } from 'antd';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { DownOutlined } from '@ant-design/icons';
import TimeSheetTable from '@/pages/reporting/timeReports/time-sheet-table/time-sheet-table';

const OverviewTimeReports: React.FC = () => {
  return (
    <Flex vertical>
      <CustomPageHeader
        title="Time Sheet"
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

      <div>
        <TimeReportPageHeader />
      </div>
      <div style={{marginTop: '1rem'}}>
        {/* Time Report Table */}
        <TimeSheetTable />
      </div>
    </Flex>
  );
};

export default OverviewTimeReports;
