import React from 'react';
import { TaskPriorityType, TaskType } from '../../../../../../types/task.types';
import { Flex } from 'antd';
import TaskListTableWrapper from '../../taskListTable/TaskListTableWrapper';

const PriorityGroupTables = ({ datasource }: { datasource: TaskType[] }) => {
  const priorityList: { id: string; name: string }[] = [
    {
      id: 'high',
      name: 'high',
    },
    {
      id: 'medium',
      name: 'medium',
    },
    {
      id: 'low',
      name: 'low',
    },
  ];

  // fuction for get a color regariding the priority
  const getPriorityColor = (priority: TaskPriorityType) => {
    switch (priority) {
      case 'high':
        return '#f6bfc0';
      case 'medium':
        return '#f9e3b1';
      case 'low':
        return '#c2e4d0';
      default:
        return '#f9e3b1';
    }
  };

  return (
    <Flex gap={24} vertical>
      {priorityList.map((priority, index) => (
        <TaskListTableWrapper
          key={index}
          taskList={datasource.filter(
            (task) => task.priority === priority.name
          )}
          tableId={priority.id}
          name={priority.name}
          type="priority"
          priorityCategory={priority.name}
          color={getPriorityColor(priority.name as TaskPriorityType)}
        />
      ))}
    </Flex>
  );
};

export default PriorityGroupTables;
