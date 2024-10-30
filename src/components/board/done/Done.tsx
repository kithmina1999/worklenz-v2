import React, { useEffect, useRef, useState } from 'react'
import TaskCard from '../taskCard/TaskCard'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './Done.css'
import { TaskType } from '../../../types/task.types'
import { Button, InputRef } from 'antd'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import TaskCreateCard from '../taskCreateCard/TaskCreateCard'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { RootState } from '../../../app/store'
import { setDoneCreatTaskCardDisabled } from '../../../features/board/createCardSlice'

interface DoneProps {
  dataSource: TaskType[];
}

const Done: React.FC<DoneProps> = ({ dataSource }) => {
    const isCardDisable = useAppSelector(
        (state: RootState) => state.createCardReducer.isDoneCreatTaskCardDisable
    )
    const dispatch = useAppDispatch()
    const createTaskInputRef = useRef<InputRef>(null)
    const taskCardRef = useRef<HTMLDivElement>(null)
    const [addTaskCount, setAddTaskCount] = useState(0);

    const handleAddTaskClick = () => {
        dispatch(setDoneCreatTaskCardDisabled(false))
        setAddTaskCount(prev => prev + 1)
    }

    useEffect(() => {
        createTaskInputRef.current?.focus();
        taskCardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, [dataSource, addTaskCount]);

    return (
        <div style={{ paddingTop: '6px' }}>
            <div
                className="done-wraper"
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
                    backgroundColor: '#F8FAFC'
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
                            backgroundColor: '#c2e4d0',
                            borderTopLeftRadius: '19px',
                            borderBottomLeftRadius: '19px',
                            borderTopRightRadius: '19px',
                            borderBottomRightRadius: '19px',
                        }}
                    >
                        <div style={{display: 'flex', gap: '5px'}}>
                        <Button type='text' size='small' shape='circle' style={{backgroundColor: 'white', }}>{dataSource.length}</Button>Done
                        </div>
                        <div style={{display: 'flex'}}>
                            <Button type='text' size='small' shape='circle' onClick={handleAddTaskClick}><PlusOutlined /></Button>
                            <Button type='text' size='small' shape='circle'><MoreOutlined style={{rotate: '90deg', fontSize: '25px'}}/></Button>
                        </div>
                    </div>
                </div>

                {/* Wrap the scrollable area with PerfectScrollbar */}
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

                    {!isCardDisable && <TaskCreateCard status={"done"} ref={createTaskInputRef}/>}
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

export default Done;
