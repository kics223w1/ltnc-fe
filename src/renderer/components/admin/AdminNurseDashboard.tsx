import { useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import NurseTable from '../table/NurseTable';
import Nurse from '../../../main/models/nurse';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogAddNurseContent from '../dialog/AddNurseContent';
import DialogEditNurseContent from '../dialog/EditNurseContent';

const AdminNurseDashboard = () => {
  const [selectedNurses, setSelectedNurses] = useState<Nurse[]>([]);

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <NurseTable setSelectedNurses={setSelectedNurses} />
      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger>
            <Button variant={'outline'} size={'lg'}>
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddNurseContent />
        </Dialog>
      </div>
    </div>
  );
};

export default AdminNurseDashboard;
