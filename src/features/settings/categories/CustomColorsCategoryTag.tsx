import React from 'react';
import { Tag, Typography } from 'antd';
import { colors } from '@/styles/colors';
import { CategoryType } from '@/types/categories.types';

const CustomColorsCategoryTag = ({
  category,
}: {
  category: CategoryType | null;
}) => {
  return (
    <Tag key={category?.categoryId} color={category?.categoryColor}>
      <Typography.Text style={{ fontSize: 12, color: colors.darkGray }}>
        {category?.categoryName}
      </Typography.Text>
    </Tag>
  );
};

export default CustomColorsCategoryTag;
