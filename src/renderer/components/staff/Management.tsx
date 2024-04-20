import { useEffect, useState } from 'react';
import Examination from '../../../main/models/examination';
import ExaminationTable from '../table/ExaminationTable';
import { Button } from '../../../~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '../../../~/components/ui/toast';
import {
  Dialog,
  DialogClose,
  DialogTrigger,
} from '../../../~/components/ui/dialog';
import DialogExaminationContent from '../dialog/ExaminationContent';

export default function Management() {
  const [selectedExamination, setSelectedExamination] = useState<
    Examination | undefined
  >(undefined);
  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleOnClickEdit = () => {
    if (!selectedExamination) {
      toast({
        title: 'Chưa có cuộc khám được chọn',
        description: 'Vui lòng chọn một cuộc khám',
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }

    console.log(selectedExamination);
  };

  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <ExaminationTable setSelectedExamination={setSelectedExamination} />

      <div className="flex items-center justify-end gap-2 w-full mt-5">
        <Dialog>
          <DialogTrigger asChild disabled={selectedExamination === undefined}>
            <Button onClick={handleOnClickEdit} variant={'default'} size={'lg'}>
              Chỉnh sửa
            </Button>
          </DialogTrigger>
          <DialogExaminationContent examination={selectedExamination} />
        </Dialog>
      </div>
    </div>
  );
}
