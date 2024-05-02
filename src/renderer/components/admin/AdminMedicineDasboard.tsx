import { Button } from '../../../~/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Medicine from '/main/models/medicine';
import MedicineTable from '../table/MedicineTable';
import { MEDICINE_SERVICE } from '/main/models/constants';
import DialogAddMedicineContent from '../dialog/AddMedicineContent';
import DialogEditMedicineContent from '../dialog/EditMedicineContent';
import { MedicineDetails, MedicineLog } from '../dialog/MedicineContent';

const AdminMedicineDashboard = () => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

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

  const handleSaveMedicine = async (updatedMedicine: Medicine) => {
    try {
      const response = await fetch(
        `http://localhost:3001/medicine/${updatedMedicine.medicine_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMedicine),
        }
      );
      if (response.ok) {
        handleLoadMedicines(); // Reload medicines after update
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error toast or any feedback to the user
    }
  };

  const handleViewDetails = () => {
    setSelectedMedicine(selectedMedicines[selectedMedicines.length - 1]);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MedicineTable
        medicines={medicines}
        handleLoadMedicines={handleLoadMedicines}
        setSelectedMedicines={setSelectedMedicines}
      />
      {/* {showAddForm && <AddMedicineForm onClose={() => setShowAddForm(false)} />} */}
      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger disabled={selectedMedicines.length !== 1}>
            <Button
              variant={'outline'}
              size={'lg'}
              disabled={selectedMedicines.length !== 1}
              onClick={handleViewDetails}
            >
              Log
            </Button>
          </DialogTrigger>
          {selectedMedicines.length > 0 && (
            <MedicineLog
              medicineId={
                selectedMedicines[selectedMedicines.length - 1].medicine_id
              }
              medicineInfor={selectedMedicines[selectedMedicines.length - 1]}
            />
          )}
        </Dialog>
        <Dialog>
          <DialogTrigger disabled={selectedMedicines.length !== 1}>
            <Button
              variant={'outline'}
              size={'lg'}
              disabled={selectedMedicines.length !== 1}
              onClick={handleViewDetails}
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
              Chỉnh sửa giá
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
    </div>
  );
};

export default AdminMedicineDashboard;
