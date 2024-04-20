import { useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../~/components/ui/tooltip';
import DoctorTable from '../table/DoctorTable';
import Doctor from '../../../main/models/doctor';
import { useToast } from '../../../~/components/ui/use-toast';

const DoctorList = () => {
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (selectedDoctors.length === 0) {
      toast({
        title: 'Chưa chọn bác sĩ',
        description: 'Vui lòng chọn ít nhất một bác sĩ để xem lịch khám',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <DoctorTable setSelectedDoctors={setSelectedDoctors} />

      <div className="flex items-center justify-end gap-4 mt-5">
        <Button variant={'default'} size={'lg'} onClick={handleSchedule}>
          Xem lịch khám
        </Button>
      </div>
    </div>
  );
};

export default DoctorList;
