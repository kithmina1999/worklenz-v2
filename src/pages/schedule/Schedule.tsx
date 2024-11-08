import {
  Button,
  DatePicker,
  DatePickerProps,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';
import Team from '../../components/schedule/team/Team';
import { SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toggleSettingsDrawer } from '../../features/schedule/scheduleSlice';
import ScheduleSettingsDrawer from '../../features/schedule/ScheduleSettingsDrawer';

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
  const [date, setDate] = useState<Date | null>(null);

  const handleToday = () => {
    setDate(new Date());
    console.log('Today:', new Date());
  }

  const dispatch = useDispatch()

  return (
    <div style={{ marginBlock: 65, minHeight: '90vh' }}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '25px', paddingBottom: '20px'}}>
        <Button onClick={handleToday}>Today</Button>
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
            onChange={(value) => setDate(value.toDate())}
          />
        </Space>
      </div>
      <Button size='small' shape='circle' onClick={() => dispatch(toggleSettingsDrawer())}><SettingOutlined /></Button>
      </div>

      <div>
        <Team date={date}/>
      </div>
      <ScheduleSettingsDrawer />
    </div>
  );
};

export default Schedule;
