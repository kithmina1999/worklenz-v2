export type UserType = {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  userRole: 'owner' | 'member' | 'admin';
};
