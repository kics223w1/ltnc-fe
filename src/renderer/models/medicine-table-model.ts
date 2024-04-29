import Medicine from "/main/models/medicine";

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
      createdAt: medicines.createdAt,
      updatedAt: medicines.updatedAt,
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
        field: 'remaining',
        headerName: 'Số lượng còn lại',
        width: 200,
      },
      {
        field: 'description',
        headerName: 'Mô tả',
        width: 200,
      },
      {
        field: 'createdAt',
        headerName: 'Ngày khởi tạo',
        width: 150,
      },
      {
        field: 'updatedAt',
        headerName: 'Ngày cập nhật',
        width: 150,
      },
    ];
  }
}

export default MedicineTableModel;
