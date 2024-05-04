import { Button } from '/~/components/ui/button';
import {
  APPOINTMENT_SERVICE,
  APPOINTMENT_STATUS,
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
} from '../../../main/models/constants';
import AppointmentTable from '../table/AppointmentTable';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Appointment from '../../../main/models/appointment';
import DoctorInformation from '../dialog/DoctorInformation';

type Params = {};

const PatientAppointment = ({}: Params) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<
    Appointment[]
  >([]);

  const handleNewAppointment = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab: MAIN_VIEW_TAB.PATIENT_BOOKING,
      }
    );
  };

  const handleLoadAppointments = async (status: APPOINTMENT_STATUS) => {
    const newAppointments: Appointment[] =
      await window.electron.ipcRenderer.invoke(
        APPOINTMENT_SERVICE.GET_APPOINTMENTS,
        {
          status,
        }
      );
    setAppointments(newAppointments);
  };

  const handleCancelAppointment = async () => {};

  console.log(selectedAppointments);

  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <AppointmentTable
        handleLoadAppointments={handleLoadAppointments}
        appointments={appointments}
        setSelectedAppointments={setSelectedAppointments}
      />
      <div className="flex items-center justify-between gap-4 mt-5">
        <Dialog>
          <DialogTrigger disabled={selectedAppointments.length === 0}>
            <Button
              disabled={selectedAppointments.length === 0}
              variant={'outline'}
              size={'lg'}
            >
              Xem lý lịch bác sĩ
            </Button>
          </DialogTrigger>
          {selectedAppointments.length > 0 && (
            <DoctorInformation
              doctor={
                selectedAppointments[selectedAppointments.length - 1].doctor
              }
            />
          )}
        </Dialog>

        <div className="flex items-center gap-4">
          <Button
            variant={'destructive'}
            size={'lg'}
            onClick={handleCancelAppointment}
          >
            Huỷ lịch
          </Button>
          <Button
            variant={'default'}
            size={'lg'}
            onClick={handleNewAppointment}
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;
