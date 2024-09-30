import { createSlice } from '@reduxjs/toolkit'
import i18n from './i18n'

type LanguageType = 'en' | 'si'

type LocalesState = {
    lng: LanguageType
}

// fuction for get the current language from the local storage
const getLanguageFromLocalStorage = () => {
    const savedLng = localStorage.getItem('i18nextLng')
    return savedLng === 'en'
        ? (savedLng as 'en')
        : savedLng === 'si'
            ? (savedLng as 'si')
            : 'en'
}
// fuction for save the current language to the local storage
const saveLanguageInLocalStorage = (lng: LanguageType) => {
    localStorage.setItem('i18nextLng', lng)
}

const initialState: LocalesState = {
    lng: getLanguageFromLocalStorage(),
}

const localesSlice = createSlice({
    name: 'localesReducer',
    initialState,
    reducers: {
        toggleLng: (state) => {
            state.lng = state.lng === 'en' ? 'si' : 'en'
            saveLanguageInLocalStorage(state.lng)
            i18n.changeLanguage(getLanguageFromLocalStorage())
        },
    },
})

export const { toggleLng } = localesSlice.actions
export default localesSlice.reducer
