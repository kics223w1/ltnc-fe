import { Button } from '../../../~/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Medicine from '/main/models/medicine';
import MedicineTable from '../table/MedicineTable';
import { MEDICINE_SERVICE } from '/main/models/constants';
import DialogAddMedicineContent from '../dialog/AddMedicineContent';
import DialogEditMedicineContent from '../dialog/EditMedicineContent';
import { MedicineDetails } from '../dialog/MedicineContent';
import MedicineHistoryTable from '../table/MedicineHistoryTable';

const AdminMedicineDashboard = () => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    handleLoadMedicines();
  }, []);

  const handleLoadMedicines = async () => {
    const newMedicines = await window.electron.ipcRenderer.invoke(
      MEDICINE_SERVICE.RELOAD_MEDICINES,
      {}
    );

    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setIsAddFormOpen(false);
    handleLoadMedicines();
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MedicineTable
        medicines={medicines}
        handleLoadMedicines={handleLoadMedicines}
        setSelectedMedicines={setSelectedMedicines}
      />
      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger disabled={selectedMedicines.length !== 1}>
            <Button
              variant={'outline'}
              size={'lg'}
              disabled={selectedMedicines.length !== 1}
            >
              Xem chi tiết
            </Button>
          </DialogTrigger>
          {selectedMedicines.length > 0 && (
            <MedicineDetails
              medicineId={
                selectedMedicines[selectedMedicines.length - 1].medicine_id
              }
              medicineInfor={selectedMedicines[selectedMedicines.length - 1]}
            />
          )}
        </Dialog>

        <Dialog>
          <DialogTrigger disabled={selectedMedicines.length === 0}>
            <Button
              variant={'outline'}
              size={'lg'}
              disabled={selectedMedicines.length === 0}
            >
              Cập nhật giá
            </Button>
          </DialogTrigger>
          {selectedMedicines.length > 0 && (
            <DialogEditMedicineContent
              medicine={selectedMedicines[selectedMedicines.length - 1]}
              handleLoadMedicines={handleLoadMedicines}
              onClose={() => setSelectedMedicines([])}
            />
          )}
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button
              variant={'default'}
              size={'lg'}
              onClick={() => setIsAddFormOpen(true)}
            >
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddMedicineContent
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            handleAddMedicine={handleAddMedicine}
          />
        </Dialog>
      </div>

      <h1>
        {selectedMedicines.length > 0
          ? `Lịch sử thuốc ${
              selectedMedicines[selectedMedicines.length - 1].name
            }`
          : 'Chọn thuốc để xem lịch sử'}
      </h1>
      <MedicineHistoryTable
        idMedicine={
          selectedMedicines.length > 0
            ? selectedMedicines[selectedMedicines.length - 1].medicine_id
            : undefined
        }
      />
    </div>
  );
};

export default AdminMedicineDashboard;
