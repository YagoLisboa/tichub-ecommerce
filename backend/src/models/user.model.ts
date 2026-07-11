export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: UserRole // Restrito estritamente a "ADMIN" ou "CUSTOMER"
  ) {}
}