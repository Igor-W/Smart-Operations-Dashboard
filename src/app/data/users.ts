import { IUser } from '../common/interfaces/IUser';

export const users: (IUser & { password: string })[] = [
  {
    id: 1,
    email: 'admin@test.com',
    role: 'admin',
    password: 'password123',
  },
  {
    id: 2,
    email: 'user@test.com',
    role: 'user',
    password: 'password123',
  },
];
