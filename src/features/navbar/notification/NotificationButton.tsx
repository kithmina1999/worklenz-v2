import { BellOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { toggleDrawer } from './notificationSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useTranslation } from 'react-i18next'

const NotificationButton = () => {
    const dispatch = useAppDispatch()

    // localization
    const { t } = useTranslation('navbar')

    return (
        <Tooltip title={t('notificationTooltip')} trigger={'hover'}>
            <Button
                className="borderless-icon-btn"
                icon={<BellOutlined style={{ fontSize: 20 }} />}
                onClick={() => dispatch(toggleDrawer())}
            />
        </Tooltip>
    )
}

export default NotificationButton
