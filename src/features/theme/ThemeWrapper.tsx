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
                    Button: {
                        colorBgContainer: colors.transparent,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default ThemeWrapper
