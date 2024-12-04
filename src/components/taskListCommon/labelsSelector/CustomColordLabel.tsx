import React from 'react';
import { LabelType } from '../../../types/label.type';
import { Tag } from 'antd';

const CustomColordLabel = ({ label }: { label: LabelType | null }) => {
  return (
    <Tag
      key={label?.labelId}
      color={label?.labelColor}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        height: 18,
        width: 'fit-content',
        fontSize: 11,
      }}
    >
      {label?.labelName}
    </Tag>
  );
};

export default CustomColordLabel;
