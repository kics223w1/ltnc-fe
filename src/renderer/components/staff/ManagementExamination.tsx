import { useEffect, useState } from 'react';
import Examination from '../../../main/models/examination';
import AppointmentTable from '../table/AppointmentTable';
import { Button } from '../../../~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '../../../~/components/ui/toast';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogExaminationContent from '../dialog/ExaminationContent';
import { MANAGEMENT_SERVICE } from '../../../main/models/constants';
import ExaminationInformation from '../dialog/ExaminationInformation';

export default function ManagementExamination() {
  const [selectedExaminations, setSelectedExaminations] = useState<
    Examination[]
  >([]);
  const [examinations, setExaminations] = useState<Examination[]>([]);

  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleOnClickEdit = () => {
    if (selectedExaminations.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa có ca khám được chọn',
        description: 'Vui lòng chọn một ca khám để chỉnh sửa',
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
  };

  const handleOnClickDetails = () => {
    if (selectedExaminations.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa có ca khám được chọn',
        description: 'Vui lòng chọn một ca khám để xem chi tiết',
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
  };

  const handleLoadExaminations = async () => {
    const values = await window.electron.ipcRenderer.invoke(
      MANAGEMENT_SERVICE.GET_EXAMINATIONS,
      {}
    );
    setExaminations(values);
  };

  return (
    <div className="flex flex-col w-full h-full px-12 pt-5">
      <div className="flex items-center justify-between gap-2 w-full mt-5">
        <Dialog>
          <DialogTrigger disabled={selectedExaminations.length === 0}>
            <Button
              onClick={handleOnClickDetails}
              variant={'default'}
              size={'lg'}
            >
              Xem chi tiết
            </Button>
          </DialogTrigger>
          {selectedExaminations.length > 0 && (
            <ExaminationInformation
              examination={
                selectedExaminations[selectedExaminations.length - 1]
              }
            />
          )}
        </Dialog>

        <Dialog>
          <DialogTrigger disabled={selectedExaminations.length === 0}>
            <Button onClick={handleOnClickEdit} variant={'default'} size={'lg'}>
              Chỉnh sửa
            </Button>
          </DialogTrigger>
          <DialogExaminationContent
            examination={
              selectedExaminations.length > 0
                ? selectedExaminations[selectedExaminations.length - 1]
                : undefined
            }
          />
        </Dialog>
      </div>
    </div>
  );
}
