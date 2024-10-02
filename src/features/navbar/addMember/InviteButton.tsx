import { UsergroupAddOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../../styles/colors'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from './addMemberSlice'

const InviteButton = () => {
    const dispatch = useAppDispatch()

    // localization
    const { t } = useTranslation('navbar')

    return (
        <Tooltip title={t('inviteTooltip')}>
            <Button
                type="dashed"
                icon={<UsergroupAddOutlined />}
                style={{
                    color: colors.skyBlue,
                    borderColor: colors.skyBlue,
                }}
                onClick={() => dispatch(toggleDrawer())}
            >
                {t('invite')}
            </Button>
        </Tooltip>
    )
}

export default InviteButton
