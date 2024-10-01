import { SyncOutlined } from '@ant-design/icons'
import {
    Alert,
    Button,
    Card,
    Flex,
    Form,
    Input,
    Skeleton,
    Table,
    TableProps,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { TodoType } from '../../types/todo'
import { useAppDispatch } from '../../hooks/useAppDispatch'

import { addTodo } from '../../features/todo/todoSlice'
import EmptyListPlaceholder from '../../components/EmptyListPlaceholder'
import { nanoid } from '@reduxjs/toolkit'
import TodoDoneButton from '../../components/TodoDoneButton'

const TodoList = () => {
    const todoList = useAppSelector((state) => state.todoReducer.todoList)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isAlertShowing, setIsAlertShowing] = useState(false)
    const [form] = Form.useForm()

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    // function to handle todo submit
    const handleTodoSubmit = (values: any) => {
        const newTodo: TodoType = {
            id: nanoid(),
            name: values.name,
            isCompleted: false,
        }
        form.resetFields()
        setIsAlertShowing(false)
        dispatch(addTodo(newTodo))
    }

    // table columns
    const columns: TableProps<TodoType>['columns'] = [
        {
            key: 'completeBtn',
            width: 24,
            render: (record: TodoType) => <TodoDoneButton record={record} />,
        },
        {
            key: 'name',
            render: (record: TodoType) => (
                <Typography.Paragraph
                    style={{ margin: 0, paddingInlineEnd: 6 }}
                >
                    {record.name}
                </Typography.Paragraph>
            ),
        },
    ]

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
                    <Form form={form} onFinish={handleTodoSubmit}>
                        <Form.Item name="name">
                            <Flex vertical gap={4}>
                                <Input
                                    placeholder="+ Add Task"
                                    onChange={(e) => {
                                        const inputValue = e.currentTarget.value

                                        if (inputValue.length >= 1)
                                            setIsAlertShowing(true)
                                        else if (inputValue === '')
                                            setIsAlertShowing(false)
                                    }}
                                />
                                {isAlertShowing && (
                                    <Alert
                                        message={
                                            <Typography.Text
                                                style={{ fontSize: 11 }}
                                            >
                                                Press <strong>Enter</strong> to
                                                create.
                                            </Typography.Text>
                                        }
                                        type="info"
                                        style={{
                                            width: 'fit-content',
                                            borderRadius: 2,
                                            padding: '0 6px',
                                        }}
                                    />
                                )}
                            </Flex>
                        </Form.Item>
                    </Form>

                    {todoList.length === 0 ? (
                        <EmptyListPlaceholder
                            imageSrc="https://app.worklenz.com/assets/images/empty-box.webp"
                            text=" No tasks to show."
                        />
                    ) : (
                        <Table
                            className="homepage-table"
                            dataSource={todoList}
                            columns={columns}
                            showHeader={false}
                            pagination={false}
                        />
                    )}
                </div>
            )}
        </Card>
    )
}

export default TodoList
