import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';
import { ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const ProjectReportsDueDateGraph = () => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
  };

  //   mock data
  const mockPriorityData = {
    labels: ['Completed', 'Upcoming', 'Overdue', 'No Due Date'],
    datasets: [
      {
        label: 'Tasks',
        data: [6, 8, 2, 4],
        backgroundColor: ['#75c997', '#70a6f3', '#f37070', '#a9a9a9'],
        hoverBackgroundColor: ['#46d980', '#4190ff', '#ff4141', '#989898'],
      },
    ],
  };

  return (
    <Card
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          Tasks By Due Date
        </Typography.Text>
      }
    >
      <Flex gap={24} wrap="wrap" align="center" justify="center">
        <Doughnut
          options={options}
          data={mockPriorityData}
          className="max-h-[200px] w-full max-w-[200px]"
        />

        <Flex
          gap={12}
          style={{ marginBlockStart: 12 }}
          wrap={'wrap'}
          className="flex-row xl:flex-col"
        >
          <Flex gap={8} align="center">
            <Badge color={'#000'} />
            <Typography.Text>All (20) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#75c997'} />
            <Typography.Text>Completed (6) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#fbc84c'} />
            <Typography.Text>Upcoming (8) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#f37070'} />
            <Typography.Text>Overdue (2) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#f37070'} />
            <Typography.Text>No Due Date (4) </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectReportsDueDateGraph;
