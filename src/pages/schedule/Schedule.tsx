import {
  Button,
  DatePicker,
  DatePickerProps,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '25px', paddingBottom: '20px'}}>
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

      <div>
        <Team />
      </div>
    </div>
  );
};

export default Schedule;
