import { ConfigProvider, Input, Progress, Table, TableProps } from 'antd'
import React from 'react'
import { TaskType } from '../../../../../types/task.types'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import StatusDropdown from '../../../../../components/taskListCommon/statusDropdown/StatusDropdown'
import PriorityDropdown from '../../../../../components/taskListCommon/priorityDropdown/PriorityDropdown'

type TaskListTableProps = {
    dataSource: TaskType[]
}

const TaskListTable = ({ dataSource }: TaskListTableProps) => {
    // get columns list from projectViewTaskListColumn reducer
    const columns = useAppSelector(
        (state) => state.projectViewTaskListColumnsReducer.columnsList
    )

    const updatedColumns = columns?.map((col) => {
        // render cell in status column
        if (col.key === 'status') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <StatusDropdown currentStatus={record.status} />
                ),
            }
        }
        // render cell in prioriy column
        if (col.key === 'priority') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <PriorityDropdown currentPriority={record.priority} />
                ),
            }
        }

        // render cell in status column
        if (col.key === 'progress') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Progress
                        percent={record.progress}
                        type="circle"
                        size={30}
                    />
                ),
            }
        }

        return col
    })

    // get theme from theme reducer
    const themeMode = useAppSelector((state) => state.themeReducer.mode)

    // rowSelection object indicates the need for row selection
    const rowSelection: TableProps<TaskType>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: TaskType[]) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
            )
        },
        getCheckboxProps: (record: TaskType) => ({
            disabled: record.task === 'Disabled User', // Column configuration not to be checked
            name: record.task,
        }),
        fixed: true,
    }

    const defaultFooter = () => (
        <Input placeholder="Add task" style={{ width: 400 }} />
    )

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        rowHoverBg:
                            themeMode === 'dark' ? '#000000' : '#f8f7f9',
                        stickyScrollBarBg: 'unset',
                        selectionColumnWidth: 10,
                    },
                },
            }}
        >
            <Table
                className="custom-project-view-task-list-table"
                dataSource={dataSource}
                columns={updatedColumns}
                bordered
                pagination={false}
                rowSelection={{ ...rowSelection }}
                rowKey={(record) => record.taskId}
                scroll={{ x: 'max-content' }}
                locale={{ emptyText: 'No task available' }}
                footer={defaultFooter}
            />
        </ConfigProvider>
    )
}

export default TaskListTable
