import { SearchOutlined } from '@ant-design/icons';
import { Card, Flex, Input, Table, TableProps, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';

const CategoriesSettings = () => {
  // localization
  const { t } = useTranslation('categoriesSettings');

  const categoriesList = useAppSelector(
    (state) => state.categoriesReducer.categoriesList
  );

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'category',
      title: t('categoryColumn'),
      dataIndex: 'categoryName',
    },
    {
      key: 'associatedTask',
      title: t('associatedTaskColumn'),
      dataIndex: 'associatedTask',
    },
  ];

  return (
    <Card
      style={{ width: '100%' }}
      title={
        <Flex justify="flex-end">
          <Flex
            gap={8}
            align="center"
            justify="flex-end"
            style={{ width: '100%', maxWidth: 400 }}
          >
            <Input
              placeholder={t('searchPlaceholder')}
              style={{ maxWidth: 232 }}
              suffix={<SearchOutlined />}
            />
          </Flex>
        </Flex>
      }
    >
      <Table
        locale={{
          emptyText: <Typography.Text>{t('emptyText')}</Typography.Text>,
        }}
        dataSource={categoriesList}
        columns={columns}
      />
    </Card>
  );
};

export default CategoriesSettings;
