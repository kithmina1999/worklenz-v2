import React from 'react'
import TaskCard from '../taskCard/TaskCard'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './ToDo.css'
import { TaskType } from '../../../types/task.types'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface ToDoProps {
    dataSource: TaskType[]
}

const ToDo: React.FC<ToDoProps> = ({ dataSource }) => {
    return (
        <div style={{ paddingTop: '6px' }}>
            <div
                className="todo-wraper"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '325px',
                    width: '325px',
                    marginRight: '8px',
                    padding: '8px',
                    borderRadius: '4px',
                    maxHeight: 'calc(100vh - 250px)',
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
                            marginBottom: '16px',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        To Do ({dataSource.length})
                    </div>
                </div>
                <div
                    style={{
                        overflowY: 'auto',
                        maxHeight: 'calc(100vh - 250px)',
                        padding: '2px 2px 2px 2px',
                    }}
                >
                    {dataSource.map((task) => (
                        <TaskCard key={task.taskId} task={task} />
                    ))}
                </div>

                <div style={{ textAlign: 'center', paddingTop: '7px' }}>
                    <Button
                        type="text"
                        style={{
                            height: '38px',
                            width: '100%',
                            backgroundColor: 'white',
                        }}
                        icon={<PlusOutlined />}
                    >
                        Create Task
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ToDo
