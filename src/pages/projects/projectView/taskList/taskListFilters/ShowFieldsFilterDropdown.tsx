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

const ShowFieldsFilterDropdown = () => {
  const dispatch = useAppDispatch();

  // remove the task and selector column from the list because those are fixrd columns
  const changableColumnList = columnList.filter(
    (column) => column.key !== 'selector' && column.key !== 'task'
  );

  const columnsVisibility = useAppSelector(
    (state) => state.projectViewTaskListColumnsReducer.columnsVisibility
  );

  const showFieldsDropdownContent = (
    <Card
      className="custom-card"
      style={{ height: 300, overflowY: 'scroll' }}
      styles={{ body: { padding: 0 } }}
    >
      <List style={{ padding: 0 }}>
        {changableColumnList.map((col) => (
          <List.Item
            key={col.key}
            className="custom-list-item"
            style={{
              display: 'flex',
              gap: 8,
              padding: '4px 8px',
              border: 'none',
            }}
          >
            <Space>
              <Checkbox
                checked={
                  columnsVisibility[
                    col.key as keyof projectViewTaskListColumnsState['columnsVisibility']
                  ]
                }
                onClick={() => dispatch(toggleColumnVisibility(col.key))}
              >
                {col.columnName}
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

export default ShowFieldsFilterDropdown;
