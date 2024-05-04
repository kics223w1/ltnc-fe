import { useEffect, useState } from 'react';
import {
  MACHINE_SERVICE,
  MACHINE_STATUS,
} from '../../../main/models/constants';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { MachineBodyAdd } from '../../../main/types';
import { useToast } from '../../../~/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import Machine from '../../../main/models/machine';

type Params = {
  machine: Machine;
};

const DialogEditMachineContent = ({ machine }: Params) => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<MACHINE_STATUS>(MACHINE_STATUS.ACTIVE);
  const [vendor, setVendor] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    setName(machine.name);
    setStatus(
      machine.status === 'Free'
        ? MACHINE_STATUS.ACTIVE
        : machine.status === 'Broken'
        ? MACHINE_STATUS.INACTIVE
        : machine.status === 'In_Use'
        ? MACHINE_STATUS.IN_PROGRESS
        : MACHINE_STATUS.IN_MAINTENANCE
    );
    setVendor(machine.vendor);
    setDescription(machine.description);
  }, [machine]);

  const handleDone = async () => {
    const body: MachineBodyAdd = {
      name,
      status,
      vendor,
      description,
    };

    const response = await window.electron.ipcRenderer.invoke(
      MACHINE_SERVICE.EDIT_MACHINE,
      {
        id: machine.id,
        body,
      }
    );

    if (response === 'Success!') {
      toast({
        variant: 'default',
        title: 'Sửa thông tin máy thành công',
      });
      return;
    }

    toast({
      variant: 'destructive',
      title: 'Sửa thông tin máy thất bại',
      description: 'Vui lòng thử lại sau',
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Sửa thông tin máy {machine.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên máy
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên máy"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Trạng thái
            </Label>

            <Select
              value={status}
              onValueChange={(value: any) => setStatus(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={'Chọn trạng thái'}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MACHINE_STATUS.ACTIVE}>Hoạt động</SelectItem>
                <SelectItem value={MACHINE_STATUS.IN_PROGRESS}>
                  Đang sử dụng
                </SelectItem>
                <SelectItem value={MACHINE_STATUS.INACTIVE}>Hỏng</SelectItem>
                <SelectItem value={MACHINE_STATUS.IN_MAINTENANCE}>
                  Đang bảo trì
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vendor" className="text-right">
              Nhà sản xuất
            </Label>
            <Input
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="Nhập nhà sản xuất"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Input
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
          <Button disabled={!name || !status || !vendor} onClick={handleDone}>
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogEditMachineContent;
