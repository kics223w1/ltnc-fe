import { useState } from 'react';
import { Button } from '/~/components/ui/button';
import DoctorTable from '../table/DoctorTable';
import Doctor from '/main/models/doctor';
import { useToast } from '/~/components/ui/use-toast';

const DoctorList = () => {
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (selectedDoctors.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa chọn bác sĩ',
        description: 'Vui lòng chọn ít nhất một bác sĩ để xem lịch khám',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <div className="relative">
        <DoctorTable setSelectedDoctors={setSelectedDoctors} />
      </div>
    </div>
  );
};

export default DoctorList;
