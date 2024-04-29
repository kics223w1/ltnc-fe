import { Button } from '../../../~/components/ui/button';
import { useState } from 'react';
import Machine from '/main/models/machine';
import MachineTable from '../table/MachineTable';

const AdminMachineDashboard = () => {
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MachineTable setSelectedMachines={setSelectedMachines} />
      <div className="flex items-center justify-end gap-3">
        <Button variant={'outline'} size={'lg'}>
          Chỉnh sửa
        </Button>
        <Button variant={'default'} size={'lg'}>
          Thêm mới
        </Button>
      </div>
    </div>
  );
};

export default AdminMachineDashboard;
