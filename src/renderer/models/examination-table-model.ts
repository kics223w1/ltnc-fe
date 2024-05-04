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
      queue_number: this.getDetailQueueNumber(appointment.queue_number),
      date: moment(appointment.date).format('DD/MM/YYYY'),
      doctor_name: appointment.doctor.userName,
    };
  }

  public getDetailQueueNumber(num: number) {
    switch (num) {
      case 1:
        return 'Ca 1 (7h-8h)';
      case 2:
        return 'Ca 2 (8h-9h)';
      case 3:
        return 'Ca 3 (9h-10h)';
      case 4:
        return 'Ca 4 (10h-11h)';
      case 5:
        return 'Ca 5 (13h-14h)';
      case 6:
        return 'Ca 6 (14h-15h)';
      case 7:
        return 'Ca 7 (15h-16h)';
      case 8:
        return 'Ca 8 (16h-17h)';
      default:
        return 'Ca 1 (7h-8h)';
    }
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
        headerName: 'Ca khám',
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
