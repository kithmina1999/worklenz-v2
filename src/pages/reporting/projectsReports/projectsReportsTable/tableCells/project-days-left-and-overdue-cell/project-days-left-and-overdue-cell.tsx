import { Typography } from 'antd';
import React from 'react';
import { colors } from '../../../../../../styles/colors';

type ProjectDaysLeftAndOverdueCellProps = {
  daysLeft: number | null;
};

const ProjectDaysLeftAndOverdueCell = ({
  daysLeft,
}: ProjectDaysLeftAndOverdueCellProps) => {
  return (
    <Typography.Text style={{ cursor: 'pointer', color: colors.limeGreen }}>
      {daysLeft ? `${daysLeft} days left` : '-'}
    </Typography.Text>
  );
};

export default ProjectDaysLeftAndOverdueCell;
