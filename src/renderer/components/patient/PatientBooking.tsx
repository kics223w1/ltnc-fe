import { useEffect, useState } from 'react';
import Doctor from '../../../main/models/doctor';
import DoctorBookingList from './DoctorBookingList';
import {
  APPOINTMENT_SERVICE,
  USER_SERVICE,
} from '../../../main/models/constants';
import { useToast } from '../../../~/components/ui/use-toast';
import { Button } from '../../../~/components/ui/button';
import moment from 'moment';
import { ReloadIcon } from '@radix-ui/react-icons';
import { IdEmailAndUserName } from '../../../main/types';

type Props = {};

const PatientBooking = ({}: Props) => {
  const [doctors, setDoctors] = useState<IdEmailAndUserName[]>([]);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [bookingDate, setBookingDate] = useState('');

  const [startAppointment, setStartAppointment] = useState<number>(1);
  const [endAppointment, setEndAppointment] = useState(2);

  const [isInternal, setIsInternal] = useState<boolean>(false);

  const [symptoms, setSymptoms] = useState<string[]>(['Sốt']);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errorMessage = getAppointMentError();
    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Thời gian khám không hợp lệ',
        description: errorMessage,
      });
      return;
    }

    if (symptoms.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Chưa chọn triệu chứng',
        description: 'Vui lòng chọn ít nhất một triệu chứng',
      });
      return;
    }

    const bookingDateTime = new Date(bookingDate);

    setIsLoading(true);

    const newDoctors = await window.electron.ipcRenderer.invoke(
      APPOINTMENT_SERVICE.GET_FREE_DOCTORS,
      {
        date: moment(bookingDateTime).format('DD/MM/YYYY'),
        min_appointment_number: startAppointment,
        max_appointment_number: endAppointment,
      }
    );

    setIsLoading(false);

    setDoctors(newDoctors);
  };

  const getAppointMentError = (): string | undefined => {
    // Convert start and end time strings to Date objects
    const bookingDateTime = new Date(bookingDate);

    // Get the current time
    const currentTime = new Date();

    if (bookingDateTime < currentTime) {
      return 'Ngày khám không được nhỏ hơn thời gian hiện tại';
    }

    if (startAppointment > endAppointment) {
      return 'Thời gian bắt đầu không được lớn hơn thời gian kết thúc';
    }

    return undefined;
  };

  const handleOnClickSymptoms = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleBookingDateChange = (event: any) => {
    setBookingDate(event.target.value);
  };

  console.log('doctors: ', doctors);

  return (
    <div className="w-full h-full flex flex-col items-center gap-3 px-12 pt-5 pb-10 overflow-auto">
      {doctors.length > 0 ? (
        <DoctorBookingList
          date={bookingDate}
          min_appointment_number={startAppointment}
          max_appointment_number={endAppointment}
          handleReturn={() => {
            setDoctors([]);
          }}
          doctors={doctors}
        />
      ) : (
        <div className="container mx-auto max-w-lg px-6 pt-4 pb-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-2">Đặt lịch khám</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="fullname"
                className="block text-gray-700 text-sm font-bold"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Nhập họ tên của bạn"
                required
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold"
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="booking-date"
                className="block text-gray-700 text-sm font-bold"
              >
                Ngày khám
              </label>
              <input
                type="date"
                id="booking-date"
                name="booking-date"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={handleBookingDateChange}
                value={bookingDate}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="start-appointment"
                className="block text-gray-700 text-sm font-bold"
              >
                Thời gian bắt đầu
              </label>
              <select
                id="start-appointment"
                name="start-appointment"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setStartAppointment(Number(e.target.value))}
                value={startAppointment}
              >
                <option value="" disabled selected>
                  Chọn thời gian bắt đầu
                </option>
                {Array.from({ length: 10 }, (_, index) => {
                  const startTime = index + 7;
                  const endTime = startTime + 1;
                  return (
                    <option key={index} value={index + 1}>
                      {`Ca ${index + 1} (${startTime}h - ${endTime}h)`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-2">
              <label
                htmlFor="end-appointment"
                className="block text-gray-700 text-sm font-bold"
              >
                Thời gian kết thúc
              </label>
              <select
                id="end-appointment"
                name="end-appointment"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setEndAppointment(Number(e.target.value))}
                value={endAppointment}
              >
                <option value="" disabled selected>
                  Chọn thời gian kết thúc
                </option>
                {Array.from({ length: 10 }, (_, index) => {
                  const startTime = index + 7;
                  const endTime = startTime + 1;
                  return (
                    <option key={index} value={index + 1}>
                      {`Ca ${index + 1} (${startTime}h - ${endTime}h)`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">
                Triệu chứng
              </label>
              <div className=" grid grid-cols-4 gap-2">
                <Button
                  type="button"
                  variant={symptoms.includes('Sốt') ? 'default' : 'outline'}
                  onClick={() => {
                    handleOnClickSymptoms('Sốt');
                  }}
                >
                  Sốt
                </Button>
                <Button
                  type="button"
                  variant={symptoms.includes('Ho') ? 'default' : 'outline'}
                  onClick={() => {
                    handleOnClickSymptoms('Ho');
                  }}
                >
                  Ho
                </Button>
                <Button
                  type="button"
                  variant={
                    symptoms.includes('Đau bụng') ? 'default' : 'outline'
                  }
                  onClick={() => {
                    handleOnClickSymptoms('Đau bụng');
                  }}
                >
                  Đau bụng
                </Button>
                <Button
                  type="button"
                  variant={symptoms.includes('Đau đầu') ? 'default' : 'outline'}
                  onClick={() => {
                    handleOnClickSymptoms('Đau đầu');
                  }}
                >
                  Đau đầu
                </Button>
                <Button
                  type="button"
                  variant={
                    symptoms.includes('Đau răng') ? 'default' : 'outline'
                  }
                  onClick={() => {
                    handleOnClickSymptoms('Đau răng');
                  }}
                >
                  Đau răng
                </Button>
                <Button
                  type="button"
                  variant={symptoms.includes('Đau mắt') ? 'default' : 'outline'}
                  onClick={() => {
                    handleOnClickSymptoms('Đau mắt');
                  }}
                >
                  Đau mắt
                </Button>
                <Button
                  type="button"
                  variant={
                    symptoms.includes('Đau chân') ? 'default' : 'outline'
                  }
                  onClick={() => {
                    handleOnClickSymptoms('Đau chân');
                  }}
                >
                  Đau chân
                </Button>
                <Button
                  type="button"
                  variant={symptoms.includes('Khác') ? 'default' : 'outline'}
                  onClick={() => {
                    handleOnClickSymptoms('Khác');
                  }}
                >
                  Khác
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="department"
                className="block text-gray-700 text-sm font-bold"
              >
                Khoa khám
              </label>
              <select
                id="department"
                name="department"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setIsInternal(e.target.value === 'Internal')}
                value={isInternal ? 'Internal' : 'External'}
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
              onSubmit={handleSubmit}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {isLoading && <ReloadIcon className="animate-spin h-5 w-5" />}
              {isLoading ? 'Đang tải...' : 'Tìm bác sĩ'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientBooking;
