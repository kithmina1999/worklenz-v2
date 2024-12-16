import React, { ReactNode } from 'react';
import { Card, Flex, Skeleton, Typography } from 'antd';

type InsightCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  loading?: boolean;
};

const OverviewStatCard = ({ icon, title, children, loading = true }: InsightCardProps) => {
  return (
    <Skeleton loading={loading} active>
      <Card
        className="custom-insights-card"
        style={{ width: '100%' }}
        styles={{ body: { paddingInline: 16 } }}
      >
        <Flex gap={16} align="flex-start">
          {icon}

          <Flex vertical gap={12}>
            <Typography.Text style={{ fontSize: 16 }}>{title}</Typography.Text>

            <>{children}</>
          </Flex>
        </Flex>
      </Card>
    </Skeleton>
  );
};

export default OverviewStatCard;
