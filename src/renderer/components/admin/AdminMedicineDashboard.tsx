import { Button } from '../../../~/components/ui/button';
import DoctorTable from '../table/DoctorTable';
import MedicineTable from '../table/MedicineTable';

const AdminMedicineDashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MedicineTable />
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

export default AdminMedicineDashboard;
