import { Button } from '../../../~/components/ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../~/components/ui/tooltip';
import MedicineTable from '../table/MedicineTable';
import Medicine from '/main/models/medicine';
import { useToast } from '/~/components/ui/use-toast';

const MedicineList = () => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <MedicineTable setSelectedMedicines={setSelectedMedicines} />

      <div className="flex items-center justify-end gap-4 mt-5">
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

export default MedicineList;
