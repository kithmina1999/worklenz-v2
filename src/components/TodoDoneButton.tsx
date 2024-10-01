import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { colors } from '../styles/colors'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { completeTodo } from '../features/todo/todoSlice'
import { TodoType } from '../types/todo'

type TodoDoneButtonProps = {
    record: TodoType
}

const TodoDoneButton = ({ record }: TodoDoneButtonProps) => {
    const dispatch = useAppDispatch()

    return (
        <Tooltip title={'Mark as done'}>
            <Button
                type="text"
                shape="circle"
                icon={
                    <CheckCircleOutlined
                        style={{
                            color: colors.lightGray,
                        }}
                    />
                }
                onClick={() => dispatch(completeTodo(record))}
            />
        </Tooltip>
    )
}

export default TodoDoneButton
