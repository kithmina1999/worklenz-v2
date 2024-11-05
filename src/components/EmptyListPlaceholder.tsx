import { Empty, Typography } from 'antd';
import React from 'react';
import { colors } from '../styles/colors';

type EmptyListPlaceholderProps = {
  imageSrc: string;
  imageHeight?: number;
  text: string;
};

const EmptyListPlaceholder = ({
  imageSrc,
  imageHeight,
  text,
}: EmptyListPlaceholderProps) => {
  return (
    <Empty
      image={imageSrc}
      imageStyle={{ height: imageHeight || 60 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBlockStart: 24,
      }}
      description={
        <Typography.Text style={{ color: colors.lightGray }}>
          {text}
        </Typography.Text>
      }
    />
  );
};

export default EmptyListPlaceholder;
