import { useState } from 'react';
import { MEDICINE_SERVICE } from '../../../main/models/constants';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { MedicineBodyAdd } from '../../../main/types';
import { useToast } from '../../../~/components/ui/use-toast';
import { Textarea } from '../../../~/components/ui/textarea';

const DialogAddBatchContent = () => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  const { toast } = useToast();

  const handleDone = async () => {
    const body: MedicineBodyAdd = {
      medicine_id: id,
      name,
      unit,
      cost_out: cost,
      ingredients,
      description,
    };

    const response = await window.electron.ipcRenderer.invoke(
      MEDICINE_SERVICE.ADD_MEDICINE,
      {
        body,
      }
    );

    if (response === 'Success!') {
      toast({
        variant: 'default',
        title: 'Thêm thuốc thành công',
      });
      return;
    }

    toast({
      variant: 'destructive',
      title: 'Thêm thuốc thất bại',
      description: 'Vui lòng thử lại sau',
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Thêm thuốc mới</DialogTitle>
          <DialogDescription>Thêm thuốc mới mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Mã thuốc
            </Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Nhập mã thuốc"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên thuốc
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên thuốc"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right">
              Đơn vị
            </Label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Nhập đơn vị"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Giá
            </Label>
            <Input
              value={cost}
              type="number"
              onChange={(e) => {
                setCost(parseInt(e.target.value));
              }}
              placeholder="Nhập giá"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Thành phần
            </Label>
            <Input
              value={ingredients.join(',')}
              onChange={(e) => setIngredients(e.target.value.split(','))}
              placeholder="Nhập thành phần"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Mô tả
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button
            disabled={!name || !id || !unit || !cost}
            onClick={handleDone}
          >
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogAddBatchContent;
