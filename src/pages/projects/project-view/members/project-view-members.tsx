import {
  Avatar,
  Button,
  Card,
  Flex,
  Popconfirm,
  Progress,
  Skeleton,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../styles/colors';
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  SyncOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import EmptyListPlaceholder from '../../../../components/EmptyListPlaceholder';
import CustomAvatar from '../../../../components/CustomAvatar';
import { IProjectMembersViewModel, IProjectMemberViewModel } from '@/types/projectMember.types';

const ProjectViewMembers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<IProjectMembersViewModel>()
  // localization
  const { t } = useTranslation('projectViewMembersTab');

  // function for handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'memberName',
      title: t('nameColumn'),
      sorter: (a, b) => a.memberName.localeCompare(b.memberName),
      render: (record: IProjectMemberViewModel) => (
        <Flex gap={8} align="center">
          <Avatar size={28} src={record.avatar_url}>{record.name?.charAt(0)}</Avatar>
          <Typography.Text>
            {record.name}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'jobTitle',
      title: t('jobTitleColumn'),
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
      width: 120,
      render: (record: IProjectMemberViewModel) => (
        <Typography.Text
          style={{
            marginInlineStart: 12,
          }}
        >
          {record.job_title || '-'}
        </Typography.Text>
      ),
    },
    {
      key: 'email',
      title: t('emailColumn'),
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (record: IProjectMemberViewModel) => (
        <Typography.Text>
          {record.email}
        </Typography.Text>
      ),
    },
    {
      key: 'tasks',
      title: t('tasksColumn'),
      width: 90,
      render: (record: IProjectMemberViewModel) => (
        <Typography.Text
          style={{
            marginInlineStart: 12,
          }}
        >
          {`${record.completed_tasks_count}/${record.all_tasks_count}`}
        </Typography.Text>
      ),
    },
    {
      key: 'taskProgress',
      title: t('taskProgressColumn'),
      render: (record: IProjectMemberViewModel) => (
        <Progress
          percent={Math.floor(
            ((record.completed_tasks_count || 0) / (record.all_tasks_count || 0)) * 100
          )}
        />
      ),
    },
    {
      key: 'access',
      title: t('accessColumn'),
      sorter: (a, b) => a.access.localeCompare(b.access),
      render: (record: IProjectMemberViewModel) => (
        <Typography.Text
          style={{
            textTransform: 'capitalize',
          }}
        >
          {/* {record.memberRole} */}
        </Typography.Text>
      ),
    },
    {
      key: 'actionBtns',
      width: 80,
      render: (record: IProjectMemberViewModel) =>
        (
          <Flex gap={8} style={{ padding: 0 }}>
            <Popconfirm
              title={t('deleteConfirmationTitle')}
              icon={
                <ExclamationCircleFilled
                  style={{ color: colors.vibrantOrange }}
                />
              }
              okText={t('deleteConfirmationOk')}
              cancelText={t('deleteConfirmationCancel')}
              onConfirm={() => console.log('File deleted')}
            >
              <Tooltip title={t('deleteButtonTooltip')}>
                <Button
                  disabled
                  shape="default"
                  icon={<DeleteOutlined />}
                  size="small"
                />
              </Tooltip>
            </Popconfirm>
          </Flex>
        ),
    },
  ];

  return (
    <Card
      style={{ width: '100%' }}
      title={
        <Flex justify="space-between">
          <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
            {members?.total}{' '}
            {members?.total !== 1
              ? t('membersCountPlural')
              : t('memberCount')}
          </Typography.Text>

          <Tooltip title={t('refreshButtonTooltip')}>
            <Button
              shape="circle"
              icon={<SyncOutlined />}
              onClick={() => handleRefresh()}
            />
          </Tooltip>
        </Flex>
      }
    >
      {members?.total === 0 ? (
        <EmptyListPlaceholder
          imageSrc="https://app.worklenz.com/assets/images/empty-box.webp"
          imageHeight={120}
          text={t('emptyText')}
        />
      ) : isLoading ? (
        <Skeleton />
      ) : (
        <Table
          className="custom-two-colors-row-table"
          dataSource={members?.data}
          columns={columns}
          rowKey={(record) => record.memberId}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 20,
          }}
          onRow={(record) => {
            return {
              style: {
                cursor: 'pointer',
                height: 42,
              },
            };
          }}
        />
      )}
    </Card>
  );
};

export default ProjectViewMembers;
