import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import Examination from '../../../main/models/examination';
import { Textarea } from '../../../~/components/ui/textarea';

type Params = {
  examination: Examination;
};

export default function DetailExamination({ examination }: Params) {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết ca khám </DialogTitle>
          <DialogDescription>Thông tin ca khám</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh:</Label>
            <Input className="col-span-3" value={examination.disease}></Input>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mức độ</Label>
            <Input className="col-span-3" value={examination.level}></Input>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh lý nền</Label>
            <Input
              className="col-span-3"
              value={examination.underlyingDisease}
            ></Input>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Lời dặn</Label>
            <Textarea
              className="col-span-3"
              value={examination.advice}
            ></Textarea>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mô tả</Label>
            <Textarea
              className="col-span-3"
              value={examination.description}
            ></Textarea>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Trạng thái</Label>
            <Input className="col-span-3" value={examination.status}></Input>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bác sĩ</Label>
            <Textarea
              className="col-span-3"
              value={examination.doctor ? examination.doctor.userName : ''}
            ></Textarea>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh nhân</Label>
            <Input
              className="col-span-3"
              value={examination.patient ? examination.patient.userName : ''}
            ></Input>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end w-full">
          <DialogClose>
            <Button variant={'default'}>Hoàn tất</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
