import { Button, Drawer, Form, Input, List, Typography } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleTaskTemplateDrawer } from './taskTemplateSlice';
import jsonData from './TaskTemplateDrawer.json';

const TaskTemplateDrawer = () => {
  const isTaskTemplateDrawerOpen = useAppSelector(
    (state) => state.taskTemplateReducer.isTaskTemplateDrawerOpen
  );
  const selectedTemplate = useAppSelector(
    (state) => state.taskTemplateReducer.selectedTemplate
  );
  const dispatch = useAppDispatch();

  // Find the selected template data
  const filteredData = jsonData.find(
    (template) => template.id === selectedTemplate
  );

  return (
    <Drawer
      width={650}
      title="Edit Task Template"
      open={isTaskTemplateDrawerOpen}
      onClose={() => dispatch(toggleTaskTemplateDrawer())}
      footer={<div style={{display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'right'}}><Button>Cancel</Button> <Button type='primary'>Save</Button></div>}
    >
      <Form>
        <Form.Item label="Template Name">
          <Input type="text" value={filteredData?.name} />
        </Form.Item>
        <Typography.Text style={{ fontWeight: 700 }}>
          Selected Tasks ({filteredData?.tasks.length})
        </Typography.Text>
        <div style={{ marginTop: '1.5rem' }}>
          <List
            bordered
            dataSource={filteredData?.tasks}
            renderItem={(item) => (
              <List.Item>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span>{item.name}</span>
                  <Button type="link">Remove</Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Form>
    </Drawer>
  );
};

export default TaskTemplateDrawer;
