import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { Select } from 'antd';

import { Form } from 'antd';

const TaskDrawerPhaseSelector = ({ phases }: { phases: ITaskPhase[] }) => {
  // Define options for selectors
  const phaseMenuItems = phases?.map(phase => ({
    key: phase.id,
    value: phase.id,
    label: phase.name,
  }));

  return (
    <Form.Item name="phase" label="Phase">
      <Select
        placeholder="Select Phase"
        options={phaseMenuItems}
        style={{ width: 'fit-content' }}
        dropdownStyle={{ width: 'fit-content' }}
      />
    </Form.Item>
  );
};

export default TaskDrawerPhaseSelector;
