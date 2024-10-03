import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const HelpButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    return (
        <Tooltip title={t('help')}>
            <Button
                className="navbar-action-btn"
                icon={<QuestionCircleOutlined style={{ fontSize: 20 }} />}
            />
        </Tooltip>
    )
}

export default HelpButton
