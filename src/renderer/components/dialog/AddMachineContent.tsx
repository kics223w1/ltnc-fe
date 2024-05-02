import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '/~/components/ui/dialog';
import { useState, useEffect, MouseEvent, ChangeEvent, FormEvent } from 'react';
import Machine from '/main/models/machine';
import { ICON_SVG, MACHINE_SERVICE } from '../../../main/models/constants';

interface Props {
  handleAddMachine: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DialogAddMachineContent: React.FC<Props> = ({
  handleAddMachine,
  isOpen,
  setIsOpen,
}) => {
  const [machines, setMachines] = useState<Machine>({
    id: '',
    name: '',
    vendor: '',
    status: '',
    description: '',
  });

  useEffect(() => {}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMachines((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(machines),
      });
      if (response.ok) {
        resetForm();
        handleAddMachine();
        setIsOpen(false);
      } else {
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setMachines({
      id: '',
      name: '',
      vendor: '',
      status: '',
      description: '',
    });
  };

  return (
    <>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm máy mới</DialogTitle>
            <DialogDescription>Thêm máy mới vào hệ thống</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Id máy
                </Label>
                <Input
                  name="id"
                  className="col-span-3"
                  value={machines.id}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Tên máy
                </Label>
                <Input
                  className="col-span-3"
                  name="name"
                  value={machines.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Nhà cung cấp
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="vendor"
                  value={machines.vendor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Trạng thái
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="status"
                  value={machines.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Mô tả
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="description"
                  value={machines.description}
                  onChange={handleInputChange}
                />
              </div>
              <DialogFooter className="flex items-center justify-between w-full">
                <DialogClose className="w-full flex items-start pl-5">
                  <Button variant={'outline'}>Huỷ bỏ</Button>
                </DialogClose>
                <Button type="submit">Hoàn tất</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      )}
    </>
  );
};

export default DialogAddMachineContent;
