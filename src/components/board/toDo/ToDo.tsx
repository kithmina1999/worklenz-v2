import React from 'react'
import TaskCard from '../taskCard/TaskCard'
import './ToDo.css'
import { TaskType } from '../../../types/task.types'
import { Button } from 'antd'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import TaskCreateCard from '../taskCreateCard/TaskCreateCard'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { RootState } from '../../../app/store'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setTodoCreatTaskCardDisabled } from '../../../features/board/createCardSlice'

interface ToDoProps {
    dataSource: TaskType[]
}

const ToDo: React.FC<ToDoProps> = ({ dataSource }) => {

    const isCardDisable = useAppSelector((state: RootState) => state.createCardReducer.isTodoCreatTaskCardDisable)
    const dispatch = useAppDispatch()

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
                            backgroundColor: '#d1d0d3',
                            borderTopLeftRadius: '19px',
                            borderBottomLeftRadius: '19px',
                            borderTopRightRadius: '19px',
                            borderBottomRightRadius: '19px',                    
                        }}
                    >
                        <div style={{display: 'flex', gap: '5px'}}>
                        <Button type='text' size='small' shape='circle' style={{backgroundColor: 'white', }}>{dataSource.length}</Button>To Do
                        </div>
                        <div style={{display: 'flex'}}>
                            <Button type='text' size='small' shape='circle'><PlusOutlined /></Button>
                            <Button type='text' size='small' shape='circle'><MoreOutlined style={{rotate: '90deg', fontSize: '25px'}}/></Button>
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

                    {!isCardDisable && <TaskCreateCard status={"todo"}/>}
                </div>

                <div style={{ textAlign: 'center',marginTop: '7px', backgroundColor: 'white', padding: '0'}}>
                    <Button
                        type="text"
                        style={{
                            height: '38px',
                            width: '100%',
                        }}
                        icon={<PlusOutlined />}
                        onClick={() => dispatch(setTodoCreatTaskCardDisabled(false))}
                    >
                        Create Task
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ToDo