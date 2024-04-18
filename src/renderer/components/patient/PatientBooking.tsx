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

const data = [
  {
    doctorName: 'Dr. John Doe',
    time: 'Apr 19, 2024 · 10:00 PM - 11:00 PM',
    imageSrc:
      'https://camblyavatars.s3.amazonaws.com/6143a8bdbfabaaaeca1770a6s200?h=7532edab237dd4ebbb9464c62a407168',
  },
  {
    doctorName: 'Dr. Jane Smith',
    time: 'Apr 20, 2024 · 9:00 AM - 10:00 AM',
    imageSrc:
      'https://camblyavatars.s3.amazonaws.com/6143a8bdbfabaaaeca1770a6s200?h=7532edab237dd4ebbb9464c62a407168',
  },
  {
    doctorName: 'Dr. Mark Johnson',
    time: 'Apr 20, 2024 · 11:00 AM - 12:00 PM',
    imageSrc:
      'https://camblyavatars.s3.amazonaws.com/6143a8bdbfabaaaeca1770a6s200?h=7532edab237dd4ebbb9464c62a407168',
  },
  {
    doctorName: 'Dr. Sarah Davis',
    time: 'Apr 20, 2024 · 2:00 PM - 3:00 PM',
    imageSrc:
      'https://camblyavatars.s3.amazonaws.com/6143a8bdbfabaaaeca1770a6s200?h=7532edab237dd4ebbb9464c62a407168',
  },
];

const data2 = [...data, ...data, ...data, ...data, ...data, ...data];

const PatientBooking = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 px-44 pt-10 pb-10  overflow-auto">
      <div className="flex items-center justify-between gap-5">
        <DatePickerWithPresets css="w-full" />
        <div className="flex items-center gap-2">
          <Button variant={'outline'}>Button 2</Button>
          <Button variant={'outline'}>Button 1</Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 mb-2">
        <Input className="w-full" placeholder="Find your doctor..." />
        <Button variant={'outline'}>Button 1</Button>
      </div>

      <div className="flex flex-col gap-5">
        {data2.map((item, index) => {
          return (
            <BookingBox
              key={index}
              doctorName={item.doctorName}
              time={item.time}
              imageSrc={item.imageSrc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PatientBooking;
