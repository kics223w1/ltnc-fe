import Examination from '../../main/models/examination';

class ExaminationTableModel {
  constructor() {}

  public convertToRows(examinations: Examination[]) {
    return examinations.flatMap((examination) => {
      return [this.convertToRow(examination)];
    });
  }

  public convertToRow(examination: Examination) {
    return {
      id: examination.id,
      disease: examination.disease,
      level: examination.level,
      underlyingDisease: examination.underlyingDisease,
      advice: examination.advice,
      description: examination.description,
      status: examination.status,
      doctor: undefined, // Hardcode for now
      patient: undefined, // Hardcode for now
    };
  }

  public getColumns() {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 90,
      },
      {
        field: 'disease',
        headerName: 'Bệnh',
        width: 150,
      },
      {
        field: 'level',
        headerName: 'Mức độ',
        width: 100,
      },
      {
        field: 'underlyingDisease',
        headerName: 'Bệnh lý nền',
        width: 200,
      },
      {
        field: 'advice',
        headerName: 'Lời Dặn',
        width: 200,
      },
      {
        field: 'description',
        headerName: 'Mô tả',
        width: 250,
      },
      {
        field: 'status',
        headerName: 'Trạng thái',
        width: 150,
      },
      {
        field: 'doctor',
        headerName: 'Bác sĩ',
        width: 200,
      },
      {
        field: 'patient',
        headerName: 'Bệnh nhân',
        width: 200,
      },
    ];
  }
}

export default ExaminationTableModel;
