import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Flex, Typography } from 'antd';
import { ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const StatusGraph = () => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
  };

  //   mock task data
  const mockStatusData = {
    labels: ['To Do', 'Doing', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [10, 4, 6],
        backgroundColor: ['#a9a9a9', '#70a6f3', '#75c997'],
        hoverBackgroundColor: ['#989898', '#4190ff', '#46d980'],
      },
    ],
  };

  return (
    <Flex gap={24} wrap="wrap-reverse" justify="center">
      <Doughnut
        options={options}
        data={mockStatusData}
        className="max-h-[350px] w-full max-w-[350px]"
      />

      <Flex
        gap={12}
        style={{ marginBlockStart: 12 }}
        wrap={'wrap'}
        className="flex-row xl:flex-col"
      >
        <Flex gap={8} align="center">
          <Badge color={'#a9a9a9'} />
          <Typography.Text>To Do (7) </Typography.Text>
        </Flex>
        <Flex gap={8} align="center">
          <Badge color={'#70a6f3'} />
          <Typography.Text>Doing (2) </Typography.Text>
        </Flex>
        <Flex gap={8} align="center">
          <Badge color={'#75c997'} />
          <Typography.Text>Done (6) </Typography.Text>
        </Flex>
        <Flex gap={8} align="center">
          <Badge color={'#a9a9a9'} />
          <Typography.Text>On Hold (3) </Typography.Text>
        </Flex>
        <Flex gap={8} align="center">
          <Badge color={'#70a6f3'} />
          <Typography.Text>Review (2) </Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StatusGraph;
