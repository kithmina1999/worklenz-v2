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
import { IGroupBy } from '@/features/tasks/tasks.slice';
import { useAuthService } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ITaskStatusUpdateModel } from '@/types/tasks/task-status-update-model.types';
import { statusApiService } from '@/api/taskAttributes/status/status.api.service';
import { fetchProjectStatuses } from '@/features/projects/lookups/projectStatuses/projectStatusesSlice';

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
  const isOwnerOrAdmin = useAuthService().isOwnerOrAdmin();
  const currentSession = useAuthService().getCurrentSession();
  const dispatch = useAppDispatch();

  const [tableName, setTableName] = useState<string>(name);
  const [showRenameInput, setShowRenameInput] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<string | null>(statusCategory);

  const { t } = useTranslation('task-list-table');

  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);
  const { projectId, project } = useAppSelector(state => state.projectReducer);

  const handlToggleExpand = () => {
    if (isRenaming) return;
    setIsExpanded(!isExpanded);
  };

  const isProjectManager = () => {
    return currentSession?.team_member_id === project?.project_manager?.id;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only prevent default behavior for the collapse/expand button
    if (e.key === ' ' && e.target !== e.currentTarget) {
      e.preventDefault();
    }
  };

  const handleRename = async () => {
    if (!projectId || isRenaming || !(isOwnerOrAdmin || isProjectManager()) || !statusCategory)
      return;

    console.log('handleRename', !projectId || isRenaming || !(isOwnerOrAdmin || isProjectManager()) || !statusCategory);
    if (tableName.trim() === name.trim()) {
      setShowRenameInput(false);
      return;
    }

    setShowRenameInput(false);
    setIsRenaming(true);

    try {
      if (groupBy === IGroupBy.STATUS) {
        const body: ITaskStatusUpdateModel = {
          name: tableName.trim(),
          project_id: projectId,
          category_id: statusCategory,
        };
        const res = await statusApiService.updateStatus(statusCategory, body, projectId);
        if (res.done) {
          dispatch(fetchProjectStatuses());
        }
      } else if (groupBy === IGroupBy.PHASE) {
        // dispatch(renamePhase(tableName));
      }
    } catch (error) {
      console.error('Error renaming:', error);
      // Reset to original name if rename fails
      setTableName(name);
      setShowRenameInput(true); // Keep input visible to allow retry
    } finally {
      setIsRenaming(false);
    }
  };

  const handleBlurOrEnter = () => {
    handleRename();
    setShowRenameInput(false);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    if (onStatusCategoryChange) {
      onStatusCategoryChange(category);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: groupBy === IGroupBy.STATUS ? 'Rename status' : 'Rename phase',
      onClick: () => setShowRenameInput(true),
    },
    groupBy === IGroupBy.STATUS && {
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
  ].filter(Boolean) as MenuProps['items'];

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
              disabled={showRenameInput}
            >
              {showRenameInput ? (
                <Input
                  size="small"
                  value={tableName}
                  onChange={e => setTableName(e.target.value)}
                  onBlur={handleBlurOrEnter}
                  onPressEnter={handleBlurOrEnter}
                  onKeyDown={handleInputKeyDown}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                  style={{ cursor: 'text' }}
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
            {groupBy !== IGroupBy.PRIORITY && !showRenameInput && (
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
