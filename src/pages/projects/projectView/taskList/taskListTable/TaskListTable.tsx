import {
    Button,
    Collapse,
    ConfigProvider,
    Flex,
    Input,
    Progress,
    Table,
    TableProps,
    Tag,
    Tooltip,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { TaskType } from '../../../../../types/task.types'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import StatusDropdown from '../../../../../components/taskListCommon/statusDropdown/StatusDropdown'
import PriorityDropdown from '../../../../../components/taskListCommon/priorityDropdown/PriorityDropdown'
import {
    ExpandAltOutlined,
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { colors } from '../../../../../styles/colors'
import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { toggleUpdateTaskDrawer } from '../../../../../features/tasks/taskSlice'
import UpdateTaskDrawer from '../../../../../features/tasks/taskCreationAndUpdate/UpdateTaskDrawer'

type TaskListTableProps = {
    dataSource: TaskType[]
}

const TaskListTable = ({ dataSource }: TaskListTableProps) => {
    const dispatch = useAppDispatch()

    // this states for track the currently hover row and show the open button
    const [hoverRow, setHoverRow] = useState<string | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

    // get columns list from projectViewTaskListColumn reducer
    const columns = useAppSelector(
        (state) => state.projectViewTaskListColumnsReducer.columnsList
    )

    const updatedColumns = columns?.map((col) => {
        // render cell in taskId column
        if (col.key === 'taskId') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Tooltip title={record.taskId}>
                        <Tag>{record.taskId}</Tag>
                    </Tooltip>
                ),
            }
        }
        // render cell in task column
        if (col.key === 'task') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Flex align="center" justify="space-between">
                        <Typography.Text>{record.task}</Typography.Text>

                        {hoverRow === record.taskId && (
                            <Button
                                type="text"
                                icon={<ExpandAltOutlined />}
                                onClick={() => {
                                    setSelectedTaskId(record.taskId)
                                    dispatch(toggleUpdateTaskDrawer())
                                }}
                                style={{
                                    backgroundColor: colors.transparent,
                                    padding: 0,
                                    height: 'fit-content',
                                }}
                            >
                                Open
                            </Button>
                        )}
                    </Flex>
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
        // render cell in members column
        if (col.key === 'members') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Button
                        type="dashed"
                        shape="circle"
                        icon={<PlusOutlined style={{ fontSize: 12 }} />}
                    />
                ),
            }
        }

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

    // collapse pannel styles
    const panelStyle: React.CSSProperties = {
        borderInlineStart: '4px solid',
        borderInlineStartColor: colors.skyBlue,
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        headerPadding: 0,
                        contentPadding: 0,
                    },

                    Table: {
                        rowHoverBg:
                            themeMode === 'dark' ? '#000000' : '#f8f7f9',
                        stickyScrollBarBg: 'unset',
                        selectionColumnWidth: 10,
                    },
                },
            }}
        >
            <Collapse
                collapsible="header"
                bordered={false}
                ghost={true}
                expandIcon={({ isActive }) => (
                    <Button
                        style={{ backgroundColor: colors.skyBlue }}
                        icon={<RightOutlined rotate={isActive ? 90 : 0} />}
                    >
                        <Typography.Text style={{ fontSize: 14 }}>
                            Todo ({dataSource.length})
                        </Typography.Text>
                    </Button>
                )}
                defaultActiveKey={['1']}
                items={[
                    {
                        key: '1',
                        children: (
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
                                onRow={(record) => {
                                    return {
                                        onMouseEnter: () =>
                                            setHoverRow(record.taskId),
                                        onMouseLeave: () => setHoverRow(null),
                                    }
                                }}
                            />
                        ),
                        style: panelStyle,
                    },
                ]}
            />

            {/* update task drawer  */}
            <UpdateTaskDrawer taskId={selectedTaskId} />
        </ConfigProvider>
    )
}

export default TaskListTable
