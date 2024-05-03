import moment from 'moment';
import BatchMedicine from '../../main/models/batch-medicine';

class BatchMedicineTableModel {
  constructor() {}

  public convertToRows(batches: BatchMedicine[]) {
    return batches.flatMap((batch, index) => {
      return [this.convertToRow(batch, index)];
    });
  }

  public convertToRow(batch: BatchMedicine, index: number) {
    return {
      id: `${index}_batch_medicine`,
      medicine_id: batch.medicine_id,
      quantity: batch.quantity,
      cost_in: batch.cost_in,
      expire: moment(batch.expire).format('DD/MM/YYYY HH:mm:ss'),
      vendor: batch.vendor,
    };
  }

  public getColumns() {
    return [
      {
        field: 'medicine_id',
        headerName: 'ID',
        width: 300,
      },
      {
        field: 'quantity',
        headerName: 'Số lượng',
        width: 150,
      },
      {
        field: 'cost_in',
        headerName: 'Giá nhập (VND)',
        width: 250,
      },
      {
        field: 'expire',
        headerName: 'Hạn sử dụng',
        width: 300,
      },
      {
        field: 'vendor',
        headerName: 'Nhà cung cấp',
        width: 200,
      },
    ];
  }
}

export default BatchMedicineTableModel;
