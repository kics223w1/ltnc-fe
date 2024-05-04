import { ROLE } from './constants';
import Examination from './examination';
import User from './user';

class Doctor extends User {
  public examinations: Examination[];

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
      isMale,
      dateOfBirth,
      phone,
      email,
      CID,
      ROLE.DOCTOR,
      createdAt,
      updatedAt,
      deletedAt,
      hashedRt
    );

    this.examinations = [];
  }

  public static fromDoctorAppointment(obj: {
    user_id: string;
    user_name: string;
    isMale: boolean;
    date_of_birth: string | undefined;
    phone: string | undefined;
    CID: string | undefined;
  }) {
    return new Doctor(
      obj.user_id,
      obj.user_name,
      '',
      true,
      obj.isMale,
      obj.date_of_birth,
      obj.phone ? obj.phone : '',
      '',
      obj.CID ? obj.CID : '',
      new Date(),
      new Date(),
      null,
      ''
    );
  }
}

export default Doctor;
