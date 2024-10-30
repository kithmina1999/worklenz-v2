import { MoreOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, List, Space } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import {
  projectViewTaskListColumnsState,
  toggleColumnVisibility,
} from '../../../../../features/projects/singleProject/taskListColumns/taskColumnsSlice';
import { columnList } from '../taskListTable/columns/columnList';

const ShowFieldsDropdown = () => {
  const dispatch = useAppDispatch();

  const columnsVisibility = useAppSelector(
    (state) => state.projectViewTaskListColumnsReducer.columnsVisibility
  );

  const showFieldsDropdownContent = (
    <Card style={{ height: 300, overflowY: 'scroll' }}>
      <List>
        {columnList.map((col) => (
          <List.Item key={col.key} style={{ padding: '4px 8px' }}>
            <Space>
              <Checkbox
                checked={
                  columnsVisibility[
                    col.key as keyof projectViewTaskListColumnsState['columnsVisibility']
                  ]
                }
                onClick={() => dispatch(toggleColumnVisibility(col.key))}
              >
                {col.columnHeader}
              </Checkbox>
            </Space>
          </List.Item>
        ))}
      </List>
    </Card>
  );

  return (
    <Dropdown overlay={showFieldsDropdownContent} trigger={['click']}>
      <Button icon={<MoreOutlined />}>Show fields</Button>
    </Dropdown>
  );
};

export default ShowFieldsDropdown;
