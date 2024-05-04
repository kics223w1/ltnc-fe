import moment from 'moment';
import Appointment from '../../main/models/appointment';

class AppointmentTableModel {
  constructor() {}

  public convertToRows(appointments: Appointment[]) {
    return appointments.flatMap((appointment) => {
      return [this.convertToRow(appointment)];
    });
  }

  public convertToRow(appointment: Appointment) {
    return {
      id: appointment.id,
      disease: appointment.disease,
      level: appointment.level,
      underlyingDisease: appointment.underlyingDisease,
      advice: appointment.advice,
      description: appointment.description,
      queue_number: appointment.queue_number,
      date: moment(appointment.date).format('DD/MM/YYYY HH:mm'),
      doctor_name: appointment.doctor.userName,
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
        field: 'date',
        headerName: 'Ngày khám',
        width: 300,
      },
      {
        field: 'queue_number',
        headerName: 'Số thứ tự',
        width: 150,
      },
      {
        field: 'doctor_name',
        headerName: 'Bác sĩ',
        width: 300,
      },
      {
        field: 'disease',
        headerName: 'Bệnh',
        width: 300,
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
        width: 300,
      },
      {
        field: 'description',
        headerName: 'Mô tả',
        width: 300,
      },
    ];
  }
}

export default AppointmentTableModel;
