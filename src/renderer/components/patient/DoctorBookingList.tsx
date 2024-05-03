import { useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '../../../~/components/ui/use-toast';
import { APPOINTMENT_SERVICE } from '../../../main/models/constants';
import moment from 'moment';
import { IdEmailAndUserName } from '../../../main/types';

type DoctorPanelParams = {
  doctor: IdEmailAndUserName;
  date: string;
  idBookedDoctor: string | undefined;
  min_appointment_number: number;
  max_appointment_number: number;
  setIdBookedDoctor: (id: string | undefined) => void;
};

function DoctorPanel({
  doctor,
  idBookedDoctor,
  date,
  min_appointment_number,
  max_appointment_number,
  setIdBookedDoctor,
}: DoctorPanelParams) {
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleOnClick = () => {
    if (idBookedDoctor && idBookedDoctor !== doctor.user_id) {
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
      handleBook();
    } else {
      handleCancel();
    }
  };

  const handleBook = async () => {
    setIsLoading(true);

    const bookingDateTime = new Date(date);

    const body = {
      date: moment(bookingDateTime).format('DD/MM/YYYY'),
      min_appointment_number: min_appointment_number,
      max_appointment_number: max_appointment_number,
      doctor_id: doctor.user_id,
    };

    const response = await window.electron.ipcRenderer.invoke(
      APPOINTMENT_SERVICE.BOOK_APPOINTMENT,
      body
    );

    setIsLoading(false);

    if (response !== 'Success!') {
      toast({
        variant: 'destructive',
        title: 'Đặt lịch thất bại',
        description: 'Vui lòng thử lại sau',
      });
      return;
    }

    setIsBooked(true);
    setIdBookedDoctor(doctor.user_id);
    toast({
      variant: 'default',
      title: 'Đặt lịch thành công',
      description: 'Vui lòng chờ xác nhận từ bác sĩ',
    });
  };

  const handleCancel = async () => {};

  return (
    <div className="flex flex-col gap-2 w-full min-h-96 h-fit pb-5 border-2 rounded-lg hover:border-primary relative">
      <img
        src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
        className="object-cover h-80"
      ></img>

      <div className="flex flex-col pl-5">
        <span className="text-lg text-black">{doctor.user_name}</span>
      </div>

      <div className="flex items-center justify-between w-full gap-2 px-5">
        <Button
          onClick={handleOnClick}
          disabled={isLoading}
          variant={isBooked ? 'destructive' : 'default'}
        >
          {isLoading ? (
            <>
              <ReloadIcon className="w-4 h-4 animate-spin" />
              Đang xử lý...
            </>
          ) : isBooked ? (
            'Huỷ lịch'
          ) : (
            'Đặt lịch'
          )}
        </Button>
      </div>
    </div>
  );
}

type DoctorBookingListParams = {
  date: string;
  min_appointment_number: number;
  max_appointment_number: number;
  doctors: IdEmailAndUserName[];
  handleReturn: () => void;
};

export default function DoctorBookingList({
  date,
  min_appointment_number,
  max_appointment_number,
  doctors,
  handleReturn,
}: DoctorBookingListParams) {
  const [idBookedDoctor, setIdBookedDoctor] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex items-center gap-5">
        <Button className="w-fit" variant={'outline'} onClick={handleReturn}>
          Quay lại
        </Button>
      </div>

      <div className="grid grid-cols-3 items-center gap-5">
        {doctors.map((doctor, index) => {
          return (
            <DoctorPanel
              date={date}
              idBookedDoctor={idBookedDoctor}
              min_appointment_number={min_appointment_number}
              max_appointment_number={max_appointment_number}
              key={`${index}_${doctor.user_id}`}
              doctor={doctor}
              setIdBookedDoctor={setIdBookedDoctor}
            />
          );
        })}
      </div>
    </div>
  );
}
