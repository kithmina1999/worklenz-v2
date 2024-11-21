import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '@features/theme/themeSlice';
import localesReducer from '@features/i18n/localesSlice';
import todoReducer from '@features/todo/todoSlice';
import dateReducer from '@features/date/dateSlice';
import projectsReducer from '@features/projects/projectsSlice';
import notificationReducer from '@features/navbar/notification/notificationSlice';
import memberReducer from '@features/settings/member/memberSlice';
import taskReducer from '@features/tasks/taskSlice';
import userReducer from '@features/user/userSlice';
import buttonReducer from '@features/actionSetup/buttonSlice';
import clientReducer from '@features/settings/client/clientSlice';
import jobReducer from '@features/settings/job/jobSlice';
import teamReducer from '@features/teams/teamSlice';
import billingReducer from '@features/adminCenter/billing/billingSlice';
import projectMemberReducer from '@features/projects/singleProject/members/projectMembersSlice';
import categoriesReducer from '@features/settings/categories/categoriesSlice';
import projectViewTaskListColumnsReducer from '@features/projects/singleProject/taskListColumns/taskColumnsSlice';
import createCardReducer from '@features/board/createCardSlice';
import phaseReducer from '@features/projects/singleProject/phase/phaseSlice';
import labelReducer from '@features/settings/label/labelSlice';
import authReducer from '@features/auth/authSlice';
import alertsReducer from '@/services/alerts/alertSlice';
import statusReducer from '@features/projects/status/StatusSlice';
import bulkActionReducer from '@features/projects/bulkActions/bulkActionSlice';
import projectCategoriesReducer from '@features/projects/lookups/projectCategories/projectCategoriesSlice';
import projectStatusesReducer from '@features/projects/lookups/projectStatuses/projectStatusesSlice';
import projectHealthReducer from '@features/projects/lookups/projectHealth/projectHealthSlice';
import projectReducer from '@features/project/project.slice';
import scheduleReducer from '../features/schedule/scheduleSlice';
import updatesReducer from '../features/projects/singleProject/updates/updatesSlice';
import projectReportsTableColumnsReducer from '../features/reporting/projectReports/projectReportsTableColumns/projectReportsTableColumnSlice';
import projectReportsReducer from '../features/reporting/projectReports/projectReportsSlice';
import priorityReducer from '@features/taskAttributes/taskPrioritySlice';
import taskLabelsReducer from '@features/taskAttributes/taskLabelSlice';
import taskStatusReducer from '@features/taskAttributes/taskStatusSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    themeReducer: themeReducer,
    localesReducer: localesReducer,
    auth: authReducer,
    todoReducer: todoReducer,
    dateReducer: dateReducer,
    projectsReducer: projectsReducer,
    notificationReducer: notificationReducer,
    memberReducer: memberReducer,
    taskReducer: taskReducer,
    button: buttonReducer,
    userReducer: userReducer,
    clientReducer: clientReducer,
    jobReducer: jobReducer,
    teamReducer: teamReducer,
    billingReducer: billingReducer,
    projectMemberReducer: projectMemberReducer,
    categoriesReducer: categoriesReducer,
    projectViewTaskListColumnsReducer: projectViewTaskListColumnsReducer,
    createCardReducer: createCardReducer,
    phaseReducer: phaseReducer,
    labelReducer: labelReducer,
    alertsReducer: alertsReducer,
    statusReducer: statusReducer,
    bulkActionReducer: bulkActionReducer,
    projectCategoriesReducer: projectCategoriesReducer,
    projectStatusesReducer: projectStatusesReducer,
    projectHealthReducer: projectHealthReducer,
    projectReducer: projectReducer,
    scheduleReducer: scheduleReducer,
    updatesReducer: updatesReducer,
    projectReportsTableColumnsReducer: projectReportsTableColumnsReducer,
    projectReportsReducer: projectReportsReducer,
    priorityReducer: priorityReducer,
    taskLabelsReducer: taskLabelsReducer,
    taskStatusReducer: taskStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
