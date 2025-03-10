import { Button, Flex, Input, Popconfirm, Progress, Table, Tag, Tooltip } from 'antd';
import { useState, useMemo } from 'react';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { ISubTask } from '@/types/tasks/subTask.types';
import { tasksApiService } from '@/api/tasks/tasks.api.service';
import Avatars from '@/components/avatars/avatars';
import './subtaskTable.css'; // We'll create this CSS file
import { ITaskCreateRequest } from '@/types/tasks/task-create-request.types';
import { getUserSession } from '@/utils/session-helper';
import { SocketEvents } from '@/shared/socket-events';
import { useSocket } from '@/socket/socketContext';
import {
  getCurrentGroup,
  GROUP_BY_STATUS_VALUE,
  GROUP_BY_PRIORITY_VALUE,
  GROUP_BY_PHASE_VALUE,
} from '@/features/tasks/tasks.slice';
import useTabSearchParam from '@/hooks/useTabSearchParam';

type SubTaskTableProps = {
  subTasks: ISubTask[];
  loadingSubTasks: boolean;
  refreshSubTasks: () => void;
};

const SubTaskTable = ({ subTasks, loadingSubTasks, refreshSubTasks }: SubTaskTableProps) => {
  const { socket, connected } = useSocket();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);

  // get theme details from theme slice
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { projectId } = useAppSelector(state => state.projectReducer);
  const { taskFormViewModel, selectedTaskId } = useAppSelector(state => state.taskDrawerReducer);
  const currentSession = getUserSession();
  const { projectView } = useTabSearchParam();

  const createRequestBody = (taskName: string): ITaskCreateRequest | null => {
    if (!projectId || !currentSession) return null;
    const body: ITaskCreateRequest = {
      project_id: projectId,
      name: taskName,
      reporter_id: currentSession.id,
      team_id: currentSession.team_id,
    };

    const groupBy = getCurrentGroup();
    if (groupBy.value === GROUP_BY_STATUS_VALUE) {
      body.status_id = taskFormViewModel?.task?.status_id || undefined;
    } else if (groupBy.value === GROUP_BY_PRIORITY_VALUE) {
      body.priority_id = taskFormViewModel?.task?.priority_id || undefined;
    } else if (groupBy.value === GROUP_BY_PHASE_VALUE) {
      body.phase_id = taskFormViewModel?.task?.phase_id || undefined;
    }

    if (selectedTaskId) {
      body.parent_task_id = selectedTaskId;
    }
    return body;
  };
  const addInstantTask = (taskName: string) => {
    if (creatingTask || !taskName || taskName.trim() === '') return;

    try {
      setCreatingTask(true);
      const body = createRequestBody(taskName);
      if (!body) return;
      socket?.emit(SocketEvents.QUICK_TASK.toString(), JSON.stringify(body));
      socket?.once(SocketEvents.QUICK_TASK.toString(), (task: IProjectTask) => {
        setCreatingTask(false);
        if (task.parent_task_id) {
          refreshSubTasks();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingTask(false);
    }
  };

  const handleAddSubTask = (taskName: string) => {
    addInstantTask(taskName);
  };

  // function to handle deleting a subtask
  const handleDeleteSubTask = async (taskId: string | undefined) => {
    if (!taskId) return;

    const res = await tasksApiService.deleteTask(taskId);
    if (res.done) {
      refreshSubTasks();
    }
  };

  const columns = useMemo(() => {
    return [
      {
        key: 'name',
        dataIndex: 'name',
      },
      {
        key: 'priority',
        render: (record: IProjectTask) => (
          <Tag color={record.priority_color || ''} style={{ textTransform: 'capitalize' }}>
            {record.priority_name}
          </Tag>
        ),
      },
      {
        key: 'status',
        render: (record: IProjectTask) => (
          <Tag color={record.status_color || ''} style={{ textTransform: 'capitalize' }}>
            {record.status_name}
          </Tag>
        ),
      },
      {
        key: 'assignee',
        render: (record: ISubTask) => <Avatars members={record.names || []} />,
      },
      {
        key: 'actionBtns',
        width: 80,
        render: (record: IProjectTask) => (
          <Flex gap={8} align="center" className="action-buttons">
            <Tooltip title={'Edit'} trigger={'hover'}>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => console.log(record.id || record.id)}
              />
            </Tooltip>

            <Popconfirm
              title={'Are you sure?'}
              icon={<ExclamationCircleFilled style={{ color: colors.vibrantOrange }} />}
              okText={'Yes'}
              cancelText={'No'}
              onConfirm={() => handleDeleteSubTask(record.id)}
            >
              <Tooltip title="Delete">
                <Button shape="default" icon={<DeleteOutlined />} size="small" />
              </Tooltip>
            </Popconfirm>
          </Flex>
        ),
      },
    ];
  }, [themeMode]);

  return (
    <Flex vertical gap={12}>
      <Progress />

      <Flex vertical gap={6}>
        {subTasks.length > 0 && (
          <Table
            className="custom-two-colors-row-table subtask-table"
            showHeader={false}
            dataSource={subTasks}
            columns={columns}
            rowKey={record => record?.id || nanoid()}
            pagination={{ hideOnSinglePage: true }}
            onRow={record => ({
              style: {
                cursor: 'pointer',
                height: 36,
              },
            })}
          />
        )}
        <div>
          {isEdit ? (
            <Input
              style={{
                border: 'none',
                boxShadow: 'none',
                height: 48,
              }}
              placeholder="Type your task and hit enter"
              onBlur={e =>
                e.currentTarget.value.length > 0
                  ? handleAddSubTask(e.currentTarget.value)
                  : setIsEdit(false)
              }
              onPressEnter={e =>
                e.currentTarget.value.length > 0
                  ? handleAddSubTask(e.currentTarget.value)
                  : setIsEdit(false)
              }
            />
          ) : (
            <Input
              onFocus={() => setIsEdit(true)}
              value="+ Add Subtask"
              className={`border-none ${themeMode === 'dark' ? `hover:bg-[#343a40]` : `hover:bg-[#edebf0]`} hover:text-[#1890ff]`}
            />
          )}
        </div>
      </Flex>
    </Flex>
  );
};

export default SubTaskTable;
