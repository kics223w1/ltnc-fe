import { useEffect, useState } from 'react';
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
import {
  APPOINTMENT_SERVICE,
  ICON_SVG,
  MANAGEMENT_SERVICE,
} from '../../../main/models/constants';
import IconSVG from '../utils/icon-svg';
import Appointment from '../../../main/models/appointment';
import { AppointmentDoneBody } from '../../../main/types';
import { useToast } from '../../../~/components/ui/use-toast';

type Params = {
  appointment: Appointment;
  handleClose: () => void;
};

const DialogAppointmentContent = ({ appointment, handleClose }: Params) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [addedMedicines, setAddedMedicines] = useState<
    { name: string; id: string; quantity: number }[]
  >([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');

  const [disease, setDisease] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [underlyingDisease, setUnderlyingDisease] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { toast } = useToast();

  if (!appointment) {
    return <></>;
  }

  useEffect(() => {
    const setup = async () => {
      const newMedicines: Medicine[] = await window.electron.ipcRenderer.invoke(
        MANAGEMENT_SERVICE.GET_MEDICINES,
        {}
      );

      setMedicines(newMedicines);
    };

    setDisease(appointment.disease || '');
    setLevel(appointment.level || '');
    setUnderlyingDisease(appointment.underlyingDisease || '');
    setAdvice(appointment.advice || '');
    setDescription(appointment.description || '');

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
              id: medicine.id,
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
      {
        name: selectedMedicine,
        quantity: quantity,
        id:
          medicines.find((medicine) => medicine.name === selectedMedicine)
            ?.medicine_id || '',
      },
    ]);
  };

  const handleDeleteMedicine = (name: string) => {
    setAddedMedicines(
      addedMedicines.filter((medicine) => medicine.name !== name)
    );
  };

  const handleOnClickSubmit = async (event: any) => {
    event.preventDefault();

    const medicineList = addedMedicines.map((medicine) => {
      return {
        medicine_id: medicine.id,
        amount: medicine.quantity,
      };
    });

    const body: AppointmentDoneBody = {
      disease: disease,
      level: level,
      underlyingDisease: underlyingDisease,
      description: description,
      advice: advice,
      medicineList: medicineList,
    };

    const result = await window.electron.ipcRenderer.invoke(
      APPOINTMENT_SERVICE.DONE_APPOINTMENT,
      {
        appointment_id: appointment.id,
        body,
      }
    );

    if (result === 'Success!') {
      toast({
        variant: 'default',
        title: 'Hoàn tất ca khám',
        description: 'Hoàn tất ca khám thành công',
      });
      handleClose();
      return;
    }

    toast({
      variant: 'destructive',
      title: 'Hoàn tất ca khám',
      description: 'Hoàn tất ca khám thất bại',
    });
  };

  return (
    <>
      <DialogContent className="max-w-[700px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ca khám</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin ca khám</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bệnh</Label>
            <Input
              className="col-span-5"
              value={disease}
              onChange={(e) => {
                setDisease(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Mức Độ</Label>
            <Input
              className="col-span-5"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Bệnh lý nền</Label>
            <Input
              className="col-span-5"
              value={underlyingDisease}
              onChange={(e) => {
                setUnderlyingDisease(e.target.value);
              }}
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
              value={advice}
              onChange={(e) => {
                setAdvice(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right">Mô tả</Label>
            <Textarea
              className="col-span-5"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button onClick={handleOnClickSubmit} type="submit">
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogAppointmentContent;
