import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Input, InputRef, MenuProps, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
  RetweetOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  setTaskCardDisabled,
  initializeStatus,
} from '../../../features/board/createCardSlice';
import { TaskStatusType, TaskType } from '../../../types/task.types';
import TaskCreateCard from '../taskCreateCard/TaskCreateCard';
import TaskCard from '../taskCard/TaskCard';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import './CommonStatusSection.css';
import { useSelectedProject } from '../../../hooks/useSelectedProject';

interface CommonStatusSectionProps {
  statusId: string;
  status: string;
  dataSource: TaskType[];
}

const CommonStatusSection: React.FC<CommonStatusSectionProps> = ({
  statusId,
  status,
  dataSource,
}) => {
  const dispatch = useAppDispatch();
  const createTaskInputRef = useRef<InputRef>(null);

  // Initialize status in the Redux store if not already set
  useEffect(() => {
    dispatch(initializeStatus(status));
  }, [dispatch, status]);

  // Get status-specific disable controls from Redux state
  const isTopCardDisabled = useAppSelector(
    (state) => state.createCardReducer.taskCardDisabledStatus[status]?.top
  );
  const isBottomCardDisabled = useAppSelector(
    (state) => state.createCardReducer.taskCardDisabledStatus[status]?.bottom
  );

  const [addTaskCount, setAddTaskCount] = useState(0);
  const [name, setName] = useState(status);
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const taskCardRef = useRef<HTMLDivElement>(null);

  const handleAddTaskClick = () => {
    dispatch(
      setTaskCardDisabled({ status, position: 'bottom', disabled: false })
    );
    setAddTaskCount((prev) => prev + 1);
  };

  const handleTopAddTaskClick = () => {
    dispatch(setTaskCardDisabled({ status, position: 'top', disabled: false }));
    setAddTaskCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditable]);

  useEffect(() => {
    createTaskInputRef.current?.focus();
    taskCardRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [dataSource, addTaskCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditable(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // const getRandomColor = () => {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // get the current selected project
  const selectedProject = useSelectedProject();
  // get the status category
  const statusCategory =
    useAppSelector((state) => state.statusReducer.projectWiseStatusList)
      .find((project) => project.projectId === selectedProject?.projectId)
      ?.statusList.find((status) => status.statusId)?.statusCategory || 'todo';

  // add the color by category
  const getStatusColor = (status: TaskStatusType) => {
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '5px 12px',
            gap: '8px',
          }}
          onClick={() => setIsEditable(true)}
        >
          <EditOutlined /> <span>Rename</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '5px 12px',
            gap: '8px',
          }}
        >
          <RetweetOutlined /> <span>Change category</span>{' '}
          <RightOutlined style={{ color: '#00000073', fontSize: '10px' }} />
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '5px 12px',
            gap: '8px',
          }}
        >
          <DeleteOutlined /> <span>Delete</span>
        </div>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: '6px' }}>
      <div
        className="todo-wraper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexBasis: 0,
          maxWidth: '375px',
          width: '375px',
          marginRight: '8px',
          padding: '8px',
          borderRadius: '25px',
          maxHeight: 'calc(100vh - 250px)',
          backgroundColor: '#F8FAFC',
        }}
      >
        <div
          style={{
            touchAction: 'none',
            userSelect: 'none',
            cursor: 'grab',
            fontSize: '14px',
            paddingTop: '0',
            margin: '0.25rem',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: '12px',
              alignItems: 'center',
              padding: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: getStatusColor(statusCategory),
              borderRadius: '19px',
            }}
          >
            <div
              style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              onClick={() => setIsEditable(true)}
            >
              {isLoading ? (
                <LoadingOutlined />
              ) : (
                <Button
                  type="text"
                  size="small"
                  shape="circle"
                  style={{ backgroundColor: 'white' }}
                >
                  {dataSource.length}
                </Button>
              )}
              {isEditable ? (
                <Input
                  ref={inputRef}
                  value={name}
                  variant="borderless"
                  style={{ backgroundColor: 'white' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPressEnter={handleBlur}
                />
              ) : (
                <Typography.Text style={{ textTransform: 'capitalize' }}>
                  {name}
                </Typography.Text>
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <Button
                type="text"
                size="small"
                shape="circle"
                onClick={handleTopAddTaskClick}
              >
                <PlusOutlined />
              </Button>
              <Dropdown
                overlayClassName="todo-threedot-dropdown"
                trigger={['click']}
                menu={{ items }}
                placement="bottomLeft"
              >
                <Button type="text" size="small" shape="circle">
                  <MoreOutlined style={{ rotate: '90deg', fontSize: '25px' }} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div
          style={{
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 250px)',
            padding: '2px 6px 2px 2px',
          }}
        >
          {!isTopCardDisabled && (
            <TaskCreateCard
              ref={createTaskInputRef}
              status={statusCategory}
              position={'top'}
            />
          )}

          {dataSource.map((task) => (
            <TaskCard key={task.taskId} task={task} />
          ))}

          {!isBottomCardDisabled && (
            <TaskCreateCard
              ref={createTaskInputRef}
              status={statusCategory}
              position={'bottom'}
            />
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '7px',
            backgroundColor: 'white',
            padding: '0',
          }}
        >
          <Button
            type="text"
            style={{
              height: '38px',
              width: '100%',
            }}
            icon={<PlusOutlined />}
            onClick={handleAddTaskClick}
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonStatusSection;
