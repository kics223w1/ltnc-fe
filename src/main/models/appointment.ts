import Doctor from './doctor';

class Appointment {
  public readonly id: number;
  public readonly disease: string | null;
  public readonly level: string | null;
  public readonly underlyingDisease: string | null;
  public readonly description: string | null;
  public readonly advice: string | null;
  public readonly date: string;
  public readonly queue_number: number;

  public readonly doctor: Doctor;

  constructor(
    id: number,
    disease: string | null,
    level: string | null,
    underlyingDisease: string | null,
    description: string | null,
    advice: string | null,
    date: string,
    queue_number: number,
    doctor: {
      user_id: string;
      user_name: string;
      isMale: boolean;
      date_of_birth: string | undefined;
      phone: string | undefined;
      CID: string | undefined;
    }
  ) {
    this.id = id;
    this.disease = disease;
    this.level = level;
    this.underlyingDisease = underlyingDisease;
    this.description = description;
    this.advice = advice;
    this.date = date;
    this.queue_number = queue_number;
    this.doctor = Doctor.fromDoctorAppointment(doctor);
  }

  public static fromJSON(obj: {
    id: number;
    disease: string | null;
    level: string | null;
    underlyingDisease: string | null;
    description: string | null;
    advice: string | null;
    date: string;
    queue_number: number;
    doctor: {
      user_id: string;
      user_name: string;
      isMale: boolean;
      date_of_birth: string | undefined;
      phone: string | undefined;
      CID: string | undefined;
    };
  }) {
    return new Appointment(
      obj.id,
      obj.disease,
      obj.level,
      obj.underlyingDisease,
      obj.description,
      obj.advice,
      obj.date,
      obj.queue_number,
      obj.doctor
    );
  }
}

export default Appointment;
