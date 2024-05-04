import { ROLE } from './models/constants';
import User from './models/user';

export type UserResponseErrorMessage = {
  message: string[];
  error: string;
  statusCode: number;
};

export type SignInResponse = {
  user: BodyUserResponse;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

export type IdEmailAndUserName = {
  email: string;
  user_id: string;
  user_name: string;
};

export type BodyUpdateUser = {
  user_name: string;
  isMale: boolean;
  date_of_birth: string;
  CID: string;
  phone: string;
};

export type BodyUserResponse = {
  user_id: string;
  user_name: string | undefined;
  isMale: boolean;
  date_of_birth: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  CID: string | undefined;
  role: ROLE;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deletedAt: string | undefined;
};
