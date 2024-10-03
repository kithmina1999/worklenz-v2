import {
    Alert,
    Badge,
    Flex,
    Form,
    Input,
    InputRef,
    Select,
    Typography,
} from 'antd'
import React, { useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { nanoid } from '@reduxjs/toolkit'
import { TaskType } from '../../../types/task'
import { addTask } from '../../../features/tasks/taskSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

const AddTaskInlineForm = () => {
    const [isAlertShowing, setIsAlertShowing] = useState(false)
    const [isDueDateFieldShowing, setIsDueDateFieldShowing] = useState(false)
    const [isProjectFieldShowing, setIsProjectFieldShowing] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const projectList = useAppSelector(
        (state) => state.projectReducer.projectsList
    )

    // ref for task input field
    const taskInputRef = useRef<InputRef | null>(null)

    // due date select options
    const dueDateOptions = [
        {
            value: 'today',
            label: 'Today',
        },
        {
            value: 'tomorrow',
            label: 'Tomorrow',
        },
        {
            value: 'nextWeek',
            label: 'Next Week',
        },
        {
            value: 'nextMonth',
            label: 'Next Month',
        },
        {
            value: 'noDueDate',
            label: 'No Due Date',
        },
    ]

    // project options
    let projectOptions = [
        ...projectList.map((project, index) => ({
            key: index,
            value: project.projectName,
            label: project.projectName,
        })),
    ]

    // function to handle task submit
    const handleTaskSubmit = (values: any) => {
        const newTask: TaskType = {
            id: nanoid(),
            name: values.name,
            dueDate: values.dueDate,
            project: values.project,
        }

        dispatch(addTask(newTask))
        form.resetFields()

        //? there is an issue (input field focused but can't type) occurs when immediately focus the input, so this timeout fuction held to create a small delay
        setTimeout(() => {
            if (taskInputRef.current) {
                taskInputRef.current.focus({
                    cursor: 'start',
                })
            }
        }, 100)
    }

    return (
        <Form
            form={form}
            onFinish={handleTaskSubmit}
            style={{ display: 'flex', gap: 8 }}
            initialValues={{ dueDate: 'noDueDate', project: projectOptions[0] }}
        >
            <Form.Item name="task" style={{ width: '100%', maxWidth: 400 }}>
                <Flex vertical gap={4}>
                    <Input
                        ref={taskInputRef}
                        placeholder="+ Add Task"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            const inputValue = e.currentTarget.value
                            if (inputValue.length >= 1) setIsAlertShowing(true)
                            else if (inputValue === '') setIsAlertShowing(false)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Tab') {
                                setIsAlertShowing(false)
                                setIsDueDateFieldShowing(true)
                            }
                        }}
                    />
                    {isAlertShowing && (
                        <Alert
                            message={
                                <Typography.Text style={{ fontSize: 11 }}>
                                    Press <strong>Tab</strong> to select a{' '}
                                    <strong>'Due date'</strong> and a{' '}
                                    <strong>'Project'</strong>.
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

            {isDueDateFieldShowing && (
                <Form.Item
                    name="dueDate"
                    style={{ width: '100%', maxWidth: 200 }}
                >
                    <Select
                        suffixIcon={null}
                        options={dueDateOptions}
                        defaultOpen={true}
                        onKeyDown={(e) => {
                            if (e.key === 'Tab' || 'Enter') {
                                setIsProjectFieldShowing(true)
                            }
                        }}
                    />
                </Form.Item>
            )}

            {isProjectFieldShowing && (
                <Form.Item
                    name="project"
                    style={{ width: '100%', maxWidth: 200 }}
                >
                    <Select
                        suffixIcon={null}
                        placeholder={'Project'}
                        options={projectOptions}
                        defaultOpen={true}
                        showSearch
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? '').toLowerCase()
                                )
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                form.submit()
                            }
                        }}
                    />
                </Form.Item>
            )}
        </Form>
    )
}

export default AddTaskInlineForm
