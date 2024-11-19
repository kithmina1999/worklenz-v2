import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';

Chart.register(ArcElement, Tooltip);

const ProjectReportsDueDateGraph = () => {
  type DueDateGraphItemType = {
    name: string;
    color: string;
    count: number;
  };

  // mock data
  const dueDateGraphItems: DueDateGraphItemType[] = [
    { name: 'Completed', color: '#75c997', count: 6 },
    { name: 'Upcoming', color: '#70a6f3', count: 8 },
    { name: 'Overdue', color: '#f37070', count: 2 },
    { name: 'No Due Date', color: '#a9a9a9', count: 4 },
  ];

  // chart data
  const chartData = {
    labels: dueDateGraphItems.map((item) => item.name),
    datasets: [
      {
        label: 'Tasks',
        data: dueDateGraphItems.map((item) => item.count),
        backgroundColor: dueDateGraphItems.map((item) => item.color),
      },
    ],
  };

  const totalTasks = dueDateGraphItems.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <Card
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          Tasks By Due Date
        </Typography.Text>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-6 xl:flex-nowrap">
        <Doughnut
          data={chartData}
          options={{ responsive: true }}
          className="max-h-[200px] w-full max-w-[200px]"
        />

        <div className="flex flex-row flex-wrap gap-3 xl:flex-col">
          {/* total tasks */}
          <Flex gap={4} align="center">
            <Badge color="#000" />
            <Typography.Text ellipsis>All ({totalTasks})</Typography.Text>
          </Flex>

          {/* due Date-specific tasks */}
          {dueDateGraphItems.map((item) => (
            <Flex key={item.name} gap={4} align="center">
              <Badge color={item.color} />
              <Typography.Text ellipsis>
                {item.name} ({item.count})
              </Typography.Text>
            </Flex>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectReportsDueDateGraph;
