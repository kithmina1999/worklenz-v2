import React, { useEffect, useState } from 'react';
import { TaskType } from '../../../types/task.types';
import { Avatar, Col, DatePicker, Divider, Flex, Row, Tooltip, Typography } from 'antd';
import StatusDropdown from '@components/task-list-common/statusDropdown/StatusDropdown';
import { AvatarNamesMap } from '../../../shared/constants';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

interface subtaskProps {
  subtask: TaskType;
}

const SubTaskCard: React.FC<subtaskProps> = ({ subtask }) => {
  const [isSubToday, setIsSubToday] = useState(false);
  const [isSubTomorrow, setIsSubTomorrow] = useState(false);
  const [isItSubPrevDate, setIsItSubPrevDate] = useState(false);
  const [subTaskDueDate, setSubTaskDueDate] = useState<Dayjs | null>(null);
  const {t} = useTranslation('kanban-board')

  const handleSubTaskDateChange = (date: Dayjs | null) => {
    setSubTaskDueDate(date);
  };

  const formatDate = (date: Dayjs | null) => {
    if (!date) return '';

    const today = dayjs();
    const tomorrow = today.add(1, 'day');

    if (date.isSame(today, 'day')) {
      return 'Today';
    } else if (date.isSame(tomorrow, 'day')) {
      return 'Tomorrow';
    } else {
      return date.isSame(today, 'year')
        ? date.format('MMM DD')
        : date.format('MMM DD, YYYY');
    }
  };

  useEffect(() => {
    if (subTaskDueDate) {
      setIsSubToday(subTaskDueDate.isSame(dayjs(), 'day'));
      setIsSubTomorrow(subTaskDueDate.isSame(dayjs().add(1, 'day'), 'day'));
      setIsItSubPrevDate(subTaskDueDate.isBefore(dayjs()));
    } else {
      setIsSubToday(false);
      setIsSubTomorrow(false);
      setIsItSubPrevDate(false);
    }
  }, [subTaskDueDate]);

  return (
    <Row
      key={subtask.taskId}
      style={{
        marginTop: '0.5rem',
        width: '100%',
      }}
    >
      <Col span={10}>
        <Typography.Text
          style={{ fontWeight: 500, fontSize: '12px' }}
          delete={subtask.status === 'done'}
        >
          {subtask.task}
        </Typography.Text>
      </Col>
      <Col span={4}>
        <Avatar.Group
          size="small"
          max={{
            count: 1,
            style: {
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            },
          }}
        >
          {subtask.members?.map((member) => (
            <Avatar
              style={{
                backgroundColor: AvatarNamesMap[member.memberName.charAt(0)],
                fontSize: '12px',
              }}
              size="small"
            >
              {member.memberName.charAt(0)}
            </Avatar>
          ))}
        </Avatar.Group>
      </Col>
      <Col span={10}>
        <Flex>
          <DatePicker
            className={`custom-placeholder ${!subTaskDueDate ? 'empty-date' : isSubToday || isSubTomorrow ? 'selected-date' : isItSubPrevDate ? 'red-colored' : ''}`}
            placeholder={t('dueDate')}
            style={{
              fontSize: '12px',
              opacity: subTaskDueDate ? 1 : 0,
            }}
            onChange={handleSubTaskDateChange}
            variant="borderless"
            size="small"
            suffixIcon={false}
            format={(value) => formatDate(value)}
          />
          <div>
            <StatusDropdown currentStatus={subtask.status} />
          </div>
        </Flex>
      </Col>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Text
          style={{ fontWeight: 500 }}
          delete={subtask.status === 'done'}
        >
          {subtask.task}
        </Typography.Text>
        <StatusDropdown currentStatus={subtask.status} />
      </div>
      <div style={{ display: 'flex' }}>
        <Avatar.Group
          size="small"
          max={{
            count: 1,
            style: {
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            },
          }}
        >
          {subtask.members?.map((member) => (
            <Avatar
              style={{
                backgroundColor: AvatarNamesMap[member.memberName.charAt(0)],
                fontSize: '12px',
              }}
              size="small"
            >
              {member.memberName.charAt(0)}
            </Avatar>
          ))}
        </Avatar.Group>
        <DatePicker
          className={`custom-placeholder ${!subTaskDueDate ? 'empty-date' : isSubToday || isSubTomorrow ? 'selected-date' : isItSubPrevDate ? 'red-colored' : ''}`}
          placeholder="Due date"
          style={{
            fontSize: '12px',
            opacity: subTaskDueDate ? 1 : 0,
          }}
          onChange={handleSubTaskDateChange}
          variant="borderless"
          size="small"
          suffixIcon={false}
          format={(value) => formatDate(value)}
        />
      </div> */}
      <Divider style={{ margin: '5px' }} />
    </Row>
  );
};

export default SubTaskCard;
