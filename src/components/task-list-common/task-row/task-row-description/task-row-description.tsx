import { Typography } from 'antd';

const TaskRowDescription = ({ description }: { description: string }) => {
  return (
    <Typography.Paragraph
      ellipsis={{ expandable: false }}
      style={{ width: 260, marginBlockEnd: 0 }}
    >
      {description}
    </Typography.Paragraph>
  );
};

export default TaskRowDescription;
