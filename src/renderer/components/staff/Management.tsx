import { useEffect, useState } from 'react';
import Examination from '../../../main/models/examination';
import ExaminationTable from '../table/ExaminationTable';
import { Button } from '../../../~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '../../../~/components/ui/toast';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogExaminationContent from '../dialog/ExaminationContent';
import { MANAGEMENT_SERVICE } from '../../../main/models/constants';

export default function Management() {
  const [selectedExaminations, setSelectedExaminations] = useState<
    Examination[]
  >([]);
  const [examinations, setExaminations] = useState<Examination[]>([]);

  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleOnClickEdit = () => {
    if (selectedExaminations.length === 0) {
      toast({
        title: 'Chưa có cuộc khám được chọn',
        description: 'Vui lòng chọn một cuộc khám',
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }

    console.log(selectedExaminations);
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
      <ExaminationTable
        examinations={examinations}
        handleLoadExaminations={handleLoadExaminations}
        setSelectedExaminations={setSelectedExaminations}
      />

      <div className="flex items-center justify-end gap-2 w-full mt-5">
        <Dialog>
          <DialogTrigger asChild disabled={selectedExaminations.length === 0}>
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
