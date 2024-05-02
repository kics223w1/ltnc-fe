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
import Machine from '../../../main/models/machine';

type DialogEditMachineContentProps = {
  machine: Machine;
  onSave: (updatedMachine: Machine) => void;
  onClose: () => void;
};

const DialogEditMachineContent = ({
  machine,
  onSave,
  onClose,
}: DialogEditMachineContentProps) => {
  const handleSave = () => {
    const nameInput = document.getElementById(
      'machineName'
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'machineDescription'
    ) as HTMLInputElement;
    const unitInput = document.getElementById(
      'machineUnit'
    ) as HTMLInputElement;
    const costInput = document.getElementById(
      'machineCost'
    ) as HTMLInputElement;
    const ingredientsInput = document.getElementById(
      'machineIngredients'
    ) as HTMLInputElement;

    if (
      nameInput &&
      descriptionInput &&
      unitInput &&
      costInput &&
      ingredientsInput
    ) {
      const updatedMachine = {
        ...machine,
        name: nameInput.value,
        description: descriptionInput.value,
        unit: unitInput.value,
        cost_out: costInput.value,
        ingredients: ingredientsInput.value,
      };
      // Call onSave function to save changes
      onSave(updatedMachine);
    } else {
      console.error('One or more input fields are missing.');
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm máy mới</DialogTitle>
          <DialogDescription>Thêm máy mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Id máy</Label>
            <Input
              className="col-span-3"
              defaultValue={machine.id}
              id="machineId"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tên máy
            </Label>
            <Input
              className="col-span-3"
              defaultValue={machine.name}
              id="machineName"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Nhà cung cấp
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={machine.vendor}
              id="machineDescription"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Trạng thái
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={machine.status}
              id="machineUnit"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mô tả
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              defaultValue={machine.description}
              id="machineCost"
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

export default DialogEditMachineContent;
