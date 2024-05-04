import { useState } from 'react';
import Doctor from '../../../main/models/doctor';
import { Button } from '../../../~/components/ui/button';
import DoctorTable from '../table/DoctorTable';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogAddDoctorContent from '../dialog/AddDoctorContent';
import DialogEditDoctorContent from '../dialog/EditDoctorContent';

const AdminDoctorDashboard = () => {
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <DoctorTable
        isAllowSelection={true}
        setSelectedDoctors={setSelectedDoctors}
      />
      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger>
            <Button variant={'outline'} size={'lg'}>
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddDoctorContent />
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDoctorDashboard;
