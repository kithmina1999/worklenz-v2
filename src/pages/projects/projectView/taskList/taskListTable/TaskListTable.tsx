import {
    Badge,
    Button,
    Collapse,
    ConfigProvider,
    DatePicker,
    Flex,
    Input,
    Progress,
    Select,
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
    PlayCircleTwoTone,
    RightOutlined,
} from '@ant-design/icons'
import { colors } from '../../../../../styles/colors'
import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { toggleUpdateTaskDrawer } from '../../../../../features/tasks/taskSlice'
import UpdateTaskDrawer from '../../../../../features/tasks/taskCreationAndUpdate/UpdateTaskDrawer'
import './taskListTable.css'
import AssigneeSelector from './assigneeSelector/AssigneeSelector'
import CustomAvatar from '../../../../../components/CustomAvatar'
import ConfigPhaseButton from '../../../../../features/projects/singleProject/phase/ConfigPhaseButton'
import { useSelectedProject } from '../../../../../hooks/useSelectedProject'
import { simpleDateFormat } from '../../../../../utils/simpleDateFormat'
import LabelDropdown from '../../../../../components/taskListCommon/labelDropdown/LabelDropdown'

type TaskListTableProps = {
    dataSource: TaskType[]
}

const TaskListTable = ({ dataSource }: TaskListTableProps) => {
    const dispatch = useAppDispatch()
    // get theme from theme reducer
    const themeMode = useAppSelector((state) => state.themeReducer.mode)
    // this states for track the currently hover row and show the open button
    const [hoverRow, setHoverRow] = useState<string | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

    // get columns list from projectViewTaskListColumn reducer
    const columns = useAppSelector(
        (state) => state.projectViewTaskListColumnsReducer.columnsList
    )

    // get selected project from useSelectedPro
    const selectedProject = useSelectedProject()

    //get phases details from phases slice
    const phase = useAppSelector(
        (state) => state.phaseReducer.phaseList
    ).filter((phase) => phase.projectId === selectedProject?.projectId)

    const handleExpandRow = (expanded: boolean, record: TaskType) => {
        setExpandedRowKeys(expanded ? [record.taskId] : [])
    }

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
                        <Flex gap={8} align="center">
                            {/* {record.subTasks.length > 0 && (
                                <Button
                                    type="text"
                                    icon={<DownOutlined />}
                                    onClick={() =>
                                        handleExpandRow(
                                            !expandedRowKeys.includes(
                                                record.taskId
                                            ),
                                            record
                                        )
                                    }
                                />
                            )} */}
                            <Typography.Text>{record.task}</Typography.Text>
                        </Flex>

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
                render: (record: TaskType) => {
                    return (
                        <Flex gap={8} align="center">
                            <Typography>
                                {record.members?.map((member) => (
                                    <CustomAvatar
                                        avatarCharacter={member.memberName[0]}
                                    />
                                ))}
                            </Typography>

                            <AssigneeSelector taskId={record.taskId} />
                        </Flex>
                    )
                },
            }
        }

        // render cell in labels column
        if (col.key === 'labels') {
            return {
                ...col,
                render: (record: TaskType) => {
                    return (
                        <Flex gap={8}>
                            {record.labels?.map((label) => (
                                <Tag
                                    key={label.labelId}
                                    color={label.labelColor}
                                >
                                    {label.labelName}
                                </Tag>
                            ))}
                            <LabelDropdown />
                        </Flex>
                    )
                },
            }
        }

        // render cell in phase column
        if (col.key === 'phase') {
            return {
                ...col,
                title: (
                    <Flex align="center" justify="space-between">
                        {phase[0].phase || 'Phase'}{' '}
                        <ConfigPhaseButton color={colors.darkGray} />
                    </Flex>
                ),
                render: (record: TaskType) => {
                    return (
                        <Select
                            options={phase[0].phaseOptions.map((option) => ({
                                key: option.optionId,
                                value: option.optionId,
                                label: (
                                    <Flex gap={8}>
                                        <Badge color={option.optionColor} />{' '}
                                        {option.optionName}
                                    </Flex>
                                ),
                            }))}
                            placeholder={'Select'}
                            style={{ width: '100%' }}
                        />
                    )
                },
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

        // render cell in time tracking column
        if (col.key === 'timeTracking') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Flex gap={8}>
                        <PlayCircleTwoTone />
                        <Typography.Text>0m 0s</Typography.Text>
                    </Flex>
                ),
            }
        }

        // render cell in estimation column
        if (col.key === 'estimation') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Typography.Text>0h 0m</Typography.Text>
                ),
            }
        }

        // render cell in start date column
        if (col.key === 'startDate') {
            return {
                ...col,
                render: (record: TaskType) =>
                    record.startDate ? (
                        <Typography.Text>
                            {simpleDateFormat(record.startDate)}
                        </Typography.Text>
                    ) : (
                        <DatePicker
                            placeholder="Set a start date"
                            suffixIcon={null}
                            style={{
                                border: 'none',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ),
            }
        }

        // render cell in due date column
        if (col.key === 'dueDate') {
            return {
                ...col,
                render: (record: TaskType) =>
                    record.dueDate ? (
                        <Typography.Text>
                            {simpleDateFormat(record.dueDate)}
                        </Typography.Text>
                    ) : (
                        <DatePicker
                            placeholder="Set a due date"
                            suffixIcon={null}
                            style={{
                                border: 'none',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ),
            }
        }

        // render cell in reporter column
        if (col.key === 'reporter') {
            return {
                ...col,
                render: (record: TaskType) => (
                    <Typography.Text>Sachintha Prasad</Typography.Text>
                ),
            }
        }

        return col
    })

    // rowSelection object indicates the need for row selection
    const rowSelection: TableProps<TaskType>['rowSelection'] = {
        fixed: 'left',
    }

    const defaultFooter = () => (
        <Input placeholder="Add task" style={{ width: 400 }} />
    )

    return (
        <ConfigProvider
            wave={{ disabled: true }}
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
                        selectionColumnWidth: 4,
                    },

                    Select: {
                        colorBorder: colors.transparent,
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
                        className="custom-collapse-button"
                        style={{
                            backgroundColor: colors.deepLightGray,
                            border: 'none',
                            borderBottomLeftRadius: isActive ? 0 : 4,
                            borderBottomRightRadius: isActive ? 0 : 4,
                        }}
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
                        className: 'custom-collapse-content-box',
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

                                // expandable rows for sub tasks

                                // expandable={{
                                //     expandedRowKeys,
                                //     onExpand: handleExpandRow,
                                //     expandedRowRender: (record) => {
                                //         return (
                                //             <Table
                                //                 dataSource={record.subTasks}
                                //                 rowSelection={{
                                //                     ...rowSelection,
                                //                 }}
                                //                 showHeader={false}
                                //                 columns={updatedColumns}
                                //                 scroll={{ x: 'max-content' }}
                                //                 style={{
                                //                     scrollbarColor:
                                //                         'trasparent !important',
                                //                 }}
                                //                 pagination={false}
                                //                 rowKey={(subTask) =>
                                //                     subTask.taskId
                                //                 }
                                //             />
                                //         )
                                //     },
                                // }}
                            />
                        ),
                    },
                ]}
            />

            {/* update task drawer  */}
            <UpdateTaskDrawer taskId={selectedTaskId} />
        </ConfigProvider>
    )
}

export default TaskListTable
