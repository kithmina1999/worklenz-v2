import React, { useEffect, useState } from 'react'
import {
    DatePicker,
    Tooltip,
    Tag,
    Avatar,
    Progress,
    Typography,
    Divider,
    Dropdown,
    MenuProps,
    Button,
} from 'antd'
import {
    DoubleRightOutlined,
    PauseOutlined,
    TagsOutlined,
    PlusOutlined,
    UserAddOutlined,
    InboxOutlined,
    DeleteOutlined,
    MinusOutlined,
} from '@ant-design/icons'
import './TaskCard.css'
import dayjs, { Dayjs } from 'dayjs'
import { avatarNamesMap } from '../../../shared/constants'
import AddMembersDropdown from '../../addMembersDropdown/AddMembersDropdown'
import StatusDropdown from '../../taskListCommon/statusDropdown/StatusDropdown'
import { TaskType } from '../../../types/task.types'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { deleteTask } from '../../../features/tasks/taskSlice'

interface taskProps {
    task: TaskType
}

const TaskCard: React.FC<taskProps> = ({ task }) => {
    const [isSubTaskShow, setIsSubTaskShow] = useState(false)
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [subTaskDueDate, setSubTaskDueDate] = useState<Dayjs | null>(null)
    const [isToday, setIsToday] = useState(false)
    const [isTomorrow, setIsTomorrow] = useState(false)
    const [isItPrevDate, setIsItPrevDate] = useState(false)
    const [isSubToday, setIsSubToday] = useState(false)
    const [isSubTomorrow, setIsSubTomorrow] = useState(false)
    const [isItSubPrevDate, setIsItSubPrevDate] = useState(false)
    const dispatch = useAppDispatch()

    const handleDateChange = (date: Dayjs | null) => {
        setDueDate(date)
    }

    const handleSubTaskDateChange = (date: Dayjs | null) => {
        setSubTaskDueDate(date)
    }

    const formatDate = (date: Dayjs | null) => {
        if (!date) return ''

        const today = dayjs()
        const tomorrow = today.add(1, 'day')

        if (date.isSame(today, 'day')) {
            return 'Today'
        } else if (date.isSame(tomorrow, 'day')) {
            return 'Tomorrow'
        } else {
            return date.isSame(today, 'year')
                ? date.format('MMM DD')
                : date.format('MMM DD, YYYY')
        }
    }

    useEffect(() => {
        if (dueDate) {
            setIsToday(dueDate.isSame(dayjs(), 'day'))
            setIsTomorrow(dueDate.isSame(dayjs().add(1, 'day'), 'day'))
            setIsItPrevDate(dueDate.isBefore(dayjs()))
        } else {
            setIsToday(false)
            setIsTomorrow(false)
            setIsItPrevDate(false)
        }
    }, [dueDate])

    useEffect(() => {
        if (subTaskDueDate) {
            setIsSubToday(subTaskDueDate.isSame(dayjs(), 'day'))
            setIsSubTomorrow(
                subTaskDueDate.isSame(dayjs().add(1, 'day'), 'day')
            )
            setIsItSubPrevDate(subTaskDueDate.isBefore(dayjs()))
        } else {
            setIsSubToday(false)
            setIsSubTomorrow(false)
            setIsItSubPrevDate(false)
        }
    }, [subTaskDueDate, dueDate])

    const handleDelete = () => {
        dispatch(deleteTask(task.taskId)); // Call delete function with taskId
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <span>
                    <UserAddOutlined />{' '}
                    <Typography.Text>Assign to me</Typography.Text>
                </span>
            ),
            key: '1',
        },
        {
            label: (
                <span>
                    <InboxOutlined /> <Typography.Text>Archive</Typography.Text>
                </span>
            ),
            key: '2',
        },
        {
            label: (
                <span
                    onClick={handleDelete}
                >
                    <DeleteOutlined /> <Typography.Text>Delete</Typography.Text>
                </span>
            ),
            key: '3',
        },
    ]

    // const progress = (task.subTasks?.length || 0 + 1 )/ (task.subTasks?.length || 0 + 1)

    return (
        <Dropdown menu={{ items }} trigger={['contextMenu']}>
            <div
                className="task-card"
                style={{
                    zIndex: 99,
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Task Title and Progress */}
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            marginBottom: '0.25rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography.Text
                            style={{ fontWeight: 500 }}
                            delete={task.status === 'done'}
                        >
                            {task.task}
                        </Typography.Text>
                    </div>
                    <div
                        style={{
                            maxWidth: '30px',
                            height: '30px',
                            marginLeft: 'auto',
                        }}
                    >
                        <Progress
                            type="circle"
                            percent={task.progress}
                            size={26}
                        />
                    </div>
                </div>

                {/* Action Icons */}
                <div style={{ display: 'flex' }}>
                    {task.priority === 'low' ? (
                        <MinusOutlined
                            style={{
                                color: '#52c41a',
                                marginRight: '0.25rem',
                            }}
                        />
                    ) : task.priority === 'medium' ? (
                        <PauseOutlined
                            style={{
                                color: '#faad14',
                                transform: 'rotate(90deg)',
                                marginRight: '0.25rem',
                            }}
                        />
                    ) : (
                        <DoubleRightOutlined
                            style={{
                                color: '#f5222d',
                                transform: 'rotate(-90deg)',
                                marginRight: '0.25rem',
                            }}
                        />
                    )}
                    {task.labels?.length ? (
                        <Tooltip
                            overlay={
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {task.labels.map((label, index) => (
                                        <span key={index}>{label.labelName}</span>
                                    ))}
                                </div>
                            }
                        >
                            <Tag
                                bordered={false}
                                style={{
                                    display: 'flex',
                                    color: '#000000a6',
                                    marginRight: '0.25rem',
                                }}
                            >
                                <span>{task.labels?.length}</span>
                                <TagsOutlined />
                            </Tag>
                        </Tooltip>
                    ) : (
                        ''
                    )}
                </div>

                {/* DatePicker and Avatars */}
                <div
                    style={{
                        paddingTop: '0.25rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                    }}
                >
                    <div style={{ height: '100%', width: '100%' }}>
                        <DatePicker
                            className={`custom-placeholder ${!dueDate ? 'empty-date' : isToday ? 'selected-date' : isTomorrow ? 'selected-date' : isItPrevDate ? 'red-colored' : ''}`}
                            placeholder="Due date"
                            style={{
                                fontSize: '12px',
                                opacity: dueDate ? 1 : 0,
                            }}
                            onChange={handleDateChange}
                            variant="borderless"
                            size="small"
                            suffixIcon={false}
                            format={(value) => formatDate(value)}
                        />
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <div
                            style={{
                                opacity: 1,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                gap: '3px',
                            }}
                        >
                            <Avatar.Group>
                                {task.members?.map((member) => (
                                    <Avatar
                                        style={{
                                            backgroundColor:
                                                avatarNamesMap[
                                                    member.memberName.charAt(0)
                                                ],
                                            verticalAlign: 'middle',
                                            fontSize: '12px',
                                        }}
                                        size="small"
                                    >
                                        {member.memberName.charAt(0)}
                                    </Avatar>
                                ))}
                            </Avatar.Group>
                            <Avatar
                                size="small"
                                className={
                                    task.members?.length
                                        ? 'add-member-avatar'
                                        : 'hide-add-member-avatar'
                                }
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px dashed #c4c4c4',
                                    color: '#000000d9',
                                    fontSize: '12px',
                                }}
                            >
                                <AddMembersDropdown />
                            </Avatar>
                        </div>
                    </div>
                </div>

                {/* Subtask Section */}
                {task.subTasks && task.subTasks.length > 0 && (
                    <div>
                        {task.subTasks && task.subTasks?.length && (
                            <div
                                onClick={() => setIsSubTaskShow(!isSubTaskShow)}
                                style={{
                                    cursor: 'help',
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <Button size="small" style={{ padding: 0 }}>
                                    <Tooltip
                                        overlay={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        borderBottom:
                                                            '1px solid',
                                                        paddingBottom: '4px',
                                                    }}
                                                >
                                                    Sub-tasks
                                                </span>
                                                <div
                                                    style={{ marginTop: '4px' }}
                                                >
                                                    {task.subTasks.map(
                                                        (subtask, index) => (
                                                            <span
                                                                key={index}
                                                                style={{
                                                                    display:
                                                                        'block',
                                                                }}
                                                            >
                                                                {
                                                                    subtask.task
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        }
                                    >
                                        <Tag
                                            bordered={false}
                                            style={{
                                                display: 'flex',
                                                color: '#000000a6',
                                                margin: 0,
                                            }}
                                        >
                                            <span>{task.subTasks?.length}</span>
                                            <DoubleRightOutlined />
                                        </Tag>
                                    </Tooltip>
                                </Button>
                            </div>
                        )}

                        {isSubTaskShow &&
                            task.subTasks?.map((subtask) => (
                                <div
                                    key={subtask.taskId}
                                    style={{
                                        marginTop: '0.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography.Text
                                            style={{ fontWeight: 500 }}
                                            delete={task.status === 'done'}
                                        >
                                            {subtask.task}
                                        </Typography.Text>
                                        <StatusDropdown
                                            currentStatus={
                                                subtask.status
                                            }
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Avatar.Group
                                            size="small"
                                            max={{
                                                count: 1,
                                                style: {
                                                    color: '#f56a00',
                                                    backgroundColor: '#fde3cf',
                                                },
                                            }}
                                        >
                                            {subtask.members?.map(
                                                (member) => (
                                                    <Avatar
                                                        style={{
                                                            backgroundColor: avatarNamesMap[member.memberName.charAt(0)],
                                                            fontSize: '12px',
                                                        }}
                                                        size="small"
                                                    >
                                                        {member.memberName.charAt(0)}
                                                    </Avatar>
                                                )
                                            )}
                                        </Avatar.Group>
                                        <DatePicker
                                            className={`custom-placeholder ${!subTaskDueDate ? 'empty-date' : isSubToday || isSubTomorrow ? 'selected-date' : isItSubPrevDate ? 'red-colored' : ''}`}
                                            placeholder="Due date"
                                            style={{
                                                fontSize: '12px',
                                                opacity: subTaskDueDate ? 1 : 0,
                                            }}
                                            onChange={handleSubTaskDateChange}
                                            variant="borderless"
                                            size="small"
                                            suffixIcon={false}
                                            format={(value) =>
                                                formatDate(value)
                                            }
                                        />
                                    </div>
                                    <Divider style={{ margin: '5px' }} />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </Dropdown>
    )
}

export default TaskCard
