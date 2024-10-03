import React, { useState } from 'react';
import { Button, Form, Input, List, Typography } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './CreateFirstTasks.css';

const { Title } = Typography;

interface CreateFirstTasksProps {
  onContinue: () => void;
  onGoBack: () => void;
}

interface Task {
  id: number;
  value: string;
}

const CreateFirstTasks: React.FC<CreateFirstTasksProps> = ({
  onContinue,
  onGoBack,
}) => {
  const [tasks, setTasks] = useState<Task[]>([{ id: Date.now(), value: '' }]);

  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTasks(tasks.map(task => (task.id === id ? { ...task, value } : task)));
  };

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), value: '' }]);
  };

  const removeTask = (id: number) => {
    if (tasks.length > 1) {
        setTasks(tasks.filter(task => task.id !== id));
      }
  };

  const isButtonDisabled = tasks.some(task => task.value.trim() === '');

  return (
    <Form
      style={{
        minHeight: '300px',
        width: '600px',
        paddingBottom: '1rem',
        marginBottom: '3rem',
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Form.Item>
        <Title level={2} style={{ marginBottom: '1rem' }}>
          Create your first task.
        </Title>
      </Form.Item>
      <Form.Item
        layout="vertical"
        rules={[{ required: true }]}
        label={
          <span style={{ color: '#00000073', fontWeight: 500 }}>
            Type a few tasks that you are going to do in "<mark>dff</mark>".
          </span>
        }
      >
        <List
          dataSource={tasks}
          renderItem={task => (
            <List.Item>
              <div style={{ display: 'flex', width: '600px' }}>
                <Input
                  placeholder="Your Task"
                  value={task.value}
                  onChange={e => handleInputChange(task.id, e)}
                />
                <Button
                  className="custom-close-button"
                  style={{ marginLeft: '48px' }}
                  type="text"
                  icon={<CloseCircleOutlined style={{ color: '#00000073', fontSize: '20px' }} />}
                  onClick={() => removeTask(task.id)}
                />
              </div>
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addTask}
          style={{ marginTop: '16px' }}
        >
          Add another
        </Button>
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <Button style={{ padding: 0 }} type="link" onClick={onGoBack}>
          Go back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isButtonDisabled}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
      </Form.Item>
    </Form>
  );
};

export default CreateFirstTasks;