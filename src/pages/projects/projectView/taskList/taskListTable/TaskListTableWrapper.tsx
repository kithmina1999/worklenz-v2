import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDroppable } from '@dnd-kit/core'; // Add this import

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
import TaskListTable from './task-list-table';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import Collapsible from '@/components/collapsible/collapsible';
import { IGroupBy, updateTaskGroupColor } from '@/features/tasks/tasks.slice';
import { useAuthService } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ITaskStatusUpdateModel } from '@/types/tasks/task-status-update-model.types';
import { statusApiService } from '@/api/taskAttributes/status/status.api.service';
import { phasesApiService } from '@/api/taskAttributes/phases/phases.api.service';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { fetchPhasesByProjectId } from '@/features/projects/singleProject/phase/phases.slice';
import logger from '@/utils/errorLogger';
import { fetchStatuses } from '@/features/taskAttributes/taskStatusSlice';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { evt_project_board_column_setting_click } from '@/shared/worklenz-analytics-events';
import { ALPHA_CHANNEL } from '@/shared/constants';
import useIsProjectManager from '@/hooks/useIsProjectManager';

interface TaskListTableWrapperProps {
  taskList: IProjectTask[];
  tableId: string;
  name: string;
  groupBy: string;
  color: string;
  statusCategory?: string | null;
  activeId?: string | null;
}

const TaskListTableWrapper = ({
  taskList,
  tableId,
  name,
  groupBy,
  color,
  statusCategory = null,
  activeId,
}: TaskListTableWrapperProps) => {
  const isOwnerOrAdmin = useAuthService().isOwnerOrAdmin();
  const { trackMixpanelEvent } = useMixpanelTracking();
  const dispatch = useAppDispatch();
  const isProjectManager = useIsProjectManager();

  const [tableName, setTableName] = useState<string>(name);
  const [showRenameInput, setShowRenameInput] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<string | null>(statusCategory);

  const { t } = useTranslation('task-list-table');
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);
  const { projectId, project } = useAppSelector(state => state.projectReducer);

  // Add useDroppable hook
  const { setNodeRef, isOver } = useDroppable({
    id: tableId,
    data: { groupId: tableId }, // Pass groupId for handleDragEnd
  });

  const handlToggleExpand = () => {
    if (isRenaming) return;
    setIsExpanded(!isExpanded);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && e.target !== e.currentTarget) {
      e.preventDefault();
    }
  };

  const updateStatus = async (categoryId = currentCategory) => {
    if (!categoryId || !projectId || !tableId) return;
    const body: ITaskStatusUpdateModel = {
      name: tableName.trim(),
      project_id: projectId,
      category_id: categoryId,
    };
    const res = await statusApiService.updateStatus(tableId, body, projectId);
    if (res.done) {
      trackMixpanelEvent(evt_project_board_column_setting_click, { Rename: 'Status' });
      if (res.body.color_code) {
        dispatch(
          updateTaskGroupColor({
            groupId: tableId,
            colorCode: res.body.color_code + ALPHA_CHANNEL,
          })
        );
      }
      dispatch(fetchStatuses(projectId));
    }
  };

  const handleRename = async () => {
    if (!projectId || isRenaming || !(isOwnerOrAdmin || isProjectManager) || !tableId) return;

    if (tableName.trim() === name.trim()) {
      setShowRenameInput(false);
      return;
    }

    setShowRenameInput(false);
    setIsRenaming(true);

    try {
      if (groupBy === IGroupBy.STATUS) {
        await updateStatus();
      } else if (groupBy === IGroupBy.PHASE) {
        const body = { id: tableId, name: tableName.trim() };
        const res = await phasesApiService.updateNameOfPhase(tableId, body as ITaskPhase, projectId);
        if (res.done) {
          trackMixpanelEvent(evt_project_board_column_setting_click, { Rename: 'Phase' });
          dispatch(fetchPhasesByProjectId(projectId));
        }
      }
    } catch (error) {
      logger.error('Error renaming:', error);
      setTableName(name);
      setShowRenameInput(true);
    } finally {
      setIsRenaming(false);
    }
  };

  const handleBlurOrEnter = () => {
    handleRename();
    setShowRenameInput(false);
  };

  const handleCategoryChange = async (categoryId: string) => {
    setCurrentCategory(categoryId);
    trackMixpanelEvent(evt_project_board_column_setting_click, { 'Change category': 'Status' });
    await updateStatus(categoryId);
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
          <Flex
            gap={8}
            onClick={() => status.id && handleCategoryChange(status.id)}
            style={statusCategory === status.id ? { fontWeight: 700 } : {}}
          >
            <Badge color={status.color_code} />
            {status.name}
          </Flex>
        ),
      })),
    },
  ].filter(Boolean) as MenuProps['items'];

  const isEditable = isOwnerOrAdmin || isProjectManager;

  // Original JSX wrapped in a droppable div
  return (
    <div
      ref={setNodeRef} // Attach droppable ref here
    >
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
            {groupBy !== IGroupBy.PRIORITY && !showRenameInput && isEditable && (
              <Dropdown menu={{ items }}>
                <Button
                  icon={<EllipsisOutlined />}
                  className="borderless-icon-btn"
                  title={isEditable ? undefined : t('noPermission')}
                />
              </Dropdown>
            )}
          </Flex>
          <Collapsible
            isOpen={isExpanded}
            className={`border-l-[3px] relative after:content after:absolute after:h-full after:w-1 after:z-10 after:top-0 after:left-0`}
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