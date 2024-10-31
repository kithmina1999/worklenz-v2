import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { columnList } from './columns/columnList';
import AddTaskListRow from './AddTaskListRow';
import { TaskType } from '../../../../../types/task.types';
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Progress,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { ExpandAltOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import { colors } from '../../../../../styles/colors';
import { useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '../../../../../features/tasks/taskSlice';
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

const TaskListTable = ({ taskList }: { taskList: TaskType[] | null }) => {
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // this can be used to get the currently selected task id
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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

  // Toggle selected row
  const toggleRowSelection = (taskId: string) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(taskId)
        ? prevSelectedRows.filter((id) => id !== taskId)
        : [...prevSelectedRows, taskId]
    );
  };

  // layout styles for table and the columns
  const customBorderColor = themeMode === 'dark' && ' border-[#303030]';

  const customHeaderColumnStyles = (key: string) =>
    `border p-2 text-left ${key === 'selector' && 'sticky left-0 z-10'} ${key === 'task' && 'sticky left-[33px] z-10'} ${themeMode === 'dark' ? 'bg-[#1d1d1d] border-[#303030]' : 'bg-white'}`;
  const customBodyColumnStyles = (key: string) =>
    `border p-2 ${key === 'selector' && 'sticky left-0 z-10'} ${key === 'task' && 'sticky left-[33px] z-10'} ${themeMode === 'dark' ? 'bg-[#141414] border-[#303030]' : 'bg-white'}`;

  const getRowStyle = (taskId: string) =>
    selectedRows.includes(taskId) ? 'bg-blue-100' : '';

  // function to render the column content based on column key
  const renderColumnContent = (columnKey: string, task: TaskType) => {
    switch (columnKey) {
      // selector column
      case 'selector':
        return (
          <Checkbox
            checked={selectedRows.includes(task.taskId)}
            onChange={() => toggleRowSelection(task.taskId)}
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
          <Flex align="center" justify="space-between">
            <Flex gap={8} align="center">
              <Typography.Text>{task.task}</Typography.Text>
            </Flex>
            {hoverRow === task.taskId && (
              <Button
                type="text"
                icon={<ExpandAltOutlined />}
                onClick={() => {
                  setSelectedTaskId(task.taskId);
                  dispatch(toggleUpdateTaskDrawer());
                }}
                style={{
                  backgroundColor: colors.transparent,
                  padding: 0,
                  height: 'fit-content',
                }}
              >
                Open
              </Button>
            )}
          </Flex>
        );

      // description column
      case 'description':
        return (
          <Typography.Paragraph
            ellipsis={{ expandable: 'collapsible' }}
            style={{ width: 260, marginBlockEnd: 0 }}
          >
            {task.description}
          </Typography.Paragraph>
        );

      // progress column
      case 'progress':
        return <Progress percent={task.progress} type="circle" size={30} />;

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
          <Flex gap={8}>
            <PlayCircleTwoTone />
            <Typography.Text>0m 0s</Typography.Text>
          </Flex>
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
              <tr
                key={task.taskId}
                onMouseEnter={() => setHoverRow(task.taskId)}
                onMouseLeave={() => setHoverRow(null)}
                className={`${taskList.length === 0 ? 'h-0' : 'h-12'} ${getRowStyle(task.taskId)}`}
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    className={customBodyColumnStyles(column.key)}
                    style={{
                      width: column.width,
                    }}
                  >
                    {renderColumnContent(column.key, task)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTaskListRow />
    </div>
  );
};

export default TaskListTable;
