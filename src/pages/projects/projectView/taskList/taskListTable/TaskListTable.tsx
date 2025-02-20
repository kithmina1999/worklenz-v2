import React, { useEffect, useState } from 'react';
import DatePicker from 'antd/es/date-picker';
import Checkbox from 'antd/es/checkbox';
import Tag from 'antd/es/tag';
import Tooltip from 'antd/es/tooltip';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import Flex from 'antd/es/flex';
import { HolderOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useSelectedProject } from '@/hooks/useSelectedProject';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { colors } from '@/styles/colors';
import TaskContextMenu from './context-menu/task-context-menu';
import AddTaskListRow from './task-list-table-rows/add-task-list-row';
import AddSubTaskListRow from './task-list-table-rows/add-sub-task-list-row';
import CustomColumnLabelCell from './custom-columns/custom-column-cells/custom-column-label-cell/custom-column-label-cell';
import CustomColumnSelectionCell from './custom-columns/custom-column-cells/custom-column-selection-cell/custom-column-selection-cell';
import TaskListProgressCell from './task-list-table-cells/task-list-progress-cell/task-list-progress-cell';
import TaskListStartDateCell from './task-list-table-cells/task-list-start-date-cell/task-list-start-date-cell';
import TaskListDueDateCell from './task-list-table-cells/task-list-due-date-cell/task-list-due-date-cell';
import TaskListMembersCell from './task-list-table-cells/task-list-members-cell/task-list-members-cell';
import TaskListLabelsCell from './task-list-table-cells/task-list-labels-cell/task-list-labels-cell';
import TaskListEstimationCell from './task-list-table-cells/task-list-estimation-cell/task-list-estimation-cell';
import TaskListTimeTrackerCell from './task-list-table-cells/task-list-time-tracker-cell/task-list-time-tracker-cell';
import TaskListTaskCell from './task-list-table-cells/task-list-task-cell/task-list-task-cell';
import TaskListTaskIdCell from './task-list-table-cells/task-list-task-id-cell/task-list-task-id-cell';
import TaskListDescriptionCell from './task-list-table-cells/task-list-description-cell/task-list-description-cell';
import TaskListCompletedDateCell from './task-list-table-cells/task-list-completed-date-cell/task-list-completed-date-cell';
import TaskListCreatedDateCell from './task-list-table-cells/task-list-created-date-cell/task-list-created-date-cell';
import TaskListLastUpdatedCell from './task-list-table-cells/task-list-last-updated-cell/task-list-last-updated-cell';
import TaskListReporterCell from './task-list-table-cells/task-list-reporter-cell/task-list-reporter-cell';
import TaskListDueTimeCell from './task-list-table-cells/task-list-due-time-cell/task-list-due-time-cell';
import PhaseDropdown from '@/components/taskListCommon/phaseDropdown/PhaseDropdown';
import AssigneeSelector from '@/components/taskListCommon/assigneeSelector/AssigneeSelector';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { CustomFieldsTypes } from '@/features/projects/singleProject/task-list-custom-columns/task-list-custom-columns-slice';
import {
  deselectAll,
  selectTaskIds,
  selectTasks,
} from '@/features/projects/bulkActions/bulkActionSlice';
import StatusDropdown from '@/components/task-list-common/statusDropdown/StatusDropdown';
import PriorityDropdown from '@/components/task-list-common/priorityDropdown/PriorityDropdown';
import AddCustomColumnButton from './custom-columns/custom-column-modal/add-custom-column-button';
import { createPortal } from 'react-dom';
import { setSelectedTasks } from '@/features/project/project.slice';

interface TaskListTableProps {
  taskList: IProjectTask[] | null;
  tableId: string;
}

const TaskListTable: React.FC<TaskListTableProps> = ({ taskList, tableId }) => {
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [scrollingTables, setScrollingTables] = useState<Record<string, boolean>>({});

  const { t } = useTranslation('task-list-table');
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const selectedProject = useSelectedProject();
  const columnList = useAppSelector(state => state.taskReducer.columns);
  const visibleColumns = columnList.filter(column => column.pinned);
  const selectedTaskIdsList = useAppSelector(state => state.bulkActionReducer.selectedTaskIdsList);

  const isDarkMode = themeMode === 'dark';
  const customBorderColor = isDarkMode ? 'border-[#303030]' : '';

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const toggleSelectAll = () => {
    if (!taskList) return;

    const allTaskIds = taskList
      .flatMap(task => [task.id, ...(task.sub_tasks?.map(subtask => subtask.id) || [])])
      .filter(Boolean) as string[];

    if (isSelectAll) {
      dispatch(deselectAll());
    } else {
      dispatch(selectTaskIds(allTaskIds));
      dispatch(selectTasks(taskList));
    }
    setIsSelectAll(!isSelectAll);
  };

  const toggleRowSelection = (task: IProjectTask) => {
    if (!task.id) return;
    const taskIdsSet = new Set(selectedTaskIdsList);
    const selectedTasksSet = new Set(
      selectedTaskIdsList.map(id => taskList?.find(t => t.id === id)).filter(Boolean)
    );

    if (taskIdsSet.has(task.id)) {
      taskIdsSet.delete(task.id);
      selectedTasksSet.delete(task);
    } else {
      taskIdsSet.add(task.id);
      selectedTasksSet.add(task);
    }

    const taskIds = Array.from(taskIdsSet);
    const selectedTasks = Array.from(selectedTasksSet) as IProjectTask[];

    dispatch(selectTaskIds(taskIds));
    dispatch(selectTasks(selectedTasks));
  };

  const selectOneRow = (task: IProjectTask) => {
    if (!task.id) return;
    // setSelectedRows([task.id]);
    dispatch(selectTaskIds([task.id]));
    dispatch(selectTasks([task]));
  };

  const handleContextMenu = (e: React.MouseEvent, task: IProjectTask) => {
    if (!task.id) return;
    e.preventDefault();
    setSelectedTaskId(task.id);
    selectOneRow(task);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  useEffect(() => {
    const tableContainer = document.querySelector<HTMLElement>(`.tasklist-container-${tableId}`);
    if (!tableContainer) return;

    const handleScroll = () => {
      setScrollingTables(prev => ({
        ...prev,
        [tableId]: tableContainer.scrollLeft > 0,
      }));
    };

    tableContainer.addEventListener('scroll', handleScroll);
    return () => tableContainer.removeEventListener('scroll', handleScroll);
  }, [tableId]);

  const getColumnStyles = (key: string | undefined, isHeader: boolean) => {
    if (!key) return '';

    const baseStyles = `border px-2 ${key === 'selector' ? 'sticky left-0 z-10' : ''}`;
    const taskStyles =
      key === 'task'
        ? `sticky left-[48px] z-10 after:content after:absolute after:top-0 after:-right-1 after:-z-10 after:w-1.5 after:bg-transparent ${
            scrollingTables[tableId]
              ? 'after:bg-gradient-to-r after:from-[rgba(0,0,0,0.12)] after:to-transparent'
              : ''
          }`
        : '';
    const heightStyles = isHeader ? 'after:h-[42px]' : 'after:min-h-[40px]';
    const themeStyles = isDarkMode
      ? `bg-${isHeader ? '[#1d1d1d]' : '[#141414]'} border-[#303030]`
      : `bg-${isHeader ? '[#fafafa]' : 'white'}`;

    return `${baseStyles} ${taskStyles} ${heightStyles} ${themeStyles}`;
  };

  const renderColumnContent = (
    columnKey: string | undefined,
    task: IProjectTask,
    isSubtask: boolean = false
  ) => {
    if (!columnKey || !task) return null;

    const columnComponents = {
      KEY: () => <TaskListTaskIdCell taskId={task.task_key || ''} />,
      TASK: () => (
        <TaskListTaskCell
          task={task}
          isSubTask={isSubtask}
          expandedTasks={expandedTasks}
          toggleTaskExpansion={toggleTaskExpansion}
        />
      ),
      DESCRIPTION: () => <TaskListDescriptionCell description={task.description || ''} />,
      PROGRESS: () => <TaskListProgressCell task={task} />,
      ASSIGNEES: () => <TaskListMembersCell groupId={tableId} task={task} />,
      LABELS: () => <TaskListLabelsCell task={task} />,
      PHASES: () => <PhaseDropdown projectId={selectedProject?.id || ''} />,
      STATUS: () => <StatusDropdown task={task} teamId={selectedProject?.team_id || ''} />,
      PRIORITY: () => <PriorityDropdown task={task} teamId={selectedProject?.team_id || ''} />,
      TIME_TRACKING: () => <TaskListTimeTrackerCell task={task} />,
      ESTIMATION: () => <TaskListEstimationCell />,
      START_DATE: () => <TaskListStartDateCell task={task} />,
      DUE_DATE: () => <TaskListDueDateCell task={task} />,
      DUE_TIME: () => <TaskListDueTimeCell />,
      COMPLETED_DATE: () => <TaskListCompletedDateCell completedDate={task.completed_at || null} />,
      CREATED_DATE: () => <TaskListCreatedDateCell createdDate={task.created_at || null} />,

      LAST_UPDATED: () => <TaskListLastUpdatedCell lastUpdated={task.updated_at || null} />,
      REPORTER: () => <TaskListReporterCell task={task} />,
    };

    return columnComponents[columnKey as keyof typeof columnComponents]?.() || null;
  };

  const renderCustomColumnContent = (
    columnObj: any,
    columnType: CustomFieldsTypes,
    task: IProjectTask
  ) => {
    const customComponents = {
      people: () => <AssigneeSelector task={task} showDropdown={false} groupId={tableId} />,
      date: () => (
        <DatePicker
          placeholder="Set Date"
          format="MMM DD, YYYY"
          suffixIcon={null}
          style={{
            backgroundColor: colors.transparent,
            border: 'none',
            boxShadow: 'none',
          }}
        />
      ),
      checkbox: () => <Checkbox />,
      key: () => (
        <Tooltip title={task.id || ''} className="flex justify-center">
          <Tag>{task.id || ''}</Tag>
        </Tooltip>
      ),
      number: () => {
        const numberTypes = {
          formatted: () => (
            <Input
              defaultValue={columnObj?.previewValue.toFixed(columnObj?.decimals)}
              style={{ padding: 0, border: 'none', background: 'transparent' }}
            />
          ),
          withLabel: () => (
            <Flex gap={4} align="center" justify="flex-start">
              {columnObj?.labelPosition === 'left' && columnObj?.label}
              <Input
                defaultValue={columnObj?.previewValue.toFixed(columnObj?.decimals)}
                style={{
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                }}
              />
              {columnObj?.labelPosition === 'right' && columnObj?.label}
            </Flex>
          ),
          unformatted: () => (
            <Input
              defaultValue={columnObj?.previewValue}
              style={{ padding: 0, border: 'none', background: 'transparent' }}
            />
          ),
          percentage: () => (
            <Input
              defaultValue={`${columnObj?.previewValue.toFixed(columnObj?.decimals)}%`}
              style={{ padding: 0, border: 'none', background: 'transparent' }}
            />
          ),
        };

        return numberTypes[columnObj?.numberType as keyof typeof numberTypes]?.() || null;
      },
      formula: () => {
        const calculateResult = () => {
          if (
            !columnObj?.firstNumericColumn ||
            !columnObj?.secondNumericColumn ||
            !columnObj?.expression
          ) {
            return null;
          }

          const operations = {
            add: () => columnObj.firstNumericColumn + columnObj.secondNumericColumn,
            subtract: () => columnObj.firstNumericColumn - columnObj.secondNumericColumn,
            multiply: () => columnObj.firstNumericColumn * columnObj.secondNumericColumn,
            divide: () =>
              columnObj.secondNumericColumn !== 0
                ? columnObj.firstNumericColumn / columnObj.secondNumericColumn
                : null,
          };

          return operations[columnObj.expression as keyof typeof operations]?.() || null;
        };

        return <Typography.Text>{calculateResult() ?? 'Invalid Formula'}</Typography.Text>;
      },
      labels: () => <CustomColumnLabelCell labelsList={columnObj?.labelsList || []} />,
      selection: () => (
        <CustomColumnSelectionCell selectionsList={columnObj?.selectionsList || []} />
      ),
    };

    return customComponents[columnType]?.() || null;
  };

  const getRowBackgroundColor = (taskId: string | undefined) => {
    if (!taskId) return isDarkMode ? '#181818' : '#fff';
    return selectedTaskIdsList.includes(taskId)
      ? isDarkMode
        ? '#000'
        : '#dceeff'
      : isDarkMode
        ? '#181818'
        : '#fff';
  };

  return (
    <div className={`border-x border-b ${customBorderColor}`}>
      <div className={`tasklist-container-${tableId} min-h-0 max-w-full overflow-x-auto`}>
        <table className="rounded-2 w-full min-w-max border-collapse">
          <thead className="h-[42px]">
            <tr>
              <th
                className={getColumnStyles('selector', true)}
                style={{ width: 56, fontWeight: 500 }}
              >
                <Flex justify="flex-start" style={{ marginInlineStart: 22 }}>
                  <Checkbox checked={isSelectAll} onChange={toggleSelectAll} />
                </Flex>
              </th>
              {visibleColumns.map(column => (
                <th
                  key={column.key}
                  className={getColumnStyles(column.key, true)}
                  style={{ fontWeight: 500 }}
                >
                  {column.key === 'phases' || column.key === 'customColumn' || column.custom_column
                    ? column.name
                    : t(`${column.key?.replace('_', '').toLowerCase()}Column`)}
                </th>
              ))}
              <th className={getColumnStyles('customColumn', true)}>
                <Flex justify="flex-start" style={{ marginInlineStart: 22 }}>
                  <AddCustomColumnButton />
                </Flex>
              </th>
            </tr>
          </thead>
          <tbody>
            {taskList?.map(task => (
              <React.Fragment key={task.id}>
                <tr
                  onContextMenu={e => handleContextMenu(e, task)}
                  className={`${!taskList.length ? 'h-0' : 'h-[42px]'} task-row`}
                >
                  <td
                    className={getColumnStyles('selector', false)}
                    style={{
                      width: 56,
                      backgroundColor: selectedTaskIdsList.includes(task.id || '')
                        ? isDarkMode
                          ? colors.skyBlue
                          : '#dceeff'
                        : isDarkMode
                          ? '#181818'
                          : '#fff',
                    }}
                  >
                    <Flex gap={8} align="center">
                      <HolderOutlined />
                      <Checkbox
                        checked={selectedTaskIdsList.includes(task.id || '')}
                        onChange={() => toggleRowSelection(task)}
                      />
                    </Flex>
                  </td>
                  {visibleColumns.map(column => (
                    <td
                      key={column.key}
                      className={getColumnStyles(column.key, false)}
                      style={{
                        backgroundColor: getRowBackgroundColor(task.id),
                      }}
                    >
                      {column.custom_column
                        ? renderCustomColumnContent(
                            column.custom_column_obj,
                            column.custom_column_obj.fieldType,
                            task
                          )
                        : renderColumnContent(column.key, task)}
                    </td>
                  ))}
                  <td className={getColumnStyles('customColumn', false)}> </td>
                </tr>

                {expandedTasks.includes(task.id || '') && (
                  <>
                    {task?.sub_tasks?.map(subtask => (
                      <tr
                        key={subtask.id}
                        onContextMenu={e => handleContextMenu(e, subtask)}
                        className={`${!taskList.length ? 'h-0' : 'h-[42px]'} task-row`}
                      >
                        <td
                          className={getColumnStyles('selector', false)}
                          style={{
                            width: 20,
                            backgroundColor: getRowBackgroundColor(subtask.id),
                          }}
                        >
                          <Flex style={{ marginInlineStart: 22 }}>
                            <Checkbox
                              checked={selectedTaskIdsList.includes(subtask.id || '')}
                              onChange={() => toggleRowSelection(subtask)}
                            />
                          </Flex>
                        </td>
                        {visibleColumns.map(column => (
                          <td
                            key={column.key}
                            className={getColumnStyles(column.key, false)}
                            style={{
                              backgroundColor: getRowBackgroundColor(subtask.id),
                            }}
                          >
                            {renderColumnContent(column.key, subtask, true)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={visibleColumns.length + 1}>
                        <AddSubTaskListRow />
                      </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <AddTaskListRow groupId={tableId} />

      {createPortal(
        <TaskContextMenu
          visible={contextMenuVisible}
          position={contextMenuPosition}
          selectedTask={selectedTaskIdsList[0]}
          onClose={() => setContextMenuVisible(false)}
        />,
        document.body,
        'task-context-menu'
      )}
    </div>
  );
};

export default TaskListTable;
