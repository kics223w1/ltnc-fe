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
import { cn } from '../../../~/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import Medicine from '/main/models/medicine';
import { ICON_SVG, MEDICINE_SERVICE } from '../../../main/models/constants';

interface Props {
  handleAddMedicine: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DialogAddMedicineContent: React.FC<Props> = ({
  handleAddMedicine,
  isOpen,
  setIsOpen,
}) => {
  const [medicines, setMedicines] = useState<Medicine>({
    medicine_id: '',
    remaining: 0,
    name: '',
    unit: '',
    description: '',
    cost_out: '',
    ingredients: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedicines((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicines),
      });
      if (response.ok) {
        resetForm();
        handleAddMedicine();
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
    setMedicines({
      medicine_id: '',
      remaining: 0,
      name: '',
      unit: '',
      description: '',
      cost_out: '',
      ingredients: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm thuốc mới</DialogTitle>
            <DialogDescription>Thêm thuốc mới vào hệ thống</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Id thuốc
                </Label>
                <Input
                  name="medicine_id"
                  className="col-span-3"
                  value={medicines.medicine_id}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Tên thuốc
                </Label>
                <Input
                  className="col-span-3"
                  name="name"
                  value={medicines.name}
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
                  value={medicines.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Đơn vị
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="unit"
                  value={medicines.unit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Giá bán
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="cost_out"
                  value={medicines.cost_out}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 py-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Thành phần
                </Label>
                <input
                  className="col-span-3 h-8 border border-border rounded px-2"
                  name="ingredients"
                  value={medicines.ingredients}
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

export default DialogAddMedicineContent;
