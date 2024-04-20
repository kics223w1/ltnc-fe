import Doctor from '../../main/models/doctor';

class DoctorTableModel {
  constructor() {}

  public convertToRows(doctors: Doctor[]) {
    return doctors.flatMap((doctor) => {
      return [this.convertToRow(doctor)];
    });
  }

  public convertToRow(doctor: Doctor) {
    return {
      id: doctor.userId,
      usedId: doctor.userId,
      userName: doctor.userName,
      role: doctor.role,
      phone: doctor.phone,
      email: doctor.email,
      dateOfBirth: doctor.dateOfBirth,
    };
  }

  public getColumns() {
    return [
      {
        field: 'usedId',
        headerName: 'ID',
        width: 150,
      },
      {
        field: 'userName',
        headerName: 'Họ và tên',
        width: 150,
      },
      {
        field: 'role',
        headerName: 'Chức vụ',
        width: 200,
      },
      {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 200,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
      },
      {
        field: 'dateOfBirth',
        headerName: 'Ngày sinh',
        width: 200,
      },
    ];
  }
}

export default DoctorTableModel;
