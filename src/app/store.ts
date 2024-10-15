import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import localesReducer from '../features/i18n/localesSlice'
import todoReducer from '../features/todo/todoSlice'
import dateReducer from '../features/date/dateSlice'
import projectReducer from '../features/projects/projectSlice'
import notificationReducer from '../features/navbar/notification/notificationSlice'
import memberReducer from '../features/settings/member/memberSlice'
import taskReducer from '../features/tasks/taskSlice'
import userReducer from '../features/user/userSlice'
import buttonReducer from '../features/action-setup/buttonSlice'
import clientReducer from '../features/settings/client/clientSlice'
import jobReducer from '../features/settings/job/jobSlice'

export const store = configureStore({
    // there is error  occured with day js package when use with redux it shows a non-serializable value was detected
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        themeReducer: themeReducer,
        localesReducer: localesReducer,
        todoReducer: todoReducer,
        dateReducer: dateReducer,
        projectReducer: projectReducer,
        notificationReducer: notificationReducer,
        memberReducer: memberReducer,
        taskReducer: taskReducer,
        button: buttonReducer,
        userReducer: userReducer,
        clientReducer: clientReducer,
        jobReducer: jobReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
