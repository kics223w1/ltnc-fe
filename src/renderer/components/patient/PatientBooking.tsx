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

  useEffect(() => {
    if (selectedDoctors.length === 0) {
      setSelectedDoctor(undefined);
      return;
    }

    setSelectedDoctor(selectedDoctors[selectedDoctors.length - 1]);
  }, [selectedDoctors]);

  return (
    <div className="w-full h-full flex flex-col gap-3 px-12 pt-10 pb-10 overflow-auto relative">
      <div className="flex items-center gap-3 absolute">
        <span className="text-base font-sfProSemiBold">Chọn khoa khám: </span>
        <Button variant={'outline'}>Khoa Ngoại</Button>
        <Button variant={'outline'}>Khoa Nội</Button>
      </div>

      <DoctorTable setSelectedDoctors={setSelectedDoctors} />

      <div className="w-full h-px bg-border my-5">
        <DatePickerWithPresets css="w-full mt-5" />

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
