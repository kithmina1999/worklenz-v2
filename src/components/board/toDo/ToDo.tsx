import React, { useEffect, useRef, useState } from 'react';
import TaskCard from '../taskCard/TaskCard';
import './ToDo.css';
import { TaskType } from '../../../types/task.types';
import { Button, Dropdown, Input, InputRef, MenuProps } from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined, MoreOutlined, PlusOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';
import TaskCreateCard from '../taskCreateCard/TaskCreateCard';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootState } from '../../../app/store';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setTodoCreatTaskCardDisabled } from '../../../features/board/createCardSlice';

interface ToDoProps {
  dataSource: TaskType[];
}

const ToDo: React.FC<ToDoProps> = ({ dataSource }) => {
  const isCardDisable = useAppSelector(
    (state: RootState) => state.createCardReducer.isTodoCreatTaskCardDisable
  );
  const dispatch = useAppDispatch();
  const createTaskInputRef = useRef<InputRef>(null);
  const taskCardRef = useRef<HTMLDivElement>(null);
  const [addTaskCount, setAddTaskCount] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState('To Do');
  const inputRef = useRef<InputRef>(null);
  const [isLoading, setIsLoading] =  useState(false)

  const handleAddTaskClick = () => {
    dispatch(setTodoCreatTaskCardDisabled(false));
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
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', padding: '5px 12px', gap: '8px'}} onClick={() => setIsEditable(true)}>
        <EditOutlined/> <span>Rename</span>
      </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', padding: '5px 12px', gap: '8px'}}>
        <RetweetOutlined/> <span>Change category</span> <RightOutlined style={{color: '#00000073', fontSize: '10px'}}/>
      </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', padding: '5px 12px', gap: '8px'}}>
        <DeleteOutlined/> <span>Delete</span> 
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
              backgroundColor: '#d1d0d3',
              borderTopLeftRadius: '19px',
              borderBottomLeftRadius: '19px',
              borderTopRightRadius: '19px',
              borderBottomRightRadius: '19px',
            }}
          >
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} onClick={() => setIsEditable(true)}>
              {isLoading ? <LoadingOutlined /> :
              <Button
                type="text"
                size="small"
                shape="circle"
                style={{ backgroundColor: 'white' }}
              >
                {dataSource.length}
              </Button>}
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
                <span>{name}</span>
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <Button
                type="text"
                size="small"
                shape="circle"
                onClick={handleAddTaskClick}
              >
                <PlusOutlined />
              </Button>
              <Dropdown overlayClassName='todo-threedot-dropdown' trigger={['click']} menu={{ items }} placement="bottomLeft">
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
          {dataSource.map((task) => (
            <TaskCard key={task.taskId} task={task} />
          ))}

          {!isCardDisable && (
            <TaskCreateCard ref={createTaskInputRef} status={'todo'} />
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

export default ToDo;
