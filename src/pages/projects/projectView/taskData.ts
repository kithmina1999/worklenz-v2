import { TaskType } from "../../../types/task.types";

// Define your data source
const dataSource: TaskType[] = [
    {
        taskId: 'SP-1',
        task: 'Task 1',
        description: '-',
        progress: 0,
        members: [
            {
                memberId: '1',
                memberName: 'Raveesha Dilanka',
                memberEmail: "",
                memberRole: "owner",
                isActivate: null,
                isInivitationAccept: false
            },
            {
                memberId: '2',
                memberName: 'Sachintha Prasad',
                memberEmail: "",
                memberRole: "owner",
                isActivate: null,
                isInivitationAccept: false
            }
        ],
        labels: ['label 01', 'label 02'],
        status: 'todo',
        priority: 'high',
        timeTracking: '-',
        estimation: '-',
        startDate: new Date(),
        dueDate: new Date(),
        completedDate: new Date(),
        createdDate: new Date(),
        lastUpdated: new Date(),
        reporter: '-',
        phase: '-',
        subTasks: [
            {
                subTaskId: 'SP-1-1',
                subTask: 'Sub Task 1',
                subTaskMembers: ['Raveesha Dilanka', 'Sachintha Prasad'],
                subTaskStatus: 'todo',
                subTaskDueDate: new Date(),
            }
        ]
    },
    {
        taskId: 'SP-4',
        task: 'ads',
        description: '-',
        progress: 30,
        members:[],
        labels: [],
        status: 'doing',
        priority: 'medium',
        timeTracking: '-',
        estimation: '-',
        startDate: new Date(),
        dueDate: new Date(),
        completedDate: new Date(),
        createdDate: new Date(),
        lastUpdated: new Date(),
        reporter: '-',
        phase: '-',
    },
    {
        taskId: 'SP-5',
        task: 'asd',
        description: '-',
        progress: 0,
        members: [],
        labels: [],
        status: 'todo',
        priority: 'low',
        timeTracking: '-',
        estimation: '-',
        startDate: new Date(),
        dueDate: new Date(),
        completedDate: new Date(),
        createdDate: new Date(),
        lastUpdated: new Date(),
        reporter: '-',
        phase: '-',
    },
    {
        taskId: 'SP-12',
        task: 'asds',
        description: '-',
        progress: 100,
        members: [],
        labels: [],
        status: 'done',
        priority: 'medium',
        timeTracking: '-',
        estimation: '-',
        startDate: new Date(),
        dueDate: new Date(),
        completedDate: new Date(),
        createdDate: new Date(),
        lastUpdated: new Date(),
        reporter: '-',
        phase: '-',
    },
]

// Filter the tasks by status
export const todoData = dataSource.filter((item) => item.status === 'todo');
export const doingData = dataSource.filter((item) => item.status === 'doing');
export const doneData = dataSource.filter((item) => item.status === 'done');
