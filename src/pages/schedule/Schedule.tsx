import {
  Button,
  DatePicker,
  DatePickerProps,
  Radio,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';
import Team from '../../components/schedule/team/Team';

const { Option } = Select;

type PickerType = 'week' | 'month';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: DatePickerProps['onChange'];
}) => {
  return <DatePicker picker={type} onChange={onChange} />;
};

const Schedule: React.FC = () => {
  const [type, setType] = useState<PickerType>('week');

  return (
    <div style={{ marginBlock: 65, minHeight: '90vh' }}>
      <div
        style={{
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
          <Radio.Group>
            <Radio.Button value="team">Team</Radio.Button>
            <Radio.Button value="project">Project</Radio.Button>
          </Radio.Group>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button>Today</Button>
            <Space>
              <Select
                value={type}
                onChange={(value) => setType(value as PickerType)}
              >
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
              </Select>
              <PickerWithType
                type={type}
                onChange={(value) => console.log(value)}
              />
            </Space>
          </div>
        </div>

        <div>
          <Button type="primary">Allocate</Button>
        </div>
      </div>
      <div>
        <Team />
      </div>
    </div>
  );
};

export default Schedule;
