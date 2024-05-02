import Medicine from '/main/models/medicine';
import moment from 'moment';

class MedicineTableModel {
  constructor() {}

  public convertToRows(medicines: Medicine[]) {
    return medicines.flatMap((medicines) => {
      return [this.convertToRow(medicines)];
    });
  }

  public convertToRow(medicines: Medicine) {
    return {
      id: medicines.medicine_id,
      medicineId: medicines.medicine_id,
      remaining: medicines.remaining,
      medicineName: medicines.name,
      unit: medicines.unit,
      cost_out: medicines.cost_out,
      ingredients: medicines.ingredients,
      createdAt: moment(medicines.createdAt).format('DD/MM/YYYY HH:mm:ss'),
      updatedAt: moment(medicines.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
      description: medicines.description,
    };
  }

  public getColumns() {
    return [
      {
        field: 'medicineId',
        headerName: 'ID',
        width: 150,
      },
      {
        field: 'medicineName',
        headerName: 'Tên loại thuốc',
        width: 150,
      },
      {
        field: 'unit',
        headerName: 'đơn vị',
        width: 100,
      },
      {
        field: 'cost_out',
        headerName: 'Giá bán (VND)',
        width: 300,
      },
      {
        field: 'remaining',
        headerName: 'Số lượng còn lại',
        width: 200,
      },
      {
        field: 'description',
        headerName: 'Mô tả',
        width: 300,
      },
      {
        field: 'createdAt',
        headerName: 'Ngày khởi tạo',
        width: 300,
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        width: 300,
      },
    ];
  }
}

export default MedicineTableModel;
