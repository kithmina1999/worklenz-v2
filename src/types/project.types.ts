import { CategoryType } from './categories.types'
import { ClientType } from './client.types'
import { MemberType } from './member.types'

export type ProjectStatus =
    | 'cancelled'
    | 'blocked'
    | 'onHold'
    | 'proposed'
    | 'inPlanning'
    | 'inProgress'
    | 'completed'
    | 'continuos'

export type ProjectHealthStatus =
    | 'notSet'
    | 'needsAttention'
    | 'atRisk'
    | 'good'

export type ProjectType = {
    projectId: string
    projectName: string
    projectColor: string
    projectStatus: ProjectStatus
    projectHealthStatus: ProjectHealthStatus
    projectCategory?: CategoryType | null
    projectNotes?: string | null
    projectClient?: ClientType[] | null
    projectManager?: MemberType
    projectStartDate?: Date | null
    projectEndDate?: Date | null
    projectEstimatedWorkingDays?: number
    projectEstimatedManDays?: number
    projectHoursPerDays?: number
    projectCreated: Date
    isFavourite: boolean
    projectTeam: string
    projectMemberCount: number
}
