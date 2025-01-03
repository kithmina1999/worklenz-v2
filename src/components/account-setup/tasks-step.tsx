import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/app/store';
import { setTasks } from '@/features/account-setup/account-setup.slice';

const { Title } = Typography;

interface Props {
  onEnter: () => void;
  styles: any;
}

export const TasksStep: React.FC<Props> = ({ onEnter, styles }) => {
  const { t } = useTranslation('account-setup');
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.accountSetupReducer);

  const addTask = () => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 0;
    dispatch(setTasks([...tasks, { id: newId, value: '' }]));
  };

  const removeTask = (id: number) => {
    dispatch(setTasks(tasks.filter(task => task.id !== id)));
  };

  const updateTask = (id: number, value: string) => {
    dispatch(setTasks(tasks.map(task => (task.id === id ? { ...task, value } : task))));
  };

  const handleKeyPress = (e: React.KeyboardEvent, isLast: boolean) => {
    e.preventDefault();
    if (isLast) {
      addTask();
    }
  };

  return (
    <Form className="step-form" style={styles.form}>
      <Form.Item>
        <Title level={2} style={{ marginBottom: '1rem' }}>
          {t('addInitialTasks')}
        </Title>
      </Form.Item>

      {tasks.map((task, index) => (
        <Form.Item key={task.id} style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder={t('step2InputLabel')}
              value={task.value}
              onChange={e => updateTask(task.id, e.target.value)}
              onPressEnter={e => handleKeyPress(e, index === tasks.length - 1)}
              style={{ flex: 1 }}
            />
            {tasks.length > 1 && (
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeTask(task.id)}
                style={{ color: 'red' }}
              />
            )}
          </div>
        </Form.Item>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={addTask}
          block
          icon={<PlusOutlined />}
          style={{ marginTop: '12px' }}
        >
          {t('addTask')}
        </Button>
      </Form.Item>

      <Form.Item style={{ marginTop: '24px' }}>
        <Button type="primary" onClick={onEnter} block>
          {t('continue')}
        </Button>
      </Form.Item>
    </Form>
  );
};
