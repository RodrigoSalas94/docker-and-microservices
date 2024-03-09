export type User = {
  email: string;
  userId?: number;
  password: string;
  active?: boolean;
};

export type UserRegister = Pick<User, 'email' | 'password' | 'userId'>;
export type UserEmail = Pick<User, 'email'>;
