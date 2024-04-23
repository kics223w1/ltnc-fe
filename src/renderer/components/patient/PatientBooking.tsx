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
      <div className="container mx-auto max-w-lg p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Đặt lịch khám</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Họ và tên
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nhập họ tên của bạn"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nhập số điện thoại của bạn"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="appointment-time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Thời gian khám
            </label>
            <input
              type="datetime-local"
              id="appointment-time"
              name="appointment-time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="symptom"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Triệu chứng
            </label>
            <textarea
              id="symptom"
              name="symptom"
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Describe your symptom"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Khoa khám
            </label>
            <select
              id="department"
              name="department"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Chọn khoa khám
              </option>
              <option value="Internal">Khoa nội</option>
              <option value="External">Khoa ngoại</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đặt lịch khám
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientBooking;
