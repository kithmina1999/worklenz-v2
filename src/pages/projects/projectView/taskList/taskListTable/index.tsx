import { ConfigProvider, Input, Table, TableProps } from 'antd'
import React from 'react'
import { TaskType } from '../../../../../types/task.types'
import { useAppSelector } from '../../../../../hooks/useAppSelector'

type TaskListTableProps = {
    dataSource: TaskType[]
}

const TaskListTable = ({ dataSource }: TaskListTableProps) => {
    // get columns list from projectViewTaskListColumn reducer
    const columns = useAppSelector(
        (state) => state.projectViewTaskListColumnsReducer.columnsList
    )

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
                columns={columns}
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
