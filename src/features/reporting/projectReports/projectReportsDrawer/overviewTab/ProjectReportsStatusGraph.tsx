import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';

Chart.register(ArcElement, Tooltip);

const ProjectReportsStatusGraph = () => {
  type StatusGraphItemType = {
    name: string;
    color: string;
    count: number;
  };

  // mock data
  const statusGraphItems: StatusGraphItemType[] = [
    { name: 'To Do', color: '#a9a9a9', count: 6 },
    { name: 'Doing', color: '#70a6f3', count: 6 },
    { name: 'Done', color: '#75c997', count: 8 },
  ];

  // chart data
  const chartData = {
    labels: statusGraphItems.map((item) => item.name),
    datasets: [
      {
        label: 'Tasks',
        data: statusGraphItems.map((item) => item.count),
        backgroundColor: statusGraphItems.map((item) => item.color),
      },
    ],
  };

  const totalTasks = statusGraphItems.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <Card
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          Tasks By Status
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

          {/* status-specific tasks */}
          {statusGraphItems.map((item) => (
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

export default ProjectReportsStatusGraph;
