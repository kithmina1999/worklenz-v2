import LabelsSelector from '@/components/task-list-common/labelsSelector/labels-selector';
import { ITaskLabel } from '@/types/label.type';
import { ITaskFormViewModel } from '@/types/tasks/task.types';
import { Form } from 'antd';

type TaskDrawerLabelsProps = {
  taskId: string | null;
  labels: ITaskLabel[];
};

const TaskDrawerLabels = ({ taskId, labels }: TaskDrawerLabelsProps) => {
  return (
    <Form.Item name="labels" label="Labels">
      <LabelsSelector taskId={taskId} labels={labels} />
    </Form.Item>
  );
};

export default TaskDrawerLabels;
