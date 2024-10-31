import {
  Badge,
  Drawer,
  Flex,
  Form,
  Input,
  Dropdown,
  Menu,
  MenuProps,
  Card,
  Button,
} from 'antd';
import React, { useState } from 'react';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addStatus, toggleDrawer } from './StatusSlice';
import { TaskStatusType } from '../../../types/task.types';
import { colors } from '../../../styles/colors';
import { DownOutlined } from '@ant-design/icons';
import './StatusDrawer.css';

const StatusDrawer: React.FC = () => {
  const isCreateStatusDrawerOpen = useAppSelector(
    (state: RootState) => state.statusReducer.isCreateStatusDrawerOpen
  );
  const dispatch = useAppDispatch();
  const [currentStatus, setCurrentStatus] = useState('Todo');

  const getStatuColor = (status: TaskStatusType) => {
    if (status === 'todo') return colors.deepLightGray;
    else if (status === 'doing') return colors.midBlue;
    else return colors.lightGreen;
  };

  const getRandomLightColor = () => {
    const letters = 'CDEF'; // Higher values for lighter colors
    let color;

    // List of colors to avoid
    const excludedColors = ['#c2e4d0', '#b9cef1', '#d1d0d3'];

    do {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
    } while (excludedColors.includes(color.toLowerCase())); // Retry if color is in the excluded list

    return color;
  };

  const handleFormSubmit = (values: { name: string; category: string }) => {
    dispatch(
      addStatus({
        name: values.name,
        category: currentStatus,
        color: getRandomLightColor(),
      })
    );
    dispatch(toggleDrawer());
  };

  // menu type
  type MenuItem = Required<MenuProps>['items'][number];
  // status menu item
  const statusMenuItems: MenuItem[] = [
    {
      key: 'todo',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('todo')} /> Todo
        </Flex>
      ),
    },
    {
      key: 'doing',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('doing')} /> Doing
        </Flex>
      ),
    },
    {
      key: 'done',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('done')} /> Done
        </Flex>
      ),
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'todo') {
      setCurrentStatus('Todo');
    } else if (e.key === 'doing') {
      setCurrentStatus('Doing');
    } else if (e.key === 'done') {
      setCurrentStatus('Done');
    }
  };

  const statusDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Card className="status-dropdown-card" bordered={false}>
          <Menu
            className="status-menu"
            items={statusMenuItems}
            defaultValue={'todo'}
            onClick={onClick}
          />
        </Card>
      ),
    },
  ];

  return (
    <Drawer
      title="Create Status"
      onClose={() => dispatch(toggleDrawer())}
      open={isCreateStatusDrawerOpen}
    >
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter a name!' }]}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          initialValue={currentStatus}
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Dropdown
            overlayClassName="status-drawer-dropdown"
            menu={{ items: statusDropdownItems }}
            trigger={['click']}
          >
            <div className="custom-input-status">
              <Flex gap={4} align="center">
                {currentStatus}
              </Flex>
              <DownOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
            </div>
          </Dropdown>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default StatusDrawer;
