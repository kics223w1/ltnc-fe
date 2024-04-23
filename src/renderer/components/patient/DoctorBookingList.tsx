import { useState } from 'react';
import Doctor from '../../../main/models/doctor';
import { Button } from '../../../~/components/ui/button';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DoctorInformation from '../dialog/DoctorInformation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '../../../~/components/ui/use-toast';

type DoctorPanelParams = {
  doctor: Doctor;
  idBookedDoctor: string | undefined;
  setIdBookedDoctor: (id: string | undefined) => void;
};

function DoctorPanel({
  doctor,
  idBookedDoctor,
  setIdBookedDoctor,
}: DoctorPanelParams) {
  const [isBooked, setIsBooked] = useState(false);

  const { toast } = useToast();

  const handleOnClick = () => {
    if (idBookedDoctor && idBookedDoctor !== doctor.userId) {
      toast({
        variant: 'destructive',
        title: 'Chỉ được đặt lịch cho một bác sĩ',
        description:
          'Vui lòng huỷ lịch hiện tại trước khi đặt lịch cho bác sĩ khác',
      });
      return;
    }

    const newValue = !isBooked;

    if (newValue) {
      toast({
        variant: 'default',
        title: `Đặt lịch thành công cho bác sĩ ${doctor.userName}`,
        description: 'Vui lòng chờ xác nhận từ bác sĩ',
      });
      setIdBookedDoctor(doctor.userId);
    } else {
      toast({
        variant: 'default',
        title: `Huỷ lịch thành công cho bác sĩ ${doctor.userName}`,
        description: 'Lịch khám của bạn đã được huỷ',
      });
      setIdBookedDoctor(undefined);
    }

    setIsBooked(!isBooked);
  };

  return (
    <div className="flex flex-col gap-2 w-full min-h-96 h-fit pb-5 border-2 rounded-lg hover:border-primary relative">
      <img
        src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
        className="object-cover h-80"
      ></img>

      <div className="flex flex-col pl-5">
        <span className="text-lg text-black">{doctor.userName}</span>
        <span className="text-sm text-muted-foreground">{doctor.role}</span>
      </div>

      <div className="flex items-center justify-between w-full gap-2 px-5">
        <Dialog>
          <DialogTrigger>
            <Button variant={'outline'}>Lý lịch</Button>
          </DialogTrigger>
          <DoctorInformation doctor={doctor} />
        </Dialog>
        <Button
          onClick={handleOnClick}
          variant={isBooked ? 'destructive' : 'default'}
        >
          {isBooked ? 'Huỷ lịch' : 'Đặt lịch'}
        </Button>
      </div>
    </div>
  );
}

type DoctorBookingListParams = {
  doctors: Doctor[];
  handleReturn: () => void;
  handleRefresh: () => void;
};

export default function DoctorBookingList({
  doctors,
  handleReturn,
  handleRefresh,
}: DoctorBookingListParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [idBookedDoctor, setIdBookedDoctor] = useState<string | undefined>(
    undefined
  );

  const handleOnClickRefresh = async () => {
    setIsLoading(true);
    await handleRefresh();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex items-center gap-5">
        <Button className="w-fit" variant={'outline'} onClick={handleReturn}>
          Quay lại
        </Button>
        <Button
          className="w-fit"
          variant={'default'}
          disabled={isLoading}
          onClick={handleOnClickRefresh}
        >
          {isLoading && <ReloadIcon className=" animate-spin mr-2" />}
          Làm mới
        </Button>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">
        {doctors.map((doctor, index) => {
          return (
            <DoctorPanel
              idBookedDoctor={idBookedDoctor}
              key={`${index}_${doctor.userId}`}
              doctor={doctor}
              setIdBookedDoctor={setIdBookedDoctor}
            />
          );
        })}
      </div>
    </div>
  );
}
