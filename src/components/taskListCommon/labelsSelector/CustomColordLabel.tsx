import React from 'react';
import { LabelType } from '../../../types/label.type';
import { Tag, Typography } from 'antd';
import { colors } from '../../../styles/colors';

const CustomColordLabel = ({ label }: { label: LabelType | null }) => {
  return (
    <Tag key={label?.labelId} color={label?.labelColor}>
      <Typography.Text style={{ fontSize: 12, color: colors.darkGray }}>
        {label?.labelName}
      </Typography.Text>
    </Tag>
  );
};

export default CustomColordLabel;
