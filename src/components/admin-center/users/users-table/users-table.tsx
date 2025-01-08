import { Avatar, Flex, Table, TableProps } from 'antd';
import React from 'react';
import './users-table.css';
import { useMediaQuery } from 'react-responsive';
import { IOrganizationUser } from '@/types/admin-center/admin-center.types';
import { TFunction } from 'i18next';
import { AvatarNamesMap, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/constants';
import { formatDateTimeWithLocale } from '@/utils/format-date-time-with-locale';

interface UsersTableProps {
  users: IOrganizationUser[];
  t: TFunction;
  loading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, t, loading }) => {
  const isTablet = useMediaQuery({ query: '(min-width: 1000px)' });

  const columns: TableProps<IOrganizationUser>['columns'] = [
    {
      title: t('user'),
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
        <Flex gap={8} align="center">
          <Avatar
            src={record.avatar_url}
            size={28}
            style={{ backgroundColor: AvatarNamesMap[record.name?.charAt(0).toUpperCase() || ''] }}
          >
            {record.name?.charAt(0).toUpperCase()}
          </Avatar>
          <span>{record.name}</span>
        </Flex>
      ),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      render: text => <span className="email-hover">{text}</span>,
    },
    {
      title: t('lastActivity'),
      dataIndex: 'last_logged',
      key: 'last_logged',
      render: text => <span>{formatDateTimeWithLocale(text) || '-'}</span>,
    },
  ];

  return (
    <Table
      rowClassName="users-table-row"
      columns={columns}
      dataSource={users}
      pagination={{
        showSizeChanger: false,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        size: 'small',
      }}
      loading={loading}
    />
  );
};

export default UsersTable;
