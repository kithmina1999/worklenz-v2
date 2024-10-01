import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import localesReducer from '../features/i18n/localesSlice'
import todoReducer from '../features/todo/todoSlice'
import dateReducer from '../features/date/dateSlice'
import createProjectReducer from '../features/projects/createProject/createProjectSlice'

export const store = configureStore({
    reducer: {
        themeReducer: themeReducer,
        localesReducer: localesReducer,
        todoReducer: todoReducer,
        dateReducer: dateReducer,
        createProjectReducer: createProjectReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
