import User from './models/user';

export type UserResponseErrorMessage = {
  message: string[];
  error: string;
  statusCode: number;
};

export type SignInResponse = {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};
