import React from 'react'
import UserGreetingWithTime from './UserGreetingWithTime'
import TasksList from './taskList/TasksList'
import TodoList from './TodoList'
import RecentAndFavouriteProjecList from './RecentAndFavouriteProjecList'
import { Col } from 'antd'
import { useMediaQuery } from 'react-responsive'

const Homepage = () => {
    // media queries from react-responsive package
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    return (
        <div style={{ marginBlock: 96, minHeight: '90vh' }}>
            <UserGreetingWithTime />

            {isDesktop ? (
                <Col style={{ display: 'flex', gap: 24, marginBlockStart: 48 }}>
                    <Col span={16}>
                        <TasksList />
                    </Col>
                    <Col
                        span={8}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                        }}
                    >
                        <TodoList />
                        <RecentAndFavouriteProjecList />
                    </Col>
                </Col>
            ) : (
                <Col
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        marginBlockStart: 48,
                    }}
                >
                    <TasksList />
                    <TodoList />
                    <RecentAndFavouriteProjecList />
                </Col>
            )}
        </div>
    )
}

export default Homepage
