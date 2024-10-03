import { Button, Tooltip } from 'antd'
import React from 'react'
import { colors } from '../../../styles/colors'
import { useTranslation } from 'react-i18next'

const UpgradePlanButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    return (
        <Tooltip title={t('upgradePlanTooltip')}>
            <Button
                style={{
                    backgroundColor: colors.lightBeige,
                    color: 'black',
                }}
            >
                {t('upgradePlan')}
            </Button>
        </Tooltip>
    )
}

export default UpgradePlanButton
