import { Button, Drawer, Form, Input, Select, Typography } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useSelectedProject } from '../../../../hooks/useSelectedProject';
import { addStatus, defaultStatusList, toggleDrawer } from './statusSlice';
import { StatusType } from '../../../../types/status.types';
import { nanoid } from '@reduxjs/toolkit';

const StatusDrawer = () => {
  // get drawer state from status slice
  const isDrawerOpen = useAppSelector(
    (state) => state.statusReducer.isStatusDrawerOpen
  );
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // get currently selected project from useSelectedProject hook
  const selectedProject = useSelectedProject();

  // function to handle submit
  const handleFormSubmit = async (values: any) => {
    try {
      const newStatus: StatusType = {
        statusId: nanoid(),
        statusName: values.name,
        statusCategory: values.statusCategory,
      };

      dispatch(
        addStatus({
          projectId: selectedProject?.projectId || '',
          status: newStatus,
        })
      );
      dispatch(toggleDrawer());
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  // category selection options
  const categoryOptions = [
    ...defaultStatusList.map((status) => ({
      key: status.statusId,
      value: status.statusCategory,
      label: (
        <Typography.Text
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          {status.statusName}
        </Typography.Text>
      ),
    })),
  ];

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          Create Status
        </Typography.Text>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{ statusCategory: 'todo' }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="statusCategory"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select options={categoryOptions} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default StatusDrawer;
