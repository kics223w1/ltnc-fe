import { useState } from 'react';
import { Button } from '/~/components/ui/button';
import { useToast } from '/~/components/ui/use-toast';
import PatientTable from '../table/PatientTable';
import Patient from '../../../main/models/patient';

const PatientList = () => {
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (selectedPatients.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa chọn bệnh nhân',
        description: 'Vui lòng chọn ít nhất một bệnh nhân để xem lịch khám',
      });
      return;
    }
  };

  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <div className="relative">
        <div className="flex items-center absolute">
          <Button variant={'default'} size={'default'} onClick={handleSchedule}>
            Xem lịch khám
          </Button>
        </div>
        <PatientTable setSelectedPatients={setSelectedPatients} />
      </div>
    </div>
  );
};

export default PatientList;
