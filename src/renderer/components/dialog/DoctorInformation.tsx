import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { Button } from '../../../~/components/ui/button';
import Doctor from '../../../main/models/doctor';

type Params = {
  doctor: Doctor | undefined;
};

export default function DoctorInformation({ doctor }: Params) {
  if (!doctor) {
    return <></>;
  }

  return (
    <>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Lý lịch bác sĩ </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">Họ tên:</span>
            <span>{doctor.userName}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">Chức vụ:</span>
            <span>{doctor.role}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">
              Giới tính:
            </span>
            <span>{doctor.isMale ? 'Nam' : 'Nữ'}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">
              Ngày sinh:
            </span>
            <span>{doctor.dateOfBirth?.toString()}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">
              Số điện thoại:
            </span>
            <span>{doctor.phone}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground">Email:</span>
            <span>{doctor.email}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <DialogFooter className="flex items-center justify-end w-full">
          <DialogClose>
            <Button variant={'default'}>Hoàn tất</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
