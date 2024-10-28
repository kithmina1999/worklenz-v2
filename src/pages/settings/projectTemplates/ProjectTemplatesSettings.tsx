import { Card, Table, TableProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProjectTemplatesSettings = () => {
  // localization
  const { t } = useTranslation('projectTemplatesSettings');

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: t('nameColumn'),
      dataIndex: 'name',
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <Table columns={columns} />
    </Card>
  );
};

export default ProjectTemplatesSettings;
