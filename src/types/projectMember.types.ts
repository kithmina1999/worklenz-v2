export type ProjectMemberType = {
  memberId: string;
  memberName: string;
  memberEmail: string;
  jobTitle?: string;
  totalAssignedTasks: number;
  completedTasks: number;
  memberRole: 'owner' | 'member' | 'admin';
};
