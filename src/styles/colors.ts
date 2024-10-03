// colors.ts
export const colors = {
    white: '#fff',
    darkGray: '#181818',
    lightGray: '#5f5f5f7f',
    lightBeige: '#fde8b5',
    skyBlue: '#1890ff',
    paleBlue: '#e6f7ff',
    vibrantOrange: '#f56a00',
    limeGreen: '#52c41a',
    yellow: '#f8d914',
    transparent: 'transparent',
} as const

export const applyCssVariables = () => {
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
    })
}
