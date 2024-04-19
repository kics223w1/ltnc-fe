import { Button } from '../../../~/components/ui/button';
import DoctorTable from '../table/DoctorTable';
import MachineTable from '../table/MachineTable';

const AdminMachineDashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MachineTable />
      <div className="flex items-center justify-end gap-3">
        <Button variant={'outline'} size={'lg'}>
          Edit
        </Button>
        <Button variant={'default'} size={'lg'}>
          New
        </Button>
      </div>
    </div>
  );
};

export default AdminMachineDashboard;
