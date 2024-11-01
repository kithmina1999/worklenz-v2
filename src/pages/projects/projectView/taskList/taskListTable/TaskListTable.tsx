import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { columnList } from './columns/columnList';
import AddTaskListRow from './taskListTableRows/AddTaskListRow';
import { TaskType } from '../../../../../types/task.types';
import {
  Avatar,
  Checkbox,
  DatePicker,
  Flex,
  Progress,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import CustomAvatar from '../../../../../components/CustomAvatar';
import LabelsSelector from '../../../../../components/taskListCommon/labelsSelector/LabelsSelector';
import { useSelectedProject } from '../../../../../hooks/useSelectedProject';
import StatusDropdown from '../../../../../components/taskListCommon/statusDropdown/StatusDropdown';
import PriorityDropdown from '../../../../../components/taskListCommon/priorityDropdown/PriorityDropdown';
import { simpleDateFormat } from '../../../../../utils/simpleDateFormat';
import { durationDateFormat } from '../../../../../utils/durationDateFormat';
import CustomColordLabel from '../../../../../components/taskListCommon/labelsSelector/CustomColordLabel';
import CustomNumberLabel from '../../../../../components/taskListCommon/labelsSelector/CustomNumberLabel';
import PhaseDropdown from '../../../../../components/taskListCommon/phaseDropdown/PhaseDropdown';
import AssigneeSelector from '../../../../../components/taskListCommon/assigneeSelector/AssigneeSelector';
import TaskCell from './taskListTableCells/TaskCell';
import AddSubTaskListRow from './taskListTableRows/AddSubTaskListRow';
import UpdateTaskDrawer from '../../../../../features/tasks/taskCreationAndUpdate/UpdateTaskDrawer';
import { colors } from '../../../../../styles/colors';
import TimeTracker from './taskListTableCells/TimeTracker';

const TaskListTable = ({ taskList }: { taskList: TaskType[] | null }) => {
  // these states manage the necessary states
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  // get data theme data from redux
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // get the selected project details
  const selectedProject = useSelectedProject();

  // get columns list details
  const columnsVisibility = useAppSelector(
    (state) => state.projectViewTaskListColumnsReducer.columnsVisibility
  );
  const visibleColumns = columnList.filter(
    (column) => columnsVisibility[column.key as keyof typeof columnsVisibility]
  );

  // toggle subtasks visibility
  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  // toggle selected row
  const toggleRowSelection = (task: TaskType) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(task.taskId)
        ? prevSelectedRows.filter((id) => id !== task.taskId)
        : [...prevSelectedRows, task.taskId]
    );

    // log the task object when selected
    if (!selectedRows.includes(task.taskId)) {
      console.log('Selected task:', task);
    }
  };

  // layout styles for table and the columns
  const customBorderColor = themeMode === 'dark' && ' border-[#303030]';

  const customHeaderColumnStyles = (key: string) =>
    `border p-2 text-left ${key === 'selector' && 'sticky left-0 z-10'} ${key === 'task' && 'sticky left-[33px] z-10'} ${themeMode === 'dark' ? 'bg-[#1d1d1d] border-[#303030]' : 'bg-white'}`;
  const customBodyColumnStyles = (key: string) =>
    `border p-2 ${key === 'selector' && 'sticky left-0 z-10'} ${key === 'task' && 'sticky left-[33px] z-10'} ${themeMode === 'dark' ? 'bg-[#141414] border-[#303030]' : 'bg-white'}`;

  // function to render the column content based on column key
  const renderColumnContent = (
    columnKey: string,
    task: TaskType,
    isSubtask: boolean = false
  ) => {
    switch (columnKey) {
      // selector column
      case 'selector':
        return (
          <Checkbox
            checked={selectedRows.includes(task.taskId)}
            onChange={() => toggleRowSelection(task)}
          />
        );

      // task ID column
      case 'taskId':
        return (
          <Tooltip title={task.taskId} className="flex justify-center">
            <Tag>{task.taskId}</Tag>
          </Tooltip>
        );

      // task column
      case 'task':
        return (
          // custom task cell component
          <TaskCell
            task={task}
            isSubTask={isSubtask}
            expandedTasks={expandedTasks}
            hoverRow={hoverRow}
            setSelectedTaskId={setSelectedTaskId}
            toggleTaskExpansion={toggleTaskExpansion}
          />
        );

      // description column
      case 'description':
        return (
          <Typography.Paragraph
            ellipsis={{ expandable: false }}
            style={{ width: 260, marginBlockEnd: 0 }}
          >
            {task.description}
          </Typography.Paragraph>
        );

      // progress column
      case 'progress': {
        return task?.progress || task?.progress === 0 ? (
          <Progress percent={task.progress} type="circle" size={30} />
        ) : (
          <div></div>
        );
      }

      // members column
      case 'members':
        return (
          <Flex gap={4} align="center">
            <Avatar.Group>
              {task.members?.map((member) => (
                <CustomAvatar
                  key={member.memberId}
                  avatarName={member.memberName}
                />
              ))}
            </Avatar.Group>
            <AssigneeSelector taskId={selectedTaskId || '0'} />
          </Flex>
        );

      // labels column
      case 'labels':
        return (
          <Flex>
            {task?.labels && task?.labels?.length <= 2 ? (
              task?.labels?.map((label) => <CustomColordLabel label={label} />)
            ) : (
              <Flex>
                <CustomColordLabel
                  label={task?.labels ? task.labels[0] : null}
                />
                <CustomColordLabel
                  label={task?.labels ? task.labels[1] : null}
                />
                {/* this component show other label names  */}
                <CustomNumberLabel
                  // this label list get the labels without 1, 2 elements
                  labelList={task?.labels ? task.labels : null}
                />
              </Flex>
            )}
            <LabelsSelector taskId={task.taskId} />
          </Flex>
        );

      // phase column
      case 'phases':
        return <PhaseDropdown projectId={selectedProject?.projectId || ''} />;

      // status column
      case 'status':
        return <StatusDropdown currentStatus={task.status} />;

      // priority column
      case 'priority':
        return <PriorityDropdown currentPriority={task.priority} />;

      // time tracking column
      case 'timeTracking':
        return (
          <TimeTracker
            taskId={task.taskId}
            initialTime={task.timeTracking || 0}
          />
        );

      // estimation column
      case 'estimation':
        return <Typography.Text>0h 0m</Typography.Text>;

      // start date column
      case 'startDate':
        return task.startDate ? (
          <Typography.Text>{simpleDateFormat(task.startDate)}</Typography.Text>
        ) : (
          <DatePicker
            placeholder="Set a start date"
            suffixIcon={null}
            style={{ border: 'none', width: '100%', height: '100%' }}
          />
        );

      // due date column
      case 'dueDate':
        return task.dueDate ? (
          <Typography.Text>{simpleDateFormat(task.dueDate)}</Typography.Text>
        ) : (
          <DatePicker
            placeholder="Set a due date"
            suffixIcon={null}
            style={{ border: 'none', width: '100%', height: '100%' }}
          />
        );

      // completed date column
      case 'completedDate':
        return (
          <Typography.Text>
            {durationDateFormat(task.completedDate || null)}
          </Typography.Text>
        );

      // created date column
      case 'createdDate':
        return (
          <Typography.Text>
            {durationDateFormat(task.createdDate || null)}
          </Typography.Text>
        );

      // last updated column
      case 'lastUpdated':
        return (
          <Typography.Text>
            {durationDateFormat(task.lastUpdated || null)}
          </Typography.Text>
        );

      // recorder column
      case 'reporter':
        return <Typography.Text>Sachintha Prasad</Typography.Text>;

      // default case for unsupported columns
      default:
        return null;
    }
  };

  return (
    <div className={`border-x border-b ${customBorderColor}`}>
      <div className={`min-h-0 max-w-full overflow-x-auto`}>
        <table className={`rounded-2 w-full min-w-max border-collapse`}>
          <thead className="h-[52px]">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={`${customHeaderColumnStyles(column.key)}`}
                  style={{ width: column.width, fontWeight: 500 }}
                >
                  {column.columnHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {taskList?.map((task) => (
              <React.Fragment key={task.taskId}>
                <tr
                  key={task.taskId}
                  onMouseEnter={() => setHoverRow(task.taskId)}
                  onMouseLeave={() => setHoverRow(null)}
                  className={`${taskList.length === 0 ? 'h-0' : 'h-12'}`}
                >
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className={customBodyColumnStyles(column.key)}
                      style={{
                        width: column.width,
                        backgroundColor: selectedRows.includes(task.taskId)
                          ? themeMode === 'dark'
                            ? colors.skyBlue
                            : '#dceeff'
                          : hoverRow === task.taskId
                            ? themeMode === 'dark'
                              ? '#000'
                              : '#f8f7f9'
                            : themeMode === 'dark'
                              ? '#181818'
                              : '#fff',
                      }}
                    >
                      {renderColumnContent(column.key, task)}
                    </td>
                  ))}
                </tr>

                {/* this is for sub tasks  */}
                {expandedTasks.includes(task.taskId) &&
                  task?.subTasks?.map((subtask) => (
                    <tr
                      key={subtask.taskId}
                      onMouseEnter={() => setHoverRow(subtask.taskId)}
                      onMouseLeave={() => setHoverRow(null)}
                      className={`${taskList.length === 0 ? 'h-0' : 'h-12'}`}
                    >
                      {visibleColumns.map((column) => (
                        <td
                          key={column.key}
                          className={customBodyColumnStyles(column.key)}
                          style={{
                            width: column.width,
                            backgroundColor: selectedRows.includes(
                              subtask.taskId
                            )
                              ? themeMode === 'dark'
                                ? '#1866e9'
                                : '#dceeff'
                              : hoverRow === subtask.taskId
                                ? themeMode === 'dark'
                                  ? '#000'
                                  : '#f8f7f9'
                                : themeMode === 'dark'
                                  ? '#181818'
                                  : '#fff',
                          }}
                        >
                          {renderColumnContent(column.key, subtask, true)}
                        </td>
                      ))}
                    </tr>
                  ))}

                {expandedTasks.includes(task.taskId) && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      <AddSubTaskListRow />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <AddTaskListRow />

      {/* update task drawer  */}
      <UpdateTaskDrawer taskId={selectedTaskId} />
    </div>
  );
};

export default TaskListTable;
