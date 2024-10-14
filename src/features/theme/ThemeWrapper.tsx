import { ConfigProvider, theme } from 'antd'
import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { colors } from '../../styles/colors'

type ChildrenProp = {
    children: React.ReactNode
}

const ThemeWrapper = ({ children }: ChildrenProp) => {
    const themeMode = useAppSelector((state) => state.themeReducer.mode)

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    themeMode === 'dark'
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
                components: {
                    Layout: {
                        colorBgLayout:
                            themeMode === 'dark'
                                ? colors.darkGray
                                : colors.white,
                        headerBg:
                            themeMode === 'dark'
                                ? colors.darkGray
                                : colors.white,
                    },
                    Menu: {
                        colorBgContainer: colors.transparent,
                    },
                    Table: {
                        rowHoverBg: themeMode === 'dark' ? '#000' : '#edebf0',
                    },
                    Select: {
                        controlHeight: 32,
                    },
                },
                token: {
                    borderRadius: 4,
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default ThemeWrapper
