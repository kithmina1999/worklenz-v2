import { Progress, Table, TableColumnsType } from 'antd';
import React from 'react';
import CustomTableTitle from '../../../../../components/CustomTableTitle';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { toggleProjectReportsMembersTaskDrawer } from '../../projectReportsSlice';

type ProjectReportsMembersTableProps = {
  membersData: any[];
};

const ProjectReportsMembersTable = ({
  membersData,
}: ProjectReportsMembersTableProps) => {
  const dispatch = useAppDispatch();

  // function to handle task drawer open
  const handleProjectReportsMembersTaskDrawer = () => {
    dispatch(toggleProjectReportsMembersTaskDrawer());
  };

  const columns: TableColumnsType = [
    {
      key: 'name',
      title: <CustomTableTitle title="Name" />,
      onCell: (record) => {
        return {
          onClick: handleProjectReportsMembersTaskDrawer,
        };
      },
      dataIndex: 'name',
      width: 260,
      className: 'group-hover:text-[#1890ff]',
      fixed: 'left' as const,
    },
    {
      key: 'tasksCount',
      title: <CustomTableTitle title="Tasks Count" />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'tasks_count',
      width: 120,
    },
    {
      key: 'completedTasks',
      title: <CustomTableTitle title="Completed Tasks" />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'completed',
      width: 120,
    },
    {
      key: 'incompleteTasks',
      title: <CustomTableTitle title="Incomplete Tasks" />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'incompleted',
      width: 120,
    },
    {
      key: 'overdueTasks',
      title: <CustomTableTitle title="Overdue Tasks" />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'overdue',
      width: 120,
    },
    {
      key: 'contribution',
      title: <CustomTableTitle title="Contribution" />,
      render: (record) => {
        return <Progress percent={record.contribution} />;
      },
      width: 180,
    },
    {
      key: 'progress',
      title: <CustomTableTitle title="Progress" />,
      render: (record) => {
        return <Progress percent={record.progress} />;
      },
      width: 180,
    },
    {
      key: 'loggedTime',
      title: <CustomTableTitle title="Logged Time" />,
      className: 'text-center group-hover:text-[#1890ff]',
      dataIndex: 'time_logged',
      width: 120,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={membersData}
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

export default ProjectReportsMembersTable;
