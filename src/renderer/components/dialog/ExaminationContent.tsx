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
import { ICON_SVG, MANAGEMENT_SERVICE } from '../../../main/models/constants';
import IconSVG from '../utils/icon-svg';

type Params = {
  examination: Examination | undefined;
};

const DialogExaminationContent = ({ examination }: Params) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [addedMedicines, setAddedMedicines] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');

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

  const handleAddMedicine = () => {
    console.log(selectedMedicine);
    if (selectedMedicine === '' || quantity === 0) {
      return;
    }

    if (addedMedicines.find((medicine) => medicine.name === selectedMedicine)) {
      setAddedMedicines(
        addedMedicines.map((medicine) => {
          if (medicine.name === selectedMedicine) {
            return {
              name: selectedMedicine,
              quantity: quantity,
            };
          }
          return medicine;
        })
      );
      return;
    }

    setAddedMedicines([
      ...addedMedicines,
      { name: selectedMedicine, quantity: quantity },
    ]);
  };

  const handleDeleteMedicine = (name: string) => {
    setAddedMedicines(
      addedMedicines.filter((medicine) => medicine.name !== name)
    );
  };

  if (!examination) {
    return <></>;
  }

  return (
    <>
      <DialogContent className="max-w-[700px] h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ca khám</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin ca khám</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bệnh</Label>
            <Input className="col-span-5" defaultValue={examination.disease} />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Mức Độ</Label>
            <Input className="col-span-5" defaultValue={examination.level} />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bệnh lý nền</Label>
            <Input
              className="col-span-5"
              defaultValue={examination.underlyingDisease}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Thuốc</Label>
            <Select onValueChange={setSelectedMedicine}>
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
            <Input
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
              className="col-span-1"
              type="number"
            ></Input>
            <Button
              className="w-full"
              variant={'outline'}
              size={'icon'}
              onClick={handleAddMedicine}
            >
              <IconSVG
                iconName={ICON_SVG.PLUS}
                css="w-4 h-4"
                style={{}}
              ></IconSVG>
            </Button>
          </div>

          <div className="flex flex-col w-full gap-4">
            {addedMedicines.map((medicine, index: number) => {
              return (
                <div
                  className="grid grid-cols-6 items-center gap-4"
                  key={`${index + 1}.`}
                >
                  <Label className="text-right">
                    {index + 1}
                    {'.'}
                  </Label>
                  <Input className="col-span-3" value={medicine.name}></Input>
                  <Input
                    className="col-span-1"
                    value={medicine.quantity}
                  ></Input>
                  <Button
                    onClick={() => handleDeleteMedicine(medicine.name)}
                    className="w-full"
                    variant={'outline'}
                    size={'icon'}
                  >
                    <IconSVG
                      iconName={ICON_SVG.MINUS}
                      css="w-4 h-4"
                      style={{}}
                    ></IconSVG>
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Lời dặn</Label>
            <Textarea
              className="col-span-5"
              defaultValue={examination.advice}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Mô tả</Label>
            <Textarea
              className="col-span-5"
              defaultValue={examination.description}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bác sĩ</Label>
            <Select>
              <SelectTrigger className="col-span-5">
                <SelectValue placeholder="Bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Bác sĩ</SelectItem>
                <SelectItem value="dark">Bác sĩ</SelectItem>
                <SelectItem value="system">Bác sĩ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bệnh nhân</Label>
            <Input className="col-span-5" />
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
