import { Badge, Button, Collapse, ConfigProvider, Dropdown, Flex, Input, Typography } from 'antd';
import { useState } from 'react';
import { TaskType } from '@/types/task.types';
import { EditOutlined, EllipsisOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import './task-list-table-wrapper.css';
import TaskListTable from '../task-list-table-old/task-list-table-old';
import { MenuProps } from 'antd/lib';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { ITaskListGroup } from '@/types/tasks/taskList.types';
import TaskListCustom from '../task-list-custom';

type TaskListTableWrapperProps = {
  taskList: ITaskListGroup;
  groupId: string | undefined;
  name: string | undefined;
  color: string | undefined;
  onRename?: (name: string) => void;
  onStatusCategoryChange?: (category: string) => void;
};

const TaskListTableWrapper = ({
  taskList,
  groupId,
  name,
  color,
  onRename,
  onStatusCategoryChange,
}: TaskListTableWrapperProps) => {
  const [tableName, setTableName] = useState<string>(name || '');
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const type = 'status';

  // localization
  const { t } = useTranslation('task-list-table');

  // function to handle toggle expand
  const handlToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // these codes only for status type tables
  // function to handle rename this functionality only available for status type tables
  const handleRename = () => {
    if (onRename) {
      onRename(tableName);
    }
    setIsRenaming(false);
  };

  // function to handle category change
  const handleCategoryChange = (category: string) => {
    if (onStatusCategoryChange) {
      onStatusCategoryChange(category);
    }
  };

  // find the available status for the currently active project
  const statusList = useAppSelector(state => state.statusReducer.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return '#d8d7d8';
      case 'doing':
        return '#c0d5f6';
      case 'done':
        return '#c2e4d0';
      default:
        return '#d8d7d8';
    }
  };

  // dropdown options
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: 'Rename',
      onClick: () => setIsRenaming(true),
    },
    {
      key: '2',
      icon: <RetweetOutlined />,
      label: 'Change category',
      children: statusList?.map(status => ({
        key: status.id,
        label: (
          <Flex gap={8} onClick={() => handleCategoryChange(status.category)}>
            <Badge color={getStatusColor(status.category)} />
            {status.name}
          </Flex>
        ),
      })),
    },
  ];

  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        components: {
          Collapse: {
            headerPadding: 0,
            contentPadding: 0,
          },

          Select: {
            colorBorder: colors.transparent,
          },
        },
      }}
    >
      <Flex vertical>
        <Flex style={{ transform: 'translateY(6px)' }}>
          <Button
            className="custom-collapse-button"
            style={{
              backgroundColor: color,
              border: 'none',
              borderBottomLeftRadius: isExpanded ? 0 : 4,
              borderBottomRightRadius: isExpanded ? 0 : 4,
              color: colors.darkGray,
            }}
            icon={<RightOutlined rotate={isExpanded ? 90 : 0} />}
            onClick={handlToggleExpand}
          >
            {isRenaming ? (
              <Input
                size="small"
                value={tableName}
                onChange={e => setTableName(e.target.value)}
                onBlur={handleRename}
                onPressEnter={handleRename}
                autoFocus
              />
            ) : (
              <Typography.Text
                style={{
                  fontSize: 14,
                  color: colors.darkGray,
                }}
              >
                {['todo', 'doing', 'done', 'low', 'medium', 'high'].includes(
                  tableName.replace(/\s+/g, '').toLowerCase()
                )
                  ? t(`${tableName.replace(/\s+/g, '').toLowerCase()}SelectorText`)
                  : tableName}{' '}
                ({taskList.tasks.length})
              </Typography.Text>
            )}
          </Button>
          {type === 'status' && !isRenaming && (
            <Dropdown menu={{ items }}>
              <Button icon={<EllipsisOutlined />} className="borderless-icon-btn" />
            </Dropdown>
          )}
        </Flex>
        <Collapse
          collapsible="header"
          className="border-l-[4px]"
          bordered={false}
          ghost={true}
          expandIcon={() => null}
          activeKey={isExpanded ? groupId || '1' : undefined}
          onChange={handlToggleExpand}
          items={[
            {
              key: groupId || '1',
              className: `custom-collapse-content-box relative after:content after:absolute after:h-full after:w-1 ${color} after:z-10 after:top-0 after:left-0`,
              children: (
                <TaskListCustom
                  key={groupId}
                  groupId={groupId}
                  tasks={taskList.tasks}
                  color={color || ''}
                />
              ),
            },
          ]}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default TaskListTableWrapper;
