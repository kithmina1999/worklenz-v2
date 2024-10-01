import React from 'react'
import UserGreetingWithTime from './UserGreetingWithTime'
import TasksList from './taskList/TasksList'
import TodoList from './TodoList'
import RecentAndFavouriteProjecList from './RecentAndFavouriteProjecList'
import { Col } from 'antd'
import { useMediaQuery } from 'react-responsive'
import CreateProjectDrawer from '../../features/projects/createProject/CreateProjectDrawer'
import CreateProjectButton from '../../features/projects/createProject/CreateProjectButton'

const Homepage = () => {
    // media queries from react-responsive package
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    return (
        <div style={{ marginBlock: 96, minHeight: '90vh' }}>
            <Col style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <UserGreetingWithTime />
                {isDesktop ? (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        {/* tailwind css used to position this button  */}
                        <CreateProjectButton />
                    </div>
                ) : (
                    <CreateProjectButton />
                )}
            </Col>

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
                        marginBlockStart: 24,
                    }}
                >
                    <TasksList />
                    <TodoList />
                    <RecentAndFavouriteProjecList />
                </Col>
            )}

            {/* drawers */}
            {/* create project drawer  */}
            <CreateProjectDrawer />
        </div>
    )
}

export default Homepage
