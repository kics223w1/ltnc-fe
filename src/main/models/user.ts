import { ROLE } from './constants';

class User {
  public readonly userId: string;
  public readonly userName: string;
  public readonly password: string;
  public readonly isActive?: boolean;
  public readonly isMale: boolean;
  public readonly dateOfBirth: Date;
  public readonly phone: string;
  public readonly email: string;
  public readonly CID: string;
  public readonly role: ROLE;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;
  public readonly hashedRt: string;

  constructor(
    userId: string,
    userName: string,
    password: string,
    isActive: boolean | undefined,
    isMale: boolean,
    dateOfBirth: Date,
    phone: string,
    email: string,
    CID: string,
    role: ROLE,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null | undefined,
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
}

export default User;
