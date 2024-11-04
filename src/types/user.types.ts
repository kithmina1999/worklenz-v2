export type IUserType = {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  userRole: 'owner' | 'member' | 'admin';
};
