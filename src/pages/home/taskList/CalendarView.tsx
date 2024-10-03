import React from 'react'
import HomeCalendar from '../../../components/calendars/homeCalendar/HomeCalendar'
import EmptyListPlaceholder from '../../../components/EmptyListPlaceholder'
import { Input, Table, Tag, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../hooks/useAppSelector'

const CalendarView = () => {
    const tasksList: string[] = []
    const date = useAppSelector((state) => state.dateReducer.date)

    return (
        <div>
            <HomeCalendar />

            <Tag
                icon={<ClockCircleOutlined style={{ fontSize: 16 }} />}
                color="success"
                style={{
                    display: 'flex',
                    width: '100%',
                    padding: '8px 12px',
                    marginBlock: 12,
                }}
            >
                <Typography.Text>
                    Tasks due on: {date.format('MMM DD, YYYY')}
                </Typography.Text>
            </Tag>

            <Input
                placeholder="+ Add Task"
                style={{ width: '100%', maxWidth: 300 }}
            />

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

export default CalendarView
