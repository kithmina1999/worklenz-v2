import { FloatButton, Space, Tooltip } from 'antd'
import React from 'react'
import { FormatPainterOutlined } from '@ant-design/icons'
import LanguageSelector from '../features/i18n/LanguageSelector'
import ThemeSelector from '../features/theme/ThemeSelector'

const PreferenceSelector = () => {
    return (
        <Tooltip title="Preferences" placement="leftBottom">
            <FloatButton.Group trigger="click" icon={<FormatPainterOutlined />}>
                <Space
                    direction="vertical"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LanguageSelector />
                    <ThemeSelector />
                </Space>
            </FloatButton.Group>
        </Tooltip>
    )
}

export default PreferenceSelector
