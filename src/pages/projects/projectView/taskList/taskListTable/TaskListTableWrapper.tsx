import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Flex from 'antd/es/flex';
import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import ConfigProvider from 'antd/es/config-provider';
import Dropdown from 'antd/es/dropdown';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import { MenuProps } from 'antd/es/menu';

import { EditOutlined, EllipsisOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import './taskListTableWrapper.css';
import TaskListTable from './TaskListTable';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import Collapsible from '@/components/Collapsible/Collapsible';

interface TaskListTableWrapperProps {
  taskList: IProjectTask[];
  tableId: string;
  name: string;
  groupBy: string;
  color: string;
  statusCategory?: string | null;
  onStatusCategoryChange?: (category: string) => void;
  activeId?: string | null;
}

const TaskListTableWrapper = ({
  taskList,
  tableId,
  name,
  groupBy,
  color,
  statusCategory = null,
  onStatusCategoryChange,
  activeId,
}: TaskListTableWrapperProps) => {
  const [tableName, setTableName] = useState<string>(name);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<string | null>(statusCategory);

  const { t } = useTranslation('task-list-table');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);

  const handlToggleExpand = () => {
    if (isRenaming) return;
    setIsExpanded(!isExpanded);
  };

  const handleRename = () => {
    console.log(tableName);
    setIsRenaming(false);
    // if (onRename) {
    //   onRename(tableName);
    // }
    // setIsRenaming(false);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    if (onStatusCategoryChange) {
      onStatusCategoryChange(category);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('handleInputKeyDown', e.key);
    if (e.key === ' ') {
      e.stopPropagation();
    }
  };

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
      children: statusCategories?.map(status => ({
        key: status.id,
        label: (
          <Flex gap={8} onClick={() => status.id && handleCategoryChange(status.id)}>
            <Badge color={status.color_code} />
            {status.name}
          </Flex>
        ),
        type: 'group',
      })),
    },
  ];

  return (
    <div>
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          components: {
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
                  onKeyDown={handleInputKeyDown}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <Typography.Text
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {t(tableName)} ({taskList.length})
                </Typography.Text>
              )}
            </Button>
            {groupBy === 'status' && !isRenaming && (
              <Dropdown menu={{ items }}>
                <Button icon={<EllipsisOutlined />} className="borderless-icon-btn" />
              </Dropdown>
            )}
          </Flex>
          <Collapsible
            isOpen={isExpanded}
            className={`border-l-[3px] relative after:content after:absolute after:h-full after:w-1 after:z-10 after:top-0 after:left-0 mt-1`}
            color={color}
          >
            <TaskListTable taskList={taskList} tableId={tableId} activeId={activeId} />
          </Collapsible>
        </Flex>
      </ConfigProvider>
    </div>
  );
};

export default TaskListTableWrapper;
