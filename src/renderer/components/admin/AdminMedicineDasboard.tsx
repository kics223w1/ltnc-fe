import { Button } from '../../../~/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '../../../~/components/ui/toast';

import Medicine from '/main/models/medicine';
import MedicineTable from '../table/MedicineTable';
import { MEDICINE_SERVICE, MANAGEMENT_SERVICE } from '/main/models/constants';
import DialogAddMedicineContent from '../dialog/AddMedicineContent';
import DialogEditMedicineContent from '../dialog/EditMedicineContent';
import { MedicineDetails, MedicineLog } from '../dialog/MedicineContent';

const AdminMedicineDashboard = () => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  // const [showMedicineDetails, setShowMedicineDetails] = useState(false); // State to control MedicineDetails visibility
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  ); // State to store selected medicine

  // const toggleAddForm = () => setShowAddForm(!showAddForm);
  const params = {
    id: '',
  };

  useEffect(() => {
    handleLoadMedicines();
  }, []);

  const handleLoadMedicines = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/medicine/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
      } else {
        console.error('Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
              // onClick={handleOnClickEdit}
            >
              Chỉnh sửa
            </Button>
          </DialogTrigger>
          {selectedMedicines.length > 0 && (
            <DialogEditMedicineContent
              medicine={selectedMedicines[selectedMedicines.length - 1]}
              onSave={handleSaveMedicine}
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
