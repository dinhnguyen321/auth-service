export const USERS_SEED = [
  {
    email: 'admin@gmail.com',
    password: '123456',
    fullName: 'admin',
    role: 'ADMIN',
    assignedBy: 'SEED',
  },
  {
    email: 'user@gmail.com',
    password: '123456',
    fullName: 'user',
    role: 'USER',
    assignedBy: 'SEED',
  },
] as const;
