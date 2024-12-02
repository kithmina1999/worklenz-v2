import {
  DeleteOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  Input,
  Popconfirm,
  Table,
  TableProps,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@/styles/colors';
import { CategoryType } from '@/types/categories.types';
import CustomColorsCategoryTag from '@features/settings/categories/CustomColorsCategoryTag';
import { deleteCategory } from '@features/settings/categories/categoriesSlice';
import { categoriesApiService } from '@/api/settings/categories/categories.api.service';
import { IProjectCategory } from '@/types/project/projectCategory.types';

const CategoriesSettings = () => {
  // localization
  const { t } = useTranslation('settings-categories');

  // get currently hover row
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  const [categories, setCategories] = useState<IProjectCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredData = useMemo(() => categories.filter(record => 
    Object.values(record).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  ), [categories, searchQuery]);

  const getCategories = useMemo(() => {
    setLoading(true);
    return async () => {
      const response = await categoriesApiService.getCategories();
      if (response.done) {
        setCategories(response.body);
      }
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'category',
      title: t('categoryColumn'),
      render: (record: CategoryType) => (
        <CustomColorsCategoryTag category={record} />
      ),
    },
    {
      key: 'associatedTask',
      title: t('associatedTaskColumn'),
      render: () => <Typography.Text>0</Typography.Text>,
    },
    {
      key: 'actionBtns',
      width: 60,
      render: (record: CategoryType) =>
        hoverRow === record.categoryId && (
          <Popconfirm
            title={t('deleteConfirmationTitle')}
            icon={
              <ExclamationCircleFilled
                style={{ color: colors.vibrantOrange }}
              />
            }
            okText={t('deleteConfirmationOk')}
            cancelText={t('deleteConfirmationCancel')}
            onConfirm={() => dispatch(deleteCategory(record.categoryId))}
          >
            <Button shape="default" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        ),
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
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
        className="custom-two-colors-row-table"
        dataSource={filteredData}
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
    </Card>
  );
};

export default CategoriesSettings;
