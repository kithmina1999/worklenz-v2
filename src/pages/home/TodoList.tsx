import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    Skeleton,
    Tooltip,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { TodoType } from '../../types/todo'
import { useAppDispatch } from '../../hooks/useAppDispatch'

import { colors } from '../../styles/colors'
import { addTodo } from '../../features/todo/todoSlice'
import EmptyListPlaceholder from '../../components/EmptyListPlaceholder'

const TodoList = () => {
    const todoList = useAppSelector((state) => state.todoReducer.todoList)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    const [form] = Form.useForm()

    const handleTodoSubmit = (values: any) => {
        const newTodo: TodoType = {
            name: values.name,
            isCompleted: false,
        }
        form.resetFields()
        dispatch(addTodo(newTodo))
    }

    return (
        <Card
            title={
                <Typography.Title level={5} style={{ marginBlockEnd: 0 }}>
                    To do list ({todoList.length})
                </Typography.Title>
            }
            extra={
                <Button
                    shape="circle"
                    icon={<SyncOutlined spin={isLoading} />}
                    onClick={() => handleRefresh()}
                />
            }
            style={{ width: '100%' }}
        >
            {isLoading ? (
                <Skeleton />
            ) : (
                <div>
                    <Form onFinish={handleTodoSubmit}>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please add a task',
                                },
                            ]}
                        >
                            <Input placeholder="+ Add Task" />
                        </Form.Item>
                    </Form>
                    {todoList.length === 0 ? (
                        <EmptyListPlaceholder
                            imageSrc="https://app.worklenz.com/assets/images/empty-box.webp"
                            text=" No tasks to show."
                        />
                    ) : (
                        <Flex vertical gap={8}>
                            {todoList.map((todo, index) => (
                                <Flex key={index} gap={8}>
                                    <Tooltip title={'Mark as done'}>
                                        <CheckCircleOutlined
                                            style={{
                                                fontSize: 18,
                                                color: colors.lightGray,
                                            }}
                                        />
                                    </Tooltip>
                                    <Typography.Text>
                                        {todo.name}
                                    </Typography.Text>
                                </Flex>
                            ))}
                        </Flex>
                    )}
                </div>
            )}
        </Card>
    )
}

export default TodoList
