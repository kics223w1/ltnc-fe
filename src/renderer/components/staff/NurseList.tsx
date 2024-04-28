import { useState } from 'react';
import { Button } from '/~/components/ui/button';
import { useToast } from '/~/components/ui/use-toast';
import NurseTable from '../table/NurseTable';
import Nurse from '../../../main/models/nurse';

const NurseList = () => {
  const [selectedNurses, setSelectedNurses] = useState<Nurse[]>([]);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (selectedNurses.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa chọn y tá',
        description: 'Vui lòng chọn ít nhất một y tá để xem lịch khám',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <div className="relative">
        <NurseTable setSelectedNurses={setSelectedNurses} />
      </div>
    </div>
  );
};

export default NurseList;
