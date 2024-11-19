import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';
import { ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const ProjectReportsPriorityGraph = () => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
  };

  //   mock data
  const mockPriorityData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Tasks',
        data: [6, 12, 2],
        backgroundColor: ['#75c997', '#fbc84c', '#f37070'],
        hoverBackgroundColor: ['#46d980', '#ffc227', '#ff4141'],
      },
    ],
  };

  return (
    <Card
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          Tasks By Priority
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
            <Typography.Text>Low (6) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#fbc84c'} />
            <Typography.Text>Medium (12) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#f37070'} />
            <Typography.Text>High (2) </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectReportsPriorityGraph;
