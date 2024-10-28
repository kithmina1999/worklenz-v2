import React from 'react'
import ToDo from '../../../../components/board/toDo/ToDo'
import Doing from '../../../../components/board/doing/Doing'
import Done from '../../../../components/board/done/Done'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { TaskType } from '../../../../types/task.types'
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters'

const ProjectViewBoard: React.FC = () => {

    const dataSource: TaskType[] = useAppSelector(
        (state) => state.taskReducer.tasks
    )

    const todoData = dataSource.filter((item) => item.status === 'todo')
    const doingData = dataSource.filter((item) => item.status === 'doing')
    const doneData = dataSource.filter((item) => item.status === 'done')

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <TaskListFilters />
        <div
            style={{
                width: '100%',
                padding: '0 12px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
                flexDirection: 'column',
                marginTop: '14px'
            }}
        >
            <div
                style={{
                    paddingTop: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <ToDo dataSource={todoData}/>
                <Doing dataSource={doingData}/>
                <Done dataSource={doneData}/>
            </div>
        </div>
        </div>
    )
}

export default ProjectViewBoard
