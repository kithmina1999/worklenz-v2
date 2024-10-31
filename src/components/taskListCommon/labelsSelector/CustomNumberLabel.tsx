import { Tag, Tooltip } from 'antd';
import React from 'react';
import { LabelType } from '../../../types/label.type';

const CustomNumberLabel = ({
  labelList,
}: {
  labelList: LabelType[] | null;
}) => {
  const list = labelList?.slice(2);

  const labelNamesStirng = list?.map((label) => label.labelName).join(', ');

  return (
    <Tooltip title={labelNamesStirng}>
      <Tag>+{list?.length}</Tag>
    </Tooltip>
  );
};

export default CustomNumberLabel;
