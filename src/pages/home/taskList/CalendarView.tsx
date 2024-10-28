import React from 'react';
import HomeCalendar from '../../../components/calendars/homeCalendar/HomeCalendar';
import { Tag, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import AddTaskInlineForm from './AddTaskInlineForm';

const CalendarView = () => {
  const date = useAppSelector((state) => state.dateReducer.date);

  return (
    <div>
      <HomeCalendar />

      <Tag
        icon={<ClockCircleOutlined style={{ fontSize: 16 }} />}
        color="success"
        style={{
          display: 'flex',
          width: '100%',
          padding: '8px 12px',
          marginBlock: 12,
        }}
      >
        <Typography.Text>
          Tasks due on: {date.format('MMM DD, YYYY')}
        </Typography.Text>
      </Tag>

      <AddTaskInlineForm />
    </div>
  );
};

export default CalendarView;
