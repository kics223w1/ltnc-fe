import { useEffect, useState } from 'react';
import Doctor from '../../../main/models/doctor';
import DoctorBookingList from './DoctorBookingList';
import { ICON_SVG, USER_SERVICE } from '../../../main/models/constants';
import { useToast } from '../../../~/components/ui/use-toast';
import { Button } from '../../../~/components/ui/button';
import IconSVG from '../utils/icon-svg';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';

type Props = {
  isHomepage: boolean;
};

const PatientBooking = ({ isHomepage }: Props) => {
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isInternal, setIsInternal] = useState<boolean>(false);

  const [symptoms, setSymptoms] = useState<string[]>(['Sốt']);

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
    const errorMessage = getAppointMentError(startTime, endTime);

    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Thời gian khám không hợp lệ',
        description: errorMessage,
      });
      return;
    }

    if (isHomepage) {
      setFullName('');
      setPhoneNumber('');
      setStartTime('');
      setEndTime('');
      setIsInternal(false);
      setSymptoms(['Sốt']);

      toast({
        variant: 'default',
        title: 'Đặt lịch thành công',
        description: 'Vui lòng kiểm tra email xác nhận từ bác sĩ',
      });

      return;
    }

    setShowDoctors(true);
  };

  const getAppointMentError = (
    startTime: string,
    endTime: string
  ): string | undefined => {
    // Convert start and end time strings to Date objects
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Get the current time
    const currentTime = new Date();

    if (startDate >= endDate) {
      return 'Thời gian bắt đầu khám không được nhỏ hơn thời gian kết thúc khám';
    }

    if (startDate < currentTime) {
      return 'Thời gian bắt đầu khám không được nhỏ hơn thời gian hiện tại';
    }

    return undefined;
  };

  const handleStartTimeChange = (e: any) => {
    const selectedStartTime = e.target.value;
    setStartTime(selectedStartTime);
  };

  const handleEndTimeChange = (e: any) => {
    const selectedEndTime = e.target.value;
    setEndTime(selectedEndTime);
  };

  const handleOnClickSymptoms = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-3 px-12 pt-5 pb-10 overflow-auto">
      {showDoctors ? (
        <DoctorBookingList
          handleRefresh={handleReloadDoctors}
          handleReturn={() => {
            setShowDoctors(false);
          }}
          doctors={doctors}
        />
      ) : (
        <div className="container mx-auto max-w-lg px-6 pt-4 pb-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-2">Đặt lịch khám</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
              <label
                htmlFor="start-time"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Thời gian bắt đầu
              </label>
              <input
                type="datetime-local"
                id="start-time"
                name="start-time"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={handleStartTimeChange}
                value={startTime}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="end-time"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Thời gian kết thúc
              </label>
              <input
                type="datetime-local"
                id="end-time"
                name="end-time"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={handleEndTimeChange}
                value={endTime}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <div className="mb-3">
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

          {isHomepage && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'outline'} className="w-full mt-4" size={'lg'}>
                  Đăng nhập vào hệ thống
                </Button>
              </DialogTrigger>
              <DialogSignInContent />
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientBooking;
