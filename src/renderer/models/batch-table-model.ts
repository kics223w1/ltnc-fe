import moment from 'moment';
import Batch from '../../main/models/batch';

class BatchTableModel {
  constructor() {}

  public convertToRows(batches: Batch[]) {
    return batches.flatMap((batch, index) => {
      return [this.convertToRow(batch, index)];
    });
  }

  public convertToRow(batch: Batch, index: number) {
    return {
      id: `${index}_batch`,
      batchId: batch.id,
      status: batch.status,
      placer_name: batch.placer_name,
      placer_CID: batch.placer_CID,
      placer_phone: batch.placer_phone,
      import_date: moment(batch.import_date).format('DD/MM/YYYY HH:mm:ss'),
      total_type: batch.total_type,
      description: batch.description,
      createdAt: moment(batch.createdAt).format('DD/MM/YYYY HH:mm:ss'),
      updatedAt: moment(batch.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
    };
  }

  public getColumns() {
    return [
      {
        field: 'batchId',
        headerName: 'ID',
        width: 300,
      },
      {
        field: 'status',
        headerName: 'Trạng thái',
        width: 150,
      },
      {
        field: 'placer_name',
        headerName: 'Người nhập',
        width: 250,
      },
      {
        field: 'placer_CID',
        headerName: 'CMND',
        width: 250,
      },
      {
        field: 'placer_phone',
        headerName: 'Số điện thoại',
        width: 200,
      },
      {
        field: 'import_date',
        headerName: 'Ngày nhập',
        width: 250,
      },
      {
        field: 'total_type',
        headerName: 'Số loại thuốc',
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
      {
        field: 'description',
        headerName: 'Mô tả',
        width: 300,
      },
    ];
  }
}

export default BatchTableModel;
