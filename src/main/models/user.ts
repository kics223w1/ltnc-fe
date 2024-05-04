import { BodyUserResponse } from './../types';
import { ROLE } from './constants';

class User {
  public readonly userId: string;
  public readonly userName: string;
  public readonly password: string;
  public readonly isActive?: boolean;
  public readonly isMale: boolean;
  public readonly dateOfBirth: string | undefined;
  public readonly phone: string | undefined;
  public readonly email: string;
  public readonly CID: string | undefined;
  public readonly role: ROLE;
  public readonly createdAt: string | undefined;
  public readonly updatedAt: string | undefined;
  public readonly deletedAt: string | undefined;
  public readonly hashedRt: string;

  constructor(
    userId: string,
    userName: string,
    password: string,
    isActive: boolean | undefined,
    isMale: boolean,
    dateOfBirth: string | undefined,
    phone: string | undefined,
    email: string,
    CID: string | undefined,
    role: ROLE,
    createdAt: string | undefined,
    updatedAt: string | undefined,
    deletedAt: string | undefined,
    hashedRt: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.isActive = isActive;
    this.isMale = isMale;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.email = email;
    this.CID = CID;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.hashedRt = hashedRt;
  }

  public static fromJSON(obj: BodyUserResponse) {
    return new User(
      obj.user_id,
      obj.user_name || '',
      '',
      true,
      obj.isMale,
      obj.date_of_birth,
      obj.phone,
      obj.email || '',
      obj.CID,
      obj.role,
      obj.createdAt,
      obj.updatedAt,
      obj.deletedAt,
      ''
    );
  }
}

export default User;
