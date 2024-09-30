import { Input, Table, Tabs } from 'antd'
import React from 'react'
import EmptyListPlaceholder from '../../../components/EmptyListPlaceholder'

const ListView = () => {
    const tasksList: string[] = []

    // tasks filter tab items
    const tabItems = [
        {
            key: 'all',
            label: `All (0)`,
            children: (
                <Input
                    placeholder="+ Add Task"
                    style={{ width: '100%', maxWidth: 300 }}
                />
            ),
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
                <Table dataSource={tasksList}></Table>
            )}
        </div>
    )
}

export default ListView
