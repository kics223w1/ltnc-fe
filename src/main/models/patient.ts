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
    isMale: boolean,
    dateOfBirth: string | undefined,
    phone: string,
    email: string,
    CID: string,
    createdAt: string | undefined,
    updatedAt: string | undefined,
    deletedAt: string | undefined,
    hashedRt: string
  ) {
    super(
      userId,
      userName,
      password,
      isActive,
      isMale,
      dateOfBirth,
      phone,
      email,
      CID,
      ROLE.PATIENT,
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
