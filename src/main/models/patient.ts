import { ROLE } from './constants';
import Examination from './examination';
import User from './user';

class Patient extends User {
  private examinations: Examination[];

  constructor(
    userId: string,
    userName: string,
    password: string,
    isActive: boolean | undefined,
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
    super(
      userId,
      userName,
      password,
      isActive,
      dateOfBirth,
      phone,
      email,
      CID,
      role,
      createdAt,
      updatedAt,
      deletedAt,
      hashedRt
    );

    this.examinations = [];
  }

  getExaminations(): Examination[] {
    return this.examinations;
  }

  setExaminations(examinations: Examination[]): void {
    this.examinations = examinations;
  }
}

export default Patient;
