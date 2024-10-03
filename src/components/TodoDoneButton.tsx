import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import { colors } from '../styles/colors'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { completeTodo } from '../features/todo/todoSlice'
import { TodoType } from '../types/todo'

type TodoDoneButtonProps = {
    record: TodoType
}

const TodoDoneButton = ({ record }: TodoDoneButtonProps) => {
    const dispatch = useAppDispatch()
    const [checkIconColor, setCheckIconColor] = useState<string>(
        colors.lightGray
    )

    const handleCompleteTodo = () => {
        setCheckIconColor(colors.limeGreen)

        setTimeout(() => {
            dispatch(completeTodo(record))
            setCheckIconColor(colors.lightGray)
        }, 300)
    }

    return (
        <Tooltip title={'Mark as done'}>
            <Button
                type="text"
                shape="circle"
                icon={<CheckCircleOutlined style={{ color: checkIconColor }} />}
                onClick={handleCompleteTodo}
            />
        </Tooltip>
    )
}

export default TodoDoneButton
