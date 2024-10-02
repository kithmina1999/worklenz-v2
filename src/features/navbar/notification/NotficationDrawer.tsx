import { Drawer, Empty, Segmented, Typography } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from './notificationSlice'

const NotficationDrawer = () => {
    const [notificationType, setNotificationType] = useState<'read' | 'unread'>(
        'unread'
    )
    const isDrawerOpen = useAppSelector(
        (state) => state.notificationReducer.isDrawerOpen
    )
    const dispatch = useAppDispatch()

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    {notificationType === 'read' ? 'Read' : ' Unread'}{' '}
                    Notifications (0)
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleDrawer())}
        >
            <Segmented<string>
                options={['Unread', 'Read']}
                defaultValue="Unread"
                onChange={(value: string) => {
                    if (value === 'Unread') setNotificationType('unread')
                    if (value === 'Read') setNotificationType('read')
                }}
            />

            <Empty
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBlockStart: 32,
                }}
                description={
                    <Typography.Text>
                        You've read all your notifications
                    </Typography.Text>
                }
            />
        </Drawer>
    )
}

export default NotficationDrawer
