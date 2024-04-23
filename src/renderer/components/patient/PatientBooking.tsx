import { useEffect, useState } from 'react';
import Doctor from '../../../main/models/doctor';
import DoctorBookingList from './DoctorBookingList';
import { USER_SERVICE } from '../../../main/models/constants';
import { useToast } from '../../../~/components/ui/use-toast';

const PatientBooking = () => {
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [symptom, setSymptom] = useState('');
  const [isInternal, setIsInternal] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    handleReloadDoctors();
  }, []);

  const handleReloadDoctors = async () => {
    const newDoctors: Doctor[] = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.RELOAD_DOCTORS,
      {}
    );
    setDoctors(newDoctors);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (isAppointmentTimeBehindNow(appointmentTime)) {
      toast({
        variant: 'destructive',
        title: 'Thời gian khám không hợp lệ',
        description: 'Vui lòng chọn thời gian khám sau thời gian hiện tại',
      });
      return;
    }

    setShowDoctors(true);
  };

  const isAppointmentTimeBehindNow = (appointmentTime: any) => {
    // Convert appointmentTime string to a Date object
    const appointmentDate = new Date(appointmentTime);

    // Get the current time
    const currentTime = new Date();

    // Compare appointmentTime with currentTime
    if (appointmentDate < currentTime) {
      return true; // appointmentTime is behind currentTime
    } else {
      return false; // appointmentTime is not behind currentTime
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 px-12 pt-10 pb-10 overflow-auto">
      {showDoctors ? (
        <DoctorBookingList
          handleRefresh={handleReloadDoctors}
          handleReturn={() => {
            setShowDoctors(false);
          }}
          doctors={doctors}
        />
      ) : (
        <div className="container mx-auto max-w-lg p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Đặt lịch khám</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-gray-700 text-sm font-bold mb-2"
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
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
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
                onChange={(e) => setAppointmentTime(e.target.value)}
                value={appointmentTime}
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
                onChange={(e) => setSymptom(e.target.value)}
                value={symptom}
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
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Đặt lịch khám
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientBooking;
