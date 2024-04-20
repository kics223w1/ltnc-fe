import { ROLE } from './constants';
import Examination from './examination';
import User from './user';

class Nurse extends User {
  public examinations: Examination[];

  constructor(
    userId: string,
    userName: string,
    password: string,
    isActive: boolean | undefined,
    dateOfBirth: Date,
    phone: string,
    email: string,
    CID: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null | undefined,
    hashedRt: string
  ) {
    super(
      userId,
      userName,
      password,
      isActive,
      dateOfBirth,
      phone,
      email,
      CID,
      ROLE.NURSE,
      createdAt,
      updatedAt,
      deletedAt,
      hashedRt
    );

    this.examinations = [];
  }
}

export default Nurse;
