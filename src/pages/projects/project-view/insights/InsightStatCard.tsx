import React, { ReactNode } from 'react';
import { Card, Flex, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { colors } from '../../../../styles/colors';

type InsightCardProps = {
  icon: string;
  title: string;
  tooltip?: string;
  children: ReactNode;
};

const InsightStatCard = ({
  icon,
  title,
  tooltip,
  children,
}: InsightCardProps) => {
  return (
    <Card
      className="custom-insights-card"
      style={{ width: '100%' }}
      styles={{ body: { paddingInline: 16 } }}
    >
      <Flex gap={16} align="center">
        <img
          src={icon}
          alt={`${title.toLowerCase()} icon`}
          style={{
            width: '100%',
            maxWidth: 42,
            height: '100%',
            maxHeight: 42,
          }}
        />
        <Flex vertical>
          <Typography.Text style={{ fontSize: 16 }}>
            {title}
            {tooltip && (
              <Tooltip title={tooltip}>
                <ExclamationCircleOutlined
                  style={{
                    color: colors.skyBlue,
                    fontSize: 13,
                    marginInlineStart: 4,
                  }}
                />
              </Tooltip>
            )}
          </Typography.Text>
          <Typography.Title level={2} style={{ marginBlock: 0 }}>
            {children}
          </Typography.Title>
        </Flex>
      </Flex>
    </Card>
  );
};

export default InsightStatCard;
