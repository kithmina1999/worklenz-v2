import React from 'react'
import ToDo from '../../../../components/board/toDo/ToDo'
import Doing from '../../../../components/board/doing/Doing'
import Done from '../../../../components/board/done/Done'
import { doingData, doneData, todoData } from '../taskData'

const ProjectViewBoard: React.FC = () => {
    return (
        <div
            style={{
                width: '100%',
                padding: '0 12px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
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
    )
}

export default ProjectViewBoard
