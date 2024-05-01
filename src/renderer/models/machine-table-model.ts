import Machine from '../../main/models/machine';

class MachineTableModel {
  constructor() {}

  public convertToRows(machines: Machine[]) {
    return machines.flatMap((machines) => {
      return [this.convertToRow(machines)];
    });
  }

  public convertToRow(machines: Machine) {
    return {
      id: machines.id,
      machineId: machines.id,
      machineName: machines.name,
      Vendor: machines.vendor,
      Status: machines.status,
      Description: machines.description,
    };
  }

  public getColumns() {
    return [
      {
        field: 'machineId',
        headerName: 'ID',
        width: 100,
      },
      {
        field: 'machineName',
        headerName: 'Tên loại máy',
        width: 150,
      },
      {
        field: 'Vendor',
        headerName: 'Nhà cung cấp',
        width: 200,
      },
      {
        field: 'Status',
        headerName: 'Trạng thái',
        width: 200,
      },
      {
        field: 'Description',
        headerName: 'Mô tả',
        width: 200,
      },
    ];
  }
}

export default MachineTableModel;