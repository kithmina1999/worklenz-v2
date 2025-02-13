import { Button, Drawer, Form, Input, List, Typography } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleTaskTemplateDrawer } from './taskTemplateSlice';
import jsonData from './TaskTemplateDrawer.json';
import { useTranslation } from 'react-i18next';

const TaskTemplateDrawer = () => {
  const { isTaskTemplateDrawerOpen, selectedTemplate } = useAppSelector(
    state => state.taskTemplateReducer
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation('task-template-drawer');
  const [form] = Form.useForm();
  // Find the selected template data
  const filteredData = jsonData.find(template => template.id === selectedTemplate);

  const onClose = () => {
    form.resetFields();

    dispatch(toggleTaskTemplateDrawer());
  };

  return (
    <Drawer
      width={650}
      title={selectedTemplate ? t('title') : t('createTaskTemplate')}
      open={isTaskTemplateDrawerOpen}
      onClose={onClose}
      footer={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'right' }}>
          <Button>Cancel</Button> <Button type="primary">Save</Button>
        </div>
      }
    >
      <Form form={form}>
        <Form.Item label={t('templateNameText')}>
          <Input type="text" value={filteredData?.name} />
        </Form.Item>
        <Typography.Text style={{ fontWeight: 700 }}>
          {t('selectedTasks')} ({filteredData?.tasks.length || 0})
        </Typography.Text>
        <div style={{ marginTop: '1.5rem' }}>
          <List
            bordered
            dataSource={filteredData?.tasks}
            renderItem={item => (
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
                  <Button type="link">{t('removeTask')}</Button>
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
