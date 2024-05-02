import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { Button } from '/~/components/ui/button';
import { Label } from '../../../~/components/ui/label';
import Medicine from '../../../main/models/medicine';

type Props = {
  medicineId: string;
  medicineInfor: Medicine;
};

export const MedicineDetails: React.FC<Props> = ({
  medicineId,
  medicineInfor,
}) => {
  const [medicine, setMedicine] = useState('');

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const response = await axios.get(
          `https://helped-alpaca-obliging.ngrok-free.app/medicine/${medicineId}`
        );
        setMedicine(response.data);
        console.log(medicineId);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    fetchMedicineDetails();
  }, [medicineId]);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Thông tin thuốc: {medicineInfor.medicine_id}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Tên thuốc</Label>
            <p className="cols-span-3">{medicineInfor.name}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Số lượng còn lại</Label>
            <p className="cols-span-3">{medicineInfor.remaining}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Giá bán</Label>
            <p className="cols-span-3">{medicineInfor.cost_out}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Đơn vị</Label>
            <p className="cols-span-3">{medicineInfor.unit}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Mô tả</Label>
            <p className="cols-span-3">{medicineInfor.description}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Thành phần</Label>
            <p className="cols-span-3">{medicineInfor.ingredients}</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label className="text-left">Thuốc đang có</Label>
            {medicineInfor.availableMedicines ? (
              <ul className="cols-span-3">
                {medicineInfor.availableMedicines.map((batch) => (
                  <li key={batch.id}>
                    ID: {batch.id}, Remaining: {batch.remaining}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có thuốc</p>
            )}
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit">Hoàn tất</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
