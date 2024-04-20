import { useEffect, useState } from 'react';
import Examination from '../../../main/models/examination';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';
import Medicine from '../../../main/models/medicine';
import { MANAGEMENT_SERVICE } from '../../../main/models/constants';

type Params = {
  examination: Examination | undefined;
};

const DialogExaminationContent = ({ examination }: Params) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const setup = async () => {
      const newMedicines: Medicine[] = await window.electron.ipcRenderer.invoke(
        MANAGEMENT_SERVICE.GET_MEDICINES,
        {}
      );

      setMedicines(newMedicines);
    };

    setup();
  }, []);

  if (!examination) {
    return <></>;
  }

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ca khám</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin ca khám</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh</Label>
            <Input className="col-span-3" defaultValue={examination.disease} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mức Độ</Label>
            <Input className="col-span-3" defaultValue={examination.level} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh lý nền</Label>
            <Input
              className="col-span-3"
              defaultValue={examination.underlyingDisease}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Thuốc</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Thuốc" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((medicine, index) => {
                  return (
                    <SelectItem
                      value={medicine.name}
                      key={`${medicine.name}_${index}`}
                    >
                      {medicine.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Lời dặn</Label>
            <Textarea
              className="col-span-3"
              defaultValue={examination.advice}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mô tả</Label>
            <Textarea
              className="col-span-3"
              defaultValue={examination.description}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bác sĩ</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Bác sĩ</SelectItem>
                <SelectItem value="dark">Bác sĩ</SelectItem>
                <SelectItem value="system">Bác sĩ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bệnh nhân</Label>
            <Input className="col-span-3" />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button type="submit">Hoàn tất</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogExaminationContent;
