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
} from 'antd'
import {
    DoubleRightOutlined,
    PauseOutlined,
    TagsOutlined,
    PlusOutlined,
    UserAddOutlined,
    InboxOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import StatusDropdown from '../../../pages/home/taskList/statusDropdown/StatusDropdown'
import './TaskCard.css'
import dayjs, { Dayjs } from 'dayjs'
import { avatarNamesMap } from '../../../shared/constants'
import AddMembersDropdown from '../../addMembersDropdown/AddMembersDropdown'

interface statusProps {
    status: string
}

const TaskCard: React.FC<statusProps> = ({ status }) => {
    const [isSubTaskShow, setIsSubTaskShow] = useState(false)
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [subTaskDueDate, setSubTaskDueDate] = useState<Dayjs | null>(null)
    const [isToday, setIsToday] = useState(false)
    const [isTomorrow, setIsTomorrow] = useState(false)
    const [isItPrevDate, setIsItPrevDate] = useState(false)
    const [isSubToday, setIsSubToday] = useState(false)
    const [isSubTomorrow, setIsSubTomorrow] = useState(false)
    const [isItSubPrevDate, setIsItSubPrevDate] = useState(false)

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
    }, [dueDate, subTaskDueDate])

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
                <span>
                    <DeleteOutlined /> <Typography.Text>Delete</Typography.Text>
                </span>
            ),
            key: '3',
        },
    ]

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
                        <div style={{ cursor: 'help', marginRight: '0.25rem' }}>
                            <Tooltip title="Sub-task of Project list">
                                <Tag bordered={false}>
                                    <DoubleRightOutlined
                                        style={{ color: '#000000a6' }}
                                    />
                                </Tag>
                            </Tooltip>
                        </div>
                        <Typography.Text
                            style={{ fontWeight: 500 }}
                            delete={status === 'done'}
                        >
                            Table
                        </Typography.Text>
                    </div>
                    <div
                        style={{
                            maxWidth: '30px',
                            height: '30px',
                            marginLeft: 'auto',
                        }}
                    >
                        <Progress type="circle" percent={30} size={26} />
                    </div>
                </div>

                {/* Action Icons */}
                <div style={{ display: 'flex' }}>
                    <PauseOutlined
                        style={{
                            color: '#faad14',
                            transform: 'rotate(90deg)',
                            marginRight: '0.25rem',
                        }}
                    />
                    <Tooltip title="Sub-task of Project list">
                        <Tag
                            bordered={false}
                            style={{
                                display: 'flex',
                                color: '#000000a6',
                                marginRight: '0.25rem',
                            }}
                        >
                            <span>2</span>
                            <TagsOutlined />
                        </Tag>
                    </Tooltip>
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
                                <Avatar
                                    style={{
                                        backgroundColor: avatarNamesMap['R'],
                                        verticalAlign: 'middle',
                                        fontSize: '12px',
                                    }}
                                    size="small"
                                >
                                    R
                                </Avatar>
                            </Avatar.Group>
                            <Avatar
                                size="small"
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px dashed #c4c4c4',
                                    opacity: '0.8',
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
                <div
                    onClick={() => setIsSubTaskShow(!isSubTaskShow)}
                    style={{
                        cursor: 'help',
                        marginTop: '0.5rem',
                        display: 'flex',
                        justifyContent: 'right',
                    }}
                >
                    <Tooltip title="Sub-task of Project list">
                        <Tag
                            bordered={false}
                            style={{
                                display: 'flex',
                                color: '#000000a6',
                                margin: 0,
                            }}
                        >
                            <span>2</span>
                            <DoubleRightOutlined />
                        </Tag>
                    </Tooltip>
                </div>

                {isSubTaskShow && (
                    <div
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
                                delete={status === 'done'}
                            >
                                Sub Task 01
                            </Typography.Text>
                            <StatusDropdown currentStatus="Todo" />
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
                                <Avatar
                                    style={{
                                        backgroundColor: avatarNamesMap['R'],
                                        fontSize: '12px',
                                    }}
                                    size="small"
                                >
                                    R
                                </Avatar>
                                <Avatar
                                    style={{
                                        backgroundColor: avatarNamesMap['R'],
                                        fontSize: '12px',
                                    }}
                                    size="small"
                                >
                                    R
                                </Avatar>
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
                                format={(value) => formatDate(value)}
                            />
                        </div>
                        <Divider style={{ margin: '5px' }} />
                    </div>
                )}
            </div>
        </Dropdown>
    )
}

export default TaskCard
