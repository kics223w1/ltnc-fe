import Doctor from '../../main/models/doctor';
import User from '../../main/models/user';

class UserTableModel {
  constructor() {}

  public convertToRows(users: User[]) {
    return users.flatMap((user, index) => {
      return [this.convertToRow(user, index)];
    });
  }

  public convertToRow(user: User, index: number) {
    return {
      id: index,
      usedId: user.userId,
      userName: user.userName,
      isMale: user.isMale ? 'Nam' : 'Nữ',
      role: user.role,
      phone: user.phone,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
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
        field: 'isMale',
        headerName: 'Giới tính',
        width: 100,
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

export default UserTableModel;
