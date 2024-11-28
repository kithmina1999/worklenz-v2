import React, { useState } from 'react';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { Button, Card, Checkbox, Flex, Table, TableProps, Typography } from 'antd';
import OverviewStatCard from './overview-stat-card';
import { BankOutlined, FileOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';

const OverviewReports = () => {
  // get currently hover row
  const [hoverRow, setHoverRow] = useState<string | null>(null);

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'projects',
      title: 'Projects',
    },
    {
      key: 'members',
      title: 'Members',
    },
  ];

  return (
    <Flex vertical gap={24}>
      <CustomPageHeader
        title="Overview"
        children={
          <Button>
            <Checkbox />
            <Typography.Text>Include Archived Projects</Typography.Text>
          </Button>
        }
      />

      <Flex gap={24}>
        <OverviewStatCard
          icon={
            <BankOutlined style={{ color: colors.skyBlue, fontSize: 42 }} />
          }
          title={'1 Team'}
          children={
            <Flex vertical>
              <Typography.Text type="secondary">3 Projects</Typography.Text>
              <Typography.Text type="secondary">3 Members</Typography.Text>
            </Flex>
          }
        />

        <OverviewStatCard
          icon={
            <FileOutlined style={{ color: colors.limeGreen, fontSize: 42 }} />
          }
          title={'3 Projects'}
          children={
            <Flex vertical>
              <Typography.Text type="secondary">
                3 Active Projects
              </Typography.Text>
              <Typography.Text type="danger">
                0 Overdue Projects
              </Typography.Text>
            </Flex>
          }
        />

        <OverviewStatCard
          icon={
            <UsergroupAddOutlined
              style={{ color: colors.lightGray, fontSize: 42 }}
            />
          }
          title={'3 Members'}
          children={
            <Flex vertical>
              <Typography.Text type="secondary">
                2 Unassigned members
              </Typography.Text>
              <Typography.Text type="danger">
                1 Member with Overdue Tasks
              </Typography.Text>
            </Flex>
          }
        />
      </Flex>

      <Card>
        <Flex vertical gap={12}>
          <Typography.Text style={{ fontSize: 16 }}>Teams</Typography.Text>

          <Table
            className="custom-two-colors-row-table"
            dataSource={[]}
            columns={columns}
            rowKey={(record) => record.categoryId}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 20,
            }}
            onRow={(record) => {
              return {
                onMouseEnter: () => setHoverRow(record.categoryId),
                onMouseLeave: () => setHoverRow(null),
                style: {
                  cursor: 'pointer',
                  height: 36,
                },
              };
            }}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default OverviewReports;
