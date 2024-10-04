import { Select, Table, TableProps, Tabs } from 'antd'
import React from 'react'
import EmptyListPlaceholder from '../../../components/EmptyListPlaceholder'
import AddTaskInlineForm from './AddTaskInlineForm'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { TaskType } from '../../../types/task'

const ListView = () => {
    const tasksList = useAppSelector((state) => state.taskReducer.tasks)

    console.log(tasksList)

    // tasks filter tab items
    const tabItems = [
        {
            key: 'all',
            label: `All (0)`,
            children: <AddTaskInlineForm />,
        },
        {
            key: 'today',
            label: `Today (0)`,
        },
        {
            key: 'upcoming',
            label: `Upcoming (0)`,
        },
        {
            key: 'overdue',
            label: `Overdue (0)`,
        },
        {
            key: 'no due date',
            label: `No due date (0)`,
        },
    ]

    const statusOptions = [
        { value: 'todo', label: 'Todo' },
        { value: 'doing', label: 'Doing' },
        { value: 'done', label: 'Done' },
    ]

    // table columns
    const columns: TableProps<TaskType>['columns'] = [
        { key: 'task', title: 'Task', dataIndex: 'task' },
        { key: 'project', title: 'Project', dataIndex: 'project' },
        {
            key: 'status',
            title: 'Status',
            render: (values) => (
                <Select
                    defaultValue={values.status.toLowerCase()}
                    options={statusOptions}
                    variant="borderless"
                />
            ),
        },
        { key: 'dueDate', title: 'Due Date', dataIndex: 'dueDate' },
    ]

    return (
        <div>
            {/* tasks filtering tabs */}
            <Tabs type="card" items={tabItems} />
            {tasksList.length === 0 ? (
                <EmptyListPlaceholder
                    imageSrc="https://app.worklenz.com/assets/images/empty-box.webp"
                    text=" No tasks to show."
                />
            ) : (
                <Table
                    columns={columns}
                    dataSource={tasksList}
                    rowKey={(record) => record.taskId}
                />
            )}
        </div>
    )
}

export default ListView
