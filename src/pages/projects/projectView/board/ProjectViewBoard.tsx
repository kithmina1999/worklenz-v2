import React from 'react'
import ToDo from '../../../../components/board/toDo/ToDo'
import Doing from '../../../../components/board/doing/Doing'
import Done from '../../../../components/board/done/Done'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { TaskType } from '../../../../types/task.types'
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice'
import StatusDrawer from '../../../../features/projects/status/StatusDrawer'

const ProjectViewBoard: React.FC = () => {

    const dataSource: TaskType[] = useAppSelector(
        (state) => state.taskReducer.tasks
    )

    const todoData = dataSource.filter((item) => item.status === 'todo')
    const doingData = dataSource.filter((item) => item.status === 'doing')
    const doneData = dataSource.filter((item) => item.status === 'done')

    const dispatch = useDispatch()

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <TaskListFilters />
        <div
            style={{
                width: '100%',
                padding: '0 12px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '14px'
            }}
        >
            <div
                style={{
                    paddingTop: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    overflowX: 'auto'
                }}
            >
                <ToDo dataSource={todoData}/>
                <Doing dataSource={doingData}/>
                <Done dataSource={doneData}/>
                <Button icon={<PlusOutlined />} onClick={() => dispatch(toggleDrawer())}></Button>
                <StatusDrawer />
            </div>
        </div>
        </div>
    )
}

export default ProjectViewBoard