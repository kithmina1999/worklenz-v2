import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import localesReducer from '../features/i18n/localesSlice'
import todoReducer from '../features/todo/todoSlice'
import dateReducer from '../features/date/dateSlice'
import createProjectReducer from '../features/projects/createProject/createProjectSlice'
import notificationReducer from '../features/navbar/notification/notificationSlice'
import addMemberReducer from '../features/navbar/addMember/addMemberSlice'
import taskReducer from '../features/tasks/taskSlice'

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        themeReducer: themeReducer,
        localesReducer: localesReducer,
        todoReducer: todoReducer,
        dateReducer: dateReducer,
        createProjectReducer: createProjectReducer,
        notificationReducer: notificationReducer,
        addMemberReducer: addMemberReducer,
        taskReducer: taskReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
