import { Tag, Typography } from 'antd';
import { colors } from '../../../styles/colors';
import { ITaskLabel } from '@/types/tasks/taskLabel.types';

const CustomColordLabel = ({ label }: { label: ITaskLabel | null }) => {
  return (
    <Tag
      key={label?.id}
      color={label?.color_code}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        height: 18,
        width: 'fit-content',
      }}
    >
      <Typography.Text style={{ fontSize: 11, color: colors.darkGray }}>
        {label?.name}
      </Typography.Text>
    </Tag>
  );
};

export default CustomColordLabel;
