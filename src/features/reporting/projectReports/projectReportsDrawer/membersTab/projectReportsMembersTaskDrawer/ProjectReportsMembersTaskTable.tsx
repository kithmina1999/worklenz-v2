import { Badge, Flex, Table, TableColumnsType, Tag, Typography } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '../../../../../tasks/taskSlice';
import CustomTableTitle from '../../../../../../components/CustomTableTitle';
import { colors } from '../../../../../../styles/colors';
import { useTranslation } from 'react-i18next';

type ProjectReportsMembersTasksTableProps = {
  tasksData: any[];
  setSeletedTaskId: (id: string) => void;
};

const ProjectReportsMembersTasksTable = ({
  tasksData,
  setSeletedTaskId,
}: ProjectReportsMembersTasksTableProps) => {
  // localization
  const { t } = useTranslation('reportingProjectsDrawer');

  const dispatch = useAppDispatch();

  // function to handle task drawer open
  const handleUpdateTaskDrawer = (id: string) => {
    setSeletedTaskId(id);
    dispatch(toggleUpdateTaskDrawer());
  };

  const columns: TableColumnsType = [
    {
      key: 'task',
      title: <CustomTableTitle title={t('taskColumn')} />,
      onCell: (record) => {
        return {
          onClick: () => handleUpdateTaskDrawer(record.id),
        };
      },
      render: (record) => (
        <Flex>
          {Number(record.sub_tasks_count) > 0 && <DoubleRightOutlined />}
          <Typography.Text className="group-hover:text-[#1890ff]">
            {record.name}
          </Typography.Text>
        </Flex>
      ),
      width: 260,
      fixed: 'left' as const,
    },
    {
      key: 'project',
      title: <CustomTableTitle title={t('projectColumn')} />,
      render: (record) => (
        <Flex gap={8} align="center">
          <Badge color={record.project_color} />
          <Typography.Text>{record.project_name}</Typography.Text>
        </Flex>
      ),
      width: 120,
    },
    {
      key: 'status',
      title: <CustomTableTitle title={t('statusColumn')} />,
      render: (record) => (
        <Tag
          style={{ color: colors.darkGray, borderRadius: 48 }}
          color={record.status_color}
          children={record.status_name}
        />
      ),
      width: 120,
    },
    {
      key: 'priority',
      title: <CustomTableTitle title={t('priorityColumn')} />,
      render: (record) => (
        <Tag
          style={{ color: colors.darkGray, borderRadius: 48 }}
          color={record.priority_color}
          children={record.priority_name}
        />
      ),
      width: 120,
    },
    {
      key: 'dueDate',
      title: <CustomTableTitle title={t('dueDateColumn')} />,
      render: (record) => (
        <Typography.Text className="text-center group-hover:text-[#1890ff]">
          {record.end_date
            ? `${dayjs(record.end_date).format('MMM DD, YYYY')}`
            : '-'}
        </Typography.Text>
      ),
      width: 120,
    },
    {
      key: 'completedDate',
      title: <CustomTableTitle title={t('completedDateColumn')} />,
      render: (record) => (
        <Typography.Text className="text-center group-hover:text-[#1890ff]">
          {record.completed_at
            ? `${dayjs(record.completed_at).format('MMM DD, YYYY')}`
            : '-'}
        </Typography.Text>
      ),
      width: 120,
    },
    {
      key: 'estimatedTime',
      title: <CustomTableTitle title={t('estimatedTimeColumn')} />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'estimated_string',
      width: 130,
    },
    {
      key: 'loggedTime',
      title: <CustomTableTitle title={t('loggedTimeColumn')} />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'time_spent_string',
      width: 130,
    },
    {
      key: 'overloggedTime',
      title: <CustomTableTitle title={t('overloggedTimeColumn')} />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'overlogged_time',
      width: 150,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasksData}
      pagination={false}
      scroll={{ x: 'max-content' }}
      onRow={(record) => {
        return {
          style: { height: 38, cursor: 'pointer' },
          className: 'group even:bg-[#4e4e4e10]',
        };
      }}
    />
  );
};

export default ProjectReportsMembersTasksTable;
