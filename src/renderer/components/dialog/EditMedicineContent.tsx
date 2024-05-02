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
import { useState } from 'react';
import { MEDICINE_SERVICE } from '../../../main/models/constants';

type DialogEditMedicineContentProps = {
  medicine: Medicine;
  handleLoadMedicines: () => void;
  onClose: () => void;
};

const DialogEditMedicineContent = ({
  medicine,
  handleLoadMedicines,
  onClose,
}: DialogEditMedicineContentProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSave = async () => {
    const costInput = document.getElementById(
      'medicineCost'
    ) as HTMLInputElement;

    if (costInput) {
      const response = await window.electron.ipcRenderer.invoke(
        MEDICINE_SERVICE.EDIT_MEDICINE_COST,
        {
          id: medicine.medicine_id,
          cost: costInput.value,
        }
      );

      if (response === 'Success!') {
        await handleLoadMedicines();
        onClose();
        return;
      }

      setErrorMessage('Cập nhật không thành công');
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{`Cập nhật giá thuốc ${medicine.name}`}</DialogTitle>
          <DialogDescription>Cập nhật lại giá thuốc</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="" className="text-right"></Label>
            {errorMessage && (
              <span className="text-red-400 text-sm col-span-3">
                {errorMessage}
              </span>
            )}
            {successMessage && (
              <span className="text-green-400 text-sm col-span-3">
                {successMessage}
              </span>
            )}
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
