import { EXAMINATION_STATUS } from './constants';
import Doctor from './doctor';
import Patient from './patient';

class Examination {
  public readonly id: string;
  public readonly disease: string;
  public readonly level: string;
  public readonly underlyingDisease: string;
  public readonly description: string;
  public readonly advice: string;
  public readonly status: EXAMINATION_STATUS;
  public readonly doctor: Doctor;
  public readonly patient: Patient;

  constructor(
    id: string,
    disease: string,
    level: string,
    underlyingDisease: string,
    description: string,
    advice: string,
    status: EXAMINATION_STATUS,
    doctor: Doctor,
    patient: Patient
  ) {
    this.id = id;
    this.disease = disease;
    this.level = level;
    this.underlyingDisease = underlyingDisease;
    this.description = description;
    this.advice = advice;
    this.status = status;
    this.doctor = doctor;
    this.patient = patient;
  }
}

export default Examination;
