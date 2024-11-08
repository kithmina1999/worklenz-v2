import { Flex, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../../../styles/colors';
import { TableProps } from 'antd/lib';
import { simpleDateFormat } from '../../../../../../utils/simpleDateFormat';
import { mockTaskData, MockTaskType } from '../../mockData/mockTaskData';
import { getStatusColor } from '../../../../../../utils/getStatusColor';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';

const OverdueTasksTable = () => {
  // get currently hover row
  const [hoverRow, setHoverRow] = useState<string | null>(null);

  // get theme details from theme reducer
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // get status data from status slice
  const statusList = useAppSelector((state) => state.statusReducer.status);

  // filter incomplete tasks that are overdue
  const overdueTaskList = mockTaskData.filter((task) => {
    const currentDate = new Date();
    return (
      (task.status === 'To Do' || task.status === 'Doing') &&
      task.dueDate &&
      task.dueDate < currentDate
    );
  });

  // calculate days overdue
  const calculateDaysOverdue = (dueDate: Date): number => {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - dueDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: 'Name',
      render: (record: MockTaskType) => (
        <Typography.Text
          style={{
            color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
          }}
        >
          {record.task}
        </Typography.Text>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: MockTaskType) => (
        <Flex
          gap={4}
          style={{
            width: 'fit-content',
            borderRadius: 24,
            paddingInline: 6,
            backgroundColor: getStatusColor(
              statusList?.find((status) => status.name === record.status)
                ?.category || '',
              themeMode
            ),
            color: colors.darkGray,
            cursor: 'pointer',
          }}
        >
          <Typography.Text
            ellipsis={{ expanded: false }}
            style={{
              color: colors.darkGray,
              fontSize: 13,
            }}
          >
            {record.status}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'dueDate',
      title: 'End Date',
      render: (record: MockTaskType) => (
        <Typography.Text
          style={{
            color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
          }}
        >
          {simpleDateFormat(record.dueDate)}
        </Typography.Text>
      ),
    },
    {
      key: 'daysOverdue',
      title: 'Days overdue',
      render: (record: MockTaskType) => {
        const daysOverdue = record.dueDate
          ? calculateDaysOverdue(record.dueDate)
          : 0;
        return (
          <Typography.Text
            style={{
              color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
            }}
          >
            {daysOverdue > 0 ? `${daysOverdue} days` : '0 days'}
          </Typography.Text>
        );
      },
    },
  ];

  return (
    <Table
      className="custom-two-colors-row-table"
      dataSource={overdueTaskList}
      columns={columns}
      rowKey={(record) => record.taskId}
      pagination={{
        showSizeChanger: false,
        defaultPageSize: 10,
      }}
      onRow={(record) => {
        return {
          onMouseEnter: () => setHoverRow(record.taskId),
          onMouseLeave: () => setHoverRow(null),
          style: {
            cursor: 'pointer',
            height: 36,
          },
        };
      }}
    />
  );
};

export default OverdueTasksTable;
