import { Flex, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../../../styles/colors';
import { TableProps } from 'antd/lib';
import { simpleDateFormat } from '../../../../../../utils/simpleDateFormat';
import { mockTaskData, MockTaskType } from '../../mockData/mockTaskData';
import { getStatusColor } from '../../../../../../utils/getStatusColor';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';

const TaskCompletedEarlyTable = () => {
  // get currently hover row
  const [hoverRow, setHoverRow] = useState<string | null>(null);

  // get theme details from theme reducer
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // get status data from status slice
  const statusList = useAppSelector((state) => state.statusReducer.status);

  // filter incomplete tasks that are overdue
  const earlyCompletedTaskList = mockTaskData.filter((task) => {
    return (
      task.status === 'Done' &&
      task.completedDate &&
      task.dueDate &&
      task.completedDate < task.dueDate
    );
  });

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
      key: 'completedDate',
      title: 'Completed At',
      render: (record: MockTaskType) => (
        <Typography.Text
          style={{
            color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
          }}
        >
          {simpleDateFormat(record.completedDate || null)}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      className="custom-two-colors-row-table"
      dataSource={earlyCompletedTaskList}
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

export default TaskCompletedEarlyTable;
