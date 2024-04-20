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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import Doctor from '../../../main/models/doctor';

type DialogEditDoctorContentProps = {
  doctor: Doctor;
};

const DialogEditDoctorContent = ({ doctor }: DialogEditDoctorContentProps) => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm bác sĩ</DialogTitle>
          <DialogDescription>Thêm bác sĩ mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tên</Label>
            <Input className="col-span-3" defaultValue={doctor.userName} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mật khẩu
            </Label>
            <Input
              type="password"
              className="col-span-3"
              defaultValue={doctor.password}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Ngày sinh
            </Label>
            <input
              className="col-span-3 h-8 border border-border rounded px-2"
              type="date"
              defaultValue={doctor.dateOfBirth.toString()}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Giới tính</Label>
            <Select>
              <SelectTrigger
                defaultValue={doctor.isMale ? 'male' : 'female'}
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
            <Input className="col-span-3" defaultValue={doctor.phone} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email</Label>
            <Input className="col-span-3" defaultValue={doctor.email} />
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

export default DialogEditDoctorContent;
