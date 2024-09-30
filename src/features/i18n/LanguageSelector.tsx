import { Button } from 'antd'
import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { toggleLng } from './localesSlice'

const LanguageSelector = () => {
    const language = useAppSelector((state) => state.localesReducer.lng)
    const dispatch = useAppDispatch()

    // function for handle language change toggle
    const handleLanguageChange = () => {
        dispatch(toggleLng())
    }

    return (
        <Button
            shape="circle"
            onClick={handleLanguageChange}
            style={{ textTransform: 'capitalize', fontWeight: 500 }}
        >
            {language === 'en' ? 'En' : 'සිං'}
        </Button>
    )
}

export default LanguageSelector
