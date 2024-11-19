import { Card, Pagination, Table, TableProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNowStrict } from 'date-fns';
import jsonData from './TaskTemplates.json';
import './TaskTemplatesSettings.css';

const TaskTemplatesSettings = () => {
  // localization
  const { t } = useTranslation('taskTemplatesSettings');

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: t('nameColumn'),
      dataIndex: 'name',
    },
    {
      key: 'created',
      title: t('createdColumn'),
      dataIndex: 'created_at',
      render: (date: string) => formatDistanceToNowStrict(new Date(date), { addSuffix: true }),
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <Table size='small' pagination={{size: 'small'}} columns={columns} dataSource={jsonData} rowKey="id" rowClassName={(_, index) =>
          `no-border-row ${index % 2 === 0 ? '' : 'alternate-row-color'}`
        }/>
    </Card>
  );
};

export default TaskTemplatesSettings;
