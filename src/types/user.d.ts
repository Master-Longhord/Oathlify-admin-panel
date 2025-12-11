export interface User {
  id: string;
  email: string;
  phone: string | null;
  status: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  lastLoginAt: string | null;
}

export interface UserDetail extends User {
  updatedAt: string;
}
