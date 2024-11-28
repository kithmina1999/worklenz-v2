import { DatePicker, Flex, Typography } from 'antd';
import React from 'react';
import { colors } from '../../../../../../styles/colors';
import dayjs from 'dayjs';

type ProjectDatesCellProps = {
  startDate: Date | null;
  endDate: Date | null;
};

const ProjectDatesCell = ({ startDate, endDate }: ProjectDatesCellProps) => {
  const startDayjs = startDate ? dayjs(startDate) : null;
  const endDayjs = endDate ? dayjs(endDate) : null;

  return (
    <Flex gap={4}>
      <DatePicker
        placeholder="Set Start Date"
        defaultValue={startDayjs}
        format={'MMM DD, YYYY'}
        suffixIcon={null}
        style={{
          backgroundColor: colors.transparent,
          border: 'none',
          boxShadow: 'none',
        }}
      />

      <Typography.Text>-</Typography.Text>

      <DatePicker
        placeholder="Set End Date"
        defaultValue={endDayjs}
        format={'MMM DD, YYYY'}
        suffixIcon={null}
        style={{
          backgroundColor: colors.transparent,
          border: 'none',
          boxShadow: 'none',
        }}
      />
    </Flex>
  );
};

export default ProjectDatesCell;
