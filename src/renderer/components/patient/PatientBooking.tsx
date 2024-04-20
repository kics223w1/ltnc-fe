import { useEffect, useState } from 'react';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../~/components/ui/select';
import DatePickerWithPresets from '../date-picker/DatePickerWithPresets';
import DoctorTable from '../table/DoctorTable';
import BookingBox from './BookingBox';
import Doctor from '../../../main/models/doctor';
import Examination from '../../../main/models/examination';

const times = [
  '7 AM - 8 AM',
  '8 AM - 9 AM',
  '9 AM - 10 AM',
  '10 AM - 11 AM',
  '11 AM - 12 PM',
  '12 PM - 1 PM',
  '1 PM - 2 PM',
  '2 PM - 3 PM',
  '3 PM - 4 PM',
  '4 PM - 5 PM',
];

const PatientBooking = () => {
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>(
    undefined
  );

  const [isInternal, setIsInternal] = useState<boolean>(true);

  useEffect(() => {
    if (selectedDoctors.length === 0) {
      setSelectedDoctor(undefined);
      return;
    }

    setSelectedDoctor(selectedDoctors[selectedDoctors.length - 1]);
  }, [selectedDoctors]);

  return (
    <div className="w-full h-full flex flex-col gap-3 px-12 pt-10 pb-10 overflow-auto">
      <div className="flex items-center gap-20 w-full">
        <span className="text-base font-sfProSemiBold flex flex-shrink-0">
          Chọn ngày khám
        </span>
        <DatePickerWithPresets css="w-full" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 absolute">
          <span className="text-base font-sfProSemiBold">
            Chọn khoa khám và bác sĩ:{' '}
          </span>
          <Button
            variant={isInternal ? 'outline' : 'default'}
            onClick={() => {
              setIsInternal(false);
            }}
          >
            Khoa Ngoại
          </Button>
          <Button
            variant={isInternal ? 'default' : 'outline'}
            onClick={() => {
              setIsInternal(true);
            }}
          >
            Khoa Nội
          </Button>
        </div>
        <DoctorTable setSelectedDoctors={setSelectedDoctors} />
      </div>

      <div className="w-full h-px bg-border my-5">
        {selectedDoctor !== undefined && (
          <div className="flex flex-col gap-5 mt-5 pb-10">
            {times.map((time) => {
              return (
                <BookingBox doctorName={selectedDoctor.userName} time={time} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBooking;
