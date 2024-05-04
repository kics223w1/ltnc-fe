import { useState, useEffect } from 'react';
import { MEDICINE_SERVICE } from '/main/models/constants';
import Batch from '../../../main/models/batch';
import BatchTable from '../table/BatchTable';
import BatchMedicineTable from '../table/BatchMedicineTable';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import { Button } from '../../../~/components/ui/button';
import DialogAddBatchContent from '../dialog/AddBatchContent';

const AdminBatchDashboard = () => {
  const [selectedBatches, setSelectedBatches] = useState<Batch[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    handleLoadBatches();
  }, []);

  const handleLoadBatches = async () => {
    const newBatches = await window.electron.ipcRenderer.invoke(
      MEDICINE_SERVICE.RELOAD_BATCHES,
      {}
    );

    setBatches(newBatches);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <BatchTable
        handleLoadBatches={handleLoadBatches}
        batches={batches}
        setSelectedBatches={setSelectedBatches}
      />

      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger>
            <Button variant={'default'} size={'lg'}>
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddBatchContent />
        </Dialog>
      </div>

      <h1>
        {selectedBatches.length > 0
          ? `Chi tiết lô hàng ${selectedBatches[selectedBatches.length - 1].id}`
          : 'Chọn lô hàng để xem chi tiết'}
      </h1>
      <BatchMedicineTable
        batchMedicines={
          selectedBatches.length > 0
            ? selectedBatches[selectedBatches.length - 1].batchMedicines
            : []
        }
      />
    </div>
  );
};

export default AdminBatchDashboard;
