import MedicineHistory from '../../main/models/medicine-history';
import Medicine from '/main/models/medicine';
import moment from 'moment';

class MedicineHistoryTableModel {
  constructor() {}

  public convertToRows(medicines: MedicineHistory[]) {
    return medicines.flatMap((medicines) => {
      return [this.convertToRow(medicines)];
    });
  }

  public convertToRow(medicines: MedicineHistory) {
    return {
      id: medicines.id,
      medicineId: medicines.medicine_id,
      export_date: moment(medicines.export_date).format('DD/MM/YYYY HH:mm:ss'),
      cost_out: medicines.cost_out,
      prev_remaining: medicines.prev_remaining,
      curr_remaining: medicines.curr_remaining,
      description: medicines.description,
      batchMedicineId: medicines.batchMedicine.id,
      batchMedicineQuantity: medicines.batchMedicine.quantity,
      batchMedicineCost_in: medicines.batchMedicine.cost_in,
      batchMedicineExpire: moment(medicines.batchMedicine.expire).format(
        'DD/MM/YYYY HH:mm:ss'
      ),
      batchMedicineVendor: medicines.batchMedicine.vendor,
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
        field: 'export_date',
        headerName: 'Ngày xuất',
        width: 300,
      },
      {
        field: 'cost_out',
        headerName: 'Giá bán (VND)',
        width: 200,
      },
      {
        field: 'prev_remaining',
        headerName: 'Số lượng còn lại trước đó',
        width: 300,
      },
      {
        field: 'curr_remaining',
        headerName: 'Số lượng còn lại hiện tại',
        width: 300,
      },
      {
        field: 'description',
        headerName: 'Mô tả thuốc',
        width: 300,
      },
      {
        field: 'batchMedicineId',
        headerName: 'Mã lô thuốc',
        width: 300,
      },
      {
        field: 'batchMedicineQuantity',
        headerName: 'Số lượng lô thuốc',
        width: 300,
      },
      {
        field: 'batchMedicineCost_in',
        headerName: 'Giá nhập lô thuốc (VND)',
        width: 300,
      },
      {
        field: 'batchMedicineExpire',
        headerName: 'Ngày hết hạn lô thuốc',
        width: 300,
      },
      {
        field: 'batchMedicineVendor',
        headerName: 'Nhà cung cấp lô thuốc',
        width: 300,
      },
    ];
  }
}

export default MedicineHistoryTableModel;
