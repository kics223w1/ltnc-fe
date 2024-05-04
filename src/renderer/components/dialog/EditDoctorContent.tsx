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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import Doctor from '../../../main/models/doctor';
import { useEffect, useState } from 'react';
import { BodyUpdateUser } from '../../../main/types';
import User from '../../../main/models/user';
import { USER_SERVICE } from '../../../main/models/constants';
import { useToast } from '../../../~/components/ui/use-toast';

type DialogEditDoctorContentProps = {
  doctor: User;
  handleClose: () => void;
};

const DialogEditDoctorContent = ({ doctor }: DialogEditDoctorContentProps) => {
  const [phone, setPhone] = useState<string>('');
  const [cid, setCID] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isMale, setIsMale] = useState<boolean>(true);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    setPhone(doctor.phone || '');
    setCID(doctor.CID || '');
    setUserName(doctor.userName);
    setIsMale(doctor.isMale);
    setDateOfBirth(doctor.dateOfBirth || '');
  }, [doctor]);

  const handleSubmit = async () => {
    const body: BodyUpdateUser = {
      user_name: userName,
      isMale: isMale,
      date_of_birth: `${dateOfBirth} 07:00:00`,
      CID: cid,
      phone: phone,
    };
    const response = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.UPDATE_USER,
      {
        body,
      }
    );

    if (response !== 'Success!') {
      toast({
        variant: 'destructive',
        title: 'Cập nhật thông tin thất bại',
        description: 'Vui lòng thử lại sau',
      });
      return;
    }

    toast({
      variant: 'default',
      title: 'Cập nhật thông tin thành công',
      description: 'Thông tin của bác sĩ đã được cập nhật',
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tên</Label>
            <Input
              className="col-span-3"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ngày sinh
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              type="date"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Giới tính</Label>
            <Select
              onValueChange={(e: any) => {
                setIsMale(!isMale);
              }}
            >
              <SelectTrigger
                value={isMale ? 'male' : 'female'}
                className="col-span-3"
              >
                <SelectValue placeholder="Giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Điện thoại</Label>
            <Input
              className="col-span-3"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">CID</Label>
            <Input
              className="col-span-3"
              value={cid}
              onChange={(e) => {
                setCID(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Hoàn tất</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogEditDoctorContent;
