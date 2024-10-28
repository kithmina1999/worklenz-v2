import { Tabs } from 'antd';
import React from 'react';
import AddTaskInlineForm from './AddTaskInlineForm';

const ListView = () => {
  // tasks filter tab items
  const tabItems = [
    {
      key: 'all',
      label: `All (0)`,
      children: <AddTaskInlineForm />,
    },
    {
      key: 'today',
      label: `Today (0)`,
    },
    {
      key: 'upcoming',
      label: `Upcoming (0)`,
    },
    {
      key: 'overdue',
      label: `Overdue (0)`,
    },
    {
      key: 'no due date',
      label: `No due date (0)`,
    },
  ];

  return (
    //  tasks filtering tabs
    <Tabs type="card" items={tabItems} />
  );
};

export default ListView;
