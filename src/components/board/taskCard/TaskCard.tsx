import { DoubleRightOutlined, PauseOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, DatePicker, Progress, Tag, Tooltip, Typography } from 'antd'
import React from 'react'
import { avatarNamesMap } from '../../../shared/constants'
import './TaskCard.css'

const TaskCard = () => {
    return (
        <div
            className='task-card'
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
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        marginBottom: '0.25rem',
                        justifyContent: 'space-between',
                        display: 'flex',
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
                    <Typography.Text style={{ fontWeight: 500 }}>
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
                    <div style={{ marginLeft: '0.25rem' }}>
                        <Progress type="circle" percent={30} size={26} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '0.25rem', cursor: 'pointer' }}>
                    <PauseOutlined
                        style={{ color: '#faad14', transform: 'rotate(90deg)' }}
                    />
                </div>
                <div style={{ cursor: 'help', marginRight: '0.25rem' }}>
                    <Tooltip title="Sub-task of Project list">
                        <Tag bordered={false}>
                            <span>3</span>
                            <DoubleRightOutlined
                                style={{ color: '#000000a6' }}
                            />
                        </Tag>
                    </Tooltip>
                </div>
            </div>

            <div
                style={{
                    paddingTop: '0.25rem',
                    marginTop: '0.5rem',
                    display: 'flex',
                }}
            >
                <div style={{ height: '100%', width: '100%' }}>
                    <DatePicker
                        placeholder="Due date"
                        style={{ fontSize: '12px' }}
                        variant="borderless"
                        size="small"
                        suffixIcon={false}
                    />
                </div>
                <div style={{marginLeft: 'auto'}}>
                    <div style={{opacity: 1, borderRadius: '4px', cursor: 'pointer', alignItems: 'center', height: '100%', width: '100%', display: 'flex', gap: '3px'}}>
                        <Avatar.Group>
                            <Avatar
                                style={{
                                    backgroundColor: avatarNamesMap['R'],
                                    verticalAlign: 'middle',
                                    fontSize: '12px'
                                }}
                                size="small"
                            >
                                R
                            </Avatar>
                        </Avatar.Group>
                        <Avatar size='small' style={{backgroundColor: '#fff', border: '1px dashed #c4c4c4', opacity: '0.8', color: '#000000d9', fontSize: '12px'}}><PlusOutlined /></Avatar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
