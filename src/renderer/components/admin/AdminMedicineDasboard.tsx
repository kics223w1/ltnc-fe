import { Button } from '../../../~/components/ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../~/components/ui/tooltip';

import Medicine from '/main/models/medicine';
import MedicineTable from '../table/MedicineTable';

const AdminMedicineDashboard = () => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MedicineTable setSelectedMedicines={setSelectedMedicines} />
      <div className="flex items-center justify-end gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'outline'} size={'lg'}>
                Chỉnh sửa
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chỉnh sửa thuốc trong danh sách</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'default'} size={'lg'}>
                Tạo mới
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Thêm thuốc mới vào sanh sách</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AdminMedicineDashboard;
