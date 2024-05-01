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
import Medicine from '../../../main/models/medicine';

type DialogEditMedicineContentProps = {
  medicine: Medicine;
  onSave: (updatedMedicine: Medicine) => void;
  onClose: () => void;
};

const DialogEditMedicineContent = ({
  medicine,
  onSave,
  onClose,
}: DialogEditMedicineContentProps) => {
  const handleSave = () => {
    const nameInput = document.getElementById(
      'medicineName'
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'medicineDescription'
    ) as HTMLInputElement;
    const unitInput = document.getElementById(
      'medicineUnit'
    ) as HTMLInputElement;
    const costInput = document.getElementById(
      'medicineCost'
    ) as HTMLInputElement;
    const ingredientsInput = document.getElementById(
      'medicineIngredients'
    ) as HTMLInputElement;

    if (
      nameInput &&
      descriptionInput &&
      unitInput &&
      costInput &&
      ingredientsInput
    ) {
      const updatedMedicine = {
        ...medicine,
        name: nameInput.value,
        description: descriptionInput.value,
        unit: unitInput.value,
        cost_out: costInput.value,
        ingredients: ingredientsInput.value,
      };
      // Call onSave function to save changes
      onSave(updatedMedicine);
    } else {
      console.error('One or more input fields are missing.');
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm thuốc mới</DialogTitle>
          <DialogDescription>Thêm thuốc mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Id thuốc</Label>
            <Input
              className="col-span-3"
              defaultValue={medicine.medicine_id}
              id="medicineId"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tên thuốc
            </Label>
            <Input
              className="col-span-3"
              defaultValue={medicine.name}
              id="medicineName"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mô tả
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={medicine.description}
              id="medicineDescription"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Đơn vị
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={medicine.unit}
              id="medicineUnit"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Giá bán
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={medicine.cost_out}
              id="medicineCost"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Thành phần
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={medicine.ingredients}
              id="medicineIngredients"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave}>
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogEditMedicineContent;
