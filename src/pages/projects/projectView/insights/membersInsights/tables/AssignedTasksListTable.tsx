import React from 'react';
import { themeWiseColor } from '../../../../../../utils/themeWiseColor';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { mockTaskData, MockTaskType } from '../../mockData/mockTaskData';
import { simpleDateFormat } from '../../../../../../utils/simpleDateFormat';
import { getStatusColor } from '../../../../../../utils/getStatusColor';
import { colors } from '../../../../../../styles/colors';
import { Flex, Tooltip, Typography } from 'antd';

interface AssignedTasksListTableProps {
  memberId: string;
}

const AssignedTasksListTable: React.FC<AssignedTasksListTableProps> = ({
  memberId,
}) => {
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // get status data from status slice
  const statusList = useAppSelector((state) => state.statusReducer.status);

  // Filter tasks assigned to the given memberId
  const memberTasks = mockTaskData.filter((task) =>
    task.members?.some((member) => member.memberId === memberId)
  );

  const columnsList = [
    { key: 'name', columnHeader: 'Name', width: 280 },
    { key: 'status', columnHeader: 'Status', width: 100 },
    { key: 'dueDate', columnHeader: 'Due Date', width: 150 },
    { key: 'overdue', columnHeader: 'Days Overdue', width: 150 },
    { key: 'completedDate', columnHeader: 'Completed Date', width: 150 },
    { key: 'totalAllocation', columnHeader: 'Total Allocation', width: 150 },
    { key: 'overLoggedTime', columnHeader: 'Over Logged Time', width: 150 },
  ];

  // Helper function to calculate overdue days
  const calculateOverdueDays = (
    dueDate: Date | null,
    completedDate: Date | null
  ): number => {
    if (!dueDate || !completedDate) return 0;
    const differenceInTime = completedDate.getTime() - dueDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  // Render content based on column type
  const renderColumnContent = (key: string, task: MockTaskType) => {
    switch (key) {
      case 'name':
        return (
          <Tooltip title={task.task}>
            <Typography.Text ellipsis={{ expanded: false }}>
              {task.task}
            </Typography.Text>
          </Tooltip>
        );
      case 'status':
        return (
          <Flex
            gap={4}
            style={{
              width: 'fit-content',
              borderRadius: 24,
              paddingInline: 6,
              backgroundColor: getStatusColor(
                statusList?.find((status) => status.name === task.status)
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
              {task.status}
            </Typography.Text>
          </Flex>
        );
      case 'dueDate':
        return task.dueDate ? simpleDateFormat(task.dueDate) : 'N/A';
      case 'overdue':
        return task.dueDate && task.completedDate
          ? calculateOverdueDays(task.dueDate, task.completedDate)
          : 'N/A';
      case 'completedDate':
        return task.completedDate
          ? simpleDateFormat(task.completedDate)
          : 'N/A';
      case 'totalAllocation':
        return task.loggedTime || 'N/A';
      case 'overLoggedTime':
        return task.loggedTime ? task.loggedTime : 'N/A';
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-0 max-w-full overflow-x-auto py-2 pl-12 pr-4"
      style={{ backgroundColor: themeWiseColor('#f0f2f5', '#000', themeMode) }}
    >
      <table className="w-full min-w-max border-collapse">
        <thead>
          <tr>
            {columnsList.map((column) => (
              <th
                key={column.key}
                className="p-2 text-left"
                style={{ width: column.width, fontWeight: 500 }}
              >
                {column.columnHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {memberTasks.map((task) => (
            <tr key={task.taskId} className="h-[42px] border-t">
              {columnsList.map((column) => (
                <td
                  key={column.key}
                  className="p-2"
                  style={{ width: column.width }}
                >
                  {renderColumnContent(column.key, task)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedTasksListTable;
