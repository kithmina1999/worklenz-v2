import { PageHeader } from '@ant-design/pro-components';
import React, { memo } from 'react';

type CustomPageHeaderProps = {
  title: string;
  children: React.ReactNode | null;
};

const CustomPageHeader = ({ title, children }: CustomPageHeaderProps) => {
  return (
    <PageHeader
      className="site-page-header"
      title={title}
      style={{ padding: '16px 0' }}
      extra={children || null}
    />
  );
};

export default memo(CustomPageHeader);
