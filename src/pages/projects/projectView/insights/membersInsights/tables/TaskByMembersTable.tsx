import React, { useState } from 'react';
import { Flex, Progress } from 'antd';
import { colors } from '../../../../../../styles/colors';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { themeWiseColor } from '../../../../../../utils/themeWiseColor';
import {
  DownOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import AssignedTasksListTable from './AssignedTasksListTable';

// mock members data
const memberList = [
  {
    memberId: 'M1',
    name: 'Sachintha Prasad',
    taskCount: 3,
    contribution: 13,
    completed: 2,
    incomplete: 1,
    overdue: 0,
  },
  {
    memberId: 'M2',
    name: 'Raveesha Dilanka',
    taskCount: 3,
    contribution: 13,
    completed: 1,
    incomplete: 2,
    overdue: 2,
  },
  {
    memberId: 'M3',
    name: 'Amal Perera',
    taskCount: 2,
    contribution: 20,
    completed: 2,
    incomplete: 0,
    overdue: 1,
  },
];

const TaskByMembersTable = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // get theme data from theme reducer
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // toggle members row expansions
  const toggleRowExpansion = (memberId: string) => {
    setExpandedRows((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // columns list
  const columnsList = [
    { key: 'name', columnHeader: 'Name', width: 200 },
    { key: 'taskCount', columnHeader: 'Task Count', width: 100 },
    { key: 'contribution', columnHeader: 'Contribution', width: 120 },
    { key: 'completed', columnHeader: 'Completed', width: 100 },
    { key: 'incomplete', columnHeader: 'Incomplete', width: 100 },
    { key: 'overdue', columnHeader: 'Overdue', width: 100 },
    { key: 'progress', columnHeader: 'Progress', width: 150 },
  ];

  // render content, based on column type
  const renderColumnContent = (key: string, member: any) => {
    switch (key) {
      case 'name':
        return (
          <Flex gap={8} align="center">
            {member.taskCount > 0 && (
              <button onClick={() => toggleRowExpansion(member.memberId)}>
                {expandedRows.includes(member.memberId) ? (
                  <DownOutlined />
                ) : (
                  <RightOutlined />
                )}
              </button>
            )}
            {member.overdue > 0 ? (
              <ExclamationCircleOutlined
                style={{ color: colors.vibrantOrange }}
              />
            ) : (
              <div style={{ width: 14, height: 14 }}></div>
            )}
            {member.name}
          </Flex>
        );
      case 'taskCount':
        return member.taskCount;
      case 'contribution':
        return `${member.contribution}%`;
      case 'completed':
        return member.completed;
      case 'incomplete':
        return member.incomplete;
      case 'overdue':
        return member.overdue;
      case 'progress':
        return (
          <Progress
            percent={Math.floor((member.completed / member.taskCount) * 100)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="memberList-container min-h-0 max-w-full overflow-x-auto">
      <table className="w-full min-w-max border-collapse rounded">
        <thead
          style={{
            height: 42,
            backgroundColor: themeWiseColor('#f8f7f9', '#1d1d1d', themeMode),
          }}
        >
          <tr>
            {columnsList.map((column) => (
              <th
                key={column.key}
                className={`p-2`}
                style={{ width: column.width, fontWeight: 500 }}
              >
                {column.columnHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {memberList.map((member) => (
            <React.Fragment key={member.memberId}>
              <tr key={member.memberId} className="h-[42px] cursor-pointer">
                {columnsList.map((column) => (
                  <td
                    key={column.key}
                    className={`border-t p-2 text-center`}
                    style={{
                      width: column.width,
                    }}
                  >
                    {renderColumnContent(column.key, member)}
                  </td>
                ))}
              </tr>

              {expandedRows.includes(member.memberId) && (
                <tr>
                  <td colSpan={columnsList.length}>
                    <AssignedTasksListTable memberId={member.memberId} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskByMembersTable;
